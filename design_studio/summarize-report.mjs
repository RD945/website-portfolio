import { readFile } from "node:fs/promises";

const report = JSON.parse(
  await readFile("C:\\Users\\Reetam\\AppData\\Local\\Temp\\opencode\\design-studio-figma-report.json", "utf8"),
);

function box(node) {
  const value = node.absoluteBoundingBox;
  return value
    ? `${Math.round(value.x)},${Math.round(value.y)},${Math.round(value.width)}x${Math.round(value.height)}`
    : "-";
}

function visit(node, depth = 0) {
  const interestingTypes = new Set(["TEXT", "IMAGE", "INSTANCE", "COMPONENT", "BOOLEAN_OPERATION"]);
  if (interestingTypes.has(node.type)) {
    const text = node.characters ? ` text=${JSON.stringify(node.characters)}` : "";
    console.log(`${" ".repeat(depth * 2)}${node.type} ${node.id} ${JSON.stringify(node.name)} box=${box(node)}${text}`);
  }
  for (const child of node.children || []) visit(child, depth + 1);
}

visit(report.target);
console.log(`STYLES ${JSON.stringify(report.styles)}`);
console.log(`COMPONENTS ${JSON.stringify(report.components)}`);
