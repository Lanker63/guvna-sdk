import {
  determineApplicability,
  type ApplicabilityInputs,
  type ApplicabilityResult,
  type DeterminationProvenance,
  type EffectiveBoundary,
} from './applicability-determination.js';

export interface SuppliedContractApplicabilityInput<Provenance = unknown> {
  subjectContractIdentity: string;
  subjectSemanticVersion: string;
  applicability: ApplicabilityInputs<Provenance>;
}

export interface ContractApplicabilityRecord<Provenance = unknown> {
  subjectContractIdentity: string | undefined;
  subjectSemanticVersion: string | undefined;
  governedScope: string | undefined;
  authorityIdentity: string | undefined;
  decisionIdentity: string | undefined;
  decisionVersion: string | undefined;
  decisionTimestamp: string | undefined;
  attribution: string | undefined;
  effectiveBoundary: EffectiveBoundary<Provenance> | undefined;
  result: ApplicabilityResult;
  provenance: DeterminationProvenance<Provenance> | undefined;
}

export function evaluateSuppliedContractApplicability<Provenance>(
  input: SuppliedContractApplicabilityInput<Provenance> | null | undefined,
): ContractApplicabilityRecord<Provenance> {
  const applicability = input?.applicability;
  const determination = determineApplicability(
    applicability && input
      ? {
          ...applicability,
          subjectContractIdentity: input.subjectContractIdentity,
          subjectSemanticVersion: input.subjectSemanticVersion,
        }
      : applicability,
  );
  const authority = applicability?.authority;
  const hasSubjectIdentity = isNonEmptyString(input?.subjectContractIdentity);
  const hasSubjectVersion = isNonEmptyString(input?.subjectSemanticVersion);

  return {
    subjectContractIdentity: hasSubjectIdentity ? input.subjectContractIdentity : undefined,
    subjectSemanticVersion: hasSubjectVersion ? input.subjectSemanticVersion : undefined,
    governedScope: applicability?.governedScope,
    authorityIdentity: authority?.authorityIdentity,
    decisionIdentity: authority?.decisionIdentity,
    decisionVersion: authority?.decisionVersion,
    decisionTimestamp: authority?.decisionTimestamp,
    attribution: authority?.attribution,
    effectiveBoundary: applicability?.effectiveBoundary,
    result: hasSubjectIdentity && hasSubjectVersion ? determination.result : 'indeterminate',
    provenance: determination.provenance,
  };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}
