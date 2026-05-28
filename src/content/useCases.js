export const useCases = [
  {
    slug: "json-debugging",
    title: "JSON Debugging Tools",
    seoTitle: "JSON Debugging Tools - TransformJS",
    seoDesc:
      "Use TransformJS to format, validate, compare, and convert JSON-related data locally in your browser.",
    description:
      "Use TransformJS to debug JSON payloads, API responses, configuration files, and structured data directly in your browser.",
    intro:
      "JSON debugging often requires more than formatting. TransformJS gives you nearby tools for validating JSON, converting YAML or CSV into JSON, and comparing payload changes.",
    tools: ["/json", "/yaml-to-json", "/csv-to-json", "/diff-checker"],
    links: [
      { label: "JSON tools", to: "/groups/json-tools" },
      {
        label: "JSON formatter alternative",
        to: "/alternatives/jsonformatter",
      },
    ],
  },
  {
    slug: "frontend-development",
    title: "Frontend Development Tools",
    seoTitle: "Frontend Development Tools - TransformJS",
    seoDesc:
      "Browser-based frontend developer tools for HTML preview, Markdown preview, color conversion, URL parsing, and text transformation.",
    description:
      "Useful browser-based tools for frontend developers working with HTML, Markdown, colors, URLs, and text formats.",
    intro:
      "Frontend work often involves small formatting, previewing, and conversion tasks. TransformJS keeps these utilities available in one fast browser-based toolkit.",
    tools: [
      "/html-preview",
      "/markdown-preview",
      "/color-converter",
      "/url-parser",
    ],
    links: [
      { label: "Preview tools", to: "/groups/preview-tools" },
      { label: "Text tools", to: "/groups/text-tools" },
    ],
  },
  {
    slug: "api-testing",
    title: "API Testing Tools",
    seoTitle: "API Testing Tools - TransformJS",
    seoDesc:
      "Use TransformJS for browser-based API testing workflows including JSON formatting, JWT debugging, URL parsing, Base64 decoding, and diff checking.",
    description:
      "A focused set of browser-based tools for inspecting API responses, decoding tokens, parsing URLs, and comparing payloads.",
    intro:
      "API testing often creates small debugging tasks: reading JSON responses, inspecting JWT tokens, decoding Base64 values, checking URL parts, and comparing response changes.",
    tools: [
      "/json",
      "/jwt-debugger",
      "/base64",
      "/url-parser",
      "/diff-checker",
    ],
    links: [
      { label: "JSON tools", to: "/groups/json-tools" },
      { label: "Encoding tools", to: "/groups/encoding-tools" },
      { label: "DevToys alternative", to: "/alternatives/devtoys" },
    ],
  },
  {
    slug: "data-formatting",
    title: "Data Formatting Tools",
    seoTitle: "Data Formatting Tools - TransformJS",
    seoDesc:
      "Format, convert, and clean common developer data formats with TransformJS browser-based tools.",
    description:
      "Browser-based tools for formatting JSON, converting YAML and CSV, formatting SQL, and comparing structured text.",
    intro:
      "Data formatting work often moves between JSON, YAML, CSV, SQL, and text diffs. TransformJS gives you practical browser tools for these everyday transformations.",
    tools: [
      "/json",
      "/yaml-to-json",
      "/csv-to-json",
      "/sql-formatter",
      "/diff-checker",
    ],
    links: [
      { label: "JSON tools", to: "/groups/json-tools" },
      {
        label: "Online JSON formatter alternative",
        to: "/alternatives/jsonformatter",
      },
    ],
  },
];
