import { defineMcp } from "@lovable.dev/mcp-js";
import listAppsTool from "./tools/list-apps";
import listGamesTool from "./tools/list-games";
import listTerminalCommandsTool from "./tools/list-terminal-commands";
import getSystemInfoTool from "./tools/get-system-info";

export default defineMcp({
  name: "refosofficial",
  title: "refosofficial",
  version: "0.1.0",
  instructions:
    "Read-only tools describing Ref OS, a web-based desktop OS simulation. Use `get_system_info` for version and platform details, `list_apps` for bundled applications, `list_games` for the RefGames catalog, and `list_terminal_commands` for supported terminal commands.",
  tools: [listAppsTool, listGamesTool, listTerminalCommandsTool, getSystemInfoTool],
});
