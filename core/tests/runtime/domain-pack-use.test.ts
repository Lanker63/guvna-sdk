import { generateKeyPairSync, sign } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  decryptAuthorizedDomainPackArtifact,
  encryptDomainPackArtifact,
  type DomainPackEntitlementClaims,
} from '../../src/runtime/index.js';

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
const key = { keyId: 'pack-key', key: Buffer.alloc(32, 7) };
const claims: DomainPackEntitlementClaims = {
  licenseeKind: 'organization', licenseeId: 'org-1', packIdentity: 'pack-1', packVersion: '1.0.0',
  operations: ['use'], repositoryScope: 'org-1', issuedAt: '2026-08-21T00:00:00Z',
  expiresAt: '2026-08-22T00:00:00Z', grantId: 'grant-1',
};
const canonicalize = (value: unknown): string => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(canonicalize).join(',')}]`
  : `{${Object.keys(value as object).sort().map((key) => `${JSON.stringify(key)}:${canonicalize((value as Record<string, unknown>)[key])}`).join(',')}}`;
const grant = JSON.stringify({ version: '1', keyId: 'grant-key', claims, signature: sign(null, Buffer.from(canonicalize(claims)), privateKey).toString('base64url') });
const request = { grant, licenseeKind: 'organization' as const, licenseeId: 'org-1', packIdentity: 'pack-1', packVersion: '1.0.0', operation: 'use', repositoryId: 'repo-1', now: '2026-08-21T12:00:00Z' };
const validation = { publicKeys: new Map([['grant-key', publicKey]]), isRevoked: async () => false, isRepositoryInScope: (scope: string) => scope === 'org-1' };

it('decrypts and audits only after entitlement validation', async () => {
  const uses: unknown[] = [];
  const plaintext = await decryptAuthorizedDomainPackArtifact(encryptDomainPackArtifact('pack', key), key, request, validation, { recordUse: async (...args) => { uses.push(args); } });
  expect(plaintext).toBe('pack');
  expect(uses).toHaveLength(1);
});

describe('authorized Domain Pack use', () => {
  it('refuses invalid entitlement before decrypting', async () => {
    await expect(decryptAuthorizedDomainPackArtifact('{', key, { ...request, licenseeId: 'other-org' }, validation, { recordUse: async () => {} })).rejects.toThrow('entitlement refused');
  });
});
