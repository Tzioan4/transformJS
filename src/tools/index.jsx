import {
  FileJson,
  Hash,
  Image as ImageIcon,
  Layout,
  FileText,
  Link,
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

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    component: JsonFormatter,
    description: "format and validate json",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    component: Base64Tool,
    description: "encode and decode base64",
    tags: ["base64", "encode", "decode"],
    icon: <Hash size={40} strokeWidth={1.5} />,
  },
  {
    name: "URL Encoder / Decoder",
    path: "/url-encode",
    component: UrlEncoderDecoder,
    description: "encode and decode urls safely",
    tags: ["url", "encode", "decode", "web"],
    icon: <Link size={40} strokeWidth={1.5} />,
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    component: HtmlPreview,
    description: "write html/css and see live preview",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    component: MarkdownPreview,
    description: "convert markdown into html preview",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
  },
  {
    name: "Image Resizer",
    path: "/image-resize",
    component: ImageResizer,
    description: "resize images easily",
    tags: ["image", "resize", "photo"],
    icon: <ImageIcon size={40} strokeWidth={1.5} />,
  },
];
