import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { RuntimeGateway } from '@guvna/core';

export interface RuntimeGatewayServerConfiguration {
  bindAddress: string;
  port: number;
}

export interface RuntimeGatewayServer {
  address(): string | null;
  close(): Promise<void>;
}

export async function startRuntimeGatewayServer(
  gateway: RuntimeGateway,
  configuration: RuntimeGatewayServerConfiguration,
): Promise<RuntimeGatewayServer> {
  if (!configuration.bindAddress || !Number.isInteger(configuration.port) || configuration.port < 0 || configuration.port > 65535) {
    throw new Error('Runtime gateway server configuration is invalid');
  }
  const server = createServer((request, response) => {
    void handleRequest(gateway, request, response);
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(configuration.port, configuration.bindAddress, () => {
      server.removeListener('error', reject);
      resolve();
    });
  });
  return {
    address: () => {
      const address = server.address();
      return typeof address === 'object' && address ? `${address.address}:${address.port}` : null;
    },
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function handleRequest(gateway: RuntimeGateway, request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== 'POST') {
    respond(response, 405, 'Runtime gateway method is not allowed');
    return;
  }
  if (!request.headers['content-type']?.toLowerCase().includes('application/json')) {
    respond(response, 415, 'Runtime gateway content type is invalid');
    return;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  try {
    const body = Buffer.concat(chunks).toString('utf8');
    const result = await gateway.handle(body);
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(result);
  } catch (error) {
    respond(response, 503, error instanceof Error ? error.message : String(error));
  }
}

function respond(response: ServerResponse, status: number, reason: string): void {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ ok: false, reason }));
}