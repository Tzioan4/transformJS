# Changelog

All notable changes to TransformJS are documented here.

### Added

- SmartDetector homepage component
- Automatic format detection system
- Confidence-based tool recommendation engine
- Drag and drop detection workflow
- Escape shortcut for SmartDetector
- Homepage tool recommendation flow

### Detection Support

Added automatic detection for:

- JSON
- JWT
- URL
- HTML
- CSV
- YAML
- Markdown
- SQL
- UUID
- Color values (HEX, RGB, HSL)
- Base64

### UX Improvements

- Added category badges to tool pages
- Removed example content from JWT Debugger
- Removed example content from URL Parser
- Removed example content from FTL Previewer
- Improved first-time onboarding experience
- Improved tool discovery workflow

### Fixed

- Fixed Color Converter HEX synchronization issue

### Added

- Added shared CSS utilities for JSON Formatter and Password Generator states.
- Added `src/styles/tools/ftl.css` for FTL-specific layout and tab styling.
- Added `src/tools/code/ftl.evaluator.js`.
- Added `src/tools/code/ftl.evaluator.test.js`.
- Added visible FTL render error markers for evaluator failures.

### Changed

- Cleaned inline styles from JSON Formatter.
- Cleaned inline styles from Password Generator.
- Cleaned inline styles from RegEx Tester.
- Moved FTL Previewer layout and tab styles into CSS classes.
- Extracted FTL tokenizer, parser, evaluator and renderer logic from `FtlPreviewer.jsx`.
- Fixed homepage search propagation from `AppRoutes` to `Home`.
- Removed unused FTL dummy constants.
- Removed unused JSON Formatter state value while preserving its setter.

### Verified

- `npm run test:run` passes successfully.
- Current result: **9 test files passed, 82 tests passed**.

### Remaining

`npm run lint` currently reports 7 errors:

- Fast refresh export cleanup:
  - `src/ThemeContext.jsx`
  - `src/tools/code/CaseConverter.jsx`
  - `src/tools/code/DiffChecker.jsx`
  - `src/tools/data/SqlFormatter.jsx`
  - `src/tools/text/UrlParser.jsx`
- Effect cleanup:
  - `src/tools/code/ColorConverter.jsx`
  - `src/tools/data/YamlToJson.jsx`

---

## Sprint UX-1 — Workflow Efficiency Improvements

### Added

- Global Tool Switcher
- Local file upload support
- Drag and drop support
- DropOverlay component
- Local browser download support
- File validation and size limits
- Category badges across tool pages
- Centralized `detectTool` utility
- Confidence-based smart detection
- SmartDetector homepage component
- Paste-based detection
- File drop detection
- Tool recommendation UI
- Direct navigation to detected tools

### Updated

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
- Color Converter

### Improved

- Removed example and dummy content from tools
- Improved empty states
- Improved local-first workflow
- Improved drag and drop UX
- Reduced copy/paste friction
- Improved tool header consistency
- Improved action consistency
- Added Smart Start Hub workflow

### Security

- Browser-only file processing
- No uploads
- No tracking
- No backend processing

---

## SprintAI 5 — Registry Consolidation & Automation

### Added

- Introduced a centralized tool registry using `src/tools/registry.js`.
- Split component references into `src/tools/toolComponents.jsx`.
- Split icon references into `src/tools/toolIcons.jsx`.
- Centralized tool metadata management.

### Changed

- Refactored `src/content/toolRoutes.js` to derive tool routes from the tool registry.
- Refactored `scripts/generate-llms.js` to generate tool entries from registry data.
- Simplified route and metadata generation flows.
- Reduced duplication between tool metadata, routes, sitemap generation and AI discoverability assets.

### Architecture

Tool route generation now follows:

```text
toolRegistry
→ toolRoutes
→ siteRoutes
→ sitemap.xml
```

Tool AI metadata generation now follows:

```text
toolRegistry
→ generate-llms.js
→ llms.txt
```

### Verified

- `npm run build` passed successfully.
- `npm run test:run` passed successfully.
- `npm run generate:sitemap` generated valid sitemap output.
- `npm run generate:llms` generated valid llms.txt output.
- No production routes changed.
- No user-facing behavior changed.

---

## SprintAI 4 — Content Discoverability Expansion

### Added

- Added reusable alternative comparison page architecture.
- Added registry-driven alternative content system.
- Added comparison routes for:
  - `/alternatives/devtoys`
  - `/alternatives/cyberchef`
  - `/alternatives/jsonformatter`
- Added expanded use-case pages for:
  - JSON debugging
  - Frontend development
  - API testing
  - Data formatting
- Added reusable card-based layouts for alternative and use-case content pages.
- Added semantic internal linking between alternatives, use-cases, groups and tools.
- Expanded `llms.txt` coverage.
- Expanded sitemap coverage with semantic content routes.

### Changed

- Improved SEO and GEO discoverability outside individual tool pages.
- Improved semantic topical authority for developer workflows.
- Improved cross-page discoverability through contextual internal linking.
- Improved browser-based and privacy-first positioning messaging.

---

## SprintAI 3 — Semantic Content Expansion System

### Added

- Added richer SEO and GEO-focused descriptions across the centralized tool registry.
- Added improved tool-level semantic intros for all TransformJS tools.
- Added stronger use-case content targeting real developer workflows.
- Expanded tool FAQs with more query-shaped, AI-readable patterns.
- Added FAQPage JSON-LD structured data generation.
- Added reusable semantic content support for tool pages.
- Extended registry content with:
  - `content.intro`
  - `content.useCases`
  - `content.faq`
  - `content.relatedTools`
- Added semantic internal linking between related tools.
- Added reusable FAQ accordion rendering through `ToolSeoContent`.

### Changed

- Rewrote tool descriptions for stronger semantic clarity.
- Rewrote tool SEO descriptions for stronger metadata quality.
- Integrated `ToolSeoContent` into tool route rendering in `App.jsx`.
- Expanded tool pages with:
  - About
  - Use Cases
  - FAQ
  - Related Tools

---

## SprintAI 2 — SEO Metadata Foundation

### Added

- Added reusable SEO metadata component using `react-helmet-async`.
- Added canonical URL support for homepage, static pages and tool pages.
- Added JSON-LD structured data helpers for:
  - `WebApplication`
  - `SoftwareApplication`
  - `BreadcrumbList`
- Added site-level SEO constants in `src/seo/site.js`.
- Added tool page structured data generated from the central registry.

### Changed

- Replaced inline Helmet metadata in `App.jsx` with the reusable `SEO` component.
- Kept existing flat tool routes unchanged.

---

## SprintAI 1 — AI Discoverability Foundation

### Added

- Added AI-aware `robots.txt` rules.
- Added `llms.txt`.
- Synced sitemap with registry routes.
- Added AI crawler discoverability support.

### SEO / Infrastructure

- Resubmitted sitemap to Google Search Console.
- Submitted sitemap to Bing Webmaster Tools.
- Requested indexing for core pages and tools.

---

## Sprint 4 — Testing, Error Boundaries & Lint Cleanup

### Added

- Added Vitest testing setup for utility and tool-level pure logic.
- Added utility test coverage for Base64, URL, JSON and JWT helpers.
- Added tests for Case Converter, Diff Checker, SQL Formatter and URL Parser.
- Added FTL evaluator test coverage.
- Added error boundaries for safer runtime failure isolation.

### Changed

- Extracted FTL evaluator logic into a dedicated pure module.
- Moved repeated UI styles into shared or tool-specific CSS classes.
- Reduced inline styles across multiple tools.

### Verified

- Current test result: **9 test files passed, 82 tests passed**.

### Remaining

- Complete the final 7 ESLint fixes.

---

## Sprint 3 — Mobile Performance

### Performance

- Self-hosted fonts
- Removed `framer-motion`
- Mobile PageSpeed: 81 → 95-98
- Bundle size: 131 KB → 92 KB gzipped
- First Contentful Paint: 3.2s → 1.8s
- Largest Contentful Paint: 3.2s → 2.1s

---

## Sprint 2 — UX & Polish

### Fixed

- Markdown Preview: links open in new tab
- SQL Formatter: warning banner for destructive queries
- Password Generator: minimum length raised from 6 to 12
- Case Converter: strips special symbols
- URL Parser: shows port only when explicitly defined
- Diff Checker: success banner when texts are identical
- Color Converter: validation error for invalid HEX
- Base64 Tool: empty input feedback
- URL Encoder: empty input feedback

---

## Sprint 1 — Critical Bugs & Correctness

Fixed critical bugs and correctness issues across all tools.
See git history for individual commits.

---

## Initial Release

- 17 developer tools shipped
- React + Vite architecture
- Custom CSS design system with dark/light themes
- 100% client-side processing
