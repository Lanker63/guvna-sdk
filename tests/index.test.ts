import { describe, expect, it } from 'vitest';
import {
  decodeRuntimeOperation,
  encodeRuntimeOperation,
  encodeRuntimeOperationResult,
  type RuntimeProtocolAdapter,
} from '../src/index.js';

const identity = { identityKind: 'semantic', value: 'contract-1' };
const scope = {
  identity: { identityKind: 'scope', value: 'scope-1' },
  meaning: { statement: 'runtime scope', terms: [] },
};
const context = {
  contract: {
    identity,
    version: { value: '1.0.0', semanticIdentity: { identity }, scope },
    contractKind: 'semantic' as const,
    lifecycle: {
      lifecycleState: { identity: { identityKind: 'lifecycle', value: 'applicable' } },
      transitions: [],
    },
    applicability: {
      applicable: true as const,
      scope,
      conditions: [],
      authorityDecision: { identity: { identityKind: 'decision', value: 'apply-1' } },
      provenance: [],
    },
    ratification: {
      ratified: true,
      requiresHumanAuthority: true,
      authorityDecision: { identity: { identityKind: 'decision', value: 'ratify-1' } },
      provenance: [],
      record: {
        candidateContractIdentity: identity,
        candidateContractVersion: '1.0.0',
        validationEvidence: { identity },
        validationResult: 'conformant' as const,
        ratificationEvent: { identity: { identityKind: 'event', value: 'ratify-event-1' } },
        ratifiedContractVersion: '1.0.0',
        applicableScope: scope,
      },
    },
    provenance: [],
  },
  identity,
  version: '1.0.0',
  scope,
};

const operation = {
  operationKind: 'recordEvidence' as const,
  identity: { identityKind: 'operation', value: 'record-1' },
  evaluation: {
    identity: { identityKind: 'evaluation', value: 'evaluation-1' },
    outcome: { outcomeKind: 'conformant' as const, findings: [] },
    attribution: {
      contractIdentity: identity,
      contractVersion: '1.0.0',
      scope,
      provenance: [],
      executionContext: { identity: { identityKind: 'execution', value: 'execution-1' } },
      authorityBasis: [],
    },
  },
  outcome: { outcomeKind: 'conformant' as const, findings: [] },
  attribution: {
    contractIdentity: identity,
    contractVersion: '1.0.0',
    scope,
    provenance: [],
  },
};

const adapter: RuntimeProtocolAdapter = {
  admitContext: (value) =>
    value
      ? { ok: true, context: value }
      : { ok: false, reason: 'Runtime requires a valid applicable ratified semantic context' },
  validateOperation: (value) =>
    value &&
    typeof value === 'object' &&
    ['operationKind', 'identity', 'evaluation', 'outcome', 'attribution'].every(
      (field) => field in value,
    )
      ? { valid: true }
      : { valid: false, reason: 'Runtime operation structure is invalid' },
  validateOperationResult: (value) =>
    value && typeof value === 'object'
      ? { valid: true }
      : { valid: false, reason: 'Runtime operation result structure is invalid' },
};

describe('SDK Runtime transport', () => {
  it('uses the supplied runtime protocol adapter', () => {
    expect(encodeRuntimeOperation(context, operation, adapter)).toEqual({
      ok: true,
      value: JSON.stringify(operation),
    });
  });

  it('fails closed before encoding without an admitted context', () => {
    expect(encodeRuntimeOperation(undefined, operation, adapter)).toEqual({
      ok: false,
      reason: 'Runtime requires a valid applicable ratified semantic context',
    });
  });

  it('preserves an approved Runtime operation through transport', () => {
    const encoded = encodeRuntimeOperation(context, operation, adapter);
    expect(encoded).toEqual({ ok: true, value: JSON.stringify(operation) });
    expect(encoded.ok && decodeRuntimeOperation(context, encoded.value, adapter)).toEqual({
      ok: true,
      value: operation,
    });
  });

  it('preserves Runtime result attribution through transport', () => {
    const result = { ok: false as const, failure: {
      failureKind: 'unauthorized-input' as const,
      input: operation.identity,
      reason: 'not admitted',
    } };
    const encoded = encodeRuntimeOperationResult(context, result, adapter);
    expect(encoded.ok && JSON.parse(encoded.value)).toEqual(result);
  });

  it('rejects malformed payloads after context admission', () => {
    expect(decodeRuntimeOperation(context, '{', adapter)).toEqual({
      ok: false,
      reason: 'SDK Runtime operation payload is invalid JSON',
    });
    expect(decodeRuntimeOperation(context, JSON.stringify({ operationKind: 'evaluate' }), adapter)).toEqual({
      ok: false,
      reason: 'Runtime operation structure is invalid',
    });
  });
});