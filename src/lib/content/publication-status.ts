import rawPublicationStatus from "../../../content/guide-publication-status.json";
import { z } from "zod";
import type { GuidesContent } from "./schema";

const publicationStatusSchema = z.object({
  schemaVersion: z.literal("1.0"),
  guides: z.record(
    z.string(),
    z.object({
      status: z.literal("not-currently-available"),
      label: z.string().min(1),
      message: z.string().min(1),
      verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }),
  ),
});

const publicationStatus = publicationStatusSchema.parse(rawPublicationStatus);
export type GuidePublicationStatus = (typeof publicationStatus.guides)[string];

export function getGuidePublicationStatus(guideId: string): GuidePublicationStatus | undefined {
  return publicationStatus.guides[guideId];
}

export function validateGuidePublicationStatus(content: GuidesContent): number {
  const guideIds = new Set(content.guides.map((guide) => guide.id));
  for (const guideId of Object.keys(publicationStatus.guides)) {
    if (!guideIds.has(guideId)) {
      throw new Error(`Estado editorial refere guia inexistente: ${guideId}`);
    }
  }
  return Object.keys(publicationStatus.guides).length;
}
