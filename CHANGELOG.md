# Changelog

All notable changes to TransformJS are documented here.

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
