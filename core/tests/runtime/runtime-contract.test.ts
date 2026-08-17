import { describe, expect, it } from 'vitest';
import {
  resolveApplicableSemanticContext,
  validateRuntimeDirective,
  validateRuntimeFailure,
  validateRuntimeOperation,
  validateRuntimeOperationResult,
} from '../../src/runtime/index.js';

const identity = { identityKind: 'semantic', value: 'contract-1' };
const scope = {
  identity: { identityKind: 'scope', value: 'scope-1' },
  meaning: { statement: 'runtime scope', terms: [] },
};
const source = { sourceIdentity: identity };
const contextContract = {
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
};
const context = resolveApplicableSemanticContext([contextContract], {
  contractIdentity: identity,
  contractVersion: '1.0.0',
  scope: scope.identity,
}).ok
  ? resolveApplicableSemanticContext([contextContract], {
      contractIdentity: identity,
      contractVersion: '1.0.0',
      scope: scope.identity,
    }).context
  : undefined;
const attribution = {
  contractIdentity: identity,
  contractVersion: '1.0.0',
  scope,
  provenance: [source],
};
const execution = {
  identity: { identityKind: 'execution', value: 'execution-1' },
  state: { ready: true },
  provenance: [source],
};
const authority = {
  identity: { identityKind: 'authority', value: 'authority-1' },
  decisions: [{ identity: { identityKind: 'decision', value: 'apply-1' } }],
  scope,
  provenance: [source],
};
const semanticEvidence = {
  identity: { identityKind: 'semantic-evidence', value: 'evidence-1' },
  ir: { identity },
  scope,
  provenance: [source],
};
const provenance = {
  identity: { identityKind: 'provenance', value: 'provenance-1' },
  sources: [source],
  transformations: [],
};
const evaluation = {
  identity: { identityKind: 'evaluation', value: 'evaluation-1' },
  outcome: { outcomeKind: 'indeterminate' as const, findings: [] },
  attribution: {
    ...attribution,
    executionContext: { identity: execution.identity },
    authorityBasis: authority.decisions,
  },
};

describe('Runtime Contract schema', () => {
  it('validates the approved operation variants structurally', () => {
    expect(
      validateRuntimeOperation({
        operationKind: 'evaluate',
        identity,
        input: { context, semanticEvidence, execution, authority, provenance },
        attribution,
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeOperation({
        operationKind: 'produceDirective',
        identity,
        evaluation,
        attribution,
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeOperation({
        operationKind: 'recordEvidence',
        identity,
        evaluation,
        outcome: evaluation.outcome,
        attribution,
      }),
    ).toEqual({ valid: true });
  });

  it('validates the approved directive variants structurally', () => {
    expect(
      validateRuntimeDirective({
        directiveKind: 'diagnostic',
        identity,
        severity: 'error',
        code: 'invalid-input',
        message: 'Input is invalid',
        attribution: evaluation.attribution,
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeDirective({
        directiveKind: 'authorityRequired',
        identity,
        requiredDecision: authority.decisions[0],
        scope,
        attribution: evaluation.attribution,
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeDirective({
        directiveKind: 'operationRequested',
        identity,
        operation: { identity: { identityKind: 'operation', value: 'evaluate' } },
        inputs: {},
        attribution: evaluation.attribution,
      }),
    ).toEqual({ valid: true });
  });

  it('validates fail-closed success and failure results', () => {
    expect(validateRuntimeOperationResult({ ok: true, value: evaluation })).toEqual({
      valid: true,
    });
    expect(
      validateRuntimeOperationResult({
        ok: false,
        failure: { failureKind: 'missing-input', input: identity, reason: 'Missing input' },
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeFailure({
        failureKind: 'unauthorized-input',
        input: identity,
        reason: 'Authority is absent',
      }),
    ).toEqual({ valid: true });
    expect(
      validateRuntimeFailure({
        failureKind: 'execute',
        input: identity,
        reason: 'Unsupported failure',
      }),
    ).toMatchObject({ valid: false });
  });

  it.each([
    [
      'missing admitted context',
      {
        operationKind: 'evaluate',
        identity,
        input: { execution, authority, provenance },
        attribution,
      },
    ],
    [
      'invalid operation kind',
      {
        operationKind: 'execute',
        identity,
        input: { context, execution, authority, provenance },
        attribution,
      },
    ],
    [
      'missing directive attribution',
      {
        directiveKind: 'diagnostic',
        identity,
        severity: 'error',
        code: 'invalid-input',
        message: 'Input is invalid',
      },
    ],
    [
      'unknown operation field',
      {
        operationKind: 'evaluate',
        identity,
        input: { context, execution, authority, provenance },
        attribution,
        extra: true,
      },
    ],
    [
      'unknown result field',
      {
        ok: false,
        failure: { failureKind: 'invalid-input', input: identity, reason: 'Invalid' },
        extra: true,
      },
    ],
  ])('fails closed for %s', (_name, value) => {
    const result =
      _name === 'missing directive attribution'
        ? validateRuntimeDirective(value)
        : _name === 'unknown result field'
          ? validateRuntimeOperationResult(value)
          : validateRuntimeOperation(value);
    expect(result.valid).toBe(false);
  });
});
