import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "out");
const siteRoot = path.join(root, ".build", "site");
const target = path.join(siteRoot, "guias.dados.gov.pt");

if (!fs.existsSync(source)) {
  throw new Error("Static export em falta: execute npm run build antes dos testes UX.");
}

fs.rmSync(siteRoot, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log("Site de teste preparado em .build/site/guias.dados.gov.pt.");
