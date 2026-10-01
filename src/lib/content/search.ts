import type { GuidesContent } from "./schema";
import { buildRoutes } from "./routes";

export type SearchItem = {
  id: string;
  guideId: string;
  title: string;
  intro: string;
  text: string;
  url: string;
};

export function buildSearchIndex(content: GuidesContent): SearchItem[] {
  return buildRoutes(content)
    .filter((route) => route.kind === "task")
    .map((route) => ({
      id: route.task!.id,
      guideId: route.guide!.id,
      title: route.task!.title,
      intro: route.task!.intro,
      text: [
        route.task!.title,
        route.task!.intro,
        ...route.task!.steps,
        route.task!.tip,
      ].join(" "),
      url: route.path,
    }));
}
