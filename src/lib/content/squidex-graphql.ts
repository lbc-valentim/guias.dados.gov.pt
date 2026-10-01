import type { SquidexTransport } from "./squidex-repository";
import type {
  ProvisionalSquidexNextType,
  ProvisionalSquidexPayload,
} from "./squidex-mapper";

export const SQUIDEX_GUIDES_GRAPHQL_QUERY = /* GraphQL */ `
  query GetGuidesContent {
    queryGuideThemeContentsWithTotal(top: 200) {
      items {
        id
        status
        flatData {
          key
          slug
          order
          title
          intro
        }
      }
    }
    queryGuideContentsWithTotal(top: 200) {
      items {
        id
        status
        flatData {
          key
          code
          slug
          theme {
            id
          }
          order
          title
          intro
          audience
          tasks {
            id
          }
          relatedGuides {
            id
          }
          resources {
            title
            url
          }
        }
      }
    }
    queryGuideTaskContentsWithTotal(top: 200) {
      items {
        id
        status
        flatData {
          key
          slug
          title
          intro
          roles
          steps {
            text
          }
          example
          tip
          table
          media
          nextType
          nextTask {
            id
          }
          nextGuide {
            id
          }
        }
      }
    }
  }
`;

export interface SquidexGraphQLTransportOptions {
  endpoint: string;
  accessToken?: string;
  includeDrafts?: boolean;
  fetchImpl?: typeof fetch;
}

/**
 * Transporte mínimo para o endpoint GraphQL de uma App Squidex.
 *
 * Só é instanciado quando o composition root selecciona explicitamente Squidex.
 * A selecção da fonte permanece server-side e não existe fallback silencioso.
 */
export class SquidexGraphQLTransport implements SquidexTransport {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: SquidexGraphQLTransportOptions) {
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
  }

  async fetchContent(): Promise<unknown> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.options.accessToken) {
      headers.Authorization = `Bearer ${this.options.accessToken}`;
    }

    if (this.options.includeDrafts) {
      headers["X-Unpublished"] = "true";
    }

    const response = await this.fetchImpl(this.options.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: SQUIDEX_GUIDES_GRAPHQL_QUERY }),
    });

    const payload: unknown = await response.json();

    if (!response.ok) {
      throw new Error(`Squidex GraphQL respondeu HTTP ${response.status}`);
    }

    const root = asRecord(payload, "resposta GraphQL");
    if (Array.isArray(root.errors) && root.errors.length > 0) {
      const messages = root.errors
        .map((error) =>
          isRecord(error) && typeof error.message === "string"
            ? error.message
            : "erro GraphQL sem mensagem",
        )
        .join("; ");
      throw new Error(`Squidex GraphQL devolveu erros: ${messages}`);
    }

    return payload;
  }
}

type GraphQLContentItem = {
  id: string;
  flatData: Record<string, unknown>;
};

/**
 * Converte a resposta GraphQL real do Squidex no contrato normalizado que o
 * mapper de domínio já conhece. Referências Squidex são resolvidas de ID para
 * as keys editoriais estáveis antes de chegarem a GuidesContent.
 */
export function normalizeSquidexGraphQLPayload(
  payload: unknown,
): ProvisionalSquidexPayload {
  const root = asRecord(payload, "resposta GraphQL");
  const data = asRecord(root.data, "data GraphQL");

  const themeItems = getItems(data, "queryGuideThemeContentsWithTotal");
  const guideItems = getItems(data, "queryGuideContentsWithTotal");
  const taskItems = getItems(data, "queryGuideTaskContentsWithTotal");

  const idToKey = new Map<string, string>();
  for (const item of [...themeItems, ...guideItems, ...taskItems]) {
    const key = asString(item.flatData.key, `key de ${item.id}`);
    if (idToKey.has(item.id)) {
      throw new Error(`ID Squidex duplicado: ${item.id}`);
    }
    idToKey.set(item.id, key);
  }

  const resolveReference = (id: string, label: string): string => {
    const key = idToKey.get(id);
    if (!key) throw new Error(`${label}: referência Squidex inexistente ${id}`);
    return key;
  };

  const themes = themeItems
    .map((item) => ({
      key: asString(item.flatData.key, "theme.key"),
      slug: asString(item.flatData.slug, "theme.slug"),
      order: asNumber(item.flatData.order, "theme.order"),
      title: asString(item.flatData.title, "theme.title"),
      intro: asString(item.flatData.intro, "theme.intro"),
    }))
    .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));

  const guides = guideItems
    .map((item) => {
      const themeIds = referenceIds(item.flatData.theme, "guide.theme");
      if (themeIds.length !== 1) {
        throw new Error(
          `Guia ${String(item.flatData.key)}: esperado exactamente 1 tema, recebido ${themeIds.length}`,
        );
      }

      return {
        key: asString(item.flatData.key, "guide.key"),
        code: asString(item.flatData.code, "guide.code"),
        slug: asString(item.flatData.slug, "guide.slug"),
        themeKey: resolveReference(themeIds[0], "guide.theme"),
        order: asNumber(item.flatData.order, "guide.order"),
        title: asString(item.flatData.title, "guide.title"),
        intro: asString(item.flatData.intro, "guide.intro"),
        audience: asString(item.flatData.audience, "guide.audience"),
        taskKeys: referenceIds(item.flatData.tasks, "guide.tasks").map((id) =>
          resolveReference(id, "guide.tasks"),
        ),
        relatedGuideKeys: referenceIds(
          item.flatData.relatedGuides,
          "guide.relatedGuides",
        ).map((id) => resolveReference(id, "guide.relatedGuides")),
        resources: componentResources(item.flatData.resources),
      };
    })
    .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));

  const tasks = taskItems
    .map((item) => {
      const nextType = nextTypeValue(item.flatData.nextType);
      const nextTaskIds = referenceIds(item.flatData.nextTask, "task.nextTask");
      const nextGuideIds = referenceIds(item.flatData.nextGuide, "task.nextGuide");

      if (nextTaskIds.length > 1 || nextGuideIds.length > 1) {
        throw new Error(
          `Tarefa ${String(item.flatData.key)}: destino nextRef deve ser singular`,
        );
      }

      const task: ProvisionalSquidexPayload["tasks"][number] = {
        key: asString(item.flatData.key, "task.key"),
        slug: asString(item.flatData.slug, "task.slug"),
        title: asString(item.flatData.title, "task.title"),
        intro: asString(item.flatData.intro, "task.intro"),
        roles: asString(item.flatData.roles, "task.roles"),
        steps: componentSteps(item.flatData.steps),
        example: asString(item.flatData.example, "task.example"),
        tip: asString(item.flatData.tip, "task.tip"),
        table: stringTable(item.flatData.table),
        media: asString(item.flatData.media, "task.media"),
        nextType,
      };

      if (nextTaskIds[0]) {
        task.nextTaskKey = resolveReference(nextTaskIds[0], "task.nextTask");
      }
      if (nextGuideIds[0]) {
        task.nextGuideKey = resolveReference(nextGuideIds[0], "task.nextGuide");
      }

      return task;
    })
    .sort((a, b) => a.key.localeCompare(b.key));

  return {
    locale: "pt-PT",
    themes,
    guides,
    tasks,
  };
}

function getItems(
  data: Record<string, unknown>,
  field: string,
): GraphQLContentItem[] {
  const connection = asRecord(data[field], field);
  const items = asArray(connection.items, `${field}.items`);

  return items.map((value, index) => {
    const item = asRecord(value, `${field}.items[${index}]`);
    return {
      id: asString(item.id, `${field}.items[${index}].id`),
      flatData: asRecord(
        item.flatData,
        `${field}.items[${index}].flatData`,
      ),
    };
  });
}

function referenceIds(value: unknown, label: string): string[] {
  if (value == null) return [];
  return asArray(value, label).map((entry, index) =>
    asString(asRecord(entry, `${label}[${index}]`).id, `${label}[${index}].id`),
  );
}

function componentSteps(value: unknown): Array<{ text: string }> {
  return asArray(value, "task.steps").map((entry, index) => ({
    text: asString(
      asRecord(entry, `task.steps[${index}]`).text,
      `task.steps[${index}].text`,
    ),
  }));
}

function componentResources(
  value: unknown,
): Array<{ title: string; url: string }> {
  if (value == null) return [];
  return asArray(value, "guide.resources").map((entry, index) => {
    const resource = asRecord(entry, `guide.resources[${index}]`);
    return {
      title: asString(resource.title, `guide.resources[${index}].title`),
      url: asString(resource.url, `guide.resources[${index}].url`),
    };
  });
}

function stringTable(value: unknown): string[][] | null {
  if (value == null) return null;
  return asArray(value, "task.table").map((row, rowIndex) =>
    asArray(row, `task.table[${rowIndex}]`).map((cell, cellIndex) =>
      asString(cell, `task.table[${rowIndex}][${cellIndex}]`),
    ),
  );
}

function nextTypeValue(value: unknown): ProvisionalSquidexNextType {
  const nextType = asString(value, "task.nextType");
  if (nextType !== "task" && nextType !== "guide" && nextType !== "overview") {
    throw new Error(`task.nextType inválido: ${nextType}`);
  }
  return nextType;
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(`${label}: esperado objecto`);
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label}: esperado array`);
  return value;
}

function asString(value: unknown, label: string): string {
  if (typeof value !== "string") throw new Error(`${label}: esperado texto`);
  return value;
}

function asNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label}: esperado número finito`);
  }
  return value;
}
