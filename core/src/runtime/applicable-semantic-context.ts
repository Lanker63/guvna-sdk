import type { SemanticContractReference, SemanticIdentity, SemanticScope } from "../compiler/semantic-ir.js";

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
  | { ok: true; context: ApplicableSemanticContext }
  | { ok: false; reason: string };

export function selectApplicableSemanticContext(
  contracts: readonly SemanticContractReference[] | null | undefined,
  request: ApplicableSemanticContextRequest | null | undefined,
): ApplicableSemanticContextResult {
  if (!Array.isArray(contracts) || !request) return { ok: false, reason: "Applicable contract selection input is absent or invalid" };
  if (!isIdentity(request.contractIdentity) || !isIdentity(request.scope) || request.contractVersion.length === 0) return { ok: false, reason: "Applicable contract selection request is invalid" };
  const matches = contracts.filter((contract) =>
    contract.identity.identityKind === request.contractIdentity.identityKind &&
    contract.identity.value === request.contractIdentity.value &&
    contract.version.value === request.contractVersion &&
    contract.applicability.scope.identity.identityKind === request.scope.identityKind &&
    contract.applicability.scope.identity.value === request.scope.value &&
    contract.lifecycle.lifecycleState.identity.value === "applicable" &&
    contract.applicability.applicable === true &&
    contract.ratification.ratified &&
    isRef(contract.applicability.authorityDecision) &&
    isRef(contract.ratification.authorityDecision) &&
    contract.ratification.record !== undefined,
  );
  if (matches.length === 0) return { ok: false, reason: "No applicable ratified contract matches the selection request" };
  if (matches.length > 1) return { ok: false, reason: "Applicable contract selection is ambiguous" };
  const contract = matches[0];
  return { ok: true, context: { contract, identity: contract.identity, version: contract.version.value, scope: contract.applicability.scope } };
}

function isIdentity(value: SemanticIdentity | undefined): value is SemanticIdentity {
  return Boolean(value && value.identityKind.length > 0 && value.value.length > 0);
}

function isRef(value: { identity: SemanticIdentity } | undefined): boolean {
  return Boolean(value && isIdentity(value.identity));
}