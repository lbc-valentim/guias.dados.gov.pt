import type { GuidesContent } from "./schema";

export interface GuidesContentEquivalenceResult {
  equivalent: boolean;
  differences: string[];
}

export function compareGuidesContent(
  expected: GuidesContent,
  actual: GuidesContent,
  maxDifferences = 100,
): GuidesContentEquivalenceResult {
  const differences: string[] = [];
  compareValue(expected, actual, "$", differences, maxDifferences);
  return {
    equivalent: differences.length === 0,
    differences,
  };
}

function compareValue(
  expected: unknown,
  actual: unknown,
  path: string,
  differences: string[],
  maxDifferences: number,
): void {
  if (differences.length >= maxDifferences) return;

  if (Object.is(expected, actual)) return;

  if (Array.isArray(expected) || Array.isArray(actual)) {
    if (!Array.isArray(expected) || !Array.isArray(actual)) {
      differences.push(`${path}: tipo diferente`);
      return;
    }
    if (expected.length !== actual.length) {
      differences.push(
        `${path}.length: esperado ${expected.length}, obtido ${actual.length}`,
      );
    }
    const length = Math.max(expected.length, actual.length);
    for (let index = 0; index < length; index += 1) {
      compareValue(
        expected[index],
        actual[index],
        `${path}[${index}]`,
        differences,
        maxDifferences,
      );
      if (differences.length >= maxDifferences) return;
    }
    return;
  }

  if (isRecord(expected) || isRecord(actual)) {
    if (!isRecord(expected) || !isRecord(actual)) {
      differences.push(`${path}: tipo diferente`);
      return;
    }
    const keys = new Set([...Object.keys(expected), ...Object.keys(actual)]);
    for (const key of [...keys].sort()) {
      if (!(key in expected)) {
        differences.push(`${path}.${key}: inesperado`);
        continue;
      }
      if (!(key in actual)) {
        differences.push(`${path}.${key}: em falta`);
        continue;
      }
      compareValue(
        expected[key],
        actual[key],
        `${path}.${key}`,
        differences,
        maxDifferences,
      );
      if (differences.length >= maxDifferences) return;
    }
    return;
  }

  differences.push(
    `${path}: esperado ${JSON.stringify(expected)}, obtido ${JSON.stringify(actual)}`,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
