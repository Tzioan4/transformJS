# TransformJS Development Sprints

A record of major development phases on TransformJS.

---

## Sprint 1 — Critical Bugs & Correctness

Fixed critical bugs across all 17 tools. See git history for details.

---

## Sprint 2 — UX & Polish

**Focus:** Improve user experience with clear feedback and validation.

### Fixes shipped (9 total)

| #   | Tool               | Improvement                           |
| --- | ------------------ | ------------------------------------- |
| 1   | Markdown Preview   | Links open in new tab                 |
| 2   | SQL Formatter      | Warning on DROP/DELETE/TRUNCATE/ALTER |
| 3   | Password Generator | Min length 6 → 12                     |
| 4   | Case Converter     | Strips special symbols                |
| 5   | URL Parser         | Port shown only if explicit           |
| 6   | Diff Checker       | Success banner when identical         |
| 7   | Color Converter    | HEX validation error                  |
| 8   | Base64 Tool        | Empty input feedback                  |
| 9   | URL Encoder        | Empty input feedback                  |

---

## Sprint 3 — Mobile Performance

**Focus:** Improve PageSpeed mobile from 81 to 90+.

### Step 1 — Self-host fonts

Replaced Google Fonts CDN with self-hosted woff2 files.

- Removed 2 DNS lookups + 2 TLS handshakes to Google servers
- Added `font-display: swap` to prevent invisible text flash
- Added preload hints for critical fonts

**Result:** Mobile 81 → 96 (+15 points)

### Step 2 — Remove Framer Motion

Replaced framer-motion with CSS animations.

- Removed unnecessary library weight
- Added CSS keyframes and transitions
- Added `prefers-reduced-motion` support

**Result:** Mobile 96 → 95-98

### Final Metrics (mobile, Slow 4G)

| Metric                   | Before | After |
| ------------------------ | ------ | ----- |
| PageSpeed Score          | 81     | 95-98 |
| First Contentful Paint   | 3.2s   | 1.8s  |
| Largest Contentful Paint | 3.2s   | 2.1s  |
| Total Blocking Time      | 210ms  | 80ms  |
| Speed Index              | 4.8s   | 1.8s  |
| Bundle (gzipped)         | 131 KB | 92 KB |

---

## Sprint 4 — Testing, Error Boundaries & Lint Cleanup

**Status:** In progress

**Focus:** Add a safer maintenance foundation without changing core tool behavior.

### Completed

- Added Vitest-based testing infrastructure.
- Added utility tests for Base64, URL, JSON and JWT logic.
- Added tool-level tests for Case Converter, Diff Checker, SQL Formatter and URL Parser.
- Extracted FTL tokenizer, parser, evaluator and renderer logic into:
  - `src/tools/code/ftl.evaluator.js`
- Added FTL evaluator tests:
  - `src/tools/code/ftl.evaluator.test.js`
- Added error boundaries for safer runtime failure handling.
- Cleaned inline styles from:
  - JSON Formatter
  - Password Generator
  - RegEx Tester
  - FTL Previewer
- Moved FTL-specific styles into:
  - `src/styles/tools/ftl.css`
- Fixed homepage search propagation from `AppRoutes` to `Home`.

### Verification

- `npm run test:run` passes.
- Current result: **9 test files passed, 82 tests passed**.

### Remaining lint cleanup

`npm run lint` currently reports 7 errors:

- `src/ThemeContext.jsx` — fast refresh export cleanup
- `src/tools/code/CaseConverter.jsx` — fast refresh export cleanup
- `src/tools/code/DiffChecker.jsx` — fast refresh export cleanup
- `src/tools/data/SqlFormatter.jsx` — fast refresh export cleanup
- `src/tools/text/UrlParser.jsx` — fast refresh export cleanup
- `src/tools/code/ColorConverter.jsx` — state update inside effect
- `src/tools/data/YamlToJson.jsx` — state update inside effect

---

# SprintAI Roadmap

## SprintAI 1 — Static AI Discoverability

**Status:** Completed

- Added AI-aware `robots.txt` rules
- Added `llms.txt`
- Synced sitemap with real routes
- Submitted sitemap to Google Search Console
- Submitted sitemap to Bing Webmaster Tools
- Requested indexing for core pages

---

## SprintAI 2 — Structured Metadata System

**Status:** Completed

- Added reusable SEO metadata component
- Added canonical URL support
- Added JSON-LD helpers
- Added SoftwareApplication schema for tools
- Added BreadcrumbList schema
- Centralized site-level SEO constants

---

## SprintAI 3 — AI-Readable Content Expansion

**Status:** Completed

- Added richer registry-driven tool descriptions
- Added semantic tool content sections
- Added FAQ sections
- Added FAQPage JSON-LD
- Added related tool links
- Improved long-tail keyword coverage

---

## SprintAI 4 — Content & Discoverability Expansion

**Status:** Completed

- Added alternative comparison pages
- Added use-case pages
- Added grouped tool pages
- Added reusable content page layouts
- Expanded semantic internal linking
- Added dynamic sitemap generation

Examples:

- `/alternatives/devtoys`
- `/alternatives/cyberchef`
- `/alternatives/jsonformatter`
- `/use-cases/json-debugging`
- `/use-cases/frontend-development`
- `/groups/json-tools`

---

## SprintAI 5 — Registry Consolidation & Automation

**Status:** Completed

### Registry Consolidation

- Centralized tool metadata in `src/tools/registry.js`
- Split component references into `src/tools/toolComponents.jsx`
- Split icon references into `src/tools/toolIcons.jsx`

### Route Automation

- Refactored `src/content/toolRoutes.js` to derive routes from registry data
- Preserved existing production URLs

### AI Discoverability Integration

- Refactored `scripts/generate-llms.js` to consume registry data
- Connected registry metadata to AI discoverability assets

### Sitemap Integration

Registry data now feeds:

- tool routes
- site routes
- sitemap generation
- llms generation

---

# Sprint UX-1 — Workflow Efficiency Improvements

**Status:** Complete

## Phase 1 — Global Tool Switcher

- Added registry-driven ToolSwitcher
- Added search and tool navigation
- Integrated it into the shared tool workflow
- Added mobile-compatible behavior
- Preserved privacy-first behavior with no tracking or persistence

## Phase 2 — Local File Workflow

- Added local file loading utilities
- Added drag and drop support
- Added upload buttons
- Added DropOverlay component
- Added file validation and size limits

Updated tools:

- JSON Formatter
- CSV to JSON
- YAML to JSON
- SQL Formatter
- Markdown Preview
- HTML Preview
- Diff Checker
- Base64 Tool
- URL Encoder / Decoder
- Hash Generator
- Case Converter

## Phase 3 — Download Output

- Added local browser downloads for supported tools

## Phase 4 — Workflow Polish

- Added category badges across tool pages
- Removed example and dummy content from tools
- Improved tool header consistency
- Improved empty states
- Improved action consistency
- Fixed Color Converter HEX synchronization

## Phase 5 — Smart Detection

- Added centralized `detectTool` utility
- Added confidence-based detection scoring
- Added detection support for:
  - JSON
  - JWT
  - URL
  - HTML
  - CSV
  - YAML
  - Markdown
  - SQL
  - UUID
  - Color values
  - Base64

## Phase 6 — Smart Start Hub

- Added SmartDetector homepage component
- Added paste-based tool detection
- Added drag and drop file detection
- Added text file validation
- Added Escape-to-clear support
- Added tool recommendation UI
- Added direct navigation to suggested tools

## Future enhancements

- Transfer detected content directly into destination tools
- Expand detector test coverage
- Improve format detection edge cases

_Last updated: June 2026_
