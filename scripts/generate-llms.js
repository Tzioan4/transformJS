import fs from "fs";

import { alternatives } from "../src/content/alternatives.js";
import { useCases } from "../src/content/useCases.js";
import { toolGroups } from "../src/content/toolGroups.js";

const BASE_URL = "https://transformjs.com";

const content = `
# TransformJS

TransformJS is a privacy-first browser-based developer toolkit.

## Main tools

- JSON Formatter: ${BASE_URL}/json
- YAML to JSON: ${BASE_URL}/yaml-to-json
- CSV to JSON: ${BASE_URL}/csv-to-json
- SQL Formatter: ${BASE_URL}/sql-formatter
- JWT Debugger: ${BASE_URL}/jwt-debugger
- Base64 Tool: ${BASE_URL}/base64
- Hash Generator: ${BASE_URL}/hash-generator
- Password Generator: ${BASE_URL}/password-generator
- URL Encoder / Decoder: ${BASE_URL}/url-encoder-decoder
- URL Parser: ${BASE_URL}/url-parser
- UUID Generator: ${BASE_URL}/uuid-generator
- Regex Tester: ${BASE_URL}/regex-tester
- Markdown Preview: ${BASE_URL}/markdown-preview
- HTML Preview: ${BASE_URL}/html-preview
- Case Converter: ${BASE_URL}/case-converter
- Diff Checker: ${BASE_URL}/diff-checker
- Color Converter: ${BASE_URL}/color-converter
- FTL Previewer: ${BASE_URL}/ftl-previewer
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
