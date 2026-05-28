import fs from "fs";
import { allRoutes } from "../src/content/siteRoutes.js";

const BASE_URL = "https://transformjs.com";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
  </url>`,
  )
  .join("")}
</urlset>
`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("sitemap generated");
