import { pathToFileURL } from 'node:url';
import { createRuntimeGateway, type RuntimeSemanticRules } from '@guvna/core';
import { FileRuntimeGatewayProjectionSource } from './projection-source.js';
import { startRuntimeGatewayServer } from './server.js';

const projectionPath = process.env.GUVNA_RUNTIME_PROJECTION;
const rulesModulePath = process.env.GUVNA_RUNTIME_RULES_MODULE;
const bindAddress = process.env.GUVNA_RUNTIME_BIND_ADDRESS;
const configuredPort = process.env.GUVNA_RUNTIME_PORT;

if (!projectionPath || !rulesModulePath || !bindAddress || !configuredPort) {
  throw new Error('GUVNA_RUNTIME_PROJECTION, GUVNA_RUNTIME_RULES_MODULE, GUVNA_RUNTIME_BIND_ADDRESS, and GUVNA_RUNTIME_PORT are required');
}
const port = Number(configuredPort);

const moduleValue = await import(pathToFileURL(rulesModulePath).href);
const rules = moduleValue.default as RuntimeSemanticRules | undefined;
if (!rules) throw new Error('Runtime rules module must export a default RuntimeSemanticRules value');

const server = await startRuntimeGatewayServer(
  createRuntimeGateway({
    contextSource: new FileRuntimeGatewayProjectionSource(projectionPath),
    rules,
  }),
  { bindAddress, port },
);

console.log(`Runtime gateway listening at ${server.address()}`);

const shutdown = async () => {
  await server.close();
  process.exit(0);
};
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
