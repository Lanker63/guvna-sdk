import { describe, expect, it } from 'vitest';
import {
  authorityTransportContractVersion,
  validateAuthorityFreshnessResponse,
  validateConfirmRepositoryAuthorityRequest,
  validateRevalidateAuthorityRequest,
  validateSubmitAcceptanceDecisionRequest,
  type AuthorityFreshnessResponse,
  type ConfirmRepositoryAuthorityRequest,
  type RevalidateAuthorityRequest,
  type SubmitAcceptanceDecisionRequest,
} from '../../src/runtime/authority-transport-operations.js';

const authorityContext = {
  principalId: 'principal-1',
  governedRepositoryId: 'guvna-core',
  authorityScope: 'repository',
  verifiedAt: '2026-08-20T00:00:00Z',
};

describe('confirmRepositoryAuthority request', () => {
  const request: ConfirmRepositoryAuthorityRequest = {
    contractVersion: authorityTransportContractVersion,
    principalId: 'principal-1',
    governedRepositoryId: 'guvna-core',
  };

  it('accepts a well-formed request', () => {
    expect(validateConfirmRepositoryAuthorityRequest(request)).toEqual({ valid: true });
  });

  it('fails closed on an unknown contract version', () => {
    expect(validateConfirmRepositoryAuthorityRequest({ ...request, contractVersion: '2' as never })).toEqual({
      valid: false, reason: 'confirmRepositoryAuthority contract version is unknown',
    });
  });

  it('fails closed on missing identities', () => {
    expect(validateConfirmRepositoryAuthorityRequest({ ...request, principalId: '' })).toEqual({
      valid: false, reason: 'confirmRepositoryAuthority request is missing principal or repository identity',
    });
  });
});

describe('revalidateAuthority request', () => {
  const request: RevalidateAuthorityRequest = {
    contractVersion: authorityTransportContractVersion,
    principalId: 'principal-1',
    governedRepositoryId: 'guvna-core',
    snapshotObservedAt: '2026-08-20T00:00:00Z',
  };

  it('accepts a well-formed request', () => {
    expect(validateRevalidateAuthorityRequest(request)).toEqual({ valid: true });
  });

  it('fails closed on an unknown contract version', () => {
    expect(validateRevalidateAuthorityRequest({ ...request, contractVersion: '2' as never })).toEqual({
      valid: false, reason: 'revalidateAuthority contract version is unknown',
    });
  });

  it('fails closed on a missing snapshot timestamp', () => {
    expect(validateRevalidateAuthorityRequest({ ...request, snapshotObservedAt: '' })).toEqual({
      valid: false, reason: 'revalidateAuthority request is missing required fields',
    });
  });
});

describe('authority freshness response', () => {
  const response: AuthorityFreshnessResponse = {
    contractVersion: authorityTransportContractVersion,
    principalId: 'principal-1',
    governedRepositoryId: 'guvna-core',
    status: 'fresh',
    observedAt: '2026-08-20T00:00:00Z',
  };

  it('accepts each supported status', () => {
    for (const status of ['fresh', 'stale', 'revoked', 'indeterminate'] as const) {
      expect(validateAuthorityFreshnessResponse({ ...response, status })).toEqual({ valid: true });
    }
  });

  it('fails closed on an unknown status', () => {
    expect(validateAuthorityFreshnessResponse({ ...response, status: 'unknown' as never })).toEqual({
      valid: false, reason: 'authority freshness status is unsupported',
    });
  });

  it('fails closed on an unknown contract version', () => {
    expect(validateAuthorityFreshnessResponse({ ...response, contractVersion: '2' as never })).toEqual({
      valid: false, reason: 'authority freshness response contract version is unknown',
    });
  });
});

describe('submitAcceptanceDecision request', () => {
  const request: SubmitAcceptanceDecisionRequest = {
    contractVersion: authorityTransportContractVersion,
    acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
    decision: 'accepted',
    authorityContext,
    freshnessStatus: 'fresh',
    decidedAt: '2026-08-20T00:00:00Z',
  };

  it('accepts a well-formed accepted decision with fresh authority', () => {
    expect(validateSubmitAcceptanceDecisionRequest(request)).toEqual({ valid: true });
  });

  it('accepts a well-formed rejected decision with fresh authority', () => {
    expect(validateSubmitAcceptanceDecisionRequest({ ...request, decision: 'rejected' })).toEqual({ valid: true });
  });

  it('fails closed when freshness is stale, revoked, or indeterminate', () => {
    for (const freshnessStatus of ['stale', 'revoked', 'indeterminate'] as const) {
      expect(validateSubmitAcceptanceDecisionRequest({ ...request, freshnessStatus })).toEqual({
        valid: false, reason: 'submitAcceptanceDecision requires a fresh authority revalidation',
      });
    }
  });

  it('fails closed on an unsupported decision value', () => {
    expect(validateSubmitAcceptanceDecisionRequest({ ...request, decision: 'unknown' as never })).toEqual({
      valid: false, reason: 'submitAcceptanceDecision decision is unsupported',
    });
  });

  it('fails closed on an unknown contract version', () => {
    expect(validateSubmitAcceptanceDecisionRequest({ ...request, contractVersion: '2' as never })).toEqual({
      valid: false, reason: 'submitAcceptanceDecision contract version is unknown',
    });
  });

  it('fails closed on a missing authority context field', () => {
    expect(validateSubmitAcceptanceDecisionRequest({
      ...request, authorityContext: { ...authorityContext, verifiedAt: '' },
    })).toEqual({ valid: false, reason: 'submitAcceptanceDecision authority context is invalid' });
  });
});
