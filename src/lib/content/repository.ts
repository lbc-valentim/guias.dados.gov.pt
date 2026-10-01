import fs from "node:fs";
import path from "node:path";
import { guidesContentSchema, type GuidesContent } from "./schema";

export interface ContentRepository {
  load(): GuidesContent;
}

export class LocalJsonRepository implements ContentRepository {
  private cache: GuidesContent | undefined;

  load(): GuidesContent {
    if (this.cache) return this.cache;

    const file = path.join(process.cwd(), "content", "guides.json");
    const parsed = guidesContentSchema.parse(
      JSON.parse(fs.readFileSync(file, "utf8")),
    );

    validateReferences(parsed);
    this.cache = parsed;
    return parsed;
  }
}

const repository: ContentRepository = new LocalJsonRepository();

export function loadContent(): GuidesContent {
  return repository.load();
}

export function validateReferences(content: GuidesContent): void {
  const guideIds = new Set(content.guides.map((g) => g.id));
  const taskIds = new Set(content.guides.flatMap((g) => g.fichas.map((f) => f.id)));

  if (guideIds.size !== content.guides.length) {
    throw new Error("IDs de guia duplicados");
  }

  if (taskIds.size !== content.guides.reduce((n, g) => n + g.fichas.length, 0)) {
    throw new Error("IDs de ficha duplicados");
  }

  for (const theme of content.themes) {
    for (const id of theme.guideIds) {
      if (!guideIds.has(id)) {
        throw new Error(`Tema ${theme.id}: guia inexistente ${id}`);
      }
    }
  }

  for (const guide of content.guides) {
    if (!content.themes.some((t) => t.id === guide.themeId && t.guideIds.includes(guide.id))) {
      throw new Error(`Guia ${guide.id}: themeId inconsistente`);
    }

    for (const id of guide.relatedGuideIds) {
      if (!guideIds.has(id)) {
        throw new Error(`Guia ${guide.id}: relacionado inexistente ${id}`);
      }
    }

    for (const task of guide.fichas) {
      const ref = task.nextRef;
      if (ref.type === "task" && !taskIds.has(ref.id)) {
        throw new Error(`Ficha ${task.id}: nextRef inexistente ${ref.id}`);
      }
      if ((ref.type === "guide" || ref.type === "overview") && !guideIds.has(ref.id)) {
        throw new Error(`Ficha ${task.id}: nextRef guia inexistente ${ref.id}`);
      }
    }
  }
}
