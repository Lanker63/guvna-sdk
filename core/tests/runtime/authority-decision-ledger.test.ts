import { describe, expect, it } from 'vitest';
import { resolveAuthorityFreshnessStatus, type AuthorityChangeRecord } from '../../src/runtime/authority-decision-ledger.js';

const principalId = 'principal-1';
const governedRepositoryId = 'guvna-core';

function record(overrides: Partial<AuthorityChangeRecord>): AuthorityChangeRecord {
  return {
    authorityChangeRecordId: '550e8400-e29b-41d4-a716-446655440000',
    principalId,
    scope: 'repository',
    governedRepositoryId,
    decision: 'promote',
    actingAdminId: 'admin-1',
    decidedAt: '2026-08-20T00:00:00Z',
    revision: 1,
    ...overrides,
  };
}

describe('resolveAuthorityFreshnessStatus', () => {
  it('fails closed to stale when the live authenticated call did not succeed', () => {
    expect(resolveAuthorityFreshnessStatus([record({})], principalId, governedRepositoryId, false)).toBe('stale');
  });

  it('is indeterminate with no applicable history', () => {
    expect(resolveAuthorityFreshnessStatus([], principalId, governedRepositoryId, true)).toBe('indeterminate');
    expect(resolveAuthorityFreshnessStatus(undefined, principalId, governedRepositoryId, true)).toBe('indeterminate');
  });

  it('is fresh on the newest repository-specific promote', () => {
    const records = [
      record({ revision: 1, decision: 'promote' }),
      record({ revision: 2, decision: 'revoke' }),
      record({ revision: 3, decision: 'promote' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('fresh');
  });

  it('is revoked on the newest repository-specific revoke', () => {
    const records = [record({ revision: 1, decision: 'promote' }), record({ revision: 2, decision: 'revoke' })];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('revoked');
  });

  it('prefers a repository-specific revoke over an organization-wide grant', () => {
    const records = [
      record({ scope: 'organization', governedRepositoryId: undefined, organizationId: 'org-1', revision: 1, decision: 'promote' }),
      record({ scope: 'repository', revision: 2, decision: 'revoke' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('revoked');
  });

  it('keeps an independent repository-specific grant fresh after an organization-wide revoke', () => {
    const records = [
      record({ scope: 'organization', governedRepositoryId: undefined, organizationId: 'org-1', revision: 5, decision: 'revoke' }),
      record({ scope: 'repository', revision: 1, decision: 'promote' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('fresh');
  });

  it('falls back to organization-wide history when no repository-specific record exists', () => {
    const records = [
      record({ scope: 'organization', governedRepositoryId: undefined, organizationId: 'org-1', revision: 1, decision: 'promote' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('fresh');
  });

  it('is indeterminate on a tie between conflicting decisions at the same revision', () => {
    const records = [
      record({ revision: 1, decision: 'promote', authorityChangeRecordId: '550e8400-e29b-41d4-a716-446655440001' }),
      record({ revision: 1, decision: 'revoke', authorityChangeRecordId: '550e8400-e29b-41d4-a716-446655440002' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('indeterminate');
  });

  it('is indeterminate on a malformed record for the principal', () => {
    const records = [record({ authorityChangeRecordId: 'not-a-uuid' })];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('indeterminate');
  });

  it('ignores records for other principals or repositories', () => {
    const records = [
      record({ principalId: 'other-principal' }),
      record({ governedRepositoryId: 'other-repo' }),
    ];
    expect(resolveAuthorityFreshnessStatus(records, principalId, governedRepositoryId, true)).toBe('indeterminate');
  });
});
