import { lazy } from "react";

export const toolComponents = {
  HtmlPreview: lazy(() => import("./code/HtmlPreview")),
  MarkdownPreview: lazy(() => import("./code/MarkdownPreview")),
  RegexTester: lazy(() => import("./code/RegExTester")),
  FtlPreviewer: lazy(() => import("./code/FtlPreviewer")),
  CaseConverter: lazy(() => import("./code/CaseConverter")),
  DiffChecker: lazy(() => import("./code/DiffChecker")),
  ColorConverter: lazy(() => import("./code/ColorConverter")),
  JsonFormatter: lazy(() => import("./data/JsonFormatter")),
  YamlToJson: lazy(() => import("./data/YamlToJson")),
  SqlFormatter: lazy(() => import("./data/SqlFormatter")),
  CsvToJson: lazy(() => import("./data/CsvToJson")),
  Base64Tool: lazy(() => import("./security/Base64Tool")),
  UrlEncoderDecoder: lazy(() => import("./security/UrlEncoderDecoder")),
  JwtDebugger: lazy(() => import("./security/JwtDebugger")),
  HashGenerator: lazy(() => import("./security/HashGenerator")),
  PasswordGenerator: lazy(() => import("./security/PasswordGenerator")),
  UuidGenerator: lazy(() => import("./text/UuidGenerator")),
  UrlParser: lazy(() => import("./text/UrlParser")),
};
