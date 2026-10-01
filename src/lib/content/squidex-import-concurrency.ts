import { createHash } from "node:crypto";
import type { SquidexImportSchema } from "./squidex-import-readiness";

export interface SquidexObservedContent {
  schema: SquidexImportSchema;
  key: string;
  id: string;
  version: string;
  payloadHash?: string;
}

export type SquidexMutationPrecondition =
  | {
      kind: "create-if-absent";
      schema: SquidexImportSchema;
      key: string;
      id: string;
    }
  | {
      kind: "update-if-version";
      schema: SquidexImportSchema;
      key: string;
      id: string;
      version: string;
    };

export function deterministicSquidexContentId(
  schema: SquidexImportSchema,
  key: string,
): string {
  const hex = createHash("sha256")
    .update(`dados-gov-guides-v1:${schema}:${key}`)
    .digest("hex")
    .slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * O Squidex interpreta If-Match como um Entity Tag HTTP cujo conteúdo é a
 * versão numérica esperada. Ex.: versão 6 => If-Match: "6".
 *
 * Não usar o ETag fraco/hash que uma camada de cache possa expor num GET e
 * não enviar a versão sem aspas: ambos podem falhar o parse e fazer o
 * middleware assumir EtagVersion.Any, removendo a protecção concorrente.
 */
export function formatSquidexIfMatchVersion(version: string): string {
  if (!/^(0|[1-9]\d*)$/.test(version)) {
    throw new Error(`Versão Squidex inválida para If-Match: ${version}`);
  }
  return `"${version}"`;
}

export function buildSquidexMutationPrecondition(
  schema: SquidexImportSchema,
  key: string,
  current?: SquidexObservedContent,
): SquidexMutationPrecondition {
  if (!current) {
    return {
      kind: "create-if-absent",
      schema,
      key,
      id: deterministicSquidexContentId(schema, key),
    };
  }

  if (current.schema !== schema || current.key !== key) {
    throw new Error(`Estado remoto incompatível para ${schema}:${key}`);
  }
  if (!current.version) {
    throw new Error(`Versão remota ausente para ${schema}:${key}`);
  }
  formatSquidexIfMatchVersion(current.version);

  return {
    kind: "update-if-version",
    schema,
    key,
    id: current.id,
    version: current.version,
  };
}
