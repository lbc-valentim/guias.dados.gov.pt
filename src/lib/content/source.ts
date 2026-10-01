import type { GuidesContent } from "./schema";
import {
  LocalJsonRepository,
  type ContentRepository,
} from "./repository";
import {
  mapProvisionalSquidexPayload,
} from "./squidex-mapper";
import {
  normalizeSquidexGraphQLPayload,
  SquidexGraphQLTransport,
  type SquidexGraphQLTransportOptions,
} from "./squidex-graphql";
import {
  SquidexRepository,
  type AsyncContentRepository,
} from "./squidex-repository";

export type GuidesContentSource = "local" | "squidex";

export interface CreateContentRepositoryOptions {
  source?: GuidesContentSource;
  localRepository?: ContentRepository;
  squidex?: SquidexGraphQLTransportOptions;
}

class AsyncLocalContentRepository implements AsyncContentRepository {
  constructor(private readonly repository: ContentRepository) {}

  async load(): Promise<GuidesContent> {
    return this.repository.load();
  }
}

/**
 * Composition root da fonte de conteúdo dos Guias.
 *
 * O default permanece Local JSON. Squidex só é seleccionado quando o chamador
 * pede explicitamente source="squidex" e fornece a configuração do transporte.
 * A UI server-side consome esta fronteira através de loadConfiguredContent().
 */
export function createAsyncContentRepository(
  options: CreateContentRepositoryOptions = {},
): AsyncContentRepository {
  const source = options.source ?? "local";

  if (source === "local") {
    return new AsyncLocalContentRepository(
      options.localRepository ?? new LocalJsonRepository(),
    );
  }

  if (!options.squidex) {
    throw new Error(
      "Fonte Squidex seleccionada sem configuração do transporte GraphQL",
    );
  }

  const transport = new SquidexGraphQLTransport(options.squidex);

  return new SquidexRepository(transport, (payload) =>
    mapProvisionalSquidexPayload(normalizeSquidexGraphQLPayload(payload)),
  );
}
