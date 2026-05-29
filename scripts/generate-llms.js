import fs from "fs";

import { alternatives } from "../src/content/alternatives.js";
import { useCases } from "../src/content/useCases.js";
import { toolGroups } from "../src/content/toolGroups.js";
import { toolRegistry } from "../src/tools/registry.js";

const BASE_URL = "https://transformjs.com";

const mainTools = toolRegistry
  .map((tool) => `- ${tool.name}: ${BASE_URL}${tool.path}`)
  .join("\n");

const content = `
# TransformJS

TransformJS is a privacy-first browser-based developer toolkit.

## Main tools

${mainTools}

## Alternative pages

${alternatives
  .map((item) => `- ${item.title}: ${BASE_URL}/alternatives/${item.slug}`)
  .join("\n")}

## Use-case pages

${useCases
  .map((item) => `- ${item.title}: ${BASE_URL}/use-cases/${item.slug}`)
  .join("\n")}

## Tool groups

${toolGroups
  .map((item) => `- ${item.title}: ${BASE_URL}/groups/${item.slug}`)
  .join("\n")}

## Key facts

- Browser-based
- Privacy-first
- No installation
- No tracking
- Developer-focused utilities
`;

fs.writeFileSync("./public/llms.txt", content.trim());

console.log("llms.txt generated");