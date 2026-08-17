import { describe, expect, it } from 'vitest';
import type { SemanticIR } from '../../src/compiler/semantic-ir.js';
import {
  createCanonicalSemanticContractAdapter,
  runRuntimeOperation,
  type RuntimeDirective,
  type RuntimeEvaluationResult,
  type RuntimeSemanticRules,
} from '../../src/runtime/index.js';

const identity = { identityKind: 'runtime', value: 'runtime-1' };
const scope = {
  identity: { identityKind: 'scope', value: 'scope-1' },
  meaning: { statement: 'approved runtime scope', terms: [] },
};
const attribution = {
  contractIdentity: identity,
  contractVersion: '1.0.0',
  scope,
  provenance: [{ sourceIdentity: identity }],
};
const contract = {
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
const context = { contract, identity, version: '1.0.0', scope };
const validContract = {
  ...contract,
  elements: Object.fromEntries(
    [
      'concepts',
      'dataStructures',
      'operations',
      'states',
      'transitions',
      'invariants',
      'authorityBoundaries',
      'provenanceRequirements',
      'compatibilityRequirements',
      'failureBehavior',
      'realizationObligations',
    ].map((category) => [category, [{ identity }]]),
  ),
};
const validIR: SemanticIR = {
  irKind: 'guvna-semantic-ir',
  irVersion: '1',
  semanticIdentity: identity,
  semanticScope: scope,
  meaning: scope.meaning,
  concepts: [],
  relationships: [],
  constraints: [],
  transitions: [],
  derivations: [],
  contracts: [],
  realizations: [],
  authorityContext: {
    authorityDecisions: [],
    acceptances: [],
    uncertainty: [],
    contradictions: [],
    delegations: [],
  },
  provenance: { records: [], conflicts: [] },
  compatibility: [],
};
const evaluationInput = {
  context,
  semanticEvidence: {
    identity: { identityKind: 'semantic-evidence', value: 'evidence-1' },
    ir: { identity },
    scope,
    provenance: [{ sourceIdentity: identity }],
  },
  execution: {
    identity: { identityKind: 'execution', value: 'execution-1' },
    state: { ready: true },
    provenance: [{ sourceIdentity: identity }],
  },
  authority: {
    identity: { identityKind: 'authority', value: 'authority-1' },
    decisions: [],
    scope,
    provenance: [{ sourceIdentity: identity }],
  },
  provenance: {
    identity: { identityKind: 'provenance', value: 'provenance-1' },
    sources: [{ sourceIdentity: identity }],
    transformations: [],
  },
};
const evaluation: RuntimeEvaluationResult = {
  identity: { identityKind: 'evaluation', value: 'evaluation-1' },
  outcome: { outcomeKind: 'indeterminate', findings: [] },
  attribution: {
    ...attribution,
    executionContext: { identity: { identityKind: 'execution', value: 'execution-1' } },
    authorityBasis: [],
  },
};
const rules: RuntimeSemanticRules = {
  evaluate: () => ({
    ok: true,
    value: { outcome: { outcomeKind: 'indeterminate', findings: [] }, authorityBasis: [] },
  }),
  acceptEvaluation: () => true,
  produceDirective: (result) =>
    ({
      directiveKind: 'diagnostic',
      identity: { identityKind: 'directive', value: 'directive-1' },
      severity: 'warning',
      code: 'indeterminate',
      message: 'Evaluation is indeterminate',
      attribution: result.attribution,
    }) as RuntimeDirective,
};

const operation = {
  operationKind: 'produceDirective' as const,
  identity,
  evaluation,
  attribution,
};

const evidenceOperation = {
  operationKind: 'recordEvidence' as const,
  identity,
  evaluation,
  outcome: evaluation.outcome,
  attribution,
};

describe('Runtime semantic operations', () => {
  it('evaluates a valid resolved canonical contract as conformant', () => {
    const input = { ...evaluationInput, context: { ...context, contract: validContract } };
    const adapter = createCanonicalSemanticContractAdapter(
      { resolve: () => validIR },
      { contractIdentity: identity, contractVersion: '1.0.0', scope },
    );
    expect(adapter.evaluate(input)).toEqual({
      ok: true,
      value: { outcome: { outcomeKind: 'conformant', findings: [] }, authorityBasis: [] },
    });
  });

  it('rejects a context that does not match the configured contract', () => {
    const adapter = createCanonicalSemanticContractAdapter(
      { resolve: () => validIR },
      { contractIdentity: identity, contractVersion: '2.0.0', scope },
    );
    const result = adapter.evaluate(evaluationInput);
    expect(result).toEqual({
      ok: false,
      failure: {
        failureKind: 'invalid-input',
        input: evaluationInput.semanticEvidence.identity,
        reason: 'Runtime contract attribution is invalid',
      },
    });
  });

  it('propagates resolver failures from the canonical adapter', () => {
    const adapter = createCanonicalSemanticContractAdapter(
      {
        resolve: () => ({
          failureKind: 'unauthorized-input',
          input: evaluationInput.semanticEvidence.identity,
          reason: 'Semantic IR evidence is unauthorized',
        }),
      },
      { contractIdentity: identity, contractVersion: '1.0.0', scope },
    );
    expect(adapter.evaluate(evaluationInput)).toEqual({
      ok: false,
      failure: {
        failureKind: 'unauthorized-input',
        input: evaluationInput.semanticEvidence.identity,
        reason: 'Semantic IR evidence is unauthorized',
      },
    });
  });

  it('rejects a resolved IR that does not match semantic evidence', () => {
    const adapter = createCanonicalSemanticContractAdapter(
      { resolve: () => ({ ...validIR, semanticIdentity: { identityKind: 'other', value: 'ir' } }) },
      { contractIdentity: identity, contractVersion: '1.0.0', scope },
    );
    expect(
      adapter.evaluate({ ...evaluationInput, context: { ...context, contract: validContract } }),
    ).toEqual({
      ok: false,
      failure: {
        failureKind: 'invalid-input',
        input: evaluationInput.semanticEvidence.identity,
        reason: 'Resolved Semantic IR does not match semantic evidence',
      },
    });
  });

  it('produces noDirective for an accepted canonical evaluation', () => {
    const adapter = createCanonicalSemanticContractAdapter(
      { resolve: () => ({ failureKind: 'missing-input', input: identity, reason: 'unused' }) },
      { contractIdentity: identity, contractVersion: '1.0.0', scope },
    );
    expect(adapter.produceDirective(evaluation)).toEqual({
      resultKind: 'noDirective',
      identity: { identityKind: 'runtime-no-directive', value: evaluation.identity.value },
      attribution: evaluation.attribution,
    });
  });

  it('delegates directive derivation to supplied semantic rules', () => {
    const result = runRuntimeOperation(operation, rules);
    expect(result).toEqual({
      ok: true,
      value: expect.objectContaining({ directiveKind: 'diagnostic', code: 'indeterminate' }),
    });
  });

  it('returns an explicit noDirective result from supplied semantic rules', () => {
    const result = runRuntimeOperation(operation, {
      ...rules,
      produceDirective: (result) => ({
        resultKind: 'noDirective',
        identity: { identityKind: 'no-directive', value: 'none-1' },
        attribution: result.attribution,
      }),
    });
    expect(result).toEqual({
      ok: true,
      value: expect.objectContaining({ resultKind: 'noDirective' }),
    });
  });

  it('evaluates an admitted context through supplied rules with deterministic identity', () => {
    const evaluateOperation = {
      operationKind: 'evaluate' as const,
      identity,
      input: evaluationInput,
      attribution,
    };
    const first = runRuntimeOperation(evaluateOperation, rules);
    const second = runRuntimeOperation(evaluateOperation, rules);
    expect(first).toEqual(second);
    expect(first).toEqual({
      ok: true,
      value: expect.objectContaining({
        outcome: { outcomeKind: 'indeterminate', findings: [] },
        identity: expect.objectContaining({ identityKind: 'runtime-evaluation' }),
      }),
    });
  });

  it('returns evidence without persistence or mutation', () => {
    const result = runRuntimeOperation(evidenceOperation, rules);
    expect(result).toEqual({
      ok: true,
      value: expect.objectContaining({ operation: { identity }, outcome: evaluation.outcome }),
    });
  });

  it('rejects evidence with mismatched outcome or attribution', () => {
    const outcomeMismatch = runRuntimeOperation(
      { ...evidenceOperation, outcome: { outcomeKind: 'conformant', findings: [] } },
      rules,
    );
    const attributionMismatch = runRuntimeOperation(
      { ...evidenceOperation, attribution: { ...attribution, contractVersion: '2.0.0' } },
      rules,
    );
    expect(outcomeMismatch).toMatchObject({ ok: false, failure: { failureKind: 'invalid-input' } });
    expect(attributionMismatch).toMatchObject({
      ok: false,
      failure: { failureKind: 'invalid-input' },
    });
  });

  it('fails closed when semantic rules are absent', () => {
    const result = runRuntimeOperation(operation, undefined);
    expect(result).toEqual({
      ok: false,
      failure: {
        failureKind: 'missing-input',
        input: identity,
        reason: 'Runtime semantic rules are absent',
      },
    });
  });

  it('fails closed when an evaluation is not accepted', () => {
    const result = runRuntimeOperation(operation, { ...rules, acceptEvaluation: () => false });
    expect(result).toEqual({
      ok: false,
      failure: {
        failureKind: 'unauthorized-input',
        input: identity,
        reason: 'Runtime evaluation result is not accepted',
      },
    });
  });

  it('fails closed for an absent operation', () => {
    const result = runRuntimeOperation(undefined, rules);
    expect(result).toEqual({
      ok: false,
      failure: {
        failureKind: 'missing-input',
        input: { identityKind: 'runtime-operation', value: 'unknown' },
        reason: 'Runtime operation is absent',
      },
    });
  });
});
