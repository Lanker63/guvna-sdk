import { describe, expect, it } from 'vitest';
import {
  decodeDomainPackEntitlementIssuanceOutcome,
  decodeDomainPackEntitlementIssuanceRequest,
  encodeDomainPackEntitlementIssuanceOutcome,
  encodeDomainPackEntitlementIssuanceRequest,
  type DomainPackEntitlementIssuanceOutcome,
  type DomainPackEntitlementIssuanceRequestPayload,
} from '../src/index.js';

const requestId = 'req-1';
const payload: DomainPackEntitlementIssuanceRequestPayload = {
  licenseeKind: 'organization',
  licenseeId: 'org-1',
  packIdentity: 'pack-1',
  packVersion: '1.0.0',
  operations: ['install'],
  repositoryScope: 'repo-1',
};

describe('Runtime-owned entitlement issuance transport contract', () => {
  it('round-trips an issuance request', () => {
    const encoded = encodeDomainPackEntitlementIssuanceRequest(requestId, payload);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    const decoded = decodeDomainPackEntitlementIssuanceRequest(encoded.value);
    expect(decoded).toEqual({
      ok: true,
      value: { protocolVersion: '1', requestId, operation: 'issueDomainPackEntitlement', payload },
    });
  });

  it('rejects an issuance request missing a required field', () => {
    const encoded = encodeDomainPackEntitlementIssuanceRequest(requestId, {
      ...payload,
      licenseeId: '',
    });
    expect(encoded.ok).toBe(false);
  });

  it('rejects an issuance request with a missing request identifier', () => {
    const encoded = encodeDomainPackEntitlementIssuanceRequest('', payload);
    expect(encoded.ok).toBe(false);
  });

  it('round-trips an issued outcome', () => {
    const outcome: DomainPackEntitlementIssuanceOutcome = {
      protocolVersion: '1',
      requestId,
      outcome: 'issued',
      grant: '{"version":"1"}',
      grantId: 'grant-1',
      issuedAt: '2026-08-24T00:00:00.000Z',
      expiresAt: '2026-08-26T00:00:00.000Z',
    };
    const encoded = encodeDomainPackEntitlementIssuanceOutcome(outcome);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeDomainPackEntitlementIssuanceOutcome(requestId, encoded.value)).toEqual({ ok: true, value: outcome });
  });

  it('round-trips a denied outcome', () => {
    const outcome: DomainPackEntitlementIssuanceOutcome = {
      protocolVersion: '1',
      requestId,
      outcome: 'denied',
      reason: 'pack_not_purchased',
    };
    const encoded = encodeDomainPackEntitlementIssuanceOutcome(outcome);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeDomainPackEntitlementIssuanceOutcome(requestId, encoded.value)).toEqual({ ok: true, value: outcome });
  });

  it('round-trips an unavailable outcome', () => {
    const outcome: DomainPackEntitlementIssuanceOutcome = {
      protocolVersion: '1',
      requestId,
      outcome: 'unavailable',
      reason: 'Runtime entitlement transport is not configured',
    };
    const encoded = encodeDomainPackEntitlementIssuanceOutcome(outcome);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeDomainPackEntitlementIssuanceOutcome(requestId, encoded.value)).toEqual({ ok: true, value: outcome });
  });

  it('fails closed when decoding an outcome correlated to a different request', () => {
    const outcome: DomainPackEntitlementIssuanceOutcome = {
      protocolVersion: '1',
      requestId: 'other-request',
      outcome: 'denied',
      reason: 'pack_not_purchased',
    };
    const encoded = encodeDomainPackEntitlementIssuanceOutcome(outcome);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeDomainPackEntitlementIssuanceOutcome(requestId, encoded.value)).toEqual({
      ok: false,
      reason: 'SDK entitlement issuance outcome is invalid',
    });
  });

  it('fails closed on a malformed outcome payload', () => {
    expect(decodeDomainPackEntitlementIssuanceOutcome(requestId, '{}')).toEqual({
      ok: false,
      reason: 'SDK entitlement issuance outcome is invalid',
    });
  });
});
