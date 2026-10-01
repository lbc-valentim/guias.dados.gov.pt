import fs from "node:fs";
import path from "node:path";
import { loadContent } from "../../src/lib/content/repository";
import { getGuidePublicationStatus } from "../../src/lib/content/publication-status";
import { buildRoutes, routeForGuide, routeForTask } from "../../src/lib/content/routes";
import { canonicalUrl, siteConfig } from "../../src/lib/site";

const root = process.cwd();
const out = path.join(root, "out");
const content = loadContent();
const routes = buildRoutes(content);
const routePaths = new Set(routes.map((route) => route.path));
const basePath = siteConfig.site.basePath;
const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function getAttr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, "i"));
  return match?.[1];
}

function pageFile(routePath: string): string {
  return path.join(out, routePath.replace(/^\/+/, ""), "index.html");
}

function internalRouteFromHref(href: string): string | undefined {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean.startsWith(`${basePath}/Guias-do-utilizador/`)) return undefined;
  return clean.slice(basePath.length);
}

for (const route of routes) {
  const file = pageFile(route.path);
  if (!fs.existsSync(file)) {
    fail(`${route.path}: index.html em falta`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const prefix = `${route.path}:`;

  if (!/<html\b[^>]*\blang=["']pt-PT["']/i.test(html)) fail(`${prefix} lang pt-PT em falta`);
  if ((html.match(/<main\b/gi) ?? []).length !== 1) fail(`${prefix} deve existir exactamente um main`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) fail(`${prefix} deve existir exactamente um h1`);
  if ((html.match(/\bid=["']conteudo["']/gi) ?? []).length !== 1) fail(`${prefix} id=conteudo inválido`);
  if (!/href=["']#conteudo["']/i.test(html)) fail(`${prefix} skip link em falta`);

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) fail(`${prefix} IDs duplicados: ${duplicateIds.join(", ")}`);

  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  for (const image of images) {
    if (getAttr(image, "alt") === undefined) fail(`${prefix} imagem sem atributo alt`);
  }

  const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? []).find(
    (tag) => getAttr(tag, "rel")?.toLowerCase() === "canonical",
  );
  const expectedCanonical = canonicalUrl(route.path);
  if (!canonicalTag || getAttr(canonicalTag, "href") !== expectedCanonical) {
    fail(`${prefix} canonical divergente; esperado ${expectedCanonical}`);
  }

  const anchors = html.match(/<a\b[^>]*>/gi) ?? [];
  for (const anchor of anchors) {
    const href = getAttr(anchor, "href");
    if (!href) continue;
    const internalRoute = internalRouteFromHref(href);
    if (internalRoute && !routePaths.has(internalRoute)) {
      fail(`${prefix} ligação interna para rota inexistente: ${href}`);
    }
  }

  if ((route.kind === "guide" || route.kind === "task") && route.guide) {
    const publicationStatus = getGuidePublicationStatus(route.guide.id);
    if (publicationStatus) {
      if (!html.includes(publicationStatus.label)) fail(`${prefix} aviso de disponibilidade em falta`);
      if (!html.includes(publicationStatus.message)) fail(`${prefix} detalhe de disponibilidade em falta`);
    }
  }

  if (route.kind === "guide" && route.guide) {
    const pdfHref = `${basePath}/assets/pdf/${route.guide.slug.toLocaleLowerCase("pt-PT")}.pdf`;
    if (!html.includes(`href="${pdfHref}"`)) fail(`${prefix} ligação PDF do guia em falta`);
    const pdfFile = path.join(out, "assets", "pdf", `${route.guide.slug.toLocaleLowerCase("pt-PT")}.pdf`);
    if (!fs.existsSync(pdfFile)) fail(`${prefix} PDF do guia em falta no export`);

    for (const relatedId of route.guide.relatedGuideIds) {
      const related = routeForGuide(content, relatedId);
      const href = `${basePath}${related.path}`;
      if (!html.includes(`href="${href}"`)) fail(`${prefix} guia relacionado ${relatedId} não está ligado`);
    }
  }

  if (route.kind === "task" && route.guide && route.task) {
    const overview = routeForGuide(content, route.guide.id);
    const overviewHref = `${basePath}${overview.path}`;
    if (!html.includes(`href="${overviewHref}"`)) fail(`${prefix} ligação para visão geral do guia em falta`);

    const ref = route.task.nextRef;
    const next = ref.type === "task" ? routeForTask(content, ref.id) : routeForGuide(content, ref.id);
    const nextHref = `${basePath}${next.path}`;
    if (!html.includes(`href="${nextHref}"`)) fail(`${prefix} nextRef ${ref.id} não está materializado`);
  }
}

const searchFile = path.join(out, "search-index.json");
if (!fs.existsSync(searchFile)) fail("search-index.json em falta");
else {
  const search = JSON.parse(fs.readFileSync(searchFile, "utf8")) as unknown[];
  if (search.length !== 96) fail(`search-index.json: esperadas 96 entradas; obtidas ${search.length}`);
}

const sitemapFile = path.join(out, "sitemap.xml");
if (!fs.existsSync(sitemapFile)) fail("sitemap.xml em falta");
else {
  const sitemap = fs.readFileSync(sitemapFile, "utf8");
  const urls = sitemap.match(/<url>/g) ?? [];
  if (urls.length !== 119) fail(`sitemap.xml: esperadas 119 URLs; obtidas ${urls.length}`);
}

if (errors.length) {
  console.error(`Static export v1 inválido: ${errors.length} problema(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Static export v1 válido: 119 rotas, estrutura base, canonicals, navegação, 15 PDFs, pesquisa e sitemap coerentes.");
