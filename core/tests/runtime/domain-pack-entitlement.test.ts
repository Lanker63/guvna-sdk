import { generateKeyPairSync, sign } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  validateDomainPackEntitlement,
  type DomainPackEntitlementClaims,
} from '../../src/runtime/index.js';

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
const claims: DomainPackEntitlementClaims = {
  licenseeKind: 'organization', licenseeId: 'org-1', packIdentity: 'pack-1', packVersion: '1.0.0',
  operations: ['use'], repositoryScope: 'administered-by:org-1',
  issuedAt: '2026-08-21T00:00:00Z', expiresAt: '2026-08-22T00:00:00Z', grantId: 'grant-1',
};

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value as object).sort().map((key) => `${JSON.stringify(key)}:${canonicalize((value as Record<string, unknown>)[key])}`).join(',')}}`;
}

function grant(overrides: Partial<DomainPackEntitlementClaims> = {}): string {
  const signedClaims = { ...claims, ...overrides };
  return JSON.stringify({
    version: '1', keyId: 'key-1', claims: signedClaims,
    signature: sign(null, Buffer.from(canonicalize(signedClaims)), privateKey).toString('base64url'),
  });
}

const request = (grantValue: string, overrides: Record<string, unknown> = {}) => ({
  grant: grantValue, licenseeKind: 'organization' as const, licenseeId: 'org-1',
  packIdentity: 'pack-1', packVersion: '1.0.0', operation: 'use', repositoryId: 'repo-1',
  now: '2026-08-21T12:00:00Z', ...overrides,
});
const dependencies = {
  publicKeys: new Map([['key-1', publicKey]]),
  isRevoked: async (grantId: string) => grantId === 'revoked',
  isRepositoryInScope: (scope: string, repositoryId: string) => scope === 'administered-by:org-1' && repositoryId === 'repo-1',
};

describe('Domain Pack entitlement validation', () => {
  it('accepts a valid signed grant', async () => {
    await expect(validateDomainPackEntitlement(request(grant()), dependencies)).resolves.toMatchObject({ ok: true });
  });

  it('fails closed for malformed, tampered, out-of-scope, expired, and revoked grants', async () => {
    await expect(validateDomainPackEntitlement(request('{'), dependencies)).resolves.toMatchObject({ ok: false });
    await expect(validateDomainPackEntitlement(request(grant(), { operation: 'install' }), dependencies)).resolves.toMatchObject({ ok: false });
    await expect(validateDomainPackEntitlement(request(grant({ expiresAt: '2026-08-21T00:00:00Z' })), dependencies)).resolves.toMatchObject({ ok: false });
    await expect(validateDomainPackEntitlement(request(grant({ grantId: 'revoked' })), dependencies)).resolves.toMatchObject({ ok: false });
  });

  it('rejects signature tampering', async () => {
    const value = JSON.parse(grant()) as { claims: DomainPackEntitlementClaims; signature: string };
    value.claims.licenseeId = 'other-org';
    await expect(validateDomainPackEntitlement(request(JSON.stringify(value)), dependencies)).resolves.toMatchObject({ ok: false });
  });
});
