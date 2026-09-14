import { describe, expect, it } from 'vitest';
import {
  requestRepositoryAuthorityEvidenceAdmission,
  requestRuntimeUseAdmission,
  checkRuntimeEntitlementRevocation,
  getRuntimeEntitlementOutageState,
  runtimeEntitlementSdkContractVersion,
  type RuntimeEntitlementTransport,
} from '../src/runtime-entitlement.js';

const scope = { kind: 'repository' as const, id: 'repo-1' };

function transport(response: unknown): RuntimeEntitlementTransport {
  return { send: async () => JSON.stringify(response) };
}

describe('Runtime Entitlement SDK contract v1', () => {
  it('requests Runtime-use admission through transport and preserves the typed outcome', async () => {
    const result = await requestRuntimeUseAdmission({ scope }, 'request-1', transport({
      protocolVersion: '1', requestId: 'request-1', operation: 'requestRuntimeUseAdmission', ok: true,
      payload: { outcomeReference: 'admission-1', capabilities: ['runtime.use'], validFrom: '2026-09-14T00:00:00Z', validUntil: '2026-09-14T01:00:00Z' },
    }));
    expect(result).toEqual({ ok: true, value: expect.objectContaining({ outcomeReference: 'admission-1' }) });
  });

  it('requests Repository Authority Evidence admission without exposing private material', async () => {
    const result = await requestRepositoryAuthorityEvidenceAdmission({ principalReference: 'principal-1', scope }, 'request-2', transport({
      protocolVersion: '1', requestId: 'request-2', operation: 'requestRepositoryAuthorityEvidenceAdmission', ok: true,
      payload: { outcomeReference: 'evidence-admission-1', validFrom: '2026-09-14T00:00:00Z', validUntil: '2026-09-14T01:00:00Z' },
    }));
    expect(result).toMatchObject({ ok: true, value: { outcomeReference: 'evidence-admission-1' } });
    expect(JSON.stringify(result)).not.toContain('privateKey');
  });

  it('returns explicit revocation and outage responses', async () => {
    await expect(checkRuntimeEntitlementRevocation({ artifactReference: 'claim-1' }, 'request-3', transport({
      protocolVersion: '1', requestId: 'request-3', operation: 'checkRevocationStatus', ok: true,
      payload: { status: 'current', observedAt: '2026-09-14T00:00:00Z' },
    }))).resolves.toEqual({ ok: true, value: { status: 'current', observedAt: '2026-09-14T00:00:00Z' } });
    await expect(getRuntimeEntitlementOutageState('request-4', transport({
      protocolVersion: '1', requestId: 'request-4', operation: 'getOutageOperationState', ok: true,
      payload: { availableOperations: ['requestRuntimeUseAdmission'] },
    }))).resolves.toEqual({ ok: true, value: { availableOperations: ['requestRuntimeUseAdmission'] } });
  });

  it('fails closed for mismatched correlation, malformed responses, and unknown failures', async () => {
    await expect(requestRuntimeUseAdmission({ scope }, 'request-5', transport({ protocolVersion: '1', requestId: 'other', operation: 'requestRuntimeUseAdmission', ok: true, payload: {} }))).resolves.toEqual({ ok: false, reason: 'SDK Runtime Entitlement response is invalid' });
    await expect(requestRuntimeUseAdmission({ scope }, 'request-6', { send: async () => 'not-json' })).resolves.toEqual({ ok: false, reason: 'SDK Runtime Entitlement response is invalid JSON' });
    await expect(requestRuntimeUseAdmission({ scope }, 'request-7', transport({ protocolVersion: '1', requestId: 'request-7', operation: 'requestRuntimeUseAdmission', ok: false, reason: 'expired' }))).resolves.toEqual({ ok: false, reason: 'expired' });
    expect(runtimeEntitlementSdkContractVersion).toBe('v1');
  });
});
