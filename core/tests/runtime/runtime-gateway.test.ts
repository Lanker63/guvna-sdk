import { describe, expect, it } from 'vitest';
import { createRuntimeGateway } from '../../src/runtime/runtime-gateway.js';

const gateway = createRuntimeGateway({
  contextSource: {
    getProjection: async () => ({
      governedRepositoryIdentity: { identityKind: 'repository', value: 'test-repository' },
      projectionIdentity: { identityKind: 'projection', value: 'test-projection' },
      projectionVersion: '1.0.0',
      compiledAt: '2026-08-22T00:00:00Z',
      freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
      contracts: [],
    }),
  },
  rules: {
    evaluate: () => ({ ok: false, failure: { failureKind: 'missing-input', input: { identityKind: 'test', value: 'test' }, reason: 'not used' } }),
    acceptEvaluation: () => false,
    produceDirective: () => ({ failureKind: 'missing-input', input: { identityKind: 'test', value: 'test' }, reason: 'not used' }),
  },
});

describe('Runtime gateway', () => {
  it('fails closed for malformed protocol input', async () => {
    await expect(gateway.handle('not-json')).resolves.toBe(JSON.stringify({
      protocolVersion: '1', requestId: '', ok: false, reason: 'Runtime gateway request is invalid JSON',
    }));
  });

  it('rejects unknown operations with correlation preserved', async () => {
    await expect(gateway.handle(JSON.stringify({ protocolVersion: '1', requestId: 'request-1', operation: 'unknown' }))).resolves.toBe(JSON.stringify({
      protocolVersion: '1', requestId: 'request-1', ok: false, reason: 'Runtime gateway operation is unknown',
    }));
  });

  it('rejects malformed Runtime operation payloads through the protocol', async () => {
    await expect(gateway.handle(JSON.stringify({
      protocolVersion: '1',
      requestId: 'request-2',
      operation: 'evaluate',
      context: {},
      payload: {},
    }))).resolves.toBe(JSON.stringify({
      protocolVersion: '1',
      requestId: 'request-2',
      ok: false,
      reason: 'Runtime operation structure is invalid',
    }));
  });
});