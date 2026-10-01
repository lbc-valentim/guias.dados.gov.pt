import type { GuidesContent, GuideTask } from "./schema";

export interface SquidexThemeCreatePlan {
  key: string;
  slug: string;
  order: number;
  title: string;
  intro: string;
}

export interface SquidexTaskCreatePlan {
  key: string;
  slug: string;
  title: string;
  intro: string;
  roles: string;
  steps: string[];
  example: string;
  tip: string;
  table: string[][] | null;
  media: string;
  nextType: GuideTask["nextRef"]["type"];
}

export interface SquidexGuideCreatePlan {
  key: string;
  code: string;
  slug: string;
  themeKey: string;
  order: number;
  title: string;
  intro: string;
  audience: string;
  taskKeys: string[];
  resources?: Array<{ title: string; url: string }>;
}

export interface SquidexGuideRelationsPatchPlan {
  guideKey: string;
  relatedGuideKeys: string[];
}

export type SquidexTaskNextPatchPlan =
  | { taskKey: string; nextType: "task"; nextTaskKey: string }
  | {
      taskKey: string;
      nextType: "guide" | "overview";
      nextGuideKey: string;
    };

export interface SquidexImportPlan {
  locale: "pt-PT";
  sourceCounts: {
    themes: number;
    guides: number;
    tasks: number;
  };
  phases: {
    createThemes: SquidexThemeCreatePlan[];
    createTasks: SquidexTaskCreatePlan[];
    createGuides: SquidexGuideCreatePlan[];
    patchGuideRelations: SquidexGuideRelationsPatchPlan[];
    patchTaskNextRefs: SquidexTaskNextPatchPlan[];
  };
  summary: {
    operations: number;
    guideTaskLinks: number;
    relatedGuideLinks: number;
    nextTaskLinks: number;
    nextGuideLinks: number;
    stepComponents: number;
    resourceComponents: number;
    tables: number;
  };
}

/**
 * Constrói um plano de migração sem efectuar qualquer chamada ao Squidex.
 *
 * As referências usam keys funcionais estáveis. IDs internos do Squidex só devem
 * ser resolvidos durante uma futura importação real, depois de cada conteúdo ter
 * sido criado. Isto permite representar dependências circulares sem inventar IDs.
 */
export function buildSquidexImportPlan(content: GuidesContent): SquidexImportPlan {
  const guideByKey = uniqueMap(content.guides, (guide) => guide.id, "guia");
  const tasks = content.guides.flatMap((guide) => guide.fichas);
  const taskByKey = uniqueMap(tasks, (task) => task.id, "tarefa");

  const guidePlacement = new Map<string, { themeKey: string; order: number }>();
  const createThemes = content.themes.map((theme, themeIndex) => {
    theme.guideIds.forEach((guideKey, guideIndex) => {
      const guide = guideByKey.get(guideKey);
      if (!guide) {
        throw new Error(`Tema ${theme.id}: guia inexistente ${guideKey}`);
      }
      if (guide.themeId !== theme.id) {
        throw new Error(
          `Guia ${guideKey}: themeId ${guide.themeId} diverge do tema ${theme.id}`,
        );
      }
      if (guidePlacement.has(guideKey)) {
        throw new Error(`Guia ${guideKey}: aparece em mais de um tema`);
      }
      guidePlacement.set(guideKey, {
        themeKey: theme.id,
        order: guideIndex + 1,
      });
    });

    return {
      key: theme.id,
      slug: theme.slug,
      order: themeIndex + 1,
      title: theme.title,
      intro: theme.intro,
    };
  });

  for (const guide of content.guides) {
    if (!guidePlacement.has(guide.id)) {
      throw new Error(`Guia ${guide.id}: não está ordenado em nenhum tema`);
    }
  }

  const createTasks = tasks.map((task) => ({
    key: task.id,
    slug: task.slug,
    title: task.title,
    intro: task.intro,
    roles: task.roles,
    steps: [...task.steps],
    example: task.example,
    tip: task.tip,
    table: task.table?.map((row) => [...row]) ?? null,
    media: task.media,
    nextType: task.nextRef.type,
  }));

  const createGuides = content.guides.map((guide) => {
    const placement = guidePlacement.get(guide.id);
    if (!placement) {
      throw new Error(`Guia ${guide.id}: colocação não resolvida`);
    }

    return {
      key: guide.id,
      code: guide.code,
      slug: guide.slug,
      themeKey: placement.themeKey,
      order: placement.order,
      title: guide.title,
      intro: guide.intro,
      audience: guide.audience,
      taskKeys: guide.fichas.map((task) => task.id),
      ...(guide.resources
        ? { resources: guide.resources.map((resource) => ({ ...resource })) }
        : {}),
    };
  });

  const patchGuideRelations = content.guides
    .filter((guide) => guide.relatedGuideIds.length > 0)
    .map((guide) => {
      for (const relatedGuideKey of guide.relatedGuideIds) {
        if (!guideByKey.has(relatedGuideKey)) {
          throw new Error(
            `Guia ${guide.id}: relacionado inexistente ${relatedGuideKey}`,
          );
        }
      }
      return {
        guideKey: guide.id,
        relatedGuideKeys: [...guide.relatedGuideIds],
      };
    });

  const patchTaskNextRefs = tasks.map<SquidexTaskNextPatchPlan>((task) => {
    if (task.nextRef.type === "task") {
      if (!taskByKey.has(task.nextRef.id)) {
        throw new Error(
          `Tarefa ${task.id}: nextTask inexistente ${task.nextRef.id}`,
        );
      }
      return {
        taskKey: task.id,
        nextType: "task",
        nextTaskKey: task.nextRef.id,
      };
    }

    if (!guideByKey.has(task.nextRef.id)) {
      throw new Error(
        `Tarefa ${task.id}: nextGuide inexistente ${task.nextRef.id}`,
      );
    }
    return {
      taskKey: task.id,
      nextType: task.nextRef.type,
      nextGuideKey: task.nextRef.id,
    };
  });

  const relatedGuideLinks = content.guides.reduce(
    (total, guide) => total + guide.relatedGuideIds.length,
    0,
  );
  const nextTaskLinks = tasks.filter(
    (task) => task.nextRef.type === "task",
  ).length;
  const nextGuideLinks = tasks.length - nextTaskLinks;

  const phases = {
    createThemes,
    createTasks,
    createGuides,
    patchGuideRelations,
    patchTaskNextRefs,
  };

  return {
    locale: content.locale,
    sourceCounts: {
      themes: content.themes.length,
      guides: content.guides.length,
      tasks: tasks.length,
    },
    phases,
    summary: {
      operations:
        createThemes.length +
        createTasks.length +
        createGuides.length +
        patchGuideRelations.length +
        patchTaskNextRefs.length,
      guideTaskLinks: tasks.length,
      relatedGuideLinks,
      nextTaskLinks,
      nextGuideLinks,
      stepComponents: tasks.reduce(
        (total, task) => total + task.steps.length,
        0,
      ),
      resourceComponents: content.guides.reduce(
        (total, guide) => total + (guide.resources?.length ?? 0),
        0,
      ),
      tables: tasks.filter((task) => task.table !== null).length,
    },
  };
}

function uniqueMap<T>(
  values: readonly T[],
  keyOf: (value: T) => string,
  label: string,
): Map<string, T> {
  const result = new Map<string, T>();
  for (const value of values) {
    const key = keyOf(value);
    if (result.has(key)) {
      throw new Error(`Key de ${label} duplicada: ${key}`);
    }
    result.set(key, value);
  }
  return result;
}
