import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const GAMES = [
  { id: "snake", title: "Snake", input: "keyboard", category: "arcade" },
  { id: "pong", title: "Pong", input: "keyboard", category: "arcade" },
  { id: "tetris", title: "Tetris", input: "keyboard", category: "arcade" },
  { id: "breakout", title: "Breakout", input: "keyboard", category: "arcade" },
  { id: "2048", title: "2048", input: "touch", category: "puzzle" },
  { id: "flappy", title: "Flappy Bird", input: "touch", category: "arcade" },
  { id: "memory", title: "Memory Match", input: "touch", category: "puzzle" },
  { id: "colortap", title: "Simon Says", input: "touch", category: "memory" },
  { id: "builder", title: "Game Builder", input: "touch", category: "creative" },
];

export default defineTool({
  name: "list_games",
  title: "List RefGames titles",
  description: "List the games bundled in the RefGames game center, optionally filtered by input type.",
  inputSchema: {
    input: z.enum(["keyboard", "touch"]).describe("Filter by primary input type.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ input }) => {
    const games = input ? GAMES.filter((g) => g.input === input) : GAMES;
    return {
      content: [{ type: "text", text: games.map((g) => `${g.title} — ${g.category}, ${g.input}`).join("\n") }],
      structuredContent: { games },
    };
  },
});
