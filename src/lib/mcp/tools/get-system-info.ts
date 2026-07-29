import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_system_info",
  title: "Get Ref OS system info",
  description: "Return public information about Ref OS: version, vendor, boot flow, and supported input methods.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Ref OS",
      version: "2.0",
      vendor: "Brin Corporation",
      description: "A web-based desktop operating system simulation with a glass UI, windowing, and bundled apps.",
      bootFlow: ["BIOS/UEFI screen", "Boot screen with live boot.log", "Installer", "Out-of-box experience (OOBE)", "Desktop"],
      inputMethods: ["mouse", "keyboard", "touch (drag, resize, tap, edge swipe gestures)"],
      shell: ["Desktop icon grid", "Dock/taskbar", "Launchpad-style Start Menu", "Notification Center", "Draggable resizable windows"],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
