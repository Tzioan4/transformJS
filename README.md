# transformJS

[![PageSpeed Mobile](https://img.shields.io/badge/PageSpeed_Mobile-97-brightgreen)](https://pagespeed.web.dev/analysis?url=https://transformjs.com/)
[![PageSpeed Desktop](https://img.shields.io/badge/PageSpeed_Desktop-100-brightgreen)](https://pagespeed.web.dev/analysis?url=https://transformjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built_with-React_19-61dafb)](https://react.dev/)
[![Powered by Vite](https://img.shields.io/badge/Powered_by-Vite-646cff)](https://vitejs.dev/)

Fast, private and modern developer tools — built for everyday workflows.

TransformJS is a lightweight collection of browser-based utilities designed to help developers work faster without unnecessary complexity. Built with React and Vite, deployed on Vercel.

**Live demo:** [transformjs.com](https://transformjs.com/)

---

## Philosophy

TransformJS follows a simple idea:

- Fast tools
- Clean interface
- Zero clutter
- Privacy first

Everything runs entirely inside your browser. No accounts. No analytics. No tracking. No databases. No server-side processing. Your data never leaves your device.

---

## Performance

TransformJS is built for speed and privacy:

- **Mobile PageSpeed:** 95-98 (top 5% of the web)
- **Desktop PageSpeed:** 98-100
- **First Contentful Paint:** 1.8s (mobile, Slow 4G)
- **Largest Contentful Paint:** 2.1s (mobile, Slow 4G)
- **100% client-side** — no servers, no tracking, no analytics
- **Self-hosted fonts** — zero third-party requests
- **Lazy-loaded routes** — each tool ships its own bundle

See [`docs/SPRINTS.md`](./docs/SPRINTS.md) for the full optimization journey.

---

## Tools

| Tool                  | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| JSON Formatter        | Prettify, minify, and validate JSON with syntax highlighting    |
| Base64 Tool           | Encode and decode Base64 strings (text + binary)                |
| URL Encoder / Decoder | RFC 3986 compliant URL component encoding                       |
| HTML Preview          | Sandboxed live rendering for HTML and CSS                       |
| Markdown Preview      | GitHub Flavored Markdown to HTML conversion                     |
| JWT Debugger          | Decode headers and payloads, verify HMAC signatures             |
| YAML to JSON          | Convert YAML configurations to clean JSON                       |
| SQL Formatter         | Format and prettify SQL queries with destructive query warnings |
| Hash Generator        | SHA-1, SHA-256, SHA-512 via Web Crypto API                      |
| Password Generator    | Cryptographically secure passwords with entropy meter           |
| CSV to JSON           | RFC 4180 compliant CSV parsing                                  |
| RegEx Tester          | Real-time pattern matching with capture group support           |
| FTL Previewer         | Apache FreeMarker templates with mock JSON data                 |
| Case Converter        | camelCase, snake_case, kebab-case, PascalCase, and more         |
| UUID Generator        | Cryptographically secure UUID v4 in bulk                        |
| URL Parser            | Decompose URLs into protocol, host, port, path, params          |
| Diff Checker          | Line-by-line comparison with LCS algorithm                      |
| Color Converter       | HEX, RGB, HSL conversion with live color picker                 |

More tools are continuously being added.

---

## Tech Stack

- **React 19** — Component architecture
- **Vite 8** — Build tool and dev server
- **React Router 7** — Client-side routing with lazy loading
- **Web APIs** — Crypto, Clipboard, sandboxed iframes
- **Web Workers** — Heavy parsing offloaded from main thread (YAML, RegEx)
- **Custom CSS** — Design system with CSS variables, no UI frameworks
- **Vercel** — Edge CDN deployment

---

## Architecture

The project uses a modular, tool-based architecture designed for scalability.

### Structure highlights

- **Isolated tool components** — each tool is self-contained
- **Centralized tool registry** — single source of truth in `src/tools/index.jsx`
- **Automatic route generation** — routes derived from registry
- **Reusable layouts and hooks** — `ToolLayout`, `useCopy`, `useKeyboardShortcuts`
- **Separated styles architecture** — per-component and per-tool CSS files
- **Lazy-loaded routes** — code splitting per tool for optimal bundle size

### Project structure

```
src/
├── components/      # Shared UI (Navbar, Footer, Hero, ToolCard)
├── hooks/           # Custom React hooks
├── layouts/         # Shared layout wrappers
├── pages/           # Top-level pages (Home, About, Privacy, 404)
├── styles/          # CSS architecture
│   ├── components/
│   ├── pages/
│   └── tools/
├── tools/           # Tool implementations
│   ├── code/        # HTML, Markdown, RegEx, FTL, Case, Diff, Color
│   ├── data/        # JSON, YAML, SQL, CSV
│   ├── security/    # Base64, URL, JWT, Hash, Password
│   └── text/        # UUID, URL Parser
└── utils/           # Pure utility functions
public/
└── fonts/           # Self-hosted Inter + JetBrains Mono (woff2)
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

Start the dev server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

---

## Development History

TransformJS has evolved through several focused development sprints:

- **Sprint 1** — Critical bug fixes and correctness across all tools
- **Sprint 2** — UX polish: input validation, feedback messages, safety warnings
- **Sprint 3** — Mobile performance optimization (PageSpeed 81 → 97)
- **Sprint 4** — Testing setup, utility coverage, error boundaries, and meaningful lint cleanup

See [`CHANGELOG.md`](./CHANGELOG.md) for version history and [`docs/SPRINTS.md`](./docs/SPRINTS.md) for detailed retrospectives.

---

## Future Plans

- Better mobile UX refinements
- Accessibility improvements (current score: 93, target: 100)
- Additional tools (XML formatter, image to base64, cron parser, timestamp converter)
- Expand automated testing beyond current Vitest utility/tool coverage

---

## Contributing

Contributions, ideas and improvements are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes with descriptive messages
4. Push the branch (`git push origin feat/your-feature`)
5. Open a pull request

---

## Purpose

TransformJS started as a learning and portfolio project focused on:

- React architecture and scalable frontend patterns
- Reusable component systems
- Modern build tooling and routing
- Performance optimization
- Git workflows and deployment pipelines
- UI/UX design

Over time, it evolved into a real-world utility platform used in everyday workflows.

---

## License

Licensed under the [MIT License](./LICENSE).

Copyright © 2026 [Tziotis Ioannis](https://www.linkedin.com/in/giannistziotis/)
