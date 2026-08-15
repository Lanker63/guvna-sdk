export type ApplicabilityResult =
  | "applicable"
  | "not-applicable"
  | "indeterminate";

export type AuthorityDecision = "applicable" | "not-applicable";

export type EvidenceStatus =
  | "valid"
  | "invalid"
  | "ambiguous"
  | "conflicting"
  | "stale"
  | "revoked"
  | "unsupported";

const ESTABLISHED_GOVERNED_SCOPE =
  "Guvna Semantic Contract semantic boundary";

export interface AuthorityInput<Provenance = unknown> {
  authorityIdentity: string;
  decisionIdentity: string;
  decisionVersion: string;
  attribution: string;
  decision: AuthorityDecision;
  provenance: Provenance;
  status: EvidenceStatus;
}

export interface Evidence<Provenance = unknown> {
  status: EvidenceStatus;
  provenance: Provenance;
}

export interface ApplicabilityInputs<Provenance = unknown> {
  authority: AuthorityInput<Provenance>;
  governedScope: string;
  subjectScope: string;
  validated: boolean;
  validity: Evidence<Provenance>;
  effectiveBoundary: Evidence<Provenance>;
}

export interface ApplicabilityDetermination<Provenance = unknown> {
  result: ApplicabilityResult;
  provenance: DeterminationProvenance<Provenance> | undefined;
}

export interface DeterminationProvenance<Provenance = unknown> {
  authority: Provenance | undefined;
  validity: Provenance | undefined;
  effectiveBoundary: Provenance | undefined;
}

export function determineApplicability<Provenance>(
  inputs: ApplicabilityInputs<Provenance> | null | undefined,
): ApplicabilityDetermination<Provenance> {
  if (inputs === null || inputs === undefined) {
    return indeterminate<Provenance>(undefined);
  }

  if (!hasRequiredInputValues(inputs)) {
    return indeterminate(createAvailableProvenance(inputs));
  }

  const provenance = createProvenance(inputs);

  if (
    inputs.governedScope !== ESTABLISHED_GOVERNED_SCOPE ||
    !inputs.validated ||
    inputs.validity.status !== "valid" ||
    inputs.effectiveBoundary.status !== "valid"
  ) {
    return indeterminate(provenance);
  }

  if (inputs.authority.decision === "not-applicable") {
    return {
      result: "not-applicable",
      provenance,
    };
  }

  return {
    result: "applicable",
    provenance,
  };
}

function hasRequiredInputValues<Provenance>(
  inputs: ApplicabilityInputs<Provenance>,
): boolean {
  return (
    inputs.authority !== null &&
    typeof inputs.authority === "object" &&
    typeof inputs.authority.authorityIdentity === "string" &&
    inputs.authority.authorityIdentity.length > 0 &&
    typeof inputs.authority.decisionIdentity === "string" &&
    inputs.authority.decisionIdentity.length > 0 &&
    typeof inputs.authority.decisionVersion === "string" &&
    inputs.authority.decisionVersion.length > 0 &&
    typeof inputs.authority.attribution === "string" &&
    inputs.authority.attribution.length > 0 &&
    (inputs.authority.decision === "applicable" ||
      inputs.authority.decision === "not-applicable") &&
    inputs.authority.status === "valid" &&
    inputs.authority.provenance !== undefined &&
    typeof inputs.governedScope === "string" &&
    inputs.governedScope.length > 0 &&
    typeof inputs.subjectScope === "string" &&
    inputs.subjectScope.length > 0 &&
    typeof inputs.validated === "boolean" &&
    inputs.validity !== null &&
    typeof inputs.validity === "object" &&
    inputs.validity.provenance !== undefined &&
    inputs.effectiveBoundary !== null &&
    typeof inputs.effectiveBoundary === "object" &&
    inputs.effectiveBoundary.provenance !== undefined
  );
}

function indeterminate<Provenance>(
  provenance: DeterminationProvenance<Provenance> | undefined,
): ApplicabilityDetermination<Provenance> {
  return {
    result: "indeterminate",
    provenance,
  };
}

function createAvailableProvenance<Provenance>(
  inputs: ApplicabilityInputs<Provenance>,
): DeterminationProvenance<Provenance> {
  return {
    authority: inputs.authority?.provenance,
    validity: inputs.validity?.provenance,
    effectiveBoundary: inputs.effectiveBoundary?.provenance,
  };
}

function createProvenance<Provenance>(
  inputs: ApplicabilityInputs<Provenance>,
): DeterminationProvenance<Provenance> {
  return {
    authority: inputs.authority.provenance,
    validity: inputs.validity.provenance,
    effectiveBoundary: inputs.effectiveBoundary.provenance,
  };
}
