import { generateKeyPairSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { DomainPackEntitlementService, PersistentDomainPackEntitlementRevocationStore } from '../../src/runtime/index.js';

const { privateKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
const input = {
  licenseeKind: 'organization' as const, licenseeId: 'org-1', packIdentity: 'pack-1', packVersion: '1.0.0',
  operations: ['use'], repositoryScope: 'administered-by:org-1',
  issuedAt: '2026-08-21T00:00:00Z', expiresAt: '2026-08-22T00:00:00Z', grantId: 'grant-1',
};

function revocationStore() {
  const revoked = new Set<string>();
  return new PersistentDomainPackEntitlementRevocationStore({
    has: async (grantId: string) => revoked.has(grantId),
    add: async (grantId: string) => { revoked.add(grantId); },
  });
}

describe('Domain Pack entitlement service', () => {
  it('issues grants and audits issuance', async () => {
    const events: unknown[] = [];
    const service = new DomainPackEntitlementService({ keyId: 'key-1', privateKey, audit: async (event) => { events.push(event); } }, revocationStore());
    const grant = JSON.parse(await service.issue(input)) as { version: string; algorithm: string; keyId: string; claims: typeof input; signature: string };
    expect(grant).toMatchObject({ version: '1', algorithm: 'ECDSA_SHA_256', keyId: 'key-1', claims: input });
    expect(grant.signature).toBeTruthy();
    expect(events).toEqual([{ eventKind: 'issued', grantId: 'grant-1', packIdentity: 'pack-1', packVersion: '1.0.0', licenseeId: 'org-1', timestamp: input.issuedAt }]);
  });

  it('revokes grants and records use and revocation events', async () => {
    const events: unknown[] = [];
    const service = new DomainPackEntitlementService({ keyId: 'key-1', privateKey, audit: async (event) => { events.push(event); } }, revocationStore());
    await service.recordUse({ grantId: 'grant-1', packIdentity: 'pack-1', packVersion: '1.0.0', licenseeId: 'org-1' }, 'repo-1', 'use', input.issuedAt);
    await service.revoke('grant-1', input, input.issuedAt);
    expect(await service.isRevoked('grant-1')).toBe(true);
    expect(events).toHaveLength(2);
    expect(events.map((event) => (event as { eventKind: string }).eventKind)).toEqual(['used', 'revoked']);
  });
});
