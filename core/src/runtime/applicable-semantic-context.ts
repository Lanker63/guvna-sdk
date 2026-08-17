import type {
  SemanticContractReference,
  SemanticIdentity,
  SemanticScope,
} from '../compiler/semantic-ir.js';
import { sameSemanticScope } from '../compiler/semantic-contract.js';

export interface ApplicableSemanticContext {
  contract: SemanticContractReference;
  identity: SemanticIdentity;
  version: string;
  scope: SemanticScope;
}

export interface ApplicableSemanticContextRequest {
  contractIdentity: SemanticIdentity;
  contractVersion: string;
  scope: SemanticIdentity;
}

export type ApplicableSemanticContextResult =
  { ok: true; context: ApplicableSemanticContext } | { ok: false; reason: string };

export type RuntimeContextAdmissionResult = ApplicableSemanticContextResult;

export function resolveApplicableSemanticContext(
  contracts: readonly SemanticContractReference[] | null | undefined,
  request: ApplicableSemanticContextRequest | null | undefined,
): RuntimeContextAdmissionResult {
  const selection = selectApplicableSemanticContext(contracts, request);
  if (!selection.ok) return selection;
  return admitApplicableSemanticContext(selection.context);
}

export function selectApplicableSemanticContext(
  contracts: readonly SemanticContractReference[] | null | undefined,
  request: ApplicableSemanticContextRequest | null | undefined,
): ApplicableSemanticContextResult {
  if (!Array.isArray(contracts) || !request)
    return { ok: false, reason: 'Applicable contract selection input is absent or invalid' };
  if (
    !isIdentity(request.contractIdentity) ||
    !isIdentity(request.scope) ||
    !isNonEmptyString(request.contractVersion)
  )
    return { ok: false, reason: 'Applicable contract selection request is invalid' };
  const matches = contracts.filter(
    (contract) =>
      isContract(contract) &&
      contract.identity.identityKind === request.contractIdentity.identityKind &&
      contract.identity.value === request.contractIdentity.value &&
      contract.version.value === request.contractVersion &&
      contract.applicability.scope.identity.identityKind === request.scope.identityKind &&
      contract.applicability.scope.identity.value === request.scope.value &&
      contract.lifecycle.lifecycleState.identity.value === 'applicable' &&
      contract.applicability.applicable === true &&
      contract.ratification.ratified &&
      isRef(contract.applicability.authorityDecision) &&
      isRef(contract.ratification.authorityDecision) &&
      contract.ratification.record !== undefined,
  );
  if (matches.length === 0)
    return { ok: false, reason: 'No applicable ratified contract matches the selection request' };
  if (matches.length > 1)
    return { ok: false, reason: 'Applicable contract selection is ambiguous' };
  const contract = matches[0];
  return {
    ok: true,
    context: {
      contract,
      identity: contract.identity,
      version: contract.version.value,
      scope: contract.applicability.scope,
    },
  };
}

export function admitApplicableSemanticContext(
  context: ApplicableSemanticContext | null | undefined,
): RuntimeContextAdmissionResult {
  if (!isApplicableSemanticContext(context))
    return { ok: false, reason: 'Runtime requires a valid applicable ratified semantic context' };
  return { ok: true, context };
}

function isApplicableSemanticContext(value: unknown): value is ApplicableSemanticContext {
  if (
    !isRecord(value) ||
    !isIdentity(value.identity) ||
    !isNonEmptyString(value.version) ||
    !isScope(value.scope) ||
    !isContract(value.contract)
  )
    return false;
  const contract = value.contract;
  return (
    isIdentityEqual(value.identity, contract.identity) &&
    value.version === contract.version.value &&
    sameSemanticScope(value.scope, contract.applicability.scope) &&
    contract.lifecycle.lifecycleState.identity.value === 'applicable' &&
    contract.applicability.applicable === true &&
    contract.ratification.ratified &&
    isRef(contract.applicability.authorityDecision) &&
    isRef(contract.ratification.authorityDecision) &&
    contract.ratification.record !== undefined
  );
}

function isContract(value: unknown): value is SemanticContractReference {
  if (
    !isRecord(value) ||
    !isIdentity(value.identity) ||
    !isRecord(value.version) ||
    !isNonEmptyString(value.version.value) ||
    !isRecord(value.version.semanticIdentity) ||
    !isIdentity(value.version.semanticIdentity.identity) ||
    !isRecord(value.version.scope) ||
    !isScope(value.version.scope) ||
    !isRecord(value.lifecycle) ||
    !isRef(value.lifecycle.lifecycleState) ||
    !isRecord(value.applicability) ||
    !isScope(value.applicability.scope) ||
    !isRecord(value.ratification)
  )
    return false;
  return (
    isIdentityEqual(value.version.semanticIdentity.identity, value.identity) &&
    value.applicability.applicable === true &&
    isRecord(value.ratification) &&
    value.ratification.ratified === true
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isScope(value: unknown): value is SemanticScope {
  return (
    isRecord(value) &&
    isIdentity(value.identity) &&
    isRecord(value.meaning) &&
    isNonEmptyString(value.meaning.statement) &&
    Array.isArray(value.meaning.terms)
  );
}

function isIdentityEqual(left: SemanticIdentity, right: SemanticIdentity): boolean {
  return left.identityKind === right.identityKind && left.value === right.value;
}

function isIdentity(value: unknown): value is SemanticIdentity {
  return (
    isRecord(value) &&
    typeof value.identityKind === 'string' &&
    value.identityKind.length > 0 &&
    typeof value.value === 'string' &&
    value.value.length > 0
  );
}

function isRef(value: unknown): value is { identity: SemanticIdentity } {
  return isRecord(value) && isIdentity(value.identity);
}
