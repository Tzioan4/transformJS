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
} from "lucide-react";

// code tools
import HtmlPreview from "./code/HtmlPreview";
import MarkdownPreview from "./code/MarkdownPreview";
import RegexTester from "./code/RegExTester";
import FtlPreviewer from "./code/FtlPreviewer";

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

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description:
      "Prettify, minify, and validate JSON structures with syntax highlighting.",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    component: Base64Tool,
    description:
      "Bi-directional Base64 conversion for text and binary data strings.",
    tags: ["base64", "encode", "decode"],
    icon: <FileCode size={40} strokeWidth={1.5} />,
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description: "RFC 3986 compliant encoding and decoding for URL components.",
    tags: ["url", "encode", "decode", "web"],
    icon: <Link size={40} strokeWidth={1.5} />,
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description: "Real-time sandboxed rendering for HTML and CSS snippets.",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description:
      "GitHub Flavored Markdown rendering with live HTML transpilation.",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
  },
  {
    name: "JWT Debugger",
    path: "/jwt",
    component: JwtDebugger,
    description:
      "Decode JWT headers and payloads with instant signature verification.",
    tags: ["jwt", "auth", "security", "decode"],
    icon: <EarthLock size={40} strokeWidth={1.5} />,
  },
  {
    name: "YAML to JSON",
    path: "/yaml-to-json",
    component: YamlToJson,
    description:
      "Convert YAML configurations to clean, formatted JSON structures.",
    tags: ["yaml", "json", "convert", "data"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
  },
  {
    name: "SQL Formatter",
    path: "/sql-formatter",
    component: SqlFormatter,
    description: "Format and prettify SQL queries for better readability.",
    tags: ["sql", "database", "format", "query"],
    icon: <Database size={40} strokeWidth={1.5} />,
  },
  {
    name: "Hash Generator",
    path: "/hash-generator",
    component: HashGenerator,
    description:
      "Generate secure MD5, SHA-1, SHA-256 and SHA-512 hashes for any input.",
    tags: ["hash", "security", "md5", "sha256"],
    icon: <Hash size={40} strokeWidth={1.5} />,
  },
  {
    name: "Password Generator",
    path: "/password-generator",
    component: PasswordGenerator,
    description: "Generate secure, random passwords with custom requirements.",
    tags: ["password", "security", "secure"],
    icon: <Lock size={40} strokeWidth={1.5} />,
  },
  {
    name: "CSV To JSON",
    path: "/csv-to-json",
    component: CsvToJson,
    description:
      "Convert complex CSV data to clean JSON with full RFC 4180 compliance.",
    tags: ["csv", "json", "convert"],
    icon: <FileText size={40} strokeWidth={1.5} />,
  },
  {
    name: "RegEx Tester",
    path: "/regex",
    component: RegexTester,
    description:
      "Test regular expressions with real-time match highlighting and flag support.",
    tags: ["regex", "pattern", "test", "code"],
    icon: <Terminal size={40} strokeWidth={1.5} />,
  },
  {
    name: "FTL Previewer",
    path: "/ftl-previewer",
    component: FtlPreviewer,
    description: "Preview FreeMarker templates with mock JSON data.",
    tags: ["ftl", "freemarker", "template", "preview", "render"],
    icon: <FileCode size={40} />,
  },
];
