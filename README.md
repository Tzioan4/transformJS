<div align="center">
  <img src="./public/favicon.svg" alt="TransformJS logo" width="180" />

  <h1>TransformJS</h1>

  <p>
    Fast, privacy-first developer tools for everyday browser workflows.
  </p>

  <p>
    <a href="https://transformjs.com/"><strong>Live Demo</strong></a>
    ·
    <a href="./CHANGELOG.md">Changelog</a>
    ·
    <a href="./docs/SPRINTS.md">Development Sprints</a>
  </p>
</div>

<div align="center">

[![PageSpeed Mobile](https://img.shields.io/badge/PageSpeed_Mobile-97-brightgreen)](https://pagespeed.web.dev/analysis?url=https://transformjs.com/)
[![PageSpeed Desktop](https://img.shields.io/badge/PageSpeed_Desktop-100-brightgreen)](https://pagespeed.web.dev/analysis?url=https://transformjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built_with-React_19-61dafb)](https://react.dev/)
[![Powered by Vite](https://img.shields.io/badge/Powered_by-Vite_8-646cff)](https://vite.dev/)

</div>

---

## Overview

TransformJS is a browser-based developer toolkit for formatting, converting, debugging, previewing and parsing common developer data.

The project is designed around a simple rule: **your input stays on your device**. Tool processing runs locally in the browser, without accounts, tracking or server-side uploads.

## Core Principles

- **Privacy first** — no accounts, analytics, tracking or backend processing
- **Fast by default** — lightweight UI, self-hosted fonts and route-based lazy loading
- **Focused workflows** — small, practical tools without unnecessary complexity
- **Browser-native architecture** — Web APIs and Web Workers where they provide real value
- **Scalable structure** — centralized tool registry and reusable UI patterns

---

## Features

- 18 developer tools in one interface
- Smart input detection from pasted text or dropped files
- Global tool switcher with search
- Local file loading and drag-and-drop support
- Local browser downloads for supported tools
- Dark and light themes
- Keyboard shortcuts for common actions
- Mobile-friendly layouts
- Sandboxed preview tools
- Worker-based processing for heavier operations
- Vitest coverage for utility and tool-level logic

---

## Available Tools

| Category | Tool | Description |
| --- | --- | --- |
| Data | JSON Formatter | Format, minify and validate JSON |
| Data | CSV to JSON | Parse CSV data into JSON |
| Data | YAML to JSON | Convert YAML into JSON with safety checks |
| Data | SQL Formatter | Format SQL queries and warn about destructive statements |
| Security | Base64 Tool | Encode and decode Base64 values |
| Security | URL Encoder / Decoder | Encode and decode URL components |
| Security | JWT Debugger | Decode JWT data and verify HMAC signatures |
| Security | Hash Generator | Generate SHA hashes with the Web Crypto API |
| Security | Password Generator | Create secure passwords with entropy feedback |
| Code | HTML Preview | Render HTML safely inside a sandboxed iframe |
| Code | Markdown Preview | Convert Markdown into a sanitized browser preview |
| Code | RegEx Tester | Test patterns with capture groups and worker-based execution |
| Code | FTL Previewer | Preview FreeMarker-style templates with mock JSON data |
| Code | Case Converter | Convert text between common naming conventions |
| Code | Diff Checker | Compare text line by line |
| Code | Color Converter | Convert HEX, RGB and HSL values with a live picker |
| Text | UUID Generator | Generate UUID v4 values |
| Text | URL Parser | Break URLs into protocol, host, port, path and parameters |

---

## Architecture

TransformJS uses a modular tool-based architecture.

### Registry-driven setup

Tool metadata is centralized in:

```text
src/tools/registry.js
```

Component references and icons are split into:

```text
src/tools/toolComponents.jsx
src/tools/toolIcons.jsx
```

The registry feeds:

```text
tool registry
→ tool routes
→ app routes
→ sitemap generation
→ llms.txt generation
```

This keeps tool registration, routing, metadata and discoverability assets in sync.

### Shared UI

Common UI patterns are reused across the app:

```text
src/layouts/ToolLayout.jsx
src/components/ToolInfo.jsx
src/components/ToolSwitcher.jsx
src/components/SmartDetector.jsx
src/hooks/useCopy.js
src/hooks/useKeyboardShortcuts.js
```

### Styling

The project uses custom CSS only.

```text
src/index.css                  # design tokens
src/styles/components/         # shared component styles
src/styles/pages/              # page styles
src/styles/tools/              # shared and tool-specific styles
```

No Tailwind, styled-components or UI framework is used.

### Browser-only processing

Sensitive and heavy operations remain client-side:

- HTML preview uses a sandboxed iframe
- Markdown preview uses sanitization and iframe isolation
- RegEx testing runs through a Web Worker
- YAML conversion uses a Web Worker with safety limits
- JWT handling stays local
- File reading and downloading use browser APIs

---

## Project Structure

```text
public/
├── fonts/                 # self-hosted fonts
├── regexWorker.js         # RegEx worker
├── yamlWorker.js          # YAML worker
├── sitemap.xml
└── llms.txt

scripts/
├── generate-llms.js
└── generate-sitemap.js

src/
├── components/            # shared UI components
├── content/               # SEO and content route data
├── data/                  # grouped tool data
├── hooks/                 # reusable React hooks
├── layouts/               # shared layouts
├── pages/                 # top-level and content pages
├── seo/                   # metadata and JSON-LD helpers
├── styles/                # custom CSS architecture
├── tools/                 # tool implementations
└── utils/                 # reusable pure utilities
```

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/Tzioan4/transformJS.git
cd transformJS
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the test suite:

```bash
npm run test:run
```

Run ESLint:

```bash
npm run lint
```

Generate discoverability assets:

```bash
npm run generate:sitemap
npm run generate:llms
```

---

## Performance

TransformJS is optimized for fast browser delivery:

- self-hosted fonts
- route-based lazy loading
- CSS animations instead of heavy animation libraries
- browser-native APIs
- Web Workers for heavier parsing tasks
- no tracking scripts
- no backend round trips for tool processing

Detailed performance work is documented in [`docs/SPRINTS.md`](./docs/SPRINTS.md).

---

## Testing

The project uses Vitest for utility and tool-level testing.

Current tested areas include:

- Base64 utilities
- URL utilities
- JSON utilities
- JWT utilities
- Case Converter logic
- Diff Checker logic
- SQL Formatter logic
- URL Parser logic
- FTL evaluator logic

---

## Roadmap

Planned improvements include:

- final ESLint cleanup
- accessibility refinements
- detector edge-case coverage
- additional developer tools
- further mobile polish
- expanded automated tests

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make a focused change
4. Run build, tests and lint
5. Commit with a clear message
6. Open a pull request

Example:

```bash
git checkout -b feat/new-tool
npm run build
npm run test:run
npm run lint
git commit -m "feat: add new tool"
```

---

## License

Licensed under the [MIT License](./LICENSE).

Copyright © 2026 [Tziotis Ioannis](https://www.linkedin.com/in/giannistziotis/)
