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

_Last updated: May 2026_
