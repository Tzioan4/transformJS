# Adding New Tools

## 1. Create the tool component

Create the component file:

```txt
src/tools/<category>/MyTool.jsx
```

Example:

```txt
src/tools/data/JsonCleaner.jsx
```

---

## 2. Add lazy import

Open:

```txt
src/tools/toolComponents.jsx
```

Add:

```js
export const JsonCleaner = lazy(() => import("./data/JsonCleaner"));
```

---

## 3. Add icon

Open:

```txt
src/tools/toolIcons.jsx
```

Import icon from lucide-react:

```js
import { WandSparkles } from "lucide-react";
```

Add icon entry:

```js
jsonCleaner: <WandSparkles size={40} strokeWidth={1.5} />,
```

---

## 4. Add tool registry entry

Open:

```txt
src/tools/registry.js
```

Add new object inside the tools array:

```js
{
  name: "JSON Cleaner",
  path: "/json-cleaner",
  component: JsonCleaner,
  description: "Clean and normalize JSON data.",
  tags: ["json", "data", "clean"],
  icon: toolIcons.jsonCleaner,

  seoTitle: "JSON Cleaner - TransformJS",
  seoDesc: "Clean and normalize JSON data locally in your browser.",

  tips: [
    "Paste JSON input.",
    "Click clean.",
  ],

  content: {
    intro:
      "JSON Cleaner helps clean malformed or inconsistent JSON data.",

    useCases: [
      "Normalize JSON",
      "Clean API responses",
    ],

    faq: [
      {
        question: "Does it run locally?",
        answer:
          "Yes. Everything runs locally in your browser.",
      },
    ],

    relatedTools: [
      "/json",
      "/yaml-to-json",
    ],
  },
}
```

---

## 5. Add route to sitemap routes

Open:

```txt
src/content/toolRoutes.js
```

Add:

```js
"/json-cleaner",
```

---

## 6. Run checks

```bash
npm run build
npm run test:run
npm run generate:sitemap
```

---

## 7. Verify manually

Check:

```txt
/json-cleaner
```

Verify:

* page loads
* SEO title works
* FAQ appears
* tips button works
* related tools work
* homepage card appears
* search/filter works

---

## 8. Commit

```bash
git add .
git commit -m "feat: add json cleaner tool"
```
