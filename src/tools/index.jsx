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
      "Format, validate, beautify, and minify JSON instantly in your browser.",
    tags: ["data", "json", "formatter"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
    seoTitle: "JSON Formatter & Validator - TransformJS",
    seoDesc:
      "Format, validate, beautify, and minify JSON locally in your browser for API debugging, config cleanup, and data inspection.",
    tips: [
      "Paste any JSON to format on input.",
      "Use Beautify for readable indented output.",
      "Use Minify to compress JSON for production use.",
      "Invalid JSON will show an error badge instantly.",
    ],
    content: {
      intro:
        "JSON Formatter is a browser-based tool for formatting, validating, beautifying, and minifying JSON. Use it to inspect API responses, clean configuration files, debug structured data, and make complex JSON easier to read. All processing happens locally in your browser, so your JSON stays on your device.",
      useCases: [
        "Format messy JSON into readable indented output",
        "Minify JSON before embedding it, storing it, or sending it in requests",
        "Validate JSON copied from APIs, logs, or config files",
        "Detect duplicate keys and common JSON syntax issues during debugging",
      ],
      faq: [
        {
          question:
            "Can I use this JSON formatter for API responses and request payloads?",
          answer:
            "Yes. It is useful for formatting and validating JSON copied from API responses, request payloads, logs, and configuration files.",
        },
        {
          question: "Is my JSON uploaded to a server?",
          answer:
            "No. JSON processing happens locally in your browser, so your data stays on your device.",
        },
        {
          question: "Can this detect invalid JSON and duplicate keys?",
          answer:
            "Yes. The tool reports invalid JSON and can also warn about duplicate keys that may be overwritten during parsing.",
        },
        {
          question: "What is the difference between beautify and minify JSON?",
          answer:
            "Beautify adds indentation and line breaks for readability, while minify removes unnecessary whitespace to make the JSON smaller.",
        },
      ],
      relatedTools: ["/yaml-to-json", "/csv-to-json", "/jwt", "/diff-checker"],
    },
  },
  {
    name: "Base64 Encoder / Decoder",
    path: "/base64",
    component: Base64Tool,
    description:
      "Encode text to Base64 or decode Base64 strings directly in your browser.",
    tags: ["security", "base64", "encode", "decode"],
    icon: <FileCode size={40} strokeWidth={1.5} />,
    seoTitle: "Base64 Encoder & Decoder - TransformJS",
    seoDesc:
      "Encode text to Base64 or decode Base64 strings locally in your browser for debugging, payload inspection, and quick developer workflows.",
    tips: [
      "Toggle between Encode and Decode mode with the buttons.",
      "Paste plain text to encode it to Base64.",
      "Paste a Base64 string to decode it back to plain text.",
    ],
    content: {
      intro:
        "Base64 Encoder / Decoder is a browser-based tool for converting plain text to Base64 and decoding Base64 strings back to readable text. Use it when working with API payloads, encoded values, tokens, or debug output. All processing runs locally in your browser, so your input is not uploaded for server-side processing.",
      useCases: [
        "Encode text into Base64 for transport, testing, or configuration values",
        "Decode Base64 strings from APIs, logs, tokens, or headers",
        "Inspect encoded payloads during debugging workflows",
        "Convert small text snippets without command-line tools or external services",
      ],
      faq: [
        {
          question: "Is Base64 the same as encryption?",
          answer:
            "No. Base64 is an encoding format, not encryption. Encoded text can be decoded back to the original value.",
        },
        {
          question: "Can I decode Base64 locally without sending data to a server?",
          answer:
            "Yes. Base64 encoding and decoding happen locally in your browser, so your input stays on your device.",
        },
        {
          question: "Why do some Base64 strings end with equals signs?",
          answer:
            "Equals signs are padding characters used to align the encoded output correctly in Base64 blocks.",
        },
        {
          question: "Can I decode JWT parts with this tool?",
          answer:
            "JWT header and payload sections use Base64URL encoding. You can inspect encoded parts here, but for full token analysis and verification, use the JWT Debugger.",
        },
      ],
      relatedTools: ["/jwt", "/url-encode", "/hash-generator", "/json"],
    },
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description:
      "Encode or decode URL components and query values in your browser.",
    tags: ["security", "url", "encode", "decode"],
    icon: <Link size={40} strokeWidth={1.5} />,
    seoTitle: "URL Encoder & Decoder - TransformJS",
    seoDesc:
      "Encode or decode URL components, query values, and percent-encoded text locally in your browser using RFC 3986 rules.",
    tips: [
      "Toggle between Encode and Decode mode.",
      "Encode mode converts special characters to %XX format.",
      "Decode mode converts %XX sequences back to characters.",
      "Useful for query string parameters and API URLs.",
    ],
    content: {
      intro:
        "URL Encoder / Decoder is a browser-based tool for encoding and decoding URL components, query parameter values, and percent-encoded text. Use it for API endpoints, redirects, browser links, and debugging encoded URLs. All processing happens locally in your browser, so your URL data stays on your device.",
      useCases: [
        "Encode query parameter values before appending them to a URL",
        "Decode copied URLs that contain percent-encoded characters",
        "Debug API endpoints, redirects, and callback URLs",
        "Prepare safe URL components for frontend and backend development",
      ],
      faq: [
        {
          question: "What is URL encoding used for?",
          answer:
            "URL encoding converts unsafe or reserved characters into percent-encoded sequences so they can be safely used inside URLs and query parameters.",
        },
        {
          question: "Should I encode a full URL or only a query parameter value?",
          answer:
            "In most cases, you should encode individual components such as query parameter values instead of encoding the full URL at once.",
        },
        {
          question: "Can I decode percent-encoded URLs locally in the browser?",
          answer:
            "Yes. TransformJS decodes URL-encoded text locally in your browser without uploading it to a server.",
        },
        {
          question: "Why are spaces sometimes shown as %20?",
          answer:
            "Spaces are not safe inside URLs, so they are commonly encoded as %20 or, in some contexts, represented as plus signs.",
        },
      ],
      relatedTools: ["/url-parser", "/base64", "/regex", "/json"],
    },
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description:
      "Preview HTML and CSS snippets instantly in a sandboxed browser frame.",
    tags: ["code", "html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
    seoTitle: "HTML Live Preview - Sandboxed HTML & CSS Tool - TransformJS",
    seoDesc:
      "Preview HTML and CSS snippets instantly in a sandboxed browser environment for quick frontend testing and static markup checks.",
    tips: [
      "Write HTML and CSS on the left, see the result on the right.",
      "The preview is sandboxed - safe to test any snippet.",
      "Supports inline styles and static CSS. External fonts and JavaScript execution are disabled for security reasons.",
      "Use it to quickly prototype email templates or UI components.",
    ],
    content: {
      intro:
        "HTML Preview is a browser-based tool for rendering HTML and CSS snippets instantly inside a sandboxed preview frame. Use it to test small layouts, email fragments, static markup, and frontend experiments without creating a full project setup. The preview stays isolated from the main app for safer testing.",
      useCases: [
        "Preview small HTML and CSS snippets during frontend development",
        "Test static email template fragments and markup blocks",
        "Prototype simple UI sections before moving them into a real project",
        "Check how isolated markup renders without a full build setup",
      ],
      faq: [
        {
          question: "Is the HTML preview sandboxed?",
          answer:
            "Yes. The preview runs inside a sandboxed iframe so your snippet stays isolated from the main application.",
        },
        {
          question: "Can I run JavaScript in the HTML preview?",
          answer:
            "No. Script execution is disabled for safety. The tool is intended for HTML and CSS previewing.",
        },
        {
          question: "Can I use this tool to preview small UI snippets and email markup?",
          answer:
            "Yes. It is useful for testing small layout fragments, static HTML snippets, and simple email template markup.",
        },
        {
          question: "Does the HTML code leave my browser?",
          answer:
            "No. The preview is generated locally in your browser and is not uploaded for server-side processing.",
        },
      ],
      relatedTools: [
        "/markdown",
        "/color-converter",
        "/regex",
        "/diff-checker",
      ],
    },
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description:
      "Write Markdown and preview the rendered HTML instantly in your browser.",
    tags: ["code", "markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    seoTitle: "Markdown Preview & Live Editor - TransformJS",
    seoDesc:
      "Preview Markdown as rendered HTML instantly in your browser for README files, documentation drafts, notes, and developer content.",
    tips: [
      "Write Markdown on the left, see rendered HTML on the right.",
      "Supports GitHub Flavored Markdown (tables, checkboxes, code blocks).",
      "Switch to HTML Source tab to see the generated HTML.",
      "Use it to preview README files before pushing to GitHub.",
    ],
    content: {
      intro:
        "Markdown Preview is a browser-based tool for writing Markdown and viewing the rendered HTML output instantly. Use it for README files, documentation drafts, changelog entries, notes, and technical content before publishing. Rendering happens locally in your browser, so your Markdown stays on your device.",
      useCases: [
        "Preview README files before pushing them to GitHub",
        "Check Markdown tables, lists, links, and code blocks",
        "Draft documentation, notes, or changelog sections",
        "Render Markdown into HTML for quick review and editing",
      ],
      faq: [
        {
          question: "Does this Markdown preview support GitHub-style Markdown?",
          answer:
            "Yes. It supports common Markdown features used in developer documentation, including links, lists, tables, and code blocks.",
        },
        {
          question: "Are Markdown links safe in the preview?",
          answer:
            "Links are sanitized and opened in a new tab with safe attributes where applicable.",
        },
        {
          question: "Can I preview Markdown locally in the browser?",
          answer:
            "Yes. Markdown rendering happens locally in your browser without uploading your content to a server.",
        },
        {
          question: "Can I use this for README and documentation workflows?",
          answer:
            "Yes. It is especially useful for previewing README files, internal docs, changelogs, and technical notes before publishing.",
        },
      ],
      relatedTools: [
        "/html-preview",
        "/diff-checker",
        "/regex",
        "/case-converter",
      ],
    },
  },
  {
    name: "JWT Debugger",
    path: "/jwt",
    component: JwtDebugger,
    description:
      "Decode JWT tokens, inspect claims, and verify HMAC signatures locally.",
    tags: ["security", "jwt", "auth", "decode"],
    icon: <EarthLock size={40} strokeWidth={1.5} />,
    seoTitle: "JWT Debugger - Decode & Verify JSON Web Tokens - TransformJS",
    seoDesc:
      "Decode JWT tokens, inspect headers and payload claims, and verify HMAC signatures locally in your browser.",
    tips: [
      "Paste a JWT token to decode its header and payload.",
      "Enter your secret key and click Verify Signature to validate it.",
      "A valid JWT has 3 parts separated by dots (header.payload.signature).",
      "Only HMAC (HS256, HS384, HS512) signature verification is supported.",
    ],
    content: {
      intro:
        "JWT Debugger is a browser-based tool for decoding JSON Web Tokens, inspecting token headers and payload claims, and verifying HMAC signatures. Use it to debug authentication flows, inspect expiration data, and understand token structure during development. Token processing happens locally in your browser, so your JWT data is not uploaded to a server.",
      useCases: [
        "Inspect JWT headers, payload claims, and signature structure",
        "Check token expiration, issued-at values, and auth metadata",
        "Debug API authentication and authorization issues",
        "Verify HMAC JWT signatures with a local secret key",
      ],
      faq: [
        {
          question: "Can I decode a JWT token without sending it to a server?",
          answer:
            "Yes. JWT decoding and verification run locally in your browser, so the token is not uploaded for processing.",
        },
        {
          question: "What is the difference between decoding and verifying a JWT?",
          answer:
            "Decoding reads the header and payload. Verification checks whether the token signature matches the provided secret.",
        },
        {
          question: "Which JWT algorithms are supported for verification?",
          answer:
            "The tool supports local HMAC verification for HS256, HS384, and HS512 tokens.",
        },
        {
          question: "Can I trust a decoded JWT without verifying it?",
          answer:
            "No. JWT payloads are readable by design. You should verify the signature and validate claims before trusting the token.",
        },
      ],
      relatedTools: [
        "/base64",
        "/json",
        "/hash-generator",
        "/password-generator",
      ],
    },
  },
  {
    name: "YAML to JSON",
    path: "/yaml-to-json",
    component: YamlToJson,
    description:
      "Convert YAML to formatted JSON directly in your browser.",
    tags: ["data", "yaml", "json", "convert"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    seoTitle: "YAML to JSON Converter - TransformJS",
    seoDesc:
      "Convert YAML configurations and structured YAML data to formatted JSON locally in your browser for developer workflows.",
    tips: [
      "Paste YAML on the left to get formatted JSON on the right.",
      "Output updates automatically as you type.",
      "Invalid YAML will show an error badge with the exact issue.",
      "Useful for converting docker-compose or Kubernetes configs.",
    ],
    content: {
      intro:
        "YAML to JSON is a browser-based converter for turning YAML configuration files and structured YAML data into formatted JSON. Use it for Docker, Kubernetes, CI pipelines, static site configs, and other developer workflows that move between YAML and JSON. Conversion runs locally in your browser, so your input is not sent to a server.",
      useCases: [
        "Convert YAML configs into formatted JSON objects",
        "Inspect Docker, Kubernetes, or CI configuration data",
        "Debug YAML indentation and parsing errors",
        "Move structured data between YAML-based and JSON-based tools",
      ],
      faq: [
        {
          question: "Is YAML converted locally in the browser?",
          answer:
            "Yes. YAML parsing and conversion happen locally in your browser, so your input is not uploaded for server-side processing.",
        },
        {
          question: "Why does YAML indentation matter?",
          answer:
            "YAML uses indentation to define structure, so incorrect spacing can change the parsed result or cause errors.",
        },
        {
          question: "Can I use this for Docker Compose or Kubernetes YAML files?",
          answer:
            "Yes. It is useful for inspecting and converting common developer configuration files such as Docker, Kubernetes, and CI YAML.",
        },
        {
          question: "Can this handle very large YAML files?",
          answer:
            "It is designed for normal developer workflows and includes safety limits to reduce the risk of expensive YAML expansion.",
        },
      ],
      relatedTools: ["/json", "/csv-to-json", "/diff-checker", "/markdown"],
    },
  },
  {
    name: "SQL Formatter",
    path: "/sql-formatter",
    component: SqlFormatter,
    description:
      "Format SQL queries for cleaner structure and better readability.",
    tags: ["data", "sql", "database", "format"],
    icon: <Database size={40} strokeWidth={1.5} />,
    seoTitle: "SQL Formatter & Query Beautifier - TransformJS",
    seoDesc:
      "Format SQL queries for readability, inspect generated SQL, and review destructive statements more clearly in your browser.",
    tips: [
      "Paste any SQL query to format it with proper indentation.",
      "Supports SELECT, INSERT, UPDATE, DELETE, JOIN and more.",
      "Use it to clean up minified or machine-generated SQL.",
      "Copy the formatted output with one click.",
    ],
    content: {
      intro:
        "SQL Formatter is a browser-based tool for formatting and cleaning SQL queries so they are easier to read and review. Use it to inspect SELECT statements, JOINs, nested queries, and generated SQL copied from logs, consoles, or ORMs. The tool only formats SQL text and does not execute queries or connect to a database.",
      useCases: [
        "Beautify compressed or machine-generated SQL queries",
        "Review SELECT, JOIN, INSERT, UPDATE, and DELETE statements more easily",
        "Inspect SQL copied from logs, ORMs, or database consoles",
        "Spot destructive SQL operations more clearly before execution",
      ],
      faq: [
        {
          question: "Does this SQL formatter execute queries?",
          answer:
            "No. It only formats SQL text for readability and does not connect to a database or execute any query.",
        },
        {
          question: "Can I use this tool to format SQL copied from logs or ORMs?",
          answer:
            "Yes. It is useful for cleaning up generated SQL from logs, database consoles, ORMs, and debugging output.",
        },
        {
          question: "Why does the tool warn about DROP, DELETE, TRUNCATE, or ALTER?",
          answer:
            "These are destructive SQL operations that can change or remove data, so the warning helps you review risky queries more carefully.",
        },
        {
          question: "Can I use this SQL formatter in the browser without installing anything?",
          answer:
            "Yes. The tool runs directly in your browser with no installation or database connection required.",
        },
      ],
      relatedTools: ["/csv-to-json", "/json", "/regex", "/diff-checker"],
    },
  },
  {
    name: "Hash Generator",
    path: "/hash-generator",
    component: HashGenerator,
    description:
      "Generate SHA-1, SHA-256, and SHA-512 hashes locally in your browser.",
    tags: ["security", "hash", "md5", "sha256"],
    icon: <Hash size={40} strokeWidth={1.5} />,
    seoTitle: "Hash Generator - SHA-1, SHA-256, SHA-512 - TransformJS",
    seoDesc:
      "Generate SHA-1, SHA-256, and SHA-512 hashes locally in your browser for checksums, fingerprints, and quick developer workflows.",
    tips: [
      "Type or paste any text to generate its hash instantly.",
      "Switch between MD5, SHA-1, SHA-256 and SHA-512 algorithms.",
      "SHA-256 and SHA-512 use the browser's native Web Crypto API.",
      "MD5 and SHA-1 are cryptographically broken, avoid for security use.",
    ],
    content: {
      intro:
        "Hash Generator is a browser-based tool for generating text hashes using common algorithms such as SHA-1, SHA-256, and SHA-512. Use it to compare values, create checksums, inspect fingerprints, and test hashing behavior during development. Hashing runs locally in your browser, so your input is not sent to a server.",
      useCases: [
        "Generate SHA-256 or SHA-512 hashes for text values",
        "Compare checksums during debugging and verification",
        "Create quick fingerprints for snippets and identifiers",
        "Test how different hashing algorithms produce output",
      ],
      faq: [
        {
          question: "Are hashes the same as encryption?",
          answer:
            "No. Hashing is one-way. You can generate a hash from input, but you cannot safely reverse a hash back to the original value.",
        },
        {
          question: "Should I use SHA-1 for security-sensitive workflows?",
          answer:
            "No. SHA-1 is considered broken for modern security use. Prefer SHA-256 or SHA-512 when security matters.",
        },
        {
          question: "Is hashing done locally in the browser?",
          answer:
            "Yes. Hash generation runs locally in your browser using native browser APIs.",
        },
        {
          question: "Can I use this tool for checksums and fingerprints?",
          answer:
            "Yes. It is useful for quick checksum comparisons, text fingerprints, and development-time hash inspection.",
        },
      ],
      relatedTools: [
        "/password-generator",
        "/jwt",
        "/base64",
        "/uuid-generator",
      ],
    },
  },
  {
    name: "Password Generator",
    path: "/password-generator",
    component: PasswordGenerator,
    description:
      "Generate strong random passwords locally with custom length and options.",
    tags: ["security", "password", "secure"],
    icon: <Lock size={40} strokeWidth={1.5} />,
    seoTitle: "Secure Password Generator - TransformJS",
    seoDesc:
      "Generate strong random passwords locally in your browser with custom length, character options, and entropy feedback.",
    tips: [
      "Adjust the slider to set the password length (12-64 characters).",
      "Toggle uppercase, lowercase, numbers and symbols as needed.",
      "Uses crypto.getRandomValues(), cryptographically secure.",
      "The entropy (bits) shown indicates how strong the password is.",
    ],
    content: {
      intro:
        "Password Generator is a browser-based tool for creating strong random passwords with customizable length and character options. Use it to generate secure credentials for accounts, test environments, and developer workflows. Password generation happens locally in your browser, so generated values are not uploaded or stored by TransformJS.",
      useCases: [
        "Generate strong passwords for new accounts and services",
        "Create random credentials for development and staging environments",
        "Customize password length and character sets",
        "Estimate password strength with entropy feedback",
      ],
      faq: [
        {
          question: "Are generated passwords stored or uploaded anywhere?",
          answer:
            "No. Passwords are generated locally in your browser and are not uploaded, stored, or processed on a server.",
        },
        {
          question: "What makes a password strong?",
          answer:
            "Longer passwords with enough randomness are stronger. In most cases, length and unpredictability matter more than short complex patterns.",
        },
        {
          question: "Can I use this password generator for real accounts?",
          answer:
            "Yes. It can generate strong passwords, but you should still store them in a trusted password manager.",
        },
        {
          question: "Does this use cryptographically secure randomness?",
          answer:
            "Yes. The tool uses browser cryptographic randomness where available to generate stronger passwords.",
        },
      ],
      relatedTools: ["/hash-generator", "/jwt", "/base64", "/uuid-generator"],
    },
  },
  {
    name: "CSV to JSON",
    path: "/csv-to-json",
    component: CsvToJson,
    description:
      "Convert CSV data into structured JSON arrays directly in your browser.",
    tags: ["data", "csv", "json", "convert"],
    icon: <FileText size={40} strokeWidth={1.5} />,
    seoTitle: "CSV to JSON Converter - TransformJS",
    seoDesc:
      "Convert CSV data to structured JSON arrays locally in your browser, including quoted fields, multiline cells, and header rows.",
    tips: [
      "Paste CSV with a header row, the first row becomes the JSON keys.",
      "Handles quoted fields, commas inside values, and multiline cells.",
      "JSON fields that look like objects or arrays are auto-parsed.",
      "Empty fields become null, extra columns are ignored.",
    ],
    content: {
      intro:
        "CSV to JSON is a browser-based converter for transforming CSV rows and spreadsheet-style data into structured JSON arrays and objects. Use it for exports, quick datasets, API testing, and frontend or backend development workflows. Parsing happens locally in your browser, so your CSV data is not uploaded to a server.",
      useCases: [
        "Convert CSV exports into JSON arrays for APIs and applications",
        "Transform spreadsheet data into a JSON-friendly format",
        "Parse quoted fields, commas inside values, and multiline cells",
        "Prepare tabular data for frontend or backend development workflows",
      ],
      faq: [
        {
          question: "Does the first CSV row become JSON keys?",
          answer:
            "Yes. The first row is treated as the header row and becomes the object keys in the JSON output.",
        },
        {
          question: "Can this handle commas inside quoted CSV values?",
          answer:
            "Yes. The parser supports common CSV cases such as quoted fields, commas inside values, and multiline cells.",
        },
        {
          question: "What happens to empty CSV fields?",
          answer:
            "Empty fields are converted to null so the JSON output keeps a consistent structure.",
        },
        {
          question: "Is CSV converted locally in the browser?",
          answer:
            "Yes. CSV parsing and JSON conversion happen locally in your browser without uploading your input to a server.",
        },
      ],
      relatedTools: [
        "/json",
        "/yaml-to-json",
        "/sql-formatter",
        "/diff-checker",
      ],
    },
  },
  {
    name: "RegEx Tester",
    path: "/regex",
    component: RegexTester,
    description:
      "Test JavaScript regular expressions with live matches and group details.",
    tags: ["code", "regex", "pattern", "test"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
    seoTitle: "Regex Tester & JavaScript Pattern Matcher - TransformJS",
    seoDesc:
      "Test JavaScript regular expressions with live match highlighting, flags, indexes, and capture group inspection in your browser.",
    tips: [
      "Enter your pattern between the / slashes and set flags (g, i, m).",
      "Matches are highlighted in real-time in the preview section.",
      "Capture groups are shown separately under each match.",
      "The g flag is always enforced to show all matches.",
    ],
    content: {
      intro:
        "RegEx Tester is a browser-based tool for testing JavaScript regular expressions with live match highlighting, flags, indexes, and capture group inspection. Use it to debug validation patterns, parsing logic, search rules, and extraction workflows. Regex execution runs in an isolated worker to keep the main interface responsive.",
      useCases: [
        "Test regex patterns against real sample text",
        "Inspect capture groups and match indexes",
        "Validate patterns for emails, URLs, IDs, and logs",
        "Check JavaScript regex behavior with flags like g, i, and m",
      ],
      faq: [
        {
          question: "Which regex engine does this tool use?",
          answer:
            "It uses the JavaScript regular expression engine available in your browser.",
        },
        {
          question: "Can I inspect regex capture groups and match indexes?",
          answer:
            "Yes. The tool shows each match, its index, and any capture groups produced by the pattern.",
        },
        {
          question: "Does this regex tester protect against catastrophic backtracking?",
          answer:
            "Yes. Regex execution is isolated with timeout protection to reduce the risk of freezing the main interface.",
        },
        {
          question: "Is regex testing done locally in the browser?",
          answer:
            "Yes. Pattern testing runs locally in your browser and does not send your input text to a server.",
        },
      ],
      relatedTools: ["/json", "/url-parser", "/markdown", "/diff-checker"],
    },
  },
  {
    name: "FTL Previewer",
    path: "/ftl-previewer",
    component: FtlPreviewer,
    description:
      "Preview FreeMarker FTL templates with mock JSON data in your browser.",
    tags: ["code", "ftl", "freemarker", "template"],
    icon: <FileCode size={40} />,
    seoTitle: "FreeMarker FTL Previewer - TransformJS",
    seoDesc:
      "Preview FreeMarker FTL templates with mock JSON data locally in your browser to test rendering, variables, and conditions.",
    tips: [
      "Paste your FTL template on the left and mock JSON data below it.",
      "Click Render to see the HTML output in the Preview tab.",
      "Supports #assign, #if/#else, #list and built-ins like ?has_content.",
      "Switch to HTML Source tab to copy the rendered HTML output.",
    ],
    content: {
      intro:
        "FTL Previewer is a browser-based tool for previewing Apache FreeMarker templates with mock JSON data. Use it to test template logic, rendered HTML, variables, conditions, and list output without needing a backend rendering environment. Rendering happens locally in your browser, so your templates and data stay on your device.",
      useCases: [
        "Render FreeMarker FTL templates with mock JSON data",
        "Debug missing variables and conditional output",
        "Preview generated HTML before backend integration",
        "Test practical subsets of #assign, #if, #else, and #list logic locally",
      ],
      faq: [
        {
          question: "Does this use a real FreeMarker server engine?",
          answer:
            "No. It is a local previewer that supports a practical subset of FreeMarker behavior for template testing.",
        },
        {
          question: "Can I test FreeMarker templates with JSON data?",
          answer:
            "Yes. You can paste mock JSON data and render the template against that local data context.",
        },
        {
          question: "Is every FreeMarker feature supported?",
          answer:
            "No. The previewer supports a focused subset for local testing, not the full FreeMarker engine.",
        },
        {
          question: "Are my templates uploaded anywhere?",
          answer:
            "No. Template rendering happens locally in your browser and is not sent to a server.",
        },
      ],
      relatedTools: ["/json", "/html-preview", "/diff-checker", "/markdown"],
    },
  },
  {
    name: "Case Converter",
    path: "/case-converter",
    component: CaseConverter,
    description:
      "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.",
    tags: ["code", "case", "convert", "text"],
    icon: <ArrowLeftRight size={40} strokeWidth={1.5} />,
    seoTitle: "String Case Converter - TransformJS",
    seoDesc:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, title case, uppercase, and lowercase in your browser.",
    tips: [
      "Type or paste any text in any format - the tool detects it automatically.",
      "Supports camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE and more.",
      "Click Copy on any card to copy that specific format.",
      "Works with multi-word phrases, variable names, and sentence text.",
    ],
    content: {
      intro:
        "Case Converter is a browser-based tool for converting text between common naming and casing formats such as camelCase, PascalCase, snake_case, kebab-case, title case, lowercase, and uppercase. Use it for variables, routes, filenames, constants, and UI labels during development. Conversion happens locally in your browser, so your text stays on your device.",
      useCases: [
        "Convert variable names between camelCase and snake_case",
        "Generate kebab-case strings for URLs, slugs, or filenames",
        "Create SCREAMING_SNAKE constants for codebases",
        "Normalize copied labels into developer-friendly identifiers",
      ],
      faq: [
        {
          question: "Can this convert existing camelCase or snake_case text?",
          answer:
            "Yes. The tool detects common case boundaries and converts the input into multiple output formats.",
        },
        {
          question: "Does the case converter remove special characters?",
          answer:
            "Yes. Special symbols are stripped so the output is cleaner for identifiers, filenames, and code-friendly text.",
        },
        {
          question: "Can I copy only one case format?",
          answer:
            "Yes. Each output card has its own copy button for copying a single format.",
        },
        {
          question: "Is text conversion done locally in the browser?",
          answer:
            "Yes. The tool runs locally in your browser and does not upload your input text for processing.",
        },
      ],
      relatedTools: ["/regex", "/diff-checker", "/markdown", "/url-encode"],
    },
  },
  {
    name: "UUID Generator",
    path: "/uuid-generator",
    component: UuidGenerator,
    description:
      "Generate UUID v4 values locally in your browser, one or many at once.",
    tags: ["text", "uuid", "guid", "generate"],
    icon: <Fingerprint size={40} strokeWidth={1.5} />,
    seoTitle: "UUID v4 Generator - Bulk Unique IDs - TransformJS",
    seoDesc:
      "Generate UUID v4 values locally in your browser for databases, fixtures, APIs, logs, and development workflows.",
    tips: [
      "Set the count (1-100) and click Generate to create multiple UUIDs at once.",
      "Each UUID is generated with crypto.randomUUID() - cryptographically secure.",
      "Click Copy on any row to copy a single UUID.",
      "Use Copy All to copy the full list separated by newlines.",
    ],
    content: {
      intro:
        "UUID Generator is a browser-based tool for creating UUID v4 identifiers for development and technical workflows. Use it to generate unique IDs for databases, test fixtures, mock APIs, logs, and sample data. UUID generation happens locally in your browser, so nothing is uploaded or stored by TransformJS.",
      useCases: [
        "Generate one or many UUID v4 identifiers instantly",
        "Create IDs for mock data, fixtures, and test records",
        "Produce unique identifiers for APIs and database entries",
        "Copy single UUIDs or full generated lists for development workflows",
      ],
      faq: [
        {
          question: "What version of UUID does this tool generate?",
          answer:
            "It generates UUID v4 values, which are random UUIDs commonly used as unique identifiers.",
        },
        {
          question: "Can I generate multiple UUIDs at once?",
          answer:
            "Yes. You can generate UUIDs in bulk and copy either individual values or the full list.",
        },
        {
          question: "Are generated UUIDs guaranteed to be unique?",
          answer:
            "UUID v4 values have an extremely low collision probability, but no random identifier system can promise absolute uniqueness.",
        },
        {
          question: "Is UUID generation done locally in the browser?",
          answer:
            "Yes. UUIDs are generated locally in your browser using browser APIs.",
        },
      ],
      relatedTools: ["/hash-generator", "/jwt", "/json", "/password-generator"],
    },
  },
  {
    name: "URL Parser",
    path: "/url-parser",
    component: UrlParser,
    description:
      "Parse URLs into protocol, host, path, query parameters, and hash values.",
    tags: ["text", "url", "parse", "query"],
    icon: <Link2 size={40} strokeWidth={1.5} />,
    seoTitle: "URL Parser & Query Parameter Inspector - TransformJS",
    seoDesc:
      "Parse URLs into protocol, host, port, path, query parameters, and hash values directly in your browser.",
    tips: [
      "Paste any full URL including http:// or https://.",
      "Query parameters are shown as individual key=value pairs.",
      "Click Copy on any param row to copy that specific parameter.",
      "Port shows only if explicitly defined in the URL (e.g. :8080).",
    ],
    content: {
      intro:
        "URL Parser is a browser-based tool for breaking down URLs into protocol, hostname, port, pathname, query parameters, and hash fragments. Use it to inspect links, API endpoints, redirects, and tracking parameters during debugging. URL parsing happens locally in your browser, so your input is not uploaded to a server.",
      useCases: [
        "Inspect query parameters from long or complex URLs",
        "Debug API endpoints, redirects, and callback links",
        "Separate protocol, host, path, port, and hash values quickly",
        "Copy individual query parameter pairs during debugging",
      ],
      faq: [
        {
          question: "Does the URL need http:// or https:// to be parsed correctly?",
          answer:
            "A full URL with a protocol works best because the browser URL parser can identify all parts more reliably.",
        },
        {
          question: "Can this parse query parameters into key-value pairs?",
          answer:
            "Yes. The tool separates query parameters into individual key-value rows for easier inspection.",
        },
        {
          question: "Why is the port sometimes empty?",
          answer:
            "The port is shown only when it is explicitly present in the URL, such as :8080.",
        },
        {
          question: "Is URL parsing done locally in the browser?",
          answer:
            "Yes. URL parsing happens locally in your browser without sending the URL to a server.",
        },
      ],
      relatedTools: ["/url-encode", "/regex", "/base64", "/json"],
    },
  },
  {
    name: "Diff Checker",
    path: "/diff-checker",
    component: DiffChecker,
    description:
      "Compare two text blocks and highlight line-by-line differences instantly.",
    tags: ["code", "diff", "compare", "text"],
    icon: <GitCompare size={40} strokeWidth={1.5} />,
    seoTitle: "Diff Checker - Compare Text and Code - TransformJS",
    seoDesc:
      "Compare two text blocks, code snippets, or config files side by side and highlight added, removed, and unchanged lines.",
    tips: [
      "Paste the original text on the left and the modified version on the right.",
      "Added lines are highlighted in green, removed lines in red.",
      "The stats bar shows a quick summary of changes.",
      "Works with any text - code, JSON, configs, prose.",
    ],
    content: {
      intro:
        "Diff Checker is a browser-based tool for comparing two text blocks and highlighting line-by-line differences. Use it for source code, JSON, SQL, Markdown, configuration files, logs, or any plain text where you need to see what changed. Comparison happens locally in your browser, so your text is not uploaded to a server.",
      useCases: [
        "Compare original and modified code snippets",
        "Review changes in JSON, SQL, Markdown, or config files",
        "Find added and removed lines in pasted text",
        "Check whether two text blocks are identical",
      ],
      faq: [
        {
          question: "Does this tool compare files or pasted text?",
          answer:
            "It compares pasted text blocks. You can paste file contents into both panels to inspect differences.",
        },
        {
          question: "Can I compare source code with this diff checker?",
          answer:
            "Yes. It works with any plain text, including source code, JSON, SQL, Markdown, logs, and config files.",
        },
        {
          question: "How are changes shown in the diff output?",
          answer:
            "Added lines, removed lines, and unchanged lines are displayed separately so you can review changes with context.",
        },
        {
          question: "Is text comparison done locally in the browser?",
          answer:
            "Yes. The comparison runs locally in your browser and does not upload your text to a server.",
        },
      ],
      relatedTools: ["/json", "/markdown", "/html-preview", "/sql-formatter"],
    },
  },
  {
    name: "Color Converter",
    path: "/color-converter",
    component: ColorConverter,
    description:
      "Convert colors between HEX, RGB, and HSL and copy CSS-ready values.",
    tags: ["code", "color", "convert", "frontend", "css"],
    icon: <Palette size={40} strokeWidth={1.5} />,
    seoTitle: "Color Converter - HEX, RGB, HSL - TransformJS",
    seoDesc:
      "Convert colors between HEX, RGB, and HSL, adjust channels visually, and copy CSS-ready color values in your browser.",
    tips: [
      "Type a HEX value to auto convert to RGB and HSL.",
      "Edit any RGB or HSL channel - all formats update live.",
      "Click any output card or Copy button to copy the CSS string.",
      "The swatch at the top gives you a live preview of the color.",
    ],
    content: {
      intro:
        "Color Converter is a browser-based tool for converting colors between HEX, RGB, and HSL formats. Use it to inspect color values, adjust channels visually, copy CSS-ready strings, and move between common frontend color formats. Everything runs locally in your browser for fast, private workflow support.",
      useCases: [
        "Convert HEX colors to RGB and HSL for frontend work",
        "Adjust color values visually with live updates",
        "Copy CSS-ready color strings into stylesheets or components",
        "Translate design colors into developer-friendly web formats",
      ],
      faq: [
        {
          question: "Which color formats are supported?",
          answer:
            "The tool supports HEX, RGB, and HSL conversion with live updates between all supported formats.",
        },
        {
          question: "Can I type a HEX value manually?",
          answer:
            "Yes. You can enter a HEX value manually and the RGB and HSL values update automatically when the HEX is valid.",
        },
        {
          question: "Can I use these values directly in CSS?",
          answer:
            "Yes. The generated values are formatted so they can be copied directly into CSS and frontend code.",
        },
        {
          question: "Is color conversion done locally in the browser?",
          answer:
            "Yes. Color conversion and visual updates happen locally in your browser.",
        },
      ],
      relatedTools: ["/html-preview", "/markdown", "/case-converter"],
    },
  },
];