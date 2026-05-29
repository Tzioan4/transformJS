import { toolRegistry } from "../tools/registry.js";

export const toolRoutes = toolRegistry.map((tool) => tool.path);