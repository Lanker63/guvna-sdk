import { describe, expect, it } from 'vitest';
import {
  decodeRuntimeOperation,
  decodeRuntimeRequest,
  encodeDomainPackRequest,
  encodePreGovernanceDomainPackRequest,
  decodePreGovernanceDomainPackResponse,
  decodeDomainPackInstallResponse,
  encodeRuntimeFailureResponse,
  encodeRuntimeRequest,
  encodeRuntimeResponse,
  encodeRuntimeOperation,
  encodeRuntimeOperationResult,
  decodeAcceptanceRecord,
  encodeAcceptanceRecord,
  decodeAcceptanceRecordDiscoveryResponse,
  authorityTransportContractVersion,
  decodeConfirmRepositoryAuthorityRequest,
  encodeConfirmRepositoryAuthorityRequest,
  decodeRevalidateAuthorityRequest,
  encodeRevalidateAuthorityRequest,
  decodeAuthorityFreshnessResponse,
  encodeAuthorityFreshnessResponse,
  decodeSubmitAcceptanceDecisionRequest,
  encodeSubmitAcceptanceDecisionRequest,
  requestApplicableSemanticContext,
  receiveRuntimeAdmissionDecision,
  receiveRuntimeOperationResult,
  encodeRuntimeOperationRequest,
  encodeAcceptanceRecordDiscoveryResponse,
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

  it('encodes an adapter-free Runtime operation request and receives its result', async () => {
    const encoded = encodeRuntimeOperationRequest('operation-1', context, operation);
    expect(encoded.ok).toBe(true);
    const result = await receiveRuntimeOperationResult(JSON.parse(encoded.ok ? encoded.value : '{}'), 'operation-1', {
      send: async () => JSON.stringify({ protocolVersion: '1', requestId: 'operation-1', ok: true, payload: { ok: true, value: {} } }),
    });
    expect(result).toEqual({ ok: true, result: { ok: true, value: {} } });
  });

  it('fails closed for malformed or refused remote Runtime results', async () => {
    const malformed = await receiveRuntimeOperationResult({}, 'operation-2', {
      send: async () => JSON.stringify({ protocolVersion: '1', requestId: 'other', ok: true, payload: {} }),
    });
    const refused = await receiveRuntimeOperationResult({}, 'operation-3', {
      send: async () => JSON.stringify({ protocolVersion: '1', requestId: 'operation-3', ok: false, reason: 'invalid input' }),
    });
    expect(malformed).toEqual({ ok: false, reason: 'SDK Runtime operation response is invalid' });
    expect(refused).toEqual({ ok: false, reason: 'invalid input' });
  });

  it('receives a Core-backed admission decision without a local semantic adapter', async () => {
    const result = await receiveRuntimeAdmissionDecision({}, 'admission-remote-1', {
      send: async () => JSON.stringify({
        protocolVersion: '1', requestId: 'admission-remote-1', ok: true, payload: context,
        provenance: {
          governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
          projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
          projectionVersion: '1.0.0', compiledAt: '2026-08-22T00:00:00Z',
          freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
        },
      }),
    });
    expect(result.ok).toBe(true);
  });

  it('requests admission and validates the returned context through the adapter', async () => {
    const calls: string[] = [];
    const transport = {
      send: async (payload: string) => {
        calls.push(payload);
        return JSON.stringify({
          protocolVersion: '1', requestId: 'admission-1', ok: true, payload: context,
          provenance: {
            governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
            projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
            projectionVersion: '1.0.0', compiledAt: '2026-08-22T00:00:00Z',
            freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
          },
        });
      },
    };
    const result = await requestApplicableSemanticContext({ contractIdentity: identity, contractVersion: '1.0.0', scope: scope.identity }, 'admission-1', transport, adapter);

    expect(result).toEqual({
      ok: true,
      context,
      provenance: {
        governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
        projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
        projectionVersion: '1.0.0', compiledAt: '2026-08-22T00:00:00Z',
        freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
      },
    });
    expect(JSON.parse(calls[0])).toEqual({
      protocolVersion: '1',
      requestId: 'admission-1',
      operation: 'admitApplicableSemanticContext',
      payload: { contractIdentity: identity, contractVersion: '1.0.0', scope: scope.identity },
    });
  });

  it('fails closed on refusal and mismatched admission responses', async () => {
    const refusal = await requestApplicableSemanticContext({}, 'admission-1', {
      send: async () => JSON.stringify({ protocolVersion: '1', requestId: 'admission-1', ok: false, reason: 'No applicable contract' }),
    }, adapter);
    expect(refusal).toEqual({ ok: false, reason: 'No applicable contract' });

    const mismatch = await requestApplicableSemanticContext({}, 'admission-1', {
      send: async () => JSON.stringify({ protocolVersion: '1', requestId: 'other', ok: true, payload: context }),
    }, adapter);
    expect(mismatch).toEqual({ ok: false, reason: 'SDK admission response is invalid' });
  });

  it('round-trips a candidate response using acceptance records', () => {
    const record = {
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      contractVersion: '1.0.0',
      governedRepositoryId: 'guvna-core',
      subjectKind: 'single-artifact' as const,
      subjectIdentity: 'authority-model',
      status: 'candidate' as const,
      authorityContext: {
        principalId: 'principal-1', governedRepositoryId: 'guvna-core',
        authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
      },
      candidateStatementIdentity: 'candidate-authority-model',
      evidenceIdentities: [],
    };
    const encoded = encodeAcceptanceRecordDiscoveryResponse({
      contractVersion: '1', governedRepositoryId: 'guvna-core', records: [record],
    });
    expect(encoded.ok && decodeAcceptanceRecordDiscoveryResponse(encoded.value)).toEqual({
      ok: true,
      value: { contractVersion: '1', governedRepositoryId: 'guvna-core', records: [record] },
    });
  });

  it('rejects candidate responses with invalid records or repository scope', () => {
    const record = {
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      contractVersion: '1.0.0', governedRepositoryId: 'guvna-core',
      subjectKind: 'single-artifact' as const, subjectIdentity: 'authority-model',
      status: 'candidate' as const, authorityContext: {
        principalId: 'principal-1', governedRepositoryId: 'guvna-core',
        authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
      }, candidateStatementIdentity: 'candidate-authority-model', evidenceIdentities: [],
    };
    expect(encodeAcceptanceRecordDiscoveryResponse({
      contractVersion: '1', governedRepositoryId: 'guvna-core', records: [record],
    }).ok).toBe(true);
    expect(decodeAcceptanceRecordDiscoveryResponse(JSON.stringify({
      contractVersion: '1', governedRepositoryId: 'guvna-core', records: [{ ...record, status: 'unknown' }],
    }))).toEqual({ ok: false, reason: 'SDK acceptance record discovery response is invalid' });
    expect(decodeAcceptanceRecordDiscoveryResponse(JSON.stringify({
      contractVersion: '1', governedRepositoryId: 'guvna-core', records: [{ ...record, governedRepositoryId: 'other-repository' }],
    }))).toEqual({ ok: false, reason: 'SDK acceptance record discovery response is invalid' });
  });

  it('round-trips an acceptance record without changing its provenance fields', () => {
    const record = {
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      contractVersion: '1.0.0',
      governedRepositoryId: 'guvna-core',
      subjectKind: 'change-set' as const,
      subjectIdentity: 'runtime-authority-refresh',
      status: 'accepted' as const,
      authorityContext: {
        principalId: 'principal-1', governedRepositoryId: 'guvna-core',
        authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
      },
      candidateStatementIdentity: 'candidate-runtime-authority-refresh',
      evidenceIdentities: ['evidence-1'],
      fileManifest: [{ path: 'src/runtime.ts', changeKind: 'updated' as const, contentHash: `sha256:${'a'.repeat(64)}` }],
    };
    const encoded = encodeAcceptanceRecord(record);
    expect(encoded.ok && decodeAcceptanceRecord(encoded.value)).toEqual({ ok: true, value: record });
  });

  it('rejects malformed acceptance-record JSON and structure', () => {
    expect(decodeAcceptanceRecord('{')).toEqual({ ok: false, reason: 'SDK protocol payload is invalid JSON' });
    expect(decodeAcceptanceRecord(JSON.stringify({ status: 'accepted' }))).toEqual({
      ok: false, reason: 'SDK acceptance record is invalid',
    });
    const record = {
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      contractVersion: '1.0.0', governedRepositoryId: 'guvna-core',
      subjectKind: 'single-artifact' as const, subjectIdentity: 'authority-model',
      status: 'candidate' as const, authorityContext: {
        principalId: 'principal-1', governedRepositoryId: 'guvna-core',
        authorityScope: 'repository', verifiedAt: '2026-08-20T00:00:00Z',
      }, candidateStatementIdentity: 'candidate-authority-model', evidenceIdentities: [],
    };
    expect(encodeAcceptanceRecord({ ...record, acceptanceRecordId: 'not-a-uuid' })).toEqual({
      ok: false, reason: 'SDK acceptance record is invalid',
    });
    expect(decodeAcceptanceRecord(JSON.stringify({ ...record, subjectIdentity: '123' }))).toEqual({
      ok: false, reason: 'SDK acceptance record is invalid',
    });
    expect(decodeAcceptanceRecord(JSON.stringify({
      ...record, authorityContext: { ...record.authorityContext, governedRepositoryId: 'other-repository' },
    }))).toEqual({ ok: false, reason: 'SDK acceptance record is invalid' });
  });

  it('encodes opaque Domain Pack host requests without interpreting payloads', () => {
    const payload = { source: 'approved-source', manifest: { opaque: true } };
    expect(encodeDomainPackRequest('request-1', 'discoverDomainPacks', context, payload, adapter)).toEqual({
      ok: true,
      value: JSON.stringify({
        protocolVersion: '1',
        requestId: 'request-1',
        operation: 'discoverDomainPacks',
        context,
        payload,
      }),
    });
  });

  it('decodes an opaque Domain Pack installation response', () => {
    const response = JSON.stringify({
      protocolVersion: '1',
      requestId: 'request-2',
      ok: true,
      payload: { packIdentity: 'approved-pack', manifest: '{"identity":"opaque"}' },
    });

    expect(decodeDomainPackInstallResponse('request-2', response)).toEqual({
      ok: true,
      value: { packIdentity: 'approved-pack', manifest: '{"identity":"opaque"}' },
    });
  });

  it('encodes pre-governance Domain Pack requests without Runtime context', () => {
    expect(encodePreGovernanceDomainPackRequest('request-3', 'discoverEligibleDomainPacks', {
      principalId: 'principal-1', repositoryId: 'repository-1', payload: { source: 'licensee' },
    })).toEqual({
      ok: true,
      value: JSON.stringify({
        protocolVersion: '1', requestId: 'request-3', operation: 'discoverEligibleDomainPacks',
        principalId: 'principal-1', repositoryId: 'repository-1', payload: { source: 'licensee' },
      }),
    });
  });

  it('fails closed for malformed pre-governance Domain Pack responses', () => {
    expect(decodePreGovernanceDomainPackResponse('request-4', JSON.stringify({
      protocolVersion: '1', requestId: 'other', ok: true, payload: {},
    }))).toEqual({ ok: false, reason: 'SDK pre-governance Domain Pack response is invalid' });
  });

  it('preserves the approved protocol request envelope', () => {
    const encoded = encodeRuntimeRequest('request-1', context, operation, adapter);
    expect(encoded).toEqual({
      ok: true,
      value: JSON.stringify({
        protocolVersion: '1',
        requestId: 'request-1',
        operation: 'recordEvidence',
        context,
        payload: operation,
      }),
    });
    expect(encoded.ok && decodeRuntimeRequest(context, encoded.value, adapter)).toEqual({
      ok: true,
      value: {
        protocolVersion: '1',
        requestId: 'request-1',
        operation: 'recordEvidence',
        context,
        payload: operation,
      },
    });
  });

  it('preserves correlated successful and failed response envelopes', () => {
    const result = { ok: true as const, value: operation };
    expect(encodeRuntimeResponse('request-1', context, result, adapter)).toEqual({
      ok: true,
      value: JSON.stringify({ protocolVersion: '1', requestId: 'request-1', ok: true, payload: result }),
    });
    expect(encodeRuntimeFailureResponse('request-1', 'Runtime unavailable')).toEqual({
      ok: true,
      value: JSON.stringify({ protocolVersion: '1', requestId: 'request-1', ok: false, reason: 'Runtime unavailable' }),
    });
  });

  it('rejects requests without correlation identifiers or with unsupported protocol versions', () => {
    expect(encodeRuntimeRequest('', context, operation, adapter)).toEqual({
      ok: false,
      reason: 'SDK request identifier is missing',
    });
    expect(decodeRuntimeRequest(context, JSON.stringify({ protocolVersion: '2' }), adapter)).toEqual({
      ok: false,
      reason: 'SDK Runtime request envelope is invalid',
    });
  });

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

describe('SDK Repository Authority freshness and acceptance-decision transport', () => {
  const authorityContext = {
    principalId: 'principal-1',
    governedRepositoryId: 'guvna-core',
    authorityScope: 'repository',
    verifiedAt: '2026-08-20T00:00:00Z',
  };

  it('round-trips a confirmRepositoryAuthority request', () => {
    const request = {
      contractVersion: authorityTransportContractVersion,
      principalId: 'principal-1',
      governedRepositoryId: 'guvna-core',
    };
    const encoded = encodeConfirmRepositoryAuthorityRequest(request);
    expect(encoded.ok && decodeConfirmRepositoryAuthorityRequest(encoded.value)).toEqual({ ok: true, value: request });
  });

  it('fails closed on an unknown confirmRepositoryAuthority contract version', () => {
    expect(encodeConfirmRepositoryAuthorityRequest({
      contractVersion: '2' as never, principalId: 'principal-1', governedRepositoryId: 'guvna-core',
    })).toEqual({ ok: false, reason: 'SDK confirmRepositoryAuthority request is invalid' });
  });

  it('round-trips a revalidateAuthority request', () => {
    const request = {
      contractVersion: authorityTransportContractVersion,
      principalId: 'principal-1',
      governedRepositoryId: 'guvna-core',
      snapshotObservedAt: '2026-08-20T00:00:00Z',
    };
    const encoded = encodeRevalidateAuthorityRequest(request);
    expect(encoded.ok && decodeRevalidateAuthorityRequest(encoded.value)).toEqual({ ok: true, value: request });
  });

  it('rejects malformed revalidateAuthority JSON', () => {
    expect(decodeRevalidateAuthorityRequest('{')).toEqual({ ok: false, reason: 'SDK protocol payload is invalid JSON' });
  });

  it('round-trips each supported authority freshness response status', () => {
    for (const status of ['fresh', 'stale', 'revoked', 'indeterminate'] as const) {
      const response = {
        contractVersion: authorityTransportContractVersion,
        principalId: 'principal-1',
        governedRepositoryId: 'guvna-core',
        status,
        observedAt: '2026-08-20T00:00:00Z',
      };
      const encoded = encodeAuthorityFreshnessResponse(response);
      expect(encoded.ok && decodeAuthorityFreshnessResponse(encoded.value)).toEqual({ ok: true, value: response });
    }
  });

  it('fails closed on an unsupported authority freshness status', () => {
    expect(encodeAuthorityFreshnessResponse({
      contractVersion: authorityTransportContractVersion, principalId: 'principal-1',
      governedRepositoryId: 'guvna-core', status: 'unknown' as never, observedAt: '2026-08-20T00:00:00Z',
    })).toEqual({ ok: false, reason: 'SDK authority freshness response is invalid' });
  });

  it('round-trips an accepted and a rejected submitAcceptanceDecision request with fresh authority', () => {
    for (const decision of ['accepted', 'rejected'] as const) {
      const request = {
        contractVersion: authorityTransportContractVersion,
        acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
        decision,
        authorityContext,
        freshnessStatus: 'fresh' as const,
        decidedAt: '2026-08-20T00:00:00Z',
      };
      const encoded = encodeSubmitAcceptanceDecisionRequest(request);
      expect(encoded.ok && decodeSubmitAcceptanceDecisionRequest(encoded.value)).toEqual({ ok: true, value: request });
    }
  });

  it('fails closed on submitAcceptanceDecision when freshness is not fresh', () => {
    for (const freshnessStatus of ['stale', 'revoked', 'indeterminate'] as const) {
      expect(encodeSubmitAcceptanceDecisionRequest({
        contractVersion: authorityTransportContractVersion,
        acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
        decision: 'accepted', authorityContext, freshnessStatus, decidedAt: '2026-08-20T00:00:00Z',
      })).toEqual({ ok: false, reason: 'SDK submitAcceptanceDecision request is invalid' });
    }
  });

  it('fails closed on submitAcceptanceDecision with an unknown contract version or malformed authority context', () => {
    const request = {
      contractVersion: authorityTransportContractVersion,
      acceptanceRecordId: '550e8400-e29b-41d4-a716-446655440000',
      decision: 'accepted' as const,
      authorityContext,
      freshnessStatus: 'fresh' as const,
      decidedAt: '2026-08-20T00:00:00Z',
    };
    expect(encodeSubmitAcceptanceDecisionRequest({ ...request, contractVersion: '2' as never })).toEqual({
      ok: false, reason: 'SDK submitAcceptanceDecision request is invalid',
    });
    expect(decodeSubmitAcceptanceDecisionRequest(JSON.stringify({
      ...request, authorityContext: { ...authorityContext, verifiedAt: undefined },
    }))).toEqual({ ok: false, reason: 'SDK submitAcceptanceDecision request is invalid' });
  });
});