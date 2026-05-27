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
    content: {
      intro:
        "Format, validate, beautify, and minify JSON directly in your browser. Use it to inspect API responses, clean configuration files, debug structured data, and make complex JSON easier to read without sending anything to a server.",
      useCases: [
        "Format messy JSON into readable indentation",
        "Minify JSON before storing, sharing, or embedding it",
        "Validate JSON copied from APIs, logs, or config files",
        "Find duplicate keys and common JSON syntax issues",
      ],
      faq: [
        {
          question: "Is my JSON uploaded to a server?",
          answer:
            "No. TransformJS processes JSON locally in your browser, so your data stays on your machine.",
        },
        {
          question: "Can this tool detect invalid JSON?",
          answer:
            "Yes. The formatter shows an error when the input cannot be parsed as valid JSON.",
        },
        {
          question: "What is the difference between beautify and minify?",
          answer:
            "Beautify adds indentation and line breaks for readability. Minify removes unnecessary whitespace to make the JSON smaller.",
        },
        {
          question: "Can this help with API debugging?",
          answer:
            "Yes. It is useful for inspecting API responses, request payloads, and structured logs during development.",
        },
      ],
      relatedTools: ["/yaml-to-json", "/csv-to-json", "/jwt", "/diff-checker"],
    },
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
    content: {
      intro:
        "Encode plain text to Base64 or decode Base64 strings back to readable text directly in your browser. This tool is useful for working with API payloads, tokens, encoded configuration values, and debugging data that has been transferred as text.",
      useCases: [
        "Encode text into Base64 for transport or testing",
        "Decode Base64 strings from tokens, APIs, or logs",
        "Inspect encoded payloads during debugging",
        "Convert small text snippets without command-line tools",
      ],
      faq: [
        {
          question: "Is Base64 encryption?",
          answer:
            "No. Base64 is an encoding format, not encryption. Anyone can decode it back to the original text.",
        },
        {
          question: "Why does Base64 sometimes end with equals signs?",
          answer:
            "Equals signs are padding characters used to make the encoded output align correctly in Base64 blocks.",
        },
        {
          question: "Can I decode JWT parts with this tool?",
          answer:
            "Yes, JWT headers and payloads are Base64URL encoded. For full token inspection, use the JWT Debugger instead.",
        },
      ],
      relatedTools: ["/jwt", "/url-encode", "/hash-generator", "/json"],
    },
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
    content: {
      intro:
        "Encode and decode URL components safely for query strings, API parameters, redirects, and browser links. The tool helps convert special characters into URL-safe sequences and decode encoded URLs back into readable text.",
      useCases: [
        "Encode query parameters before adding them to a URL",
        "Decode copied URLs with percent-encoded characters",
        "Debug API endpoints and redirect URLs",
        "Prepare safe URL components for frontend or backend tests",
      ],
      faq: [
        {
          question: "What is URL encoding used for?",
          answer:
            "URL encoding converts reserved or unsafe characters into percent-encoded sequences so they can be safely used inside URLs.",
        },
        {
          question: "Why are spaces converted to %20?",
          answer:
            "Spaces are not safe inside URLs, so they are encoded as %20 or sometimes plus signs depending on the context.",
        },
        {
          question: "Should I encode a full URL or only parts of it?",
          answer:
            "Usually you encode individual parts, such as query parameter values, instead of encoding the full URL at once.",
        },
      ],
      relatedTools: ["/url-parser", "/base64", "/regex", "/json"],
    },
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
    content: {
      intro:
        "Preview HTML and CSS snippets instantly in a sandboxed browser frame. Use it to test small layouts, email template fragments, static markup, and frontend experiments without creating a full project setup.",
      useCases: [
        "Test small HTML and CSS snippets quickly",
        "Preview static email template fragments",
        "Prototype simple UI blocks before moving them into a project",
        "Check how markup renders in an isolated preview",
      ],
      faq: [
        {
          question: "Is the HTML preview sandboxed?",
          answer:
            "Yes. The preview runs inside a sandboxed iframe to keep snippets isolated from the main app.",
        },
        {
          question: "Can I run JavaScript in the preview?",
          answer:
            "No. Script execution is disabled for safety. The tool is intended for HTML and CSS previewing.",
        },
        {
          question: "Can I use this for full websites?",
          answer:
            "It is best for small snippets and quick previews, not complete multi-file websites.",
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
    content: {
      intro:
        "Write Markdown and preview the rendered HTML output instantly in your browser. This tool is useful for README files, documentation drafts, notes, changelog entries, and any workflow where Markdown needs to be checked before publishing.",
      useCases: [
        "Preview README content before pushing to GitHub",
        "Check Markdown tables, lists, links, and code blocks",
        "Draft documentation or changelog sections",
        "Convert Markdown into a rendered HTML preview",
      ],
      faq: [
        {
          question: "Does this support GitHub-style Markdown?",
          answer:
            "Yes. It supports common Markdown features used in developer documentation, including links, lists, tables, and code blocks.",
        },
        {
          question: "Are Markdown links safe in the preview?",
          answer:
            "Links are sanitized and opened in a new tab with safe attributes where applicable.",
        },
        {
          question: "Can I copy the generated HTML?",
          answer:
            "The preview renders Markdown as HTML. If you need source extraction, this can be expanded later with a dedicated HTML output mode.",
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
    content: {
      intro:
        "Decode and inspect JSON Web Tokens locally in your browser. Use the JWT Debugger to view token headers, payload claims, expiration data, and HMAC signature status while debugging authentication and authorization flows.",
      useCases: [
        "Inspect JWT header and payload claims",
        "Check token expiration and issued-at timestamps",
        "Debug API authentication issues",
        "Verify HMAC JWT signatures with a secret key",
      ],
      faq: [
        {
          question: "Is JWT decoding secure?",
          answer:
            "Decoding is done locally in your browser. The token is not uploaded to a server.",
        },
        {
          question:
            "What is the difference between decoding and verifying a JWT?",
          answer:
            "Decoding only reads the token contents. Verification checks whether the signature matches the provided secret.",
        },
        {
          question: "Which JWT algorithms are supported?",
          answer:
            "The tool supports local HMAC verification for HS256, HS384, and HS512 tokens.",
        },
        {
          question: "Can a decoded JWT be trusted without verification?",
          answer:
            "No. JWT payloads are readable by design. Trust the token only after verifying its signature and claims.",
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
    content: {
      intro:
        "Convert YAML configuration files and structured data into formatted JSON directly in your browser. This is useful when working with Docker, Kubernetes, CI config files, static site settings, or tools that require JSON instead of YAML.",
      useCases: [
        "Convert YAML configs into JSON objects",
        "Inspect Docker, Kubernetes, or CI configuration data",
        "Debug YAML indentation or syntax problems",
        "Move structured data between YAML-based and JSON-based tools",
      ],
      faq: [
        {
          question: "Is YAML converted locally?",
          answer:
            "Yes. The conversion runs in your browser and the input is not sent to a server.",
        },
        {
          question: "Why does YAML indentation matter?",
          answer:
            "YAML uses indentation to define structure, so incorrect spacing can change the parsed result or cause errors.",
        },
        {
          question: "Can this convert large YAML files?",
          answer:
            "It is designed for typical developer configs and includes safety limits to avoid expensive YAML expansion.",
        },
      ],
      relatedTools: ["/json", "/csv-to-json", "/diff-checker", "/markdown"],
    },
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
    content: {
      intro:
        "Format and clean up SQL queries for better readability. Use this SQL formatter to inspect SELECT statements, JOINs, nested queries, generated SQL, and database snippets before sharing, reviewing, or debugging them.",
      useCases: [
        "Beautify compressed or generated SQL queries",
        "Make SELECT, JOIN, INSERT, UPDATE, and DELETE statements easier to read",
        "Review database queries before sharing them with a team",
        "Spot destructive SQL operations more clearly",
      ],
      faq: [
        {
          question: "Does this execute SQL queries?",
          answer:
            "No. It only formats SQL text. It does not connect to a database or run any query.",
        },
        {
          question: "Can this format generated SQL?",
          answer:
            "Yes. It is useful for cleaning up SQL copied from ORMs, logs, database consoles, or debugging output.",
        },
        {
          question: "Why does the tool warn about destructive queries?",
          answer:
            "Statements like DROP, DELETE, TRUNCATE, and ALTER can change or remove data, so the warning helps you review them carefully.",
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
    content: {
      intro:
        "Generate hashes for text using common algorithms such as MD5, SHA-1, SHA-256, and SHA-512. This tool helps compare values, create checksums, inspect fingerprints, and test hashing behavior locally in the browser.",
      useCases: [
        "Generate SHA-256 or SHA-512 hashes for text",
        "Compare checksums during debugging",
        "Create quick fingerprints for small snippets",
        "Test how different hash algorithms output values",
      ],
      faq: [
        {
          question: "Are hashes the same as encryption?",
          answer:
            "No. Hashing is one-way. You can generate a hash from input, but you cannot safely reverse a hash back to the original value.",
        },
        {
          question: "Should I use MD5 or SHA-1 for security?",
          answer:
            "No. MD5 and SHA-1 are considered broken for security use. Prefer SHA-256 or SHA-512 when security matters.",
        },
        {
          question: "Is hashing done locally?",
          answer:
            "Yes. Hash generation runs in your browser using local code and browser APIs.",
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
    description: "Generate secure, random passwords with custom requirements.",
    tags: ["security", "password", "secure"],
    icon: <Lock size={40} strokeWidth={1.5} />,
    seoTitle: "Secure Password Generator - TransformJS",
    seoDesc:
      "Generate strong, randomized, and highly secure passwords with custom lengths and criteria locally.",
    tips: [
      "Adjust the slider to set the password length (12-64 characters).",
      "Toggle uppercase, lowercase, numbers and symbols as needed.",
      "Uses crypto.getRandomValues(), cryptographically secure.",
      "The entropy (bits) shown indicates how strong the password is.",
    ],
    content: {
      intro:
        "Generate strong random passwords locally in your browser with customizable length and character options. The tool uses browser cryptographic randomness where available and helps create safer credentials for accounts, testing, and development workflows.",
      useCases: [
        "Generate strong passwords for new accounts",
        "Create random credentials for development environments",
        "Customize password length and character sets",
        "Estimate password strength with entropy feedback",
      ],
      faq: [
        {
          question: "Are generated passwords stored anywhere?",
          answer:
            "No. Passwords are generated locally in your browser and are not saved or uploaded by TransformJS.",
        },
        {
          question: "What makes a password strong?",
          answer:
            "Longer passwords with enough randomness are stronger. Length usually matters more than complicated but short patterns.",
        },
        {
          question: "Can I use this for production credentials?",
          answer:
            "You can generate strong passwords with it, but you should still store them in a trusted password manager.",
        },
      ],
      relatedTools: ["/hash-generator", "/jwt", "/base64", "/uuid-generator"],
    },
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
    content: {
      intro:
        "Convert CSV rows and spreadsheet-style data into structured JSON arrays and objects. This tool helps developers transform exported data, quick datasets, and comma-separated values into a format that works better with APIs and JavaScript.",
      useCases: [
        "Convert CSV exports into JSON arrays",
        "Transform spreadsheet data for API testing",
        "Parse quoted fields, commas inside values, and multiline cells",
        "Prepare tabular data for frontend or backend development",
      ],
      faq: [
        {
          question: "Does the first CSV row become JSON keys?",
          answer:
            "Yes. The first row is treated as the header row and is used as the object keys in the JSON output.",
        },
        {
          question: "Can this handle commas inside quoted values?",
          answer:
            "Yes. The parser is designed to handle common CSV cases such as quoted fields and commas inside values.",
        },
        {
          question: "What happens to empty CSV fields?",
          answer:
            "Empty fields are converted to null so the JSON output keeps a clear structure.",
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
    content: {
      intro:
        "Test JavaScript regular expressions with live match highlighting, flags, indexes, and capture group inspection. Use it to debug validation patterns, text extraction logic, search rules, and parsing workflows safely in the browser.",
      useCases: [
        "Test regex patterns against sample text",
        "Debug capture groups and match indexes",
        "Validate patterns for emails, URLs, IDs, or logs",
        "Check JavaScript regex flags like g, i, and m",
      ],
      faq: [
        {
          question: "Which regex engine does this use?",
          answer:
            "It uses the JavaScript regular expression engine available in the browser.",
        },
        {
          question: "Can this show capture groups?",
          answer:
            "Yes. Capture groups are displayed separately for each match when the pattern includes groups.",
        },
        {
          question: "Does it protect against slow regex patterns?",
          answer:
            "Yes. Regex execution is handled with timeout protection to reduce the risk of freezing the main UI.",
        },
      ],
      relatedTools: ["/json", "/url-parser", "/markdown", "/diff-checker"],
    },
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
    content: {
      intro:
        "Preview Apache FreeMarker FTL templates with mock JSON data directly in your browser. This tool helps test template logic, rendered HTML, variables, conditions, and list output without needing a backend rendering environment.",
      useCases: [
        "Render FTL templates with mock JSON data",
        "Debug missing variables and conditional output",
        "Preview generated HTML before integrating templates",
        "Test simple #assign, #if, #else, and #list logic locally",
      ],
      faq: [
        {
          question: "Does this use a real FreeMarker server?",
          answer:
            "No. It is a local previewer with custom mock rendering for common FTL patterns.",
        },
        {
          question: "Can I test templates with JSON data?",
          answer:
            "Yes. Paste mock JSON data and render the template against that local data context.",
        },
        {
          question: "Is every FreeMarker feature supported?",
          answer:
            "No. The previewer supports a practical subset for local template testing, not the full FreeMarker engine.",
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
    content: {
      intro:
        "Convert words, labels, and identifiers between common string case formats such as camelCase, PascalCase, snake_case, kebab-case, title case, and uppercase. Use it when renaming variables, routes, filenames, constants, or UI labels.",
      useCases: [
        "Convert variable names between camelCase and snake_case",
        "Generate kebab-case strings for URLs or filenames",
        "Create SCREAMING_SNAKE constants",
        "Normalize copied labels into developer-friendly identifiers",
      ],
      faq: [
        {
          question: "Can this convert existing camelCase text?",
          answer:
            "Yes. The tool detects common case boundaries and converts the input into multiple output formats.",
        },
        {
          question: "Does it remove special characters?",
          answer:
            "Yes. Special symbols are stripped so the output is cleaner for identifiers and filenames.",
        },
        {
          question: "Can I copy only one case format?",
          answer:
            "Yes. Each output card has its own copy button for copying a single format.",
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
    content: {
      intro:
        "Generate cryptographically secure UUID v4 identifiers directly in your browser. Use this tool to create unique IDs for databases, fixtures, logs, test data, mock APIs, and development workflows that need random identifiers.",
      useCases: [
        "Generate one or many UUID v4 identifiers",
        "Create IDs for mock data and test fixtures",
        "Copy unique identifiers for database records",
        "Produce random GUID-style values without a backend",
      ],
      faq: [
        {
          question: "What version of UUID does this generate?",
          answer:
            "It generates UUID v4 values, which are random UUIDs commonly used for unique identifiers.",
        },
        {
          question: "Are generated UUIDs guaranteed to be unique?",
          answer:
            "UUID v4 values are random with an extremely low collision probability, but no random ID system can promise absolute uniqueness.",
        },
        {
          question: "Can I generate UUIDs in bulk?",
          answer:
            "Yes. You can generate multiple UUIDs at once and copy individual values or the full list.",
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
      "Port shows only if explicitly defined in the URL (e.g. :8080).",
    ],
    content: {
      intro:
        "Parse and break down URLs into protocol, hostname, port, path, query parameters, and hash fragments. This tool is useful for debugging links, API endpoints, redirects, tracking parameters, and encoded query strings.",
      useCases: [
        "Inspect query parameters from long URLs",
        "Debug API endpoints and redirect links",
        "Separate protocol, host, path, port, and hash values",
        "Copy individual query parameter values quickly",
      ],
      faq: [
        {
          question: "Does the URL need http:// or https://?",
          answer:
            "A full URL with a protocol works best because the browser URL parser can identify all parts correctly.",
        },
        {
          question: "Can this decode query parameters?",
          answer:
            "It separates query parameters into key-value rows. For manual percent-encoding or decoding, use the URL Encoder / Decoder.",
        },
        {
          question: "Why is the port sometimes empty?",
          answer:
            "The port is shown only when it is explicitly present in the URL, such as :8080.",
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
    content: {
      intro:
        "Compare two text blocks and highlight line-by-line differences. Use this diff checker for source code, JSON, SQL, Markdown, configuration files, logs, or any text where you need to see what changed.",
      useCases: [
        "Compare original and modified code snippets",
        "Review changes in JSON, SQL, Markdown, or config files",
        "Find added and removed lines in copied text",
        "Check whether two text blocks are identical",
      ],
      faq: [
        {
          question: "Does this compare files or text?",
          answer:
            "It compares pasted text blocks. You can paste file contents into both panels to inspect differences.",
        },
        {
          question: "Can I compare code with this tool?",
          answer:
            "Yes. It works with any plain text, including code, JSON, SQL, Markdown, and logs.",
        },
        {
          question: "How are changes shown?",
          answer:
            "Added lines are marked separately from removed lines, and unchanged lines remain visible for context.",
        },
      ],
      relatedTools: ["/json", "/markdown", "/html-preview", "/sql-formatter"],
    },
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
    content: {
      intro:
        "Pick and convert colors between HEX, RGB, and HSL formats for CSS and frontend development. Use it to inspect color values, adjust channels visually, copy CSS-ready color strings, and move between common web color formats.",
      useCases: [
        "Convert HEX colors to RGB and HSL",
        "Adjust color values with a visual picker",
        "Copy CSS-ready color strings",
        "Translate design colors into frontend-friendly formats",
      ],
      faq: [
        {
          question: "Which color formats are supported?",
          answer:
            "The tool supports HEX, RGB, and HSL conversion with live updates between formats.",
        },
        {
          question: "Can I type a HEX value manually?",
          answer:
            "Yes. You can enter a HEX value and the RGB and HSL values update automatically when the HEX is valid.",
        },
        {
          question: "Is this useful for CSS?",
          answer:
            "Yes. The output values are formatted so they can be copied directly into CSS.",
        },
      ],
      relatedTools: ["/html-preview", "/markdown", "/case-converter"],
    },
  },
];
