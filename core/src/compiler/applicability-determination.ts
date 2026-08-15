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
  decisionTimestamp?: string;
  attribution: string;
  decision: AuthorityDecision;
  provenance: Provenance;
  status: EvidenceStatus;
}

export interface Evidence<Provenance = unknown> {
  status: EvidenceStatus;
  provenance: Provenance;
}

export type EffectiveBoundaryDeclaration =
  | { kind: "timestamp"; value: string }
  | { kind: "revision"; value: string }
  | { kind: "boundary-reference"; identity: string };

export interface EffectiveBoundary<Provenance = unknown>
  extends Evidence<Provenance> {
  declaration?: EffectiveBoundaryDeclaration;
}

export interface ApplicabilityInputs<Provenance = unknown> {
  authority: AuthorityInput<Provenance>;
  governedScope: string;
  subjectScope: string;
  validated: boolean;
  validity: Evidence<Provenance>;
  effectiveBoundary: EffectiveBoundary<Provenance>;
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
    isValidOptionalDecisionTimestamp(inputs.authority.decisionTimestamp) &&
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
    inputs.effectiveBoundary.provenance !== undefined &&
    isValidOptionalEffectiveBoundaryDeclaration(
      inputs.effectiveBoundary.declaration,
    )
  );
}

function isValidOptionalDecisionTimestamp(value: unknown): boolean {
  return value === undefined || isNonEmptyString(value);
}

function isValidOptionalEffectiveBoundaryDeclaration(
  value: unknown,
): boolean {
  if (value === undefined) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  if (value.kind === "timestamp" || value.kind === "revision") {
    return hasExactFields(value, ["kind", "value"]) && isNonEmptyString(value.value);
  }

  return (
    value.kind === "boundary-reference" &&
    hasExactFields(value, ["kind", "identity"]) &&
    isNonEmptyString(value.identity)
  );
}

function hasExactFields(
  value: Record<string, unknown>,
  expectedFields: string[],
): boolean {
  const fields = Object.keys(value);
  return (
    fields.length === expectedFields.length &&
    expectedFields.every((field) => field in value)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
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
