import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  GUIDES_CONTENT_SOURCE_ENV,
  GUIDES_SQUIDEX_DRAFTS_ENV,
  GUIDES_SQUIDEX_ENDPOINT_ENV,
  GUIDES_SQUIDEX_TOKEN_ENV,
  loadConfiguredContent,
  resolveGuidesContentOptions,
} from "../../src/lib/content/config";
import {
  normalizeSquidexGraphQLPayload,
  SQUIDEX_GUIDES_GRAPHQL_QUERY,
  SquidexGraphQLTransport,
} from "../../src/lib/content/squidex-graphql";
import { mapProvisionalSquidexPayload } from "../../src/lib/content/squidex-mapper";
import { createAsyncContentRepository } from "../../src/lib/content/source";

const fixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-pilot.json",
);
const graphqlFixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-graphql-pilot.json",
);

const provisionalFixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const graphqlFixture = JSON.parse(fs.readFileSync(graphqlFixturePath, "utf8"));

async function main(): Promise<void> {
  const normalized = normalizeSquidexGraphQLPayload(graphqlFixture);
  assert.deepEqual(normalized, provisionalFixture);

  const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ input, init });
    return new Response(JSON.stringify(graphqlFixture), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const endpoint =
    "https://cloud.squidex.io/api/content/guias-dados-gov-pt-piloto/graphql";
  const transport = new SquidexGraphQLTransport({
    endpoint,
    accessToken: "test-token",
    includeDrafts: true,
    fetchImpl,
  });

  const transported = await transport.fetchContent();
  assert.deepEqual(transported, graphqlFixture);
  assert.equal(calls.length, 1);
  assert.equal(String(calls[0].input), endpoint);
  assert.equal(calls[0].init?.method, "POST");

  const requestHeaders = new Headers(calls[0].init?.headers);
  assert.equal(requestHeaders.get("Authorization"), "Bearer test-token");
  assert.equal(requestHeaders.get("X-Unpublished"), "true");
  assert.match(
    String(calls[0].init?.body),
    /queryGuideThemeContentsWithTotal\(top: 200\)/,
  );
  assert.match(
    SQUIDEX_GUIDES_GRAPHQL_QUERY,
    /queryGuideContentsWithTotal\(top: 200\)/,
  );
  assert.match(
    SQUIDEX_GUIDES_GRAPHQL_QUERY,
    /queryGuideTaskContentsWithTotal\(top: 200\)/,
  );

  const content = mapProvisionalSquidexPayload(normalized);

  assert.equal(content.schemaVersion, "1.0");
  assert.equal(content.locale, "pt-PT");
  assert.equal(content.themes.length, 1);
  assert.deepEqual(content.themes[0].guideIds, ["D99"]);

  assert.equal(content.guides.length, 1);
  const guide = content.guides[0];
  assert.equal(guide.id, "D99");
  assert.equal(guide.themeId, "tema-piloto");
  assert.deepEqual(
    guide.fichas.map((task) => task.id),
    ["D99-T01", "D99-T02"],
  );
  assert.deepEqual(guide.fichas[0].steps, [
    "Executar o primeiro passo técnico.",
    "Confirmar o resultado técnico.",
  ]);
  assert.deepEqual(guide.fichas[0].nextRef, {
    type: "task",
    id: "D99-T02",
  });
  assert.deepEqual(guide.fichas[1].nextRef, {
    type: "overview",
    id: "D99",
  });
  assert.deepEqual(guide.fichas[1].table, [
    ["Campo", "Valor"],
    ["piloto", "ok"],
  ]);

  const localRepository = createAsyncContentRepository({
    localRepository: { load: () => content },
  });
  assert.deepEqual(await localRepository.load(), content);

  const sourceCalls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
  const sourceFetchImpl = (async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    sourceCalls.push({ input, init });
    return new Response(JSON.stringify(graphqlFixture), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const squidexRepository = createAsyncContentRepository({
    source: "squidex",
    squidex: {
      endpoint,
      accessToken: "test-token",
      includeDrafts: true,
      fetchImpl: sourceFetchImpl,
    },
  });

  assert.deepEqual(await squidexRepository.load(), content);
  assert.equal(sourceCalls.length, 1);

  assert.throws(
    () => createAsyncContentRepository({ source: "squidex" }),
    /sem configuração do transporte GraphQL/,
  );

  assert.deepEqual(resolveGuidesContentOptions({}), { source: "local" });
  assert.deepEqual(
    resolveGuidesContentOptions({
      [GUIDES_CONTENT_SOURCE_ENV]: "squidex",
      [GUIDES_SQUIDEX_ENDPOINT_ENV]: endpoint,
      [GUIDES_SQUIDEX_TOKEN_ENV]: "server-token",
      [GUIDES_SQUIDEX_DRAFTS_ENV]: "true",
    }),
    {
      source: "squidex",
      squidex: {
        endpoint,
        accessToken: "server-token",
        includeDrafts: true,
      },
    },
  );
  assert.throws(
    () =>
      resolveGuidesContentOptions({
        [GUIDES_CONTENT_SOURCE_ENV]: "squidex",
      }),
    new RegExp(GUIDES_SQUIDEX_ENDPOINT_ENV),
  );
  assert.throws(
    () =>
      resolveGuidesContentOptions({
        [GUIDES_CONTENT_SOURCE_ENV]: "remote",
      }),
    /esperado "local" ou "squidex"/,
  );
  assert.throws(
    () =>
      resolveGuidesContentOptions({
        [GUIDES_CONTENT_SOURCE_ENV]: "squidex",
        [GUIDES_SQUIDEX_ENDPOINT_ENV]: endpoint,
        [GUIDES_SQUIDEX_DRAFTS_ENV]: "yes",
      }),
    /esperado "true" ou "false"/,
  );

  const configuredLocal = await loadConfiguredContent({});
  assert.equal(configuredLocal.locale, "pt-PT");
  assert.equal(configuredLocal.themes.length, 7);
  assert.equal(configuredLocal.guides.length, 15);

  console.log(
    "Local default + Squidex opt-in + configuração server-only + loadConfiguredContent: OK",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
