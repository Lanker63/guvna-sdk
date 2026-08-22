import type { RuntimeTransport } from '@guvna/sdk';

export class HttpRuntimeTransport implements RuntimeTransport {
  constructor(
    private readonly endpoint: string,
    private readonly fetcher: typeof fetch = fetch,
    private readonly timeoutMs = 5000,
  ) {}

  async send(payload: string, signal?: AbortSignal): Promise<string> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const abort = () => controller.abort();
    signal?.addEventListener('abort', abort, { once: true });
    try {
      const response = await this.fetcher(this.endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: payload,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Runtime transport returned HTTP ${response.status}`);
      if (!response.headers.get('content-type')?.toLowerCase().includes('application/json')) {
        throw new Error('Runtime response content type is invalid');
      }
      return response.text();
    } finally {
      clearTimeout(timeout);
      signal?.removeEventListener('abort', abort);
    }
  }
}