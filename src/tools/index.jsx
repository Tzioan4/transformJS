import {
  FileJson,
  EarthLock,
  Layout,
  FileText,
  Link,
  Lock,
  FileCode,
  Database,
  Terminal,
  Hash,
  ArrowLeftRight,
  Fingerprint,
} from "lucide-react";

// code tools
import HtmlPreview from "./code/HtmlPreview";
import MarkdownPreview from "./code/MarkdownPreview";
import RegexTester from "./code/RegExTester";
import FtlPreviewer from "./code/FtlPreviewer";
import CaseConverter from "./code/CaseConverter";

// data tools
import JsonFormatter from "./data/JsonFormatter";
import YamlToJson from "./data/YamlToJson";
import SqlFormatter from "./data/SqlFormatter";
import CsvToJson from "./data/CsvToJson";

// security tools
import Base64Tool from "./security/Base64Tool";
import UrlEncoderDecoder from "./security/UrlEncoderDecoder";
import JwtDebugger from "./security/JwtDebugger";
import HashGenerator from "./security/HashGenerator";
import PasswordGenerator from "./security/PasswordGenerator";

// text tools
import UuidGenerator from "./text/UuidGenerator";

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description:
      "Prettify, minify, and validate JSON structures with syntax highlighting.",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
    tips: [
      "Paste any JSON to format on input.",
      "Use Beautify for readable indented output.",
      "Use Minify to compress JSON for production use.",
      "Invalid JSON will show an error badge instantly.",
    ],
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    component: Base64Tool,
    description:
      "Bi-directional Base64 conversion for text and binary data strings.",
    tags: ["base64", "encode", "decode"],
    icon: <FileCode size={40} strokeWidth={1.5} />,
    tips: [
      "Toggle between Encode and Decode mode with the buttons.",
      "Paste plain text to encode it to Base64.",
      "Paste a Base64 string to decode it back to plain text.",
    ],
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description: "RFC 3986 compliant encoding and decoding for URL components.",
    tags: ["url", "encode", "decode", "web"],
    icon: <Link size={40} strokeWidth={1.5} />,
    tips: [
      "Toggle between Encode and Decode mode.",
      "Encode mode converts special characters to %XX format.",
      "Decode mode converts %XX sequences back to characters.",
      "Useful for query string parameters and API URLs.",
    ],
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description: "Real-time sandboxed rendering for HTML and CSS snippets.",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
    tips: [
      "Write HTML and CSS on the left, see the result on the right.",
      "The preview is sandboxed - safe to test any snippet.",
      "Supports inline styles, external fonts via CDN, and JavaScript.",
      "Use it to quickly prototype email templates or UI components.",
    ],
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description:
      "GitHub Flavored Markdown rendering with live HTML transpilation.",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    tips: [
      "Write Markdown on the left, see rendered HTML on the right.",
      "Supports GitHub Flavored Markdown (tables, checkboxes, code blocks).",
      "Switch to HTML Source tab to see the generated HTML.",
      "Use it to preview README files before pushing to GitHub.",
    ],
  },
  {
    name: "JWT Debugger",
    path: "/jwt",
    component: JwtDebugger,
    description:
      "Decode JWT headers and payloads with instant signature verification.",
    tags: ["jwt", "auth", "security", "decode"],
    icon: <EarthLock size={40} strokeWidth={1.5} />,
    tips: [
      "Paste a JWT token to decode its header and payload.",
      "Enter your secret key and click Verify Signature to validate it.",
      "A valid JWT has 3 parts separated by dots (header.payload.signature).",
      "Only HMAC (HS256, HS384, HS512) signature verification is supported.",
    ],
  },
  {
    name: "YAML to JSON",
    path: "/yaml-to-json",
    component: YamlToJson,
    description:
      "Convert YAML configurations to clean, formatted JSON structures.",
    tags: ["yaml", "json", "convert", "data"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    tips: [
      "Paste YAML on the left to get formatted JSON on the right.",
      "Output updates automatically as you type.",
      "Invalid YAML will show an error badge with the exact issue.",
      "Useful for converting docker-compose or Kubernetes configs.",
    ],
  },
  {
    name: "SQL Formatter",
    path: "/sql-formatter",
    component: SqlFormatter,
    description: "Format and prettify SQL queries for better readability.",
    tags: ["sql", "database", "format", "query"],
    icon: <Database size={40} strokeWidth={1.5} />,
    tips: [
      "Paste any SQL query to format it with proper indentation.",
      "Supports SELECT, INSERT, UPDATE, DELETE, JOIN and more.",
      "Use it to clean up minified or machine-generated SQL.",
      "Copy the formatted output with one click.",
    ],
  },
  {
    name: "Hash Generator",
    path: "/hash-generator",
    component: HashGenerator,
    description:
      "Generate secure MD5, SHA-1, SHA-256 and SHA-512 hashes for any input.",
    tags: ["hash", "security", "md5", "sha256"],
    icon: <Hash size={40} strokeWidth={1.5} />,
    tips: [
      "Type or paste any text to generate its hash instantly.",
      "Switch between MD5, SHA-1, SHA-256 and SHA-512 algorithms.",
      "SHA-256 and SHA-512 use the browser's native Web Crypto API.",
      "MD5 and SHA-1 are cryptographically broken, avoid for security use.",
    ],
  },
  {
    name: "Password Generator",
    path: "/password-generator",
    component: PasswordGenerator,
    description: "Generate secure, random passwords with custom requirements.",
    tags: ["password", "security", "secure"],
    icon: <Lock size={40} strokeWidth={1.5} />,
    tips: [
      "Adjust the slider to set the password length (6-64 characters).",
      "Toggle uppercase, lowercase, numbers and symbols as needed.",
      "Uses crypto.getRandomValues(), cryptographically secure.",
      "The entropy (bits) shown indicates how strong the password is.",
    ],
  },
  {
    name: "CSV To JSON",
    path: "/csv-to-json",
    component: CsvToJson,
    description:
      "Convert complex CSV data to clean JSON with full RFC 4180 compliance.",
    tags: ["csv", "json", "convert"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    tips: [
      "Paste CSV with a header row, the first row becomes the JSON keys.",
      "Handles quoted fields, commas inside values, and multiline cells.",
      "JSON fields that look like objects or arrays are auto-parsed.",
      "Empty fields become null, extra columns are ignored.",
    ],
  },
  {
    name: "RegEx Tester",
    path: "/regex",
    component: RegexTester,
    description:
      "Test regular expressions with real-time match highlighting and flag support.",
    tags: ["regex", "pattern", "test", "code"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    tips: [
      "Enter your pattern between the / slashes and set flags (g, i, m).",
      "Matches are highlighted in real-time in the preview section.",
      "Capture groups are shown separately under each match.",
      "The g flag is always enforced to show all matches.",
    ],
  },
  {
    name: "FTL Previewer",
    path: "/ftl-previewer",
    component: FtlPreviewer,
    description: "Preview FreeMarker templates with mock JSON data.",
    tags: ["ftl", "freemarker", "template", "preview", "render"],
    icon: <FileCode size={40} />,
    tips: [
      "Paste your FTL template on the left and mock JSON data below it.",
      "Click Render to see the HTML output in the Preview tab.",
      "Supports #assign, #if/#else, #list and built-ins like ?has_content.",
      "Switch to HTML Source tab to copy the rendered HTML output.",
    ],
  },
  {
    name: "Case Converter",
    path: "/case-converter",
    component: CaseConverter,
    description:
      "Convert text between camelCase, snake_case, kebab-case, PascalCase and more.",
    tags: ["case", "convert", "text", "camel", "snake", "kebab"],
    icon: <ArrowLeftRight size={40} strokeWidth={1.5} />,
    tips: [
      "Type or paste any text in any format - the tool detects it automatically.",
      "Supports camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE and more.",
      "Click Copy on any card to copy that specific format.",
      "Works with multi-word phrases, variable names, and sentence text.",
    ],
  },
  {
    name: "UUID Generator",
    path: "/uuid-generator",
    component: UuidGenerator,
    description:
      "Generate cryptographically secure UUID v4 identifiers instantly.",
    tags: ["uuid", "guid", "generate", "id", "unique"],
    icon: <Fingerprint size={40} strokeWidth={1.5} />,
    tips: [
      "Set the count (1-100) and click Generate to create multiple UUIDs at once.",
      "Each UUID is generated with crypto.randomUUID() - cryptographically secure.",
      "Click Copy on any row to copy a single UUID.",
      "Use Copy All to copy the full list separated by newlines.",
    ],
  },
];