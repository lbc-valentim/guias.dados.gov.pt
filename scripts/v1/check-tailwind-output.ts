import fs from "node:fs";
import path from "node:path";

const staticRoot = path.join(process.cwd(), "out", "_next", "static");
if (!fs.existsSync(staticRoot)) {
  console.error(`Static export do Next em falta: ${path.relative(process.cwd(), staticRoot)}`);
  process.exit(1);
}

function findCssFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findCssFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".css") ? [fullPath] : [];
  });
}

const cssFiles = findCssFiles(staticRoot);

if (cssFiles.length === 0) {
  console.error(`Nenhum ficheiro CSS foi produzido em ${path.relative(process.cwd(), staticRoot)}.`);
  process.exit(1);
}

const css = cssFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const requiredSelectors = [
  ["responsive sm", ".sm\\:grid-cols-2"],
  ["responsive md", ".md\\:grid-cols-2"],
  ["responsive lg", ".lg\\:px-0"],
  ["spacing 4px", ".gap-y-4"],
  ["spacing 12px", ".p-12"],
  ["tipografia S", ".text-s-regular"],
  ["tipografia S semibold", ".text-s-semibold"],
  ["tipografia L", ".text-l-regular"],
] as const;

const missing = requiredSelectors.filter(([, selector]) => !css.includes(selector));
if (missing.length > 0) {
  console.error(`Tailwind 4 incompleto: ${missing.length} utility/ies não foram emitidas.`);
  for (const [label, selector] of missing) console.error(`- ${label}: ${selector}`);
  process.exit(1);
}

if (!css.includes(".agora-header")) {
  console.error("CSS do Ágora 4 não foi incluído no artefacto exportado.");
  process.exit(1);
}

console.log(
  `CSS v1 válido: Ágora 4 presente e ${requiredSelectors.length} utilities Tailwind 4 representativas emitidas em ${cssFiles.length} ficheiro(s).`,
);
