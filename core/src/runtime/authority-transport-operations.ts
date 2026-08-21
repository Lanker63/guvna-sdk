import type { AcceptanceAuthorityContext } from '../compiler/acceptance-record-contract.js';
import type { AuthorityFreshnessStatus } from './authority-decision-ledger.js';

/**
 * Versioned contract for the three Runtime/host-facing Repository Authority
 * operations (confirmRepositoryAuthority, revalidateAuthority,
 * submitAcceptanceDecision). Follows the acceptance-transport semver rule:
 * compatible additions bump the minor SDK release; incompatible meaning or
 * validation changes require a major release; unknown contractVersion
 * values fail closed.
 */
export const authorityTransportContractVersion = '1' as const;
export type AuthorityTransportContractVersion = typeof authorityTransportContractVersion;

export const authorityFreshnessStatuses = ['fresh', 'stale', 'revoked', 'indeterminate'] as const;
export type AcceptanceDecision = 'accepted' | 'rejected';

export interface ConfirmRepositoryAuthorityRequest {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
}

export interface RevalidateAuthorityRequest {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
  snapshotObservedAt: string;
}

export interface AuthorityFreshnessResponse {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
  status: AuthorityFreshnessStatus;
  observedAt: string;
}

export interface SubmitAcceptanceDecisionRequest {
  contractVersion: AuthorityTransportContractVersion;
  acceptanceRecordId: string;
  decision: AcceptanceDecision;
  authorityContext: AcceptanceAuthorityContext;
  freshnessStatus: AuthorityFreshnessStatus;
  decidedAt: string;
}

export interface AuthorityTransportValidationResult {
  valid: boolean;
  reason?: string;
}

function invalid(reason: string): AuthorityTransportValidationResult {
  return { valid: false, reason };
}

const valid: AuthorityTransportValidationResult = { valid: true };

function hasKnownContractVersion(value: unknown): value is AuthorityTransportContractVersion {
  return value === authorityTransportContractVersion;
}

export function validateConfirmRepositoryAuthorityRequest(
  request: ConfirmRepositoryAuthorityRequest,
): AuthorityTransportValidationResult {
  if (!request || typeof request !== 'object') return invalid('confirmRepositoryAuthority request is invalid');
  if (!hasKnownContractVersion(request.contractVersion)) {
    return invalid('confirmRepositoryAuthority contract version is unknown');
  }
  if (!request.principalId || !request.governedRepositoryId) {
    return invalid('confirmRepositoryAuthority request is missing principal or repository identity');
  }
  return valid;
}

export function validateRevalidateAuthorityRequest(
  request: RevalidateAuthorityRequest,
): AuthorityTransportValidationResult {
  if (!request || typeof request !== 'object') return invalid('revalidateAuthority request is invalid');
  if (!hasKnownContractVersion(request.contractVersion)) {
    return invalid('revalidateAuthority contract version is unknown');
  }
  if (!request.principalId || !request.governedRepositoryId || !request.snapshotObservedAt) {
    return invalid('revalidateAuthority request is missing required fields');
  }
  return valid;
}

export function validateAuthorityFreshnessResponse(
  response: AuthorityFreshnessResponse,
): AuthorityTransportValidationResult {
  if (!response || typeof response !== 'object') return invalid('authority freshness response is invalid');
  if (!hasKnownContractVersion(response.contractVersion)) {
    return invalid('authority freshness response contract version is unknown');
  }
  if (!response.principalId || !response.governedRepositoryId || !response.observedAt) {
    return invalid('authority freshness response is missing required fields');
  }
  if (!authorityFreshnessStatuses.includes(response.status)) {
    return invalid('authority freshness status is unsupported');
  }
  return valid;
}

/**
 * Finalizing an Acceptance decision (accept or reject) requires a `fresh`
 * revalidation result at submission time; a stale, revoked, or
 * indeterminate freshness status fails closed regardless of the requested
 * decision (Requirement 8: freshness precedes acceptance).
 */
export function validateSubmitAcceptanceDecisionRequest(
  request: SubmitAcceptanceDecisionRequest,
): AuthorityTransportValidationResult {
  if (!request || typeof request !== 'object') return invalid('submitAcceptanceDecision request is invalid');
  if (!hasKnownContractVersion(request.contractVersion)) {
    return invalid('submitAcceptanceDecision contract version is unknown');
  }
  if (!request.acceptanceRecordId || !request.decidedAt) {
    return invalid('submitAcceptanceDecision request is missing required fields');
  }
  if (request.decision !== 'accepted' && request.decision !== 'rejected') {
    return invalid('submitAcceptanceDecision decision is unsupported');
  }
  if (!authorityFreshnessStatuses.includes(request.freshnessStatus)) {
    return invalid('submitAcceptanceDecision freshness status is unsupported');
  }
  if (!request.authorityContext || !request.authorityContext.principalId
    || !request.authorityContext.governedRepositoryId || !request.authorityContext.authorityScope
    || !request.authorityContext.verifiedAt) {
    return invalid('submitAcceptanceDecision authority context is invalid');
  }
  if (request.freshnessStatus !== 'fresh') {
    return invalid('submitAcceptanceDecision requires a fresh authority revalidation');
  }
  return valid;
}
