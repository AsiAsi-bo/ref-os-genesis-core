import { defineTool } from "@lovable.dev/mcp-js";

const COMMANDS = [
  { command: "help", description: "Show the list of available commands." },
  { command: "echo <text>", description: "Print the given text back." },
  { command: "date", description: "Print the current date and time." },
  { command: "ls", description: "List files in the current virtual directory." },
  { command: "clear", description: "Clear the terminal output." },
  { command: "whoami", description: "Print the current Ref OS user." },
  { command: "version", description: "Print the Ref OS version." },
  { command: "hack", description: "Easter egg: cinematic multi-phase fake penetration test." },
  { command: "matrix", description: "Easter egg: Matrix rain animation overlay." },
];

export default defineTool({
  name: "list_terminal_commands",
  title: "List terminal commands",
  description: "List the commands supported by the Ref OS Terminal app, including easter eggs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: COMMANDS.map((c) => `${c.command} — ${c.description}`).join("\n") }],
    structuredContent: { commands: COMMANDS },
  }),
});
