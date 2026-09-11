# Figma MCP Workflow

This project uses the local `cursor-talk-to-figma-mcp` bridge and the Figma Desktop development plugin to inspect the editable Krate landing-page design. This guide records the working setup and the failure modes found during inspection so future sessions do not repeat long, unproductive waits.

## Project Target

- Figma file: `https://www.figma.com/design/BUy6Opd3NnlIMJQdo1O0FB/TOP-50-WEBSITES--Community-?node-id=5-1916&t=YothXG05QgZGfdYH-4`
- File key: `BUy6Opd3NnlIMJQdo1O0FB`
- Page: `LANDING PAGES` (`0:1`)
- Target: `Homepage` (`5:1916`)
- Target size: approximately `1440 x 6168`
- Report: `C:\Users\Reetam\AppData\Local\Temp\opencode\design-studio-figma-report.json`
- Full-page visual reference: `C:\Users\Reetam\AppData\Local\Temp\opencode\design-studio-node-5-1916.png`

The target is editable and contains reusable component instances. The website must be rebuilt with HTML, CSS, SVG, and application components. The full-page PNG is a reference only and must not be used as the website implementation.

The inspected page contains a header and navigation, the `Krate design and motion studio` hero, logos, services, recent work, team cards, a contact call to action, and a footer. The document exposes 20 local components, including service icons, card elements, arrows, and chevrons.

## Architecture

```text
OpenCode
  -> pinned local stdio MCP server: C:\Users\Reetam\.figma-mcp\cursor-talk-to-figma-mcp\dist\server.js
  -> local WebSocket relay: ws://127.0.0.1:3055
  -> Figma Desktop development plugin
  -> currently open Figma document
```

The relay is local-only. No Figma REST API token, public tunnel, public firewall rule, or Dev Mode connection is needed.

Installed locations:

- MCP repository: `C:\Users\Reetam\.figma-mcp\cursor-talk-to-figma-mcp`
- Relay source: `C:\Users\Reetam\.figma-mcp\cursor-talk-to-figma-mcp\src\socket.ts`
- MCP server source: `C:\Users\Reetam\.figma-mcp\cursor-talk-to-figma-mcp\src\talk_to_figma_mcp\server.ts`
- Plugin manifest: `C:\Users\Reetam\.figma-mcp\cursor-talk-to-figma-mcp\src\cursor_mcp_plugin\manifest.json`
- Bridge log: `C:\Users\Reetam\.figma-mcp\bridge-local.stdout.log`

## OpenCode Configuration

`design_studio\opencode.json` contains the direct MCP configuration:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "figma": {
      "type": "local",
      "command": [
        "C:\\Users\\Reetam\\.bun\\bin\\bun.exe",
        "C:\\Users\\Reetam\\.figma-mcp\\cursor-talk-to-figma-mcp\\dist\\server.js"
      ]
    }
  }
}
```

Restart OpenCode after adding or changing this file. Configuration is read when the session starts. Verify from the `design_studio` directory:

```powershell
opencode mcp list
```

The output must include `figma`. The MCP server, relay, and Figma plugin are three separate processes; all three must be available before document tools can work.

## Start the Relay

Use a native Windows PowerShell window from the local MCP repository:

```powershell
Test-Path .\src\socket.ts
bun run src/socket.ts
```

Use the checked-out source above instead of `bunx cursor-talk-to-figma-socket`. The published socket package currently contains the old full-payload logging behavior; the local source is the patched relay used by this project.

Do not run `bun setup`. Do not start a second relay if port `3055` already belongs to the Figma bridge. Check the listener without killing anything:

```powershell
Get-NetTCPConnection -LocalPort 3055 -ErrorAction SilentlyContinue
Get-Process -Id <PID>
```

The expected listener is `127.0.0.1:3055`. The current local source binds to `127.0.0.1` because Figma Desktop and OpenCode run on the same native Windows host.

## Connect Figma

1. Open the design in Figma Desktop.
2. Import `src\cursor_mcp_plugin\manifest.json` through `Plugins > Development > Import plugin from manifest...` if the plugin is not already installed.
3. Run `Cursor MCP Plugin` from `Plugins > Development`.
4. Keep the plugin port set to `3055`.
5. Click `Connect`.
6. Copy the newly displayed channel ID exactly.

The plugin creates a new random channel when it connects. A channel ID from an earlier session is stale unless the currently connected plugin displays the same ID.

## Required Preflight

The relay only forwards messages to other clients in the same channel. The MCP client and the Figma plugin must both be members of the exact same channel.

Run the following sequence and stop immediately on the first failure:

1. Join the channel with `join_channel` using the ID currently shown by the plugin.
2. Call `get_document_info`.
3. Call `get_selection`.
4. Call `get_node_info` for `5:1916`.

Only continue to styles, components, child nodes, or exports after `get_document_info` succeeds. If the relay logs `No other clients in channel` or `Broadcast to 0 peer(s)`, the MCP client is talking to an empty channel. Do not wait for a timeout. Reconnect the plugin, copy its new channel, and join that channel.

## Safe Inspection Order

Use targeted reads rather than repeatedly reading or exporting the entire page:

1. `get_document_info`
2. `get_selection`
3. `get_node_info` for `5:1916`
4. `get_nodes_info` for specific sections or component instances
5. `get_styles`
6. `get_local_components`
7. `scan_text_nodes` or `scan_nodes_by_types` only for a specific section when needed

The target report and the visual reference have already been captured. Do not recapture the full page just to inspect its structure.

## Export Rules

`export_node_as_image` returns base64 image data through the MCP response. It does not write a local file by itself. The relay and the MCP server may log or carry the full payload, so large exports are expensive.

- Do not export the `1440 x 6168` page during normal inspection.
- Do not run a long batch of 16 image exports in one command.
- Export one small image-fill node at a time, preferably at scale `0.5` or lower.
- Write each successful result to disk immediately instead of keeping a batch in memory.
- Use the editable component hierarchy for the website; use image exports only for individual visual assets that cannot be represented with CSS or SVG.
- Treat the current `export_node_as_image` path as unreliable for large images. Upstream issues `#25`, `#38`, and `#125` document related failures.

Upstream PR `#157` proposes direct and batch-to-file export tools, but it was not merged when this workflow was researched. Do not assume those tools exist in the published `0.3.5` package.

## Inspector Script

`figma-inspect.mjs` is a bounded read helper. It uses the pinned local MCP server and must be given the active channel rather than using a remembered channel:

```powershell
$env:FIGMA_CHANNEL = "<channel shown by Figma>"
node .\figma-inspect.mjs
```

The script performs targeted reads and does not export the page or assets by default. Optional exports must be explicitly enabled:

```powershell
$env:FIGMA_EXPORT_REFERENCE = "1"
node .\figma-inspect.mjs
```

Use a single asset export only when required:

```powershell
$env:FIGMA_EXPORT_ASSET_NODE = "5:1991"
$env:FIGMA_EXPORT_ASSET_NAME = "hero-flow.png"
node .\figma-inspect.mjs
```

For a controlled sequential set, pass `FIGMA_EXPORT_ASSETS_JSON` as an array of `{ nodeId, fileName }` objects. The script keeps one MCP process and one joined channel for the set, writes each result immediately, and records failures without aborting the remaining assets. Do not put the full-page node in that list.

The optional flags remain set in the current PowerShell session. Clear them before normal reads:

```powershell
Remove-Item Env:FIGMA_EXPORT_REFERENCE, Env:FIGMA_EXPORT_ASSET_NODE, Env:FIGMA_EXPORT_ASSET_NAME, Env:FIGMA_EXPORT_ASSETS_JSON, Env:FIGMA_EXPORT_SCALE -ErrorAction SilentlyContinue
```

Never add a full asset batch back to the default path.

## Why Earlier Commands Hung

The delays had distinct causes:

- The project initially had no local MCP entry, so OpenCode had no `figma` server in that session.
- Adding `opencode.json` did not update an already-running OpenCode session; a restart was required.
- Figma plugin channels are isolated. The `knmo1emh` channel had only one client, so requests were broadcast to zero peers.
- `server.ts` resets `currentChannel` to `null` whenever its WebSocket opens. A reconnect therefore requires another `join_channel` call.
- `sendCommandToFigma` rejects immediately if the socket is not ready or no channel is joined, but an empty joined channel waits for the 30-second request timeout.
- The relay printed complete request and response objects. Export responses contain large base64 strings, which made `bridge-local.stdout.log` grow to about 13.81 MB and added avoidable I/O.
- The first direct inspector attempted a long sequential asset export. The command produced no useful progress until the process was aborted.
- Inline Node diagnostics run through PowerShell also encountered quoting and parser errors. Use `.mjs` files for multi-step diagnostics.

The practical rule is: verify the peer connection with one small read before starting any expensive operation.

## Troubleshooting

### `figma` is missing from `opencode mcp list`

Run the command from `design_studio`, validate `opencode.json`, and restart OpenCode. Do not add a second global server entry.

### `MCP error -32001: Request timed out`

Check the relay listener, confirm the Figma plugin is still connected, copy its current channel again, rejoin, and retry `get_document_info`. Do not retry an export first.

### `Not connected to Figma. Attempting to connect...`

The MCP server had not finished opening its WebSocket when the command was sent. Wait for the server process to initialize, then join the channel. If this repeats, restart that one MCP process rather than starting several copies.

### `No other clients in channel` or `Broadcast to 0 peer(s)`

The channel is wrong or the plugin disconnected. Stop the command, reconnect the plugin, copy the new channel, and call `join_channel` again.

### Several established connections or a growing bridge log

Repeated inspector and `opencode mcp list` calls can leave stale client connections. Stop duplicate MCP processes, keep one relay listener, reconnect one plugin, and then run the preflight sequence. After stopping the relay, rotate or remove the old diagnostic log before starting a fresh session.

## Upstream References

- [Issue #25: Cannot Export Images from Figma](https://github.com/grab/cursor-talk-to-figma-mcp/issues/25)
- [Issue #38: `export_node_as_image` function error](https://github.com/grab/cursor-talk-to-figma-mcp/issues/38)
- [Issue #125: `export_node_as_image` base64 behavior](https://github.com/grab/cursor-talk-to-figma-mcp/issues/125)
- [Issue #176: Figma plugin connection troubleshooting](https://github.com/grab/cursor-talk-to-figma-mcp/issues/176)
- [PR #157: direct and batch file exports](https://github.com/grab/cursor-talk-to-figma-mcp/pull/157)
- [PR #189: stop dumping full WebSocket payloads](https://github.com/grab/cursor-talk-to-figma-mcp/pull/189)

## Current Boundary

The Figma inspection is complete and recorded in the temporary report and this guide. No application source has been created in `design_studio` yet. The next implementation step is to scaffold the website and recreate the target's editable component structure, not to place the full-page PNG in the page.
