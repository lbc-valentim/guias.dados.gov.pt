export interface SquidexImportSafetyEvidence {
  deterministicCreateIds: boolean;
  optimisticConcurrency: boolean;
  ambiguousWriteReconciliation: boolean;
  guardedRollback: boolean;
  destinationBinding: boolean;
  liveVersionMetadata: boolean;
  liveWriteRehearsal: boolean;
}

export interface SquidexImportOperationalReadiness {
  status:
    | "BLOCKED"
    | "PREPARED_NOT_AUTHORIZED_LIVE_REHEARSAL_PENDING"
    | "TECHNICALLY_READY_NOT_AUTHORIZED";
  applyAuthorized: false;
  resolvedControls: string[];
  blockers: string[];
}

export function assessSquidexOperationalReadiness(
  evidence: SquidexImportSafetyEvidence,
): SquidexImportOperationalReadiness {
  const controls: Array<[keyof SquidexImportSafetyEvidence, string]> = [
    ["deterministicCreateIds", "IDs determinísticos para create"],
    ["optimisticConcurrency", "If-Match por versão remota"],
    ["ambiguousWriteReconciliation", "Reconciliação de escrita ambígua"],
    ["guardedRollback", "Rollback condicionado à writtenVersion"],
    ["destinationBinding", "Binding do plano ao destino"],
    ["liveVersionMetadata", "Versão/update metadata confirmados live"],
  ];

  const resolvedControls = controls.filter(([key]) => evidence[key]).map(([, label]) => label);
  const blockers = controls.filter(([key]) => !evidence[key]).map(([, label]) => `Controlo em falta: ${label}`);

  if (blockers.length > 0) {
    return { status: "BLOCKED", applyAuthorized: false, resolvedControls, blockers };
  }
  if (!evidence.liveWriteRehearsal) {
    return {
      status: "PREPARED_NOT_AUTHORIZED_LIVE_REHEARSAL_PENDING",
      applyAuthorized: false,
      resolvedControls,
      blockers: ["Ensaio live de escrita protegida sobre conteúdo sintético ainda não autorizado/executado"],
    };
  }
  return {
    status: "TECHNICALLY_READY_NOT_AUTHORIZED",
    applyAuthorized: false,
    resolvedControls,
    blockers: [],
  };
}
