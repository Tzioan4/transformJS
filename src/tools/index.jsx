import { toolRegistry } from "./registry";
import { toolComponents } from "./toolComponents";
import { toolIcons } from "./toolIcons";

export const tools = toolRegistry.map((tool) => ({
  ...tool,
  component: toolComponents[tool.componentKey],
  icon: toolIcons[tool.iconKey],
}));
