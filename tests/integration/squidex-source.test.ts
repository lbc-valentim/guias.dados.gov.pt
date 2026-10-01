import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  createConfiguredContentRepository,
  GUIDES_CONTENT_SOURCE_ENV,
  GUIDES_SQUIDEX_DRAFTS_ENV,
  GUIDES_SQUIDEX_ENDPOINT_ENV,
  GUIDES_SQUIDEX_TOKEN_ENV,
} from "../../src/lib/content/config";

const graphqlFixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-graphql-pilot.json",
);
const graphqlFixture = JSON.parse(fs.readFileSync(graphqlFixturePath, "utf8"));

async function main(): Promise<void> {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
  const endpoint =
    "https://cloud.squidex.io/api/content/guias-dados-gov-pt-piloto/graphql";

  try {
    globalThis.fetch = (async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => {
      calls.push({ input, init });
      return new Response(JSON.stringify(graphqlFixture), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const repository = createConfiguredContentRepository({
      [GUIDES_CONTENT_SOURCE_ENV]: "squidex",
      [GUIDES_SQUIDEX_ENDPOINT_ENV]: endpoint,
      [GUIDES_SQUIDEX_TOKEN_ENV]: "integration-token",
      [GUIDES_SQUIDEX_DRAFTS_ENV]: "true",
    });

    const content = await repository.load();

    assert.equal(calls.length, 1);
    assert.equal(String(calls[0].input), endpoint);

    const headers = new Headers(calls[0].init?.headers);
    assert.equal(headers.get("Authorization"), "Bearer integration-token");
    assert.equal(headers.get("X-Unpublished"), "true");

    assert.equal(content.locale, "pt-PT");
    assert.deepEqual(content.themes.map((theme) => theme.id), ["tema-piloto"]);
    assert.deepEqual(content.guides.map((guide) => guide.id), ["D99"]);
    assert.deepEqual(
      content.guides[0].fichas.map((task) => task.id),
      ["D99-T01", "D99-T02"],
    );
    assert.deepEqual(content.guides[0].fichas[0].nextRef, {
      type: "task",
      id: "D99-T02",
    });
    assert.deepEqual(content.guides[0].fichas[1].nextRef, {
      type: "overview",
      id: "D99",
    });

    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ message: "upstream unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;

    const failingRepository = createConfiguredContentRepository({
      [GUIDES_CONTENT_SOURCE_ENV]: "squidex",
      [GUIDES_SQUIDEX_ENDPOINT_ENV]: endpoint,
      [GUIDES_SQUIDEX_DRAFTS_ENV]: "true",
    });

    await assert.rejects(
      () => failingRepository.load(),
      /Squidex GraphQL respondeu HTTP 503/,
    );

    console.log(
      "Config -> Squidex -> GuidesContent: OK; falha remota não faz fallback silencioso",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
