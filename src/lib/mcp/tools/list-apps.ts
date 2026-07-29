import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const APPS = [
  { id: "fileExplorer", title: "File Explorer", description: "Browse the virtual Ref OS file system." },
  { id: "notepad", title: "Notepad", description: "Write and save plain text notes." },
  { id: "calculator", title: "Calculator", description: "Basic arithmetic calculator." },
  { id: "settings", title: "Settings", description: "Personalization, account, alerts, privacy, system and about panels." },
  { id: "weather", title: "Weather", description: "Simulated weather forecast app." },
  { id: "calendar", title: "Calendar", description: "Month view calendar with events." },
  { id: "browser", title: "Web Browser", description: "Embedded browser that loads real websites in an iframe." },
  { id: "terminal", title: "Terminal", description: "Command line with easter eggs like hack and matrix." },
  { id: "refy", title: "Refy Assistant", description: "In-OS AI chat assistant." },
  { id: "movie", title: "RefMovies", description: "Video streaming app." },
  { id: "game", title: "RefGames", description: "Game center with arcade and touch friendly games." },
  { id: "email", title: "RefMail", description: "Mail client." },
  { id: "store", title: "Ref Store", description: "App store for Ref OS." },
  { id: "taskmanager", title: "Task Manager", description: "Monitor running apps and simulated resources." },
  { id: "updatecenter", title: "Update Center", description: "System update simulation." },
  { id: "music", title: "RefMusic", description: "Music player." },
  { id: "photos", title: "Photos", description: "Photo gallery." },
  { id: "paint", title: "Paint", description: "Simple drawing canvas." },
];

export default defineTool({
  name: "list_apps",
  title: "List Ref OS apps",
  description: "List the built-in applications available in the Ref OS desktop environment.",
  inputSchema: {
    search: z.string().describe("Optional case-insensitive filter matched against app title or description.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ search }) => {
    const q = search?.trim().toLowerCase();
    const apps = q
      ? APPS.filter((a) => `${a.title} ${a.description}`.toLowerCase().includes(q))
      : APPS;
    return {
      content: [{ type: "text", text: apps.map((a) => `${a.title} (${a.id}) — ${a.description}`).join("\n") || "No matching apps." }],
      structuredContent: { apps },
    };
  },
});
