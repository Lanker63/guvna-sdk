import type { RatificationRecord, SemanticContractReference, SemanticRef } from './semantic-ir.js';

export type LifecycleState =
  'candidate' | 'validated' | 'ratified' | 'applicable' | 'superseded' | 'rejected' | 'retired';
export type LifecycleOperation =
  'validate' | 'reject' | 'ratify' | 'apply' | 'supersede' | 'retire';
export interface AuthorityEvidence {
  authorityIdentity: string;
  decisionIdentity: string;
  decisionVersion: string;
  decisionScope: string;
  contractIdentity: string;
  contractVersion: string;
  provenance: unknown;
}
export interface LifecycleGuards {
  structuralAndSemanticValidation?: boolean;
  completeProvenance?: boolean;
  noBlockingGap?: boolean;
  explicitIncompatibility?: boolean;
  exactScope?: boolean;
  effectiveBoundary?: boolean;
  successor?: boolean;
  authority?: AuthorityEvidence;
}
export interface LifecycleInput {
  state: LifecycleState;
  operation: LifecycleOperation;
  contractIdentity: string;
  contractVersion: string;
  scope: string;
  provenance: unknown;
  guards: LifecycleGuards;
}
export type LifecycleEvaluation =
  { permitted: true; nextState: LifecycleState } | { permitted: false; reason: string };

export interface RatificationInput {
  contract: SemanticContractReference;
  validationEvidence: SemanticRef;
  ratificationEvent: SemanticRef;
  authorityDecision: SemanticRef;
  authority: AuthorityEvidence;
}

export type RatificationResult =
  | { ok: true; contract: SemanticContractReference; record: RatificationRecord }
  | { ok: false; reason: string };

export interface ApplicabilityInput {
  contract: SemanticContractReference;
  authorityDecision: SemanticRef;
  authority: AuthorityEvidence;
  exactScope: boolean;
  effectiveBoundary: boolean;
}

export type ApplicabilityResult =
  { ok: true; contract: SemanticContractReference } | { ok: false; reason: string };

export function ratifyValidatedContract(
  input: RatificationInput | null | undefined,
): RatificationResult {
  if (!input) return { ok: false, reason: 'Ratification input is absent' };
  const { contract } = input;
  if (
    !isSemanticRef(input.validationEvidence) ||
    !isSemanticRef(input.ratificationEvent) ||
    !isSemanticRef(input.authorityDecision)
  ) {
    return { ok: false, reason: 'Ratification evidence references are invalid' };
  }
  if (input.authorityDecision.identity.value !== input.authority.decisionIdentity) {
    return {
      ok: false,
      reason: 'Ratification authority decision reference does not match authority evidence',
    };
  }
  if (contract.lifecycle.lifecycleState.identity.value !== 'validated')
    return { ok: false, reason: 'Only validated contracts may be ratified' };
  if (contract.ratification.ratified || contract.applicability.applicable !== 'indeterminate')
    return { ok: false, reason: 'Contract governance state is not eligible for ratification' };
  const lifecycle = evaluateLifecycle({
    state: 'validated',
    operation: 'ratify',
    contractIdentity: contract.identity.value,
    contractVersion: contract.version.value,
    scope: contract.applicability.scope.identity.value,
    provenance: contract.provenance,
    guards: { authority: input.authority },
  });
  if (!lifecycle.permitted) return { ok: false, reason: lifecycle.reason };
  const record: RatificationRecord = {
    candidateContractIdentity: contract.identity,
    candidateContractVersion: contract.version.value,
    validationEvidence: input.validationEvidence,
    validationResult: 'conformant',
    ratificationEvent: input.ratificationEvent,
    ratifiedContractVersion: contract.version.value,
    applicableScope: contract.applicability.scope,
  };
  return {
    ok: true,
    record,
    contract: {
      ...contract,
      lifecycle: {
        ...contract.lifecycle,
        lifecycleState: { identity: { identityKind: 'lifecycle', value: 'ratified' } },
      },
      ratification: {
        ...contract.ratification,
        ratified: true,
        authorityDecision: input.authorityDecision,
        record,
      },
    },
  };
}

export function applyRatifiedContract(
  input: ApplicabilityInput | null | undefined,
): ApplicabilityResult {
  if (!input) return { ok: false, reason: 'Applicability input is absent' };
  const { contract } = input;
  if (!isSemanticRef(input.authorityDecision))
    return { ok: false, reason: 'Applicability authority decision reference is invalid' };
  if (input.authorityDecision.identity.value !== input.authority.decisionIdentity)
    return {
      ok: false,
      reason: 'Applicability authority decision reference does not match authority evidence',
    };
  if (
    !contract.ratification.ratified ||
    contract.lifecycle.lifecycleState.identity.value !== 'ratified'
  )
    return { ok: false, reason: 'Only ratified contracts may become applicable' };
  if (contract.applicability.applicable !== 'indeterminate')
    return { ok: false, reason: 'Contract governance state is not eligible for applicability' };
  const lifecycle = evaluateLifecycle({
    state: 'ratified',
    operation: 'apply',
    contractIdentity: contract.identity.value,
    contractVersion: contract.version.value,
    scope: contract.applicability.scope.identity.value,
    provenance: contract.provenance,
    guards: {
      authority: input.authority,
      exactScope: input.exactScope,
      effectiveBoundary: input.effectiveBoundary,
    },
  });
  if (!lifecycle.permitted) return { ok: false, reason: lifecycle.reason };
  return {
    ok: true,
    contract: {
      ...contract,
      lifecycle: {
        ...contract.lifecycle,
        lifecycleState: { identity: { identityKind: 'lifecycle', value: 'applicable' } },
      },
      applicability: {
        ...contract.applicability,
        applicable: true,
        authorityDecision: input.authorityDecision,
      },
    },
  };
}

export function evaluateLifecycle(input: LifecycleInput | null | undefined): LifecycleEvaluation {
  if (!input || !hasRequiredInput(input))
    return { permitted: false, reason: 'Required lifecycle input is absent or invalid' };
  const target = transitions[`${input.state}:${input.operation}`];
  if (!target) return { permitted: false, reason: 'Transition is unsupported' };
  const guards = input.guards;
  if (
    input.operation === 'validate' &&
    !(guards.structuralAndSemanticValidation && guards.completeProvenance && guards.noBlockingGap)
  )
    return { permitted: false, reason: 'Validation conditions are unsatisfied' };
  const authorityIsAttributable = isAttributableAuthority(guards.authority, input);
  if (input.operation === 'reject' && !(authorityIsAttributable || guards.explicitIncompatibility))
    return { permitted: false, reason: 'Rejection conditions are unsatisfied' };
  if (['ratify', 'supersede', 'retire'].includes(input.operation) && !authorityIsAttributable)
    return { permitted: false, reason: 'Attributable human authority is required' };
  if (
    input.operation === 'apply' &&
    !(authorityIsAttributable && guards.exactScope && guards.effectiveBoundary)
  )
    return { permitted: false, reason: 'Applicability conditions are unsatisfied' };
  if (input.operation === 'supersede' && !guards.successor)
    return { permitted: false, reason: 'Successor is required' };
  return { permitted: true, nextState: target };
}

const transitions: Partial<Record<`${LifecycleState}:${LifecycleOperation}`, LifecycleState>> = {
  'candidate:validate': 'validated',
  'candidate:reject': 'rejected',
  'validated:ratify': 'ratified',
  'validated:reject': 'rejected',
  'ratified:apply': 'applicable',
  'ratified:reject': 'rejected',
  'ratified:retire': 'retired',
  'applicable:supersede': 'superseded',
  'applicable:retire': 'retired',
};
function hasRequiredInput(input: LifecycleInput): boolean {
  return (
    typeof input.contractIdentity === 'string' &&
    input.contractIdentity.length > 0 &&
    typeof input.contractVersion === 'string' &&
    input.contractVersion.length > 0 &&
    typeof input.scope === 'string' &&
    input.scope.length > 0 &&
    input.provenance !== undefined &&
    typeof input.guards === 'object' &&
    input.guards !== null
  );
}
function isAttributableAuthority(
  authority: AuthorityEvidence | undefined,
  input: LifecycleInput,
): boolean {
  return Boolean(
    authority &&
    typeof authority.authorityIdentity === 'string' &&
    authority.authorityIdentity.length > 0 &&
    typeof authority.decisionIdentity === 'string' &&
    authority.decisionIdentity.length > 0 &&
    typeof authority.decisionVersion === 'string' &&
    authority.decisionVersion.length > 0 &&
    authority.decisionScope === input.scope &&
    authority.contractIdentity === input.contractIdentity &&
    authority.contractVersion === input.contractVersion &&
    authority.provenance !== undefined,
  );
}
function isSemanticRef(value: SemanticRef | undefined): value is SemanticRef {
  return Boolean(
    value &&
    value.identity &&
    typeof value.identity.identityKind === 'string' &&
    value.identity.identityKind.length > 0 &&
    typeof value.identity.value === 'string' &&
    value.identity.value.length > 0,
  );
}
