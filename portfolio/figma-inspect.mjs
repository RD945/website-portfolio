import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const bun = process.env.BUN_PATH || "C:\\Users\\Reetam\\.bun\\bin\\bun.exe";
const mcpServer = process.env.FIGMA_MCP_SERVER || "C:\\Users\\Reetam\\.figma-mcp\\cursor-talk-to-figma-mcp\\dist\\server.js";
const tempDir = "C:\\Users\\Reetam\\AppData\\Local\\Temp\\opencode";
const targetNodeId = process.env.FIGMA_TARGET_NODE?.trim() || "3:6032";
const reportPath = `${tempDir}\\portfolio-figma-report.json`;
const imagePath = `${tempDir}\\portfolio-node-${targetNodeId.replace(/[^a-zA-Z0-9_-]/g, "-")}.png`;
const projectAssetDir = `${process.cwd()}\\public\\assets`;
const channel = process.env.FIGMA_CHANNEL?.trim();
const exportReference = process.env.FIGMA_EXPORT_REFERENCE === "1";
const exportScale = Number(process.env.FIGMA_EXPORT_SCALE || "2");
let assetsToExport = [];

try {
  if (process.env.FIGMA_EXPORT_ASSETS_JSON) {
    assetsToExport = JSON.parse(process.env.FIGMA_EXPORT_ASSETS_JSON);
  }
} catch (error) {
  throw new Error(`FIGMA_EXPORT_ASSETS_JSON is not valid JSON: ${error.message}`);
}

if (!channel) throw new Error("Set FIGMA_CHANNEL to the channel currently displayed by the Figma plugin.");
if (!Number.isFinite(exportScale) || exportScale <= 0) throw new Error("FIGMA_EXPORT_SCALE must be positive.");
if (!Array.isArray(assetsToExport) || assetsToExport.some((asset) => !asset?.nodeId || !asset?.fileName)) {
  throw new Error("FIGMA_EXPORT_ASSETS_JSON must be an array of { nodeId, fileName } objects.");
}

const child = spawn(bun, [mcpServer], { cwd: process.cwd(), stdio: ["pipe", "pipe", "pipe"] });
let nextId = 1;
let buffer = "";
const pending = new Map();

function rejectAll(error) {
  for (const request of pending.values()) {
    clearTimeout(request.timeout);
    request.reject(error);
  }
  pending.clear();
}

function handleMessage(message) {
  if (!message?.id || !pending.has(message.id)) return;
  const request = pending.get(message.id);
  clearTimeout(request.timeout);
  pending.delete(message.id);
  if (message.error) request.reject(new Error(JSON.stringify(message.error)));
  else request.resolve(message.result);
}

child.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  let newlineIndex = buffer.indexOf("\n");
  while (newlineIndex !== -1) {
    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);
    if (line) {
      try { handleMessage(JSON.parse(line)); } catch { /* Ignore launcher noise. */ }
    }
    newlineIndex = buffer.indexOf("\n");
  }
});
child.stderr.on("data", () => {});
child.on("error", rejectAll);
child.on("exit", (code) => { if (code !== 0) rejectAll(new Error(`Figma MCP exited with code ${code}`)); });

function request(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out waiting for ${method}`));
    }, 90000);
    pending.set(id, { resolve, reject, timeout });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
  });
}

function notify(method, params = {}) {
  child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", method, params })}\n`);
}

async function callTool(name, argumentsObject = {}) {
  return request("tools/call", { name, arguments: argumentsObject });
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function textFromTool(result) {
  const text = result?.content?.find((item) => item.type === "text")?.text;
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

try {
  await request("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "portfolio-figma-inspector", version: "1.0.0" },
  });
  notify("notifications/initialized");
  await wait(4000);

  const joined = await callTool("join_channel", { channel });
  const joinedText = textFromTool(joined);
  if (typeof joinedText !== "string" || !joinedText.startsWith("Successfully joined")) {
    throw new Error(`Could not join channel ${channel}: ${joinedText || "unknown error"}`);
  }

  const document = await callTool("get_document_info");
  const selection = await callTool("get_selection");
  const target = await callTool("get_node_info", { nodeId: targetNodeId });
  const styles = await callTool("get_styles");
  const components = await callTool("get_local_components");
  let image = null;
  if (exportReference) {
    const exported = await callTool("export_node_as_image", { nodeId: targetNodeId, format: "PNG", scale: exportScale });
    image = exported?.content?.find((item) => item.type === "image");
  }

  await mkdir(tempDir, { recursive: true });
  if (assetsToExport.length > 0) await mkdir(projectAssetDir, { recursive: true });
  if (image?.data) await writeFile(imagePath, Buffer.from(image.data, "base64"));

  const assets = {};
  for (const asset of assetsToExport) {
    console.log(`Exporting ${asset.nodeId} -> ${asset.fileName}`);
    try {
      const format = asset.format || "PNG";
      const result = await callTool("export_node_as_image", { nodeId: asset.nodeId, format, scale: exportScale });
      const assetImage = result?.content?.find((item) => item.type === "image");
      if (!assetImage?.data) throw new Error(textFromTool(result) || "No image data in MCP response.");
      const assetPath = `${projectAssetDir}\\${asset.fileName}`;
      await writeFile(assetPath, Buffer.from(assetImage.data, "base64"));
      assets[asset.fileName] = { nodeId: asset.nodeId, path: assetPath, mimeType: assetImage.mimeType };
      console.log(`Saved ${asset.fileName}`);
    } catch (error) {
      assets[asset.fileName] = { nodeId: asset.nodeId, error: error instanceof Error ? error.message : String(error) };
      console.error(`Skipped ${asset.fileName}: ${assets[asset.fileName].error}`);
    }
  }

  await writeFile(reportPath, JSON.stringify({
    document: textFromTool(document),
    selection: textFromTool(selection),
    target: textFromTool(target),
    styles: textFromTool(styles),
    components: textFromTool(components),
    export: image ? { mimeType: image.mimeType, path: imagePath } : null,
    assets,
  }, null, 2));

  console.log(JSON.stringify({
    reportPath,
    imagePath,
    imageExported: Boolean(image),
    assetCount: assetsToExport.length,
    assetSuccessCount: Object.values(assets).filter((asset) => !asset.error).length,
  }));
} finally {
  child.kill();
}
