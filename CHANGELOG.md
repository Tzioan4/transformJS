# Changelog

All notable changes to TransformJS are documented here.

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
- Added semantic internal linking between alternatives, use-cases, groups, and tools.
- Expanded llms.txt coverage with alternative pages, grouped pages, and workflow intent coverage.
- Expanded sitemap.xml with semantic content routes.

### Changed
- Improved SEO and GEO discoverability outside individual tool pages.
- Improved semantic topical authority for developer workflows.
- Improved cross-page discoverability through contextual internal linking.
- Improved browser-based and privacy-first positioning messaging across content pages.

### SEO / AI Discoverability
- Expanded competitor-intent search coverage.
- Expanded long-tail search surface area.
- Improved AI-readable workflow and comparison content.
- Improved semantic clustering between tools and workflows.
- Strengthened TransformJS ecosystem positioning for AI search systems.


## SprintAI 3 — Semantic Content Expansion System

### Added
- Added richer SEO and GEO-focused descriptions across the centralized tool registry.
- Added improved tool-level semantic intros for all TransformJS tools.
- Added stronger use-case content targeting real developer workflows and search intent.
- Expanded tool FAQs with more query-shaped, AI-readable question and answer patterns.
- Added `FAQPage` JSON-LD structured data generation for tool pages.
- Added FAQ structured metadata to tool routes through the shared SEO system.

### Changed
- Rewrote tool descriptions to better align with search intent and semantic clarity.
- Rewrote tool SEO descriptions for stronger metadata quality and better SERP readability.
- Improved tool FAQ copy for answer extraction, long-tail search relevance, and AI discoverability.
- Improved semantic consistency between visible FAQ content and structured metadata.
- Strengthened privacy-first and local-browser processing messaging across tool content.

### SEO / AI Discoverability
- Improved machine-readable question-and-answer extraction for tool pages.
- Improved structured discoverability for search engines and AI parsers through `FAQPage` schema.
- Improved entity clarity for individual tools and their practical developer use cases.
- Improved long-tail keyword coverage across metadata, tool intros, and FAQ content.
- Increased alignment between on-page semantic content and JSON-LD structured data.

- 
### Added
- Added reusable semantic content support for all tool pages.
- Extended the centralized tool registry with:
  - `content.intro`
  - `content.useCases`
  - `content.faq`
  - `content.relatedTools`
- Added structured long-tail SEO content to all TransformJS tools.
- Added semantic internal linking between related developer tools.
- Added reusable FAQ accordion rendering through `ToolSeoContent`.
- Added reusable related tools section with automatic path-to-name resolution.

### Changed
- Integrated `ToolSeoContent` into tool route rendering in `App.jsx`.
- Expanded tool pages with AI-readable semantic sections:
  - About
  - Use Cases
  - FAQ
  - Related Tools
- Improved internal linking graph for semantic discoverability.
- Improved tool metadata consistency across the registry.
- Kept existing flat route architecture unchanged.

### SEO / AI Discoverability
- Improved long-tail keyword coverage across tool pages.
- Improved semantic crawlability for AI crawlers and search engines.
- Improved contextual relationships between tools through internal linking.
- Improved structured content density without overengineering the architecture.
- Strengthened registry-driven metadata architecture for future automation.


## SprintAI 2 — SEO Metadata Foundation

### Added
- Added reusable SEO metadata component using `react-helmet-async`.
- Added canonical URL support for the homepage, static pages, and tool pages.
- Added JSON-LD structured data helpers for:
  - `WebApplication`
  - `SoftwareApplication`
  - `BreadcrumbList`
- Added site-level SEO constants in `src/seo/site.js`.
- Added tool page structured data generated from the central tool registry.

### Changed
- Replaced inline Helmet metadata in `App.jsx` with the reusable `SEO` component.
- Kept existing flat tool routes unchanged to avoid indexing disruption.


## SprintAI 1 — AI Discoverability Foundation

### Added
- Added AI-aware robots.txt rules
- Added llms.txt
- Synced sitemap.xml with tool registry routes
- Added AI crawler discoverability support

### SEO / Infrastructure
- Resubmitted sitemap to Google Search Console
- Submitted sitemap to Bing Webmaster Tools
- Requested indexing for core pages and tools
---

## Sprint 4 — Testing, Error Boundaries & Lint Cleanup

### Added

- Added Vitest testing setup for utility and tool-level pure logic.
- Added utility test coverage for Base64, URL, JSON, and JWT helpers.
- Added tests for extracted pure logic in selected tools.

### Improved

- Added error boundaries to improve runtime failure isolation.
- Cleaned up meaningful ESLint issues in small focused batches.
- Reduced hook, static component, and bug-like lint problems without changing tool behavior.

---

## Sprint 3 — Mobile Performance

### Performance

- Self-hosted fonts (replaced Google Fonts CDN)
- Removed `framer-motion` dependency (-39 KB gzipped)
- Mobile PageSpeed: 81 → 95-98
- Bundle size: 131 KB → 92 KB gzipped (-30%)
- First Contentful Paint: 3.2s → 1.8s
- Largest Contentful Paint: 3.2s → 2.1s

---

## Sprint 2 — UX & Polish

### Fixed

- Markdown Preview: Links now open in new tab
- SQL Formatter: Warning banner for DROP/DELETE/TRUNCATE/ALTER
- Password Generator: Minimum length raised from 6 to 12
- Case Converter: Strips special symbols for valid identifiers
- URL Parser: Shows port only when explicitly defined
- Diff Checker: Success banner when texts are identical
- Color Converter: Validation error for invalid HEX
- Base64 Tool: Feedback on empty input
- URL Encoder: Feedback on empty input

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
