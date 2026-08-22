import { resolveApplicableSemanticContext } from '../runtime/applicable-semantic-context.js';
import type { SemanticContractReference, SemanticIdentity } from './semantic-ir.js';
import type { RuntimeProjectionFreshness } from '../runtime/runtime-gateway.js';

export interface RuntimeProjectionInput {
  governedRepositoryIdentity: SemanticIdentity;
  projectionIdentity: SemanticIdentity;
  projectionVersion: string;
  compiledAt: string;
  freshness: RuntimeProjectionFreshness;
  contracts: readonly SemanticContractReference[];
}

export interface RuntimeProjectionArtifact extends RuntimeProjectionInput {
  artifactVersion: '1';
}

export type RuntimeProjectionExportResult =
  | { ok: true; artifact: RuntimeProjectionArtifact }
  | { ok: false; reason: string };

export function exportRuntimeProjection(input: RuntimeProjectionInput): RuntimeProjectionExportResult {
  if (!isIdentity(input.governedRepositoryIdentity) || !isIdentity(input.projectionIdentity)
    || !isNonEmptyString(input.projectionVersion) || !isNonEmptyString(input.compiledAt)
    || !isFreshness(input.freshness)
    || !Array.isArray(input.contracts)) {
    return { ok: false, reason: 'Runtime projection input is invalid' };
  }
  for (const contract of input.contracts) {
    if (!isContractShape(contract)) return { ok: false, reason: 'Runtime projection contains an invalid contract' };
    const result = resolveApplicableSemanticContext([contract], {
      contractIdentity: contract.identity,
      contractVersion: contract.version.value,
      scope: contract.applicability.scope.identity,
    });
    if (!result.ok) return { ok: false, reason: 'Runtime projection contains an invalid contract' };
  }
  return {
    ok: true,
    artifact: {
      artifactVersion: '1',
      governedRepositoryIdentity: input.governedRepositoryIdentity,
      projectionIdentity: input.projectionIdentity,
      projectionVersion: input.projectionVersion,
      compiledAt: input.compiledAt,
      freshness: input.freshness,
      contracts: [...input.contracts],
    },
  };
}

function isContractShape(value: unknown): value is SemanticContractReference {
  if (typeof value !== 'object' || value === null) return false;
  const contract = value as Partial<SemanticContractReference>;
  return isIdentity(contract.identity)
    && typeof contract.version === 'object' && contract.version !== null
    && isNonEmptyString(contract.version.value)
    && typeof contract.applicability === 'object' && contract.applicability !== null
    && typeof contract.applicability.scope === 'object' && contract.applicability.scope !== null
    && isIdentity(contract.applicability.scope.identity);
}

function isIdentity(value: unknown): value is SemanticIdentity {
  return typeof value === 'object' && value !== null
    && typeof (value as SemanticIdentity).identityKind === 'string'
    && (value as SemanticIdentity).identityKind.length > 0
    && typeof (value as SemanticIdentity).value === 'string'
    && (value as SemanticIdentity).value.length > 0;
}

function isFreshness(value: unknown): value is RuntimeProjectionFreshness {
  if (typeof value !== 'object' || value === null) return false;
  const freshness = value as Record<string, unknown>;
  return (freshness.status === 'current' || freshness.status === 'superseded'
    || freshness.status === 'revoked' || freshness.status === 'unknown')
    && isNonEmptyString(freshness.checkedAt)
    && (freshness.currentProjectionVersion === undefined || isNonEmptyString(freshness.currentProjectionVersion))
    && (freshness.verifiedBy === undefined || isIdentity(freshness.verifiedBy));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}
