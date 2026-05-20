import { lazy } from "react";
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
  Link2,
  GitCompare,
  Palette,
} from "lucide-react";

// code tools
const HtmlPreview = lazy(() => import("./code/HtmlPreview"));
const MarkdownPreview = lazy(() => import("./code/MarkdownPreview"));
const RegexTester = lazy(() => import("./code/RegExTester"));
const FtlPreviewer = lazy(() => import("./code/FtlPreviewer"));
const CaseConverter = lazy(() => import("./code/CaseConverter"));
const DiffChecker = lazy(() => import("./code/DiffChecker"));
const ColorConverter = lazy(() => import("./code/ColorConverter"));

// data tools
const JsonFormatter = lazy(() => import("./data/JsonFormatter"));
const YamlToJson = lazy(() => import("./data/YamlToJson"));
const SqlFormatter = lazy(() => import("./data/SqlFormatter"));
const CsvToJson = lazy(() => import("./data/CsvToJson"));

// security tools
const Base64Tool = lazy(() => import("./security/Base64Tool"));
const UrlEncoderDecoder = lazy(() => import("./security/UrlEncoderDecoder"));
const JwtDebugger = lazy(() => import("./security/JwtDebugger"));
const HashGenerator = lazy(() => import("./security/HashGenerator"));
const PasswordGenerator = lazy(() => import("./security/PasswordGenerator"));

// text tools
const UuidGenerator = lazy(() => import("./text/UuidGenerator"));
const UrlParser = lazy(() => import("./text/UrlParser"));

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description:
      "Prettify, minify, and validate JSON structures with syntax highlighting.",
    tags: ["data", "json", "formatter"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
    seoTitle: "JSON Formatter & Validator - TransformJS",
    seoDesc:
      "Format, beautify, minify and validate JSON data instantly in your browser with syntax highlighting.",
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
    tags: ["security", "base64", "encode", "decode"],
    icon: <FileCode size={40} strokeWidth={1.5} />,
    seoTitle: "Base64 Encoder & Decoder - TransformJS",
    seoDesc:
      "Encode text to Base64 format or decode Base64 strings back to plain text securely and locally.",
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
    tags: ["security", "url", "encode", "decode"],
    icon: <Link size={40} strokeWidth={1.5} />,
    seoTitle: "URL Encoder & Decoder - TransformJS",
    seoDesc:
      "Encode or decode URLs and parameters safely following RFC 3986 specifications.",
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
    tags: ["code", "html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
    seoTitle: "HTML Live Preview - Sandboxed HTML/CSS Editor - TransformJS",
    seoDesc:
      "Render and preview HTML and CSS code snippets in real-time within a secure sandboxed environment.",
    tips: [
      "Write HTML and CSS on the left, see the result on the right.",
      "The preview is sandboxed - safe to test any snippet.",
      "Supports inline styles and static CSS. External fonts and JavaScript execution are disabled for security reasons.",
      "Use it to quickly prototype email templates or UI components.",
    ],
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description:
      "GitHub Flavored Markdown rendering with live HTML transpilation.",
    tags: ["code", "markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    seoTitle: "Markdown Preview & Live Editor - TransformJS",
    seoDesc:
      "Write Markdown code and view the live rendered HTML preview with clean typography.",
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
    tags: ["security", "jwt", "auth", "decode"],
    icon: <EarthLock size={40} strokeWidth={1.5} />,
    seoTitle: "JWT Debugger - Decode JSON Web Tokens - TransformJS",
    seoDesc:
      "Decode and analyze JSON Web Tokens (JWT) locally to inspect header, payload data, and verify signatures.",
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
    tags: ["data", "yaml", "json", "convert"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    seoTitle: "YAML to JSON Converter - TransformJS",
    seoDesc:
      "Convert YAML configurations and data structures into formatted JSON objects instantly.",
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
    tags: ["data", "sql", "database", "format"],
    icon: <Database size={40} strokeWidth={1.5} />,
    seoTitle: "SQL Formatter & Query Beautifier - TransformJS",
    seoDesc:
      "Format and structure complex SQL queries to improve readability with syntax formatting.",
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
    tags: ["security", "hash", "md5", "sha256"],
    icon: <Hash size={40} strokeWidth={1.5} />,
    seoTitle: "Cryptographic Hash Generator (SHA, MD5) - TransformJS",
    seoDesc:
      "Generate secure cryptographic hashes like SHA-1, SHA-256, SHA-512, or MD5 using client-side Crypto API.",
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
    tags: ["security", "password", "secure"],
    icon: <Lock size={40} strokeWidth={1.5} />,
    seoTitle: "Secure Password Generator - TransformJS",
    seoDesc:
      "Generate strong, randomized, and highly secure passwords with custom lengths and criteria locally.",
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
    tags: ["data", "csv", "json", "convert"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    seoTitle: "CSV to JSON Converter - TransformJS",
    seoDesc:
      "Transform CSV sheets and comma-separated rows into clean, structured JSON arrays and objects.",
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
    tags: ["code", "regex", "pattern", "test"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    seoTitle: "Regex Tester & Matcher - TransformJS",
    seoDesc:
      "Test regular expressions with real-time text matching, flag options, and capturing groups.",
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
    tags: ["code", "ftl", "freemarker", "template"],
    icon: <FileCode size={40} />,
    seoTitle: "FreeMarker (FTL) Template Previewer - TransformJS",
    seoDesc:
      "Mock and render Apache FreeMarker templates using local JSON context datasets.",
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
    tags: ["code", "case", "convert", "text"],
    icon: <ArrowLeftRight size={40} strokeWidth={1.5} />,
    seoTitle: "String Case Converter - TransformJS",
    seoDesc:
      "Convert text casing between camelCase, snake_case, PascalCase, kebab-case, UPPERCASE, and lowercase.",
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
    tags: ["text", "uuid", "guid", "generate"],
    icon: <Fingerprint size={40} strokeWidth={1.5} />,
    seoTitle: "UUID v4 Generator - Bulk Unique Identifiers - TransformJS",
    seoDesc:
      "Generate cryptographically secure version 4 UUIDs in bulk instantly inside your browser.",
    tips: [
      "Set the count (1-100) and click Generate to create multiple UUIDs at once.",
      "Each UUID is generated with crypto.randomUUID() - cryptographically secure.",
      "Click Copy on any row to copy a single UUID.",
      "Use Copy All to copy the full list separated by newlines.",
    ],
  },
  {
    name: "URL Parser",
    path: "/url-parser",
    component: UrlParser,
    description:
      "Break down any URL into protocol, host, path, query params and hash.",
    tags: ["text", "url", "parse", "query"],
    icon: <Link2 size={40} strokeWidth={1.5} />,
    seoTitle: "URL Parser & Query String Decoder - TransformJS",
    seoDesc:
      "Deconstruct any URL into protocol, domain, parameters, and query key-value pairs easily.",
    tips: [
      "Paste any full URL including http:// or https://.",
      "Query parameters are shown as individual key=value pairs.",
      "Click Copy on any param row to copy that specific parameter.",
      "Port shows default (443 for https, 80 for http) if not specified.",
    ],
  },
  {
    name: "Diff Checker",
    path: "/diff-checker",
    component: DiffChecker,
    description:
      "Compare two text blocks and highlight line-by-line differences.",
    tags: ["code", "diff", "compare", "text"],
    icon: <GitCompare size={40} strokeWidth={1.5} />,
    seoTitle: "Diff Checker - Compare Text & Code Differences - TransformJS",
    seoDesc:
      "Compare two blocks of text or source code side-by-side to track additions, deletions, and inline modifications.",
    tips: [
      "Paste the original text on the left and the modified version on the right.",
      "Added lines are highlighted in green, removed lines in red.",
      "The stats bar shows a quick summary of changes.",
      "Works with any text - code, JSON, configs, prose.",
    ],
  },
  {
    name: "Color Converter",
    path: "/color-converter",
    component: ColorConverter,
    description: "Convert colors between HEX, RGB, and HSL formats instantly.",
    tags: ["code", "color", "convert", "frontend", "css"],
    icon: <Palette size={40} strokeWidth={1.5} />,
    seoTitle: "Color Converter & Palette Picker - TransformJS",
    seoDesc:
      "Convert color formats between HEX, RGB, HSL, and CMYK with built-in accessibility testing previews.",
    tips: [
      "Type a HEX value to auto convert to RGB and HSL.",
      "Edit any RGB or HSL channel - all formats update live.",
      "Click any output card or Copy button to copy the CSS string.",
      "The swatch at the top gives you a live preview of the color.",
    ],
  },
];
