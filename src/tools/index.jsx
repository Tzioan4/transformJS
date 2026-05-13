import {
  FileJson,
  Hash,
  Layout,
  FileText,
  Link,
  Lock,
  FileCode,
  Database,
  Terminal,
} from "lucide-react";

// code tools
import HtmlPreview from "./code/HtmlPreview";
import MarkdownPreview from "./code/MarkdownPreview";

// data tools
import JsonFormatter from "./data/JsonFormatter";
import YamlToJson from "./data/YamlToJson"; 
import SqlFormatter from "./data/SqlFormatter";

// security tools
import Base64Tool from "./security/Base64Tool";
import UrlEncoderDecoder from "./security/UrlEncoderDecoder";
import JwtDebugger from "./security/JwtDebugger";

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description:
      "Prettify, minify, and validate JSON structures with syntax highlighting.",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    component: Base64Tool,
    description:
      "Bi-directional Base64 conversion for text and binary data strings.",
    tags: ["base64", "encode", "decode"],
    icon: <Hash size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description: "RFC 3986 compliant encoding and decoding for URL components.",
    tags: ["url", "encode", "decode", "web"],
    icon: <Link size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description: "Real-time sandboxed rendering for HTML and CSS snippets.",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description:
      "GitHub Flavored Markdown rendering with live HTML transpilation.",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "JWT Debugger",
    path: "/jwt",
    component: JwtDebugger,
    description:
      "Decode JWT headers and payloads with instant signature verification.",
    tags: ["jwt", "auth", "security", "decode"],
    icon: <Lock size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "YAML to JSON",
    path: "/yaml-to-json",
    component: YamlToJson,
    description:
      "Convert YAML configurations to clean, formatted JSON structures.",
    tags: ["yaml", "json", "convert", "data"],
    icon: <FileCode size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
  {
    name: "SQL Formatter",
    path: "/sql-formatter",
    component: SqlFormatter,
    description: "Format and prettify SQL queries for better readability.",
    tags: ["sql", "database", "format", "query"],
    icon: <Database size={40} strokeWidth={1.5} color="#F7DF1E" />,
  },
];

