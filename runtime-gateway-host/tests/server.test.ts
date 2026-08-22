import { describe, expect, it } from 'vitest';
import { startRuntimeGatewayServer } from '../src/server.js';
import { HttpRuntimeTransport } from '../src/http-transport.js';
import { requestApplicableSemanticContext } from '@guvna/sdk';

describe('Runtime gateway HTTP host', () => {
  it('connects SDK admission to the configured gateway transport', async () => {
    const context = { contract: {}, identity: {}, version: '1', scope: {} };
    const server = await startRuntimeGatewayServer({ handle: async () => JSON.stringify({ protocolVersion: '1', requestId: 'request-1', ok: true, payload: context }) }, { bindAddress: '127.0.0.1', port: 0 });
    try {
      const result = await requestApplicableSemanticContext({}, 'request-1', new HttpRuntimeTransport(`http://${server.address()}`), { admitContext: value => value && typeof value === 'object' ? { ok: true, context: value } : { ok: false, reason: 'invalid' }, validateOperation: () => ({ valid: true }), validateOperationResult: () => ({ valid: true }) });
      expect(result).toEqual({ ok: true, context });
    } finally {
      await server.close();
    }
  });

  it('passes configured JSON requests and gateway responses through unchanged', async () => {
    const gateway = { handle: async (payload: string) => JSON.stringify({ received: payload }) };
    const server = await startRuntimeGatewayServer(gateway, { bindAddress: '127.0.0.1', port: 0 });
    try {
      const response = await fetch(`http://${server.address()}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{"request":true}',
      });
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('{"received":"{\\"request\\":true}"}');
    } finally {
      await server.close();
    }
  });

  it('rejects unsupported methods and content types', async () => {
    const server = await startRuntimeGatewayServer({ handle: async () => '{}' }, { bindAddress: '127.0.0.1', port: 0 });
    try {
      const url = `http://${server.address()}`;
      expect((await fetch(url)).status).toBe(405);
      expect((await fetch(url, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: '{}' })).status).toBe(415);
    } finally {
      await server.close();
    }
  });

  it('returns an explicit unavailable response when the gateway fails', async () => {
    const server = await startRuntimeGatewayServer({ handle: async () => { throw new Error('runtime unavailable'); } }, { bindAddress: '127.0.0.1', port: 0 });
    try {
      const response = await fetch(`http://${server.address()}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
      expect(response.status).toBe(503);
      expect(await response.json()).toEqual({ ok: false, reason: 'runtime unavailable' });
    } finally {
      await server.close();
    }
  });
});