import { guidesContentSchema, type GuidesContent } from "./schema";

export type SquidexPayloadMapper = (payload: unknown) => unknown;

export type ProvisionalSquidexNextType = "task" | "guide" | "overview";

export interface ProvisionalSquidexPayload {
  locale: "pt-PT";
  themes: Array<{
    key: string;
    slug: string;
    order: number;
    title: string;
    intro: string;
  }>;
  guides: Array<{
    key: string;
    code: string;
    slug: string;
    themeKey: string;
    order: number;
    title: string;
    intro: string;
    audience: string;
    taskKeys: string[];
    relatedGuideKeys: string[];
    resources?: Array<{ title: string; url: string }>;
  }>;
  tasks: Array<{
    key: string;
    slug: string;
    title: string;
    intro: string;
    roles: string;
    steps: Array<{ text: string }>;
    example: string;
    tip: string;
    table: string[][] | null;
    media: string;
    nextType: ProvisionalSquidexNextType;
    nextTaskKey?: string;
    nextGuideKey?: string;
  }>;
}

export function mapSquidexPayload(
  payload: unknown,
  mapper: SquidexPayloadMapper,
): GuidesContent {
  return guidesContentSchema.parse(mapper(payload));
}

export function mapProvisionalSquidexPayload(payload: unknown): GuidesContent {
  const source = payload as ProvisionalSquidexPayload;
  const tasksByKey = new Map(source.tasks.map((task) => [task.key, task]));

  const guides = source.guides.map((guide) => ({
    id: guide.key,
    code: guide.code,
    slug: guide.slug,
    themeId: guide.themeKey,
    title: guide.title,
    intro: guide.intro,
    audience: guide.audience,
    fichas: guide.taskKeys.map((taskKey) => {
      const task = tasksByKey.get(taskKey);
      if (!task) throw new Error(`Guia ${guide.key}: tarefa inexistente ${taskKey}`);

      const nextId =
        task.nextType === "task" ? task.nextTaskKey : task.nextGuideKey;

      if (!nextId) {
        throw new Error(`Tarefa ${task.key}: destino nextRef em falta`);
      }

      if (task.nextType === "task" && task.nextGuideKey) {
        throw new Error(`Tarefa ${task.key}: nextGuideKey incompatível com nextType=task`);
      }

      if (task.nextType !== "task" && task.nextTaskKey) {
        throw new Error(`Tarefa ${task.key}: nextTaskKey incompatível com nextType=${task.nextType}`);
      }

      return {
        id: task.key,
        slug: task.slug,
        title: task.title,
        intro: task.intro,
        roles: task.roles,
        steps: task.steps.map((step) => step.text),
        example: task.example,
        tip: task.tip,
        table: task.table,
        media: task.media,
        nextRef: { type: task.nextType, id: nextId },
      };
    }),
    relatedGuideIds: guide.relatedGuideKeys,
    ...(guide.resources?.length ? { resources: guide.resources } : {}),
  }));

  const themes = [...source.themes]
    .sort((a, b) => a.order - b.order)
    .map((theme) => ({
      id: theme.key,
      slug: theme.slug,
      title: theme.title,
      intro: theme.intro,
      guideIds: source.guides
        .filter((guide) => guide.themeKey === theme.key)
        .sort((a, b) => a.order - b.order)
        .map((guide) => guide.key),
    }));

  return guidesContentSchema.parse({
    schemaVersion: "1.0",
    locale: source.locale,
    themes,
    guides,
  });
}
