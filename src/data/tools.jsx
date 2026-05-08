import {
  FileJson,
  Hash,
  Image as ImageIcon,
  Layout,
  FileText,
} from "lucide-react";

export const tools = [
  {
    name: "JSON Formatter",
    path: "/json",
    description: "Format and validate JSON",
    tags: ["json", "formatter", "data"],
    icon: <FileJson size={40} strokeWidth={1.5} />,
  },
  {
    name: "Base64 Encoder",
    path: "/base64",
    description: "Encode and decode Base64",
    tags: ["base64", "encode", "decode"],
    icon: <Hash size={40} strokeWidth={1.5} />,
  },
  {
    name: "Image Resizer",
    path: "/image-resize",
    description: "Resize images easily",
    tags: ["image", "resize", "photo"],
    icon: <ImageIcon size={40} strokeWidth={1.5} />,
  },
  {
    name: "HTML Preview",
    path: "/html-preview",
    description: "Write HTML/CSS and see live preview",
    tags: ["html", "css", "preview", "frontend"],
    icon: <Layout size={40} strokeWidth={1.5} />,
  },
  {
    name: "Markdown Preview",
    path: "/markdown",
    description: "Convert Markdown into HTML preview",
    tags: ["markdown", "md", "preview", "text"],
    icon: <FileText size={40} strokeWidth={1.5} />,
  },
];
