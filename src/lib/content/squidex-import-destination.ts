import { createHash } from "node:crypto";
import type { SquidexImportSchema } from "./squidex-import-readiness";

export interface SquidexImportDestination {
  apiBaseUrl: string;
  appName: string;
  schemaIds: Record<SquidexImportSchema, string>;
}

export function computeSquidexDestinationHash(
  destination: SquidexImportDestination,
): string {
  const normalized = {
    apiBaseUrl: destination.apiBaseUrl.replace(/\/+$/, ""),
    appName: destination.appName,
    schemaIds: {
      "guide-theme": destination.schemaIds["guide-theme"],
      guide: destination.schemaIds.guide,
      "guide-task": destination.schemaIds["guide-task"],
    },
  };
  return createHash("sha256").update(JSON.stringify(normalized)).digest("hex");
}

export function assertSquidexDestination(
  destination: SquidexImportDestination,
  expectedHash: string,
): string {
  const actual = computeSquidexDestinationHash(destination);
  if (!expectedHash || actual !== expectedHash) {
    throw new Error("Destino Squidex divergente do destino autorizado");
  }
  return actual;
}
