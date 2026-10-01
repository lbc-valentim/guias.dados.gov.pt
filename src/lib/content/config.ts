import {
  createAsyncContentRepository,
  type CreateContentRepositoryOptions,
  type GuidesContentSource,
} from "./source";
import type { GuidesContent } from "./schema";
import type { AsyncContentRepository } from "./squidex-repository";

export const GUIDES_CONTENT_SOURCE_ENV = "GUIDES_CONTENT_SOURCE";
export const GUIDES_SQUIDEX_ENDPOINT_ENV = "GUIDES_SQUIDEX_GRAPHQL_ENDPOINT";
export const GUIDES_SQUIDEX_TOKEN_ENV = "GUIDES_SQUIDEX_ACCESS_TOKEN";
export const GUIDES_SQUIDEX_DRAFTS_ENV = "GUIDES_SQUIDEX_INCLUDE_DRAFTS";

export type GuidesEnvironment = Readonly<Record<string, string | undefined>>;

/**
 * Resolve a fonte de conteúdo exclusivamente no servidor.
 *
 * Ausência de configuração mantém o comportamento seguro: Local JSON.
 * Squidex só é activado por GUIDES_CONTENT_SOURCE=squidex.
 */
export function resolveGuidesContentOptions(
  env: GuidesEnvironment = process.env,
): CreateContentRepositoryOptions {
  const source = parseSource(env[GUIDES_CONTENT_SOURCE_ENV]);

  if (source === "local") {
    return { source };
  }

  const endpoint = env[GUIDES_SQUIDEX_ENDPOINT_ENV]?.trim();
  if (!endpoint) {
    throw new Error(
      `${GUIDES_SQUIDEX_ENDPOINT_ENV} é obrigatório quando ${GUIDES_CONTENT_SOURCE_ENV}=squidex`,
    );
  }

  return {
    source,
    squidex: {
      endpoint,
      accessToken: env[GUIDES_SQUIDEX_TOKEN_ENV]?.trim() || undefined,
      includeDrafts: parseBoolean(
        env[GUIDES_SQUIDEX_DRAFTS_ENV],
        GUIDES_SQUIDEX_DRAFTS_ENV,
      ),
    },
  };
}

export function createConfiguredContentRepository(
  env: GuidesEnvironment = process.env,
): AsyncContentRepository {
  return createAsyncContentRepository(resolveGuidesContentOptions(env));
}

/**
 * Fronteira async usada pelos consumidores server-side da UI.
 * O default continua Local JSON; Squidex exige opt in explícito por ambiente.
 */
export async function loadConfiguredContent(
  env: GuidesEnvironment = process.env,
): Promise<GuidesContent> {
  return createConfiguredContentRepository(env).load();
}

function parseSource(value: string | undefined): GuidesContentSource {
  if (value == null || value.trim() === "" || value === "local") {
    return "local";
  }
  if (value === "squidex") {
    return "squidex";
  }
  throw new Error(
    `${GUIDES_CONTENT_SOURCE_ENV} inválido: esperado "local" ou "squidex"`,
  );
}

function parseBoolean(value: string | undefined, name: string): boolean {
  if (value == null || value.trim() === "" || value === "false") return false;
  if (value === "true") return true;
  throw new Error(`${name} inválido: esperado "true" ou "false"`);
}
