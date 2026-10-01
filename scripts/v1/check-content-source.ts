import {
  loadConfiguredContent,
  resolveGuidesContentOptions,
} from "../../src/lib/content/config";

async function main(): Promise<void> {
  const options = resolveGuidesContentOptions();
  const content = await loadConfiguredContent();
  const taskCount = content.guides.reduce(
    (total, guide) => total + guide.fichas.length,
    0,
  );

  console.log(
    [
      "Fonte de conteúdo válida",
      `source=${options.source ?? "local"}`,
      `locale=${content.locale}`,
      `themes=${content.themes.length}`,
      `guides=${content.guides.length}`,
      `tasks=${taskCount}`,
    ].join("; "),
  );
}

main().catch((error) => {
  console.error(
    `Falha ao validar fonte de conteúdo: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  process.exitCode = 1;
});
