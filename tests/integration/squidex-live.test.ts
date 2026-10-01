import assert from "node:assert/strict";
import { createConfiguredContentRepository } from "../../src/lib/content/config";

async function main(): Promise<void> {
  if (process.env.GUIDES_CONTENT_SOURCE !== "squidex") {
    throw new Error(
      "Smoke live requer GUIDES_CONTENT_SOURCE=squidex e configuração server-only do Squidex",
    );
  }

  const repository = createConfiguredContentRepository(process.env);
  const content = await repository.load();

  assert.equal(content.schemaVersion, "1.0");
  assert.equal(content.locale, "pt-PT");
  assert.ok(content.themes.length > 0, "Esperado pelo menos um tema");
  assert.ok(content.guides.length > 0, "Esperado pelo menos um guia");
  assert.ok(
    content.guides.some((guide) => guide.fichas.length > 0),
    "Esperada pelo menos uma tarefa",
  );

  const taskCount = content.guides.reduce(
    (total, guide) => total + guide.fichas.length,
    0,
  );

  console.log(
    `Squidex live smoke: OK (${content.themes.length} temas, ${content.guides.length} guias, ${taskCount} tarefas)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
