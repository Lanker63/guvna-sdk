import { describe, expect, it } from 'vitest';
import {
  validateAcceptanceRecord,
  type AcceptanceRecord,
} from '../../src/compiler/acceptance-record-contract.js';

const baseRecord: AcceptanceRecord = {
  acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
  contractVersion: '1.0.0',
  governedRepositoryId: 'guvna-core',
  subjectKind: 'single-artifact',
  subjectIdentity: 'oidc-authentication-adr',
  status: 'candidate',
  authorityContext: {
    principalId: 'principal-1',
    governedRepositoryId: 'guvna-core',
    authorityScope: 'repository',
    verifiedAt: '2026-08-20T00:00:00Z',
  },
  candidateStatementIdentity: 'candidate-oidc-authentication',
  evidenceIdentities: ['evidence-architecture'],
};

describe('acceptance record contract', () => {
  it('accepts a single-artifact candidate', () => {
    expect(validateAcceptanceRecord(baseRecord)).toEqual({ valid: true });
  });

  it('requires a UUID record identity and kebab-case subject identity', () => {
    expect(validateAcceptanceRecord({ ...baseRecord, acceptanceRecordId: '1' }).valid).toBe(false);
    expect(validateAcceptanceRecord({ ...baseRecord, subjectIdentity: 'artifact_1' }).valid).toBe(false);
    expect(validateAcceptanceRecord({ ...baseRecord, subjectIdentity: '123' }).valid).toBe(false);
  });

  it('fails closed for malformed supplied records', () => {
    expect(validateAcceptanceRecord(null as unknown as AcceptanceRecord).valid).toBe(false);
    expect(validateAcceptanceRecord({ ...baseRecord, authorityContext: null } as unknown as AcceptanceRecord).valid).toBe(false);
  });

  it('requires a manifest for change sets, including removed-file hashes', () => {
    expect(validateAcceptanceRecord({ ...baseRecord, subjectKind: 'change-set' }).valid).toBe(false);
    expect(validateAcceptanceRecord({
      ...baseRecord,
      subjectKind: 'change-set',
      fileManifest: [{ path: 'src/auth.ts', changeKind: 'updated', contentHash: `sha256:${'a'.repeat(64)}` },
        { path: 'src/old.ts', changeKind: 'removed', contentHash: `sha256:${'b'.repeat(64)}` }],
    })).toEqual({ valid: true });
  });

  it('does not allow a superseded record to transition onward', () => {
    expect(validateAcceptanceRecord({
      ...baseRecord,
      status: 'superseded',
      supersedesAcceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
    }).valid).toBe(false);
  });

  it('fails closed when authority context is for another repository', () => {
    expect(validateAcceptanceRecord({
      ...baseRecord,
      authorityContext: { ...baseRecord.authorityContext, governedRepositoryId: 'other-repository' },
    })).toEqual({ valid: false, reason: 'authority context is missing or out of repository scope' });
  });

  it('requires normalized repository-relative unique SHA-256 manifest entries', () => {
    expect(validateAcceptanceRecord({ ...baseRecord, subjectKind: 'change-set', fileManifest: [
      { path: '/src/auth.ts', changeKind: 'created', contentHash: `sha256:${'a'.repeat(64)}` },
    ] }).valid).toBe(false);
    expect(validateAcceptanceRecord({ ...baseRecord, subjectKind: 'change-set', fileManifest: [
      { path: 'src/auth.ts', changeKind: 'created', contentHash: `sha256:${'a'.repeat(64)}` },
      { path: 'src/auth.ts', changeKind: 'updated', contentHash: `sha256:${'b'.repeat(64)}` },
    ] }).valid).toBe(false);
  });
});