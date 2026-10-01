import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { guidesContentSchema } from "../../src/lib/content/schema";
import { loadContent } from "../../src/lib/content/repository";
import { buildRoutes } from "../../src/lib/content/routes";
import { buildSearchIndex } from "../../src/lib/content/search";

const root = process.cwd();
const content = loadContent();
const routes = buildRoutes(content);
const search = buildSearchIndex(content);
const pub = path.join(root, "public");

fs.mkdirSync(pub, { recursive: true });
fs.mkdirSync(path.join(root, "generated"), { recursive: true });

const brandSource = path.join(root, "assets", "brand");
if (fs.existsSync(brandSource)) {
  fs.cpSync(brandSource, path.join(pub, "assets", "brand"), { recursive: true });
}

fs.writeFileSync(path.join(pub, "search-index.json"), JSON.stringify(search, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "generated", "guides.schema.json"),
  JSON.stringify(z.toJSONSchema(guidesContentSchema), null, 2) + "\n",
);
fs.writeFileSync(
  path.join(root, "generated", "routes.json"),
  JSON.stringify(
    routes.map(({ kind, path: routePath, segments, title, theme, guide, task }) => ({
      kind,
      path: routePath,
      segments,
      title,
      themeId: theme?.id,
      guideId: guide?.id,
      taskId: task?.id,
    })),
    null,
    2,
  ) + "\n",
);

const site = JSON.parse(fs.readFileSync(path.join(root, "content", "site.json"), "utf8"));
const prefix = `${site.site.reviewOrigin}${site.site.basePath}`;
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${prefix}${route.path}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(pub, "sitemap.xml"), xml);
fs.writeFileSync(
  path.join(pub, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${prefix}/sitemap.xml\n`,
);

console.log(`Derivados: ${routes.length} rotas, ${search.length} entradas de pesquisa.`);
