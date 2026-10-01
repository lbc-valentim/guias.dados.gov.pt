import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const agoraBoundary = path.join(srcRoot, "components", "agora") + path.sep;
const rootLayout = path.join(srcRoot, "app", "layout.tsx");
const globalsCss = path.join(srcRoot, "app", "globals.css");
const postcssConfig = path.join(root, "postcss.config.mjs");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const errors: string[] = [];

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

for (const file of walk(srcRoot)) {
  const source = fs.readFileSync(file, "utf8");
  if (source.includes("@ama-pt/agora-design-system") && !file.startsWith(agoraBoundary)) {
    errors.push(`${path.relative(root, file)} importa componentes Ágora fora de src/components/agora`);
  }
}

const css = fs.readFileSync(globalsCss, "utf8");
const requiredImports = [
  '@import "@ama-pt/agora-design-system/theme.css";',
  '@import "tailwindcss/preflight";',
  '@import "@ama-pt/agora-design-system/index.css";',
  '@import "tailwindcss/utilities";',
];
let previousIndex = -1;
for (const requiredImport of requiredImports) {
  const index = css.indexOf(requiredImport);
  if (index === -1) errors.push(`src/app/globals.css não contém ${requiredImport}`);
  if (index !== -1 && index < previousIndex) errors.push("ordem dos imports Ágora/Tailwind 4 está incorrecta");
  if (index !== -1) previousIndex = index;
}

for (const token of ["--breakpoint-sm: 576px", "--breakpoint-lg: 1024px", "--spacing-4: 4px", "--spacing-12: 12px"]) {
  if (!css.includes(token)) errors.push(`src/app/globals.css não repõe o token oficial ${token}`);
}

const postcss = fs.readFileSync(postcssConfig, "utf8");
if (!postcss.includes('"@tailwindcss/postcss"')) {
  errors.push("postcss.config.mjs não usa @tailwindcss/postcss");
}
if (fs.existsSync(path.join(root, "tailwind.config.ts"))) {
  errors.push("tailwind.config.ts deve ser removido na arquitectura Tailwind 4 CSS-first");
}

const agoraVersion = packageJson.dependencies?.["@ama-pt/agora-design-system"] ?? "";
const tailwindVersion = packageJson.devDependencies?.tailwindcss ?? "";
const tailwindPostcssVersion = packageJson.devDependencies?.["@tailwindcss/postcss"] ?? "";
if (!/^4\./.test(agoraVersion)) errors.push(`Ágora deve estar em major 4; encontrado ${agoraVersion || "em falta"}`);
if (!/^4\./.test(tailwindVersion)) errors.push(`Tailwind deve estar em major 4; encontrado ${tailwindVersion || "em falta"}`);
if (!/^4\./.test(tailwindPostcssVersion)) {
  errors.push(`@tailwindcss/postcss deve estar em major 4; encontrado ${tailwindPostcssVersion || "em falta"}`);
}

const layoutSource = fs.readFileSync(rootLayout, "utf8");
if (layoutSource.includes("artifacts/dist/style.css")) {
  errors.push("src/app/layout.tsx ainda importa o stylesheet legado do Ágora 3");
}

const headerPath = path.join(srcRoot, "components", "agora", "PortalHeader.tsx");
const headerSource = fs.readFileSync(headerPath, "utf8");
if (!headerSource.includes("NavigationSection")) {
  errors.push("PortalHeader não usa NavigationSection exigido pelo Ágora 4");
}
if (/<NavigationLink[^>]*>\s*<a\b/s.test(headerSource)) {
  errors.push("PortalHeader contém <a> aninhado em NavigationLink do Ágora 4");
}

const requiredSingleSourceConsumers = [
  "src/lib/content/repository.ts",
  "src/lib/content/search.ts",
  "scripts/v1/build-derived.ts",
  "scripts/v1/build-pdfs.sh",
];
for (const relative of requiredSingleSourceConsumers) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`${relative} em falta`);
}

const configuredUiConsumers = [
  "src/app/Guias-do-utilizador/page.tsx",
  "src/app/Guias-do-utilizador/[...segments]/page.tsx",
];
for (const relative of configuredUiConsumers) {
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  if (!source.includes("loadConfiguredContent")) {
    errors.push(`${relative} não usa a fronteira configurada loadConfiguredContent()`);
  }
  if (source.includes("loadContent")) {
    errors.push(`${relative} regressou ao acesso directo loadContent()`);
  }
}

if (errors.length) {
  console.error(`Arquitectura v1 inválida: ${errors.length} problema(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Arquitectura v1 válida: Ágora 4 + Tailwind 4 CSS-first, wrappers confinados, navegação v4 e consumidores single-source confirmados.",
);
