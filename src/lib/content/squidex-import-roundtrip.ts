import type { SquidexImportPlan } from "./squidex-import-plan";
import type { ProvisionalSquidexPayload } from "./squidex-mapper";

export function materializeSquidexImportPlan(
  plan: SquidexImportPlan,
): ProvisionalSquidexPayload {
  const relatedByGuide = new Map(
    plan.phases.patchGuideRelations.map((item) => [
      item.guideKey,
      item.relatedGuideKeys,
    ]),
  );
  const nextByTask = new Map(
    plan.phases.patchTaskNextRefs.map((item) => [item.taskKey, item]),
  );

  return {
    locale: plan.locale,
    themes: plan.phases.createThemes.map((item) => ({ ...item })),
    guides: plan.phases.createGuides.map((item) => ({
      key: item.key,
      code: item.code,
      slug: item.slug,
      themeKey: item.themeKey,
      order: item.order,
      title: item.title,
      intro: item.intro,
      audience: item.audience,
      taskKeys: [...item.taskKeys],
      relatedGuideKeys: [...(relatedByGuide.get(item.key) ?? [])],
      ...(item.resources
        ? { resources: item.resources.map((resource) => ({ ...resource })) }
        : {}),
    })),
    tasks: plan.phases.createTasks.map((item) => {
      const next = nextByTask.get(item.key);
      if (!next) {
        throw new Error(`Plano incompleto: nextRef ausente para ${item.key}`);
      }

      return {
        key: item.key,
        slug: item.slug,
        title: item.title,
        intro: item.intro,
        roles: item.roles,
        steps: item.steps.map((text) => ({ text })),
        example: item.example,
        tip: item.tip,
        table: item.table?.map((row) => [...row]) ?? null,
        media: item.media,
        nextType: next.nextType,
        ...(next.nextType === "task"
          ? { nextTaskKey: next.nextTaskKey }
          : { nextGuideKey: next.nextGuideKey }),
      };
    }),
  };
}
