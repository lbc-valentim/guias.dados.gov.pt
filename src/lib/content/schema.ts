import { z } from "zod";

const nextRefSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("task"), id: z.string().min(1) }),
  z.object({ type: z.literal("guide"), id: z.string().min(1) }),
  z.object({ type: z.literal("overview"), id: z.string().min(1) }),
]);
const tableSchema = z.array(z.array(z.string())).nullable();
const resourceSchema = z.object({ title: z.string().min(1), url: z.string().url() });
export const taskSchema = z.object({
  id: z.string().regex(/^(D\d{2}|CM)-T\d{2}$/), slug: z.string().min(1), title: z.string().min(1),
  intro: z.string(), roles: z.string(), steps: z.array(z.string()).min(1), example: z.string(), tip: z.string(),
  table: tableSchema, media: z.string(), nextRef: nextRefSchema,
});
export const guideSchema = z.object({
  id: z.string().min(1), code: z.string().min(1), slug: z.string().min(1), themeId: z.string().min(1),
  title: z.string().min(1), intro: z.string(), audience: z.string(), fichas: z.array(taskSchema),
  relatedGuideIds: z.array(z.string()), resources: z.array(resourceSchema).optional(),
});
export const themeSchema = z.object({
  id: z.string().min(1), slug: z.string().min(1), title: z.string().min(1), intro: z.string(), guideIds: z.array(z.string()).min(1),
});
export const guidesContentSchema = z.object({
  schemaVersion: z.literal("1.0"), locale: z.literal("pt-PT"), themes: z.array(themeSchema), guides: z.array(guideSchema),
});
export type GuidesContent = z.infer<typeof guidesContentSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type GuideTask = z.infer<typeof taskSchema>;
export type GuideTheme = z.infer<typeof themeSchema>;
