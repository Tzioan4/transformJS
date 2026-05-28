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
- Preload hints for critical fonts (Inter 400, JetBrains Mono 800)

**Result:** Mobile 81 → 96 (+15 points)

### Step 2 — Remove Framer Motion

Replaced framer-motion library with CSS animations.

- Library was 35 KB gzipped for 4 trivial animations
- Replaced with CSS keyframes + transitions
- Added `prefers-reduced-motion` for accessibility

**Result:** Mobile 96 → 95-98 (+2 points)

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

**Focus:** Add a safer maintenance foundation without changing core tool behavior.

### Work shipped

- Added Vitest-based testing infrastructure.
- Added utility tests for Base64, URL, JSON, and JWT logic.
- Extracted and tested selected pure tool-specific logic.
- Added error boundaries for safer runtime failure handling.
- Cleaned up meaningful ESLint issues in small focused clusters.

### Notes

- Sprint 4 focused on maintainability and correctness confidence.
- No unverified performance or coverage metrics are claimed.


# SprintAI Roadmap
## SprintAI 1 — Static AI Discoverability

Completed:
- Added AI-aware robots.txt rules
- Added llms.txt
- Synced sitemap.xml with real tool routes
- Submitted sitemap to Google Search Console
- Submitted sitemap to Bing Webmaster Tools
- Requested indexing for core pages

Goals:
- improve crawlability
- improve AI crawler discoverability
- improve machine-readable project understanding
- establish SEO baseline

---

## SprintAI 2 — Structured Metadata System

Planned:
- reusable JSON-LD component
- SoftwareApplication schema for tools
- metadata automation from tool registry
- canonical URL handling
- improved semantic head tags
- shared SEO utilities

Goals:
- improve semantic understanding
- improve rich search compatibility
- reduce duplicated SEO logic
- centralize metadata handling

---

## SprintAI 3 — AI-Readable Content Expansion

Planned:
- richer tool descriptions
- AI-readable content sections
- FAQ sections
- semantic tool explanations
- internal linking between related tools
- improved long-tail keyword coverage

Goals:
- improve content depth
- improve contextual indexing
- improve search intent matching
- improve AI summarization quality

---

## SprintAI 4 — Content & Discoverability Expansion

Planned:
- alternative comparison pages
- use-case pages
- developer workflow pages
- grouped tool hub pages
- dynamic sitemap generation
- advanced internal SEO linking

Examples:
- /alternatives/devtoys
- /alternatives/cyberchef
- /use-cases/json-debugging
- /use-cases/frontend-development

Goals:
- improve discoverability outside tool pages
- improve topical authority
- improve external search coverage
- improve ecosystem positioning
---

## SprintAI 5 — Registry Architecture Migration

### Goal

Refactor the tool system into a scalable modular registry architecture without breaking the existing production UI or routes.

### Completed

* Split the old monolithic `src/tools/index.jsx`.
* Moved lazy component imports into:

  * `src/tools/toolComponents.jsx`
* Moved reusable Lucide icons into:

  * `src/tools/toolIcons.jsx`
* Moved tool metadata/content into:

  * `src/tools/registry.js`
* Reduced `src/tools/index.jsx` to a simple export layer.

### Result

The app now uses a cleaner production-safe architecture where:

* tool metadata is centralized
* components are isolated
* icons are reusable
* future tools are easier to add
* SEO/content systems are easier to scale

### Current Architecture

```txt
src/tools/
├─ index.jsx
├─ registry.js
├─ toolComponents.jsx
└─ toolIcons.jsx
```


### Future Planned Cleanup

Convert `registry.js` into the single source of truth for:

* sitemap generation
* llms generation
* tool route generation
* indexing/discoverability systems

This will remove duplicated route definitions across:

* `toolRoutes.js`
* `generate-llms.js`
* sitemap generators


_Last updated: May 2026_
