import { describe, expect, it } from 'vitest';
import {
  buildGovernedRetryQueueIdempotencyKey,
  decodeGovernedRetryQueueItem,
  encodeGovernedRetryQueueItem,
  isGovernedRetryQueueClaimsEligible,
  type GovernedRetryQueueItem,
} from '../src/index.js';

const item: GovernedRetryQueueItem = {
  queueItemId: 'queue-item-1',
  governedRepositoryId: 'repo-1',
  requestId: 'request-1',
  operation: 'enqueueRetryWorkItem',
  payload: { task: 'retry-me' },
  idempotencyKey: 'repo-1:request-1:enqueueRetryWorkItem:{"task":"retry-me"}',
  enqueuedAt: '2026-08-31T00:00:00.000Z',
  status: 'queued',
};

describe('governed retry queue SDK surface', () => {
  it('round-trips a queue record', () => {
    const encoded = encodeGovernedRetryQueueItem(item);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeGovernedRetryQueueItem(encoded.value)).toEqual({ ok: true, value: item });
  });

  it('builds a deterministic idempotency key', () => {
    expect(buildGovernedRetryQueueIdempotencyKey('repo-1', 'request-1', 'enqueueRetryWorkItem', { task: 'retry-me' })).toEqual({
      ok: true,
      value: 'repo-1:request-1:enqueueRetryWorkItem:{"task":"retry-me"}',
    });
  });

  it('fails closed for missing idempotency inputs', () => {
    expect(buildGovernedRetryQueueIdempotencyKey('', 'request-1', 'enqueueRetryWorkItem', {})).toEqual({
      ok: false,
      reason: 'SDK governed repository identifier is missing',
    });
  });

  it('rejects stale claims and accepts the last granted claims snapshot', () => {
    const claims = {
      governedRepositoryId: 'repo-1',
      principalId: 'principal-1',
      authorityScope: 'repository',
      grantedAt: '2026-08-31T00:00:00.000Z',
    };
    const eligible = { ...claims, claimsDigest: '{"authorityScope":"repository","governedRepositoryId":"repo-1","grantedAt":"2026-08-31T00:00:00.000Z","principalId":"principal-1"}' };
    expect(isGovernedRetryQueueClaimsEligible(undefined, claims)).toBe(true);
    expect(isGovernedRetryQueueClaimsEligible(eligible, claims)).toBe(true);
    expect(isGovernedRetryQueueClaimsEligible({ ...eligible, claimsDigest: 'stale' }, claims)).toBe(false);
  });
});