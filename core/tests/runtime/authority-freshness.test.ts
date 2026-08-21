import { describe, expect, it } from 'vitest';
import {
  acquireFreshAuthority,
  canAcceptWithFreshAuthority,
  canCallWebSurfaceWithFreshAuthority,
  finalizeAcceptance,
  type RepositoryAuthorityFreshness,
  type RepositoryAuthoritySnapshot,
} from '../../src/runtime/index.js';

const snapshot: RepositoryAuthoritySnapshot = {
  principalId: 'principal-1',
  governedRepositoryId: 'guvna-core',
  active: true,
  observedAt: '2026-08-20T00:00:00Z',
};

describe('Runtime authority freshness', () => {
  it('fails closed when authority acquisition is absent or revoked', () => {
    expect(acquireFreshAuthority(undefined)).toBeNull();
    expect(acquireFreshAuthority({
      acquireAuthority: () => ({ ...snapshot, active: false }),
      revalidateAcquisition: () => true,
      revalidateAcceptance: () => true,
      revalidateWebCall: () => true,
    })).toBeNull();
    expect(acquireFreshAuthority({
      acquireAuthority: () => snapshot,
      revalidateAcquisition: () => false,
      revalidateAcceptance: () => true,
      revalidateWebCall: () => true,
    })).toBeNull();
  });

  it('requires a fresh active authority snapshot before acceptance', () => {
    const freshness: RepositoryAuthorityFreshness = {
      acquireAuthority: () => snapshot,
      revalidateAcquisition: () => true,
      revalidateAcceptance: () => true,
      revalidateWebCall: () => true,
    };
    expect(canAcceptWithFreshAuthority(snapshot, freshness)).toBe(true);
    expect(canAcceptWithFreshAuthority({ ...snapshot, active: false }, freshness)).toBe(false);
    expect(canAcceptWithFreshAuthority(snapshot, undefined)).toBe(false);
  });

  it('fails closed when revocation is observed at a later web call', () => {
    const freshness: RepositoryAuthorityFreshness = {
      acquireAuthority: () => snapshot,
      revalidateAcquisition: () => true,
      revalidateAcceptance: () => true,
      revalidateWebCall: () => false,
    };
    expect(canCallWebSurfaceWithFreshAuthority(snapshot, freshness)).toBe(false);
  });

  it('finalizes only a candidate with fresh authority', () => {
    const freshness: RepositoryAuthorityFreshness = {
      acquireAuthority: () => snapshot,
      revalidateAcquisition: () => true,
      revalidateAcceptance: () => true,
      revalidateWebCall: () => true,
    };
    expect(finalizeAcceptance(
      {
        acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
        contractVersion: '1.0.0', governedRepositoryId: 'guvna-core',
        subjectKind: 'single-artifact', subjectIdentity: 'authority-model-adr',
        status: 'candidate', authorityContext: {
          principalId: 'principal-1', governedRepositoryId: 'guvna-core',
          authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
        }, candidateStatementIdentity: 'candidate-authority-model', evidenceIdentities: [],
      }, 'decision-1', snapshot, freshness, '2026-08-20T00:01:00Z',
    )).toMatchObject({ ok: true, record: { status: 'accepted', authorityDecisionIdentity: 'decision-1' } });
  });

  it('blocks acceptance after revocation', () => {
    const freshness: RepositoryAuthorityFreshness = {
      acquireAuthority: () => snapshot,
      revalidateAcquisition: () => true,
      revalidateAcceptance: () => false,
      revalidateWebCall: () => true,
    };
    const candidate = {
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      contractVersion: '1.0.0', governedRepositoryId: 'guvna-core',
      subjectKind: 'single-artifact' as const, subjectIdentity: 'revoked-authority-adr',
      status: 'candidate' as const, authorityContext: {
        principalId: 'principal-1', governedRepositoryId: 'guvna-core',
        authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
      }, candidateStatementIdentity: 'candidate-revoked-authority', evidenceIdentities: [],
    };
    expect(finalizeAcceptance(candidate, 'decision-1', snapshot, freshness, '2026-08-20T00:01:00Z')).toEqual({
      ok: false, reason: 'Repository Authority is not fresh or active',
    });
  });
});