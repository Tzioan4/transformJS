import {
  FileJson,
  Hash,
  Image as ImageIcon,
  Layout,
  FileText,
  Link,
  Lock,
} from "lucide-react";

// code tools
import HtmlPreview from "./code/HtmlPreview";
import MarkdownPreview from "./code/MarkdownPreview";

// data tools
import JsonFormatter from "./data/JsonFormatter";

// media tools
import ImageResizer from "./media/ImageResizer";

// security tools
import Base64Tool from "./security/Base64Tool";
import UrlEncoderDecoder from "./security/UrlEncoderDecoder";
import JwtDebugger from "./security/JwtDebugger";

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description: "Format and validate json",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    component: Base64Tool,
    description: "Encode and decode base64",
    tags: ["base64", "encode", "decode"],
    icon: <Hash size={40} strokeWidth={1.5} />,
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description: "Encode and decode urls safely",
    tags: ["url", "encode", "decode", "web"],
    icon: <Link size={40} strokeWidth={1.5} />,
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description: "Write HTML/CSS and see live preview",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description: "Convert markdown into HTML preview",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
  },
  {
    name: "Image Resizer",
    path: "/image-resize",
    component: ImageResizer,
    description: "Resize images easily",
    tags: ["image", "resize", "photo"],
    icon: <ImageIcon size={40} strokeWidth={1.5} />,
  },
  {
    name: "JWT Debugger",
    path: "/jwt",
    component: JwtDebugger,
    description: "Decode and verify JWT tokens",
    tags: ["jwt", "auth", "security", "decode"],
    icon: <Lock size={40} strokeWidth={1.5} />,
  },
];
