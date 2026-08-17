import { describe, expect, it } from 'vitest';
import {
  compileAndValidateCandidateSemanticContract,
  validateCandidateSemanticContract,
} from '../../src/compiler/semantic-validation.js';
import {
  applyRatifiedContract,
  ratifyValidatedContract,
} from '../../src/compiler/contract-lifecycle.js';

const identity = { identityKind: 'semantic', value: 'contract-1' };
const scope = { identity, meaning: { statement: 'accepted meaning', terms: [] } };
const elements = Object.fromEntries(
  [
    'concepts',
    'dataStructures',
    'operations',
    'states',
    'transitions',
    'invariants',
    'provenanceRequirements',
    'compatibilityRequirements',
    'failureBehavior',
    'realizationObligations',
  ].map((category) => [category, [{ identity }]]),
);
const contract = {
  identity,
  version: { value: '1.0.0', semanticIdentity: { identity }, scope },
  contractKind: 'semantic' as const,
  elements,
  lifecycle: {
    lifecycleState: { identity: { identityKind: 'lifecycle', value: 'candidate' } },
    transitions: [],
  },
  applicability: {
    applicable: 'indeterminate' as const,
    scope,
    conditions: [],
    provenance: [{ sourceIdentity: identity }],
  },
  ratification: {
    ratified: false,
    requiresHumanAuthority: true,
    provenance: [{ sourceIdentity: identity }],
  },
  provenance: [{ sourceIdentity: identity }],
};
const authorityDecision = {
  identity: { identityKind: 'decision', value: 'decision-1' },
  authorityIdentity: {
    identity: { identityKind: 'authority', value: 'authority-1' },
    principal: { identity },
    provenance: [{ sourceIdentity: identity }],
  },
  subject: { identity },
  scope,
  subjectContractIdentity: identity,
  subjectContractVersion: '1.0.0',
  decision: 'accept' as const,
  provenance: [{ sourceIdentity: identity }],
};
elements.authorityBoundaries = [{ identity: authorityDecision.identity }];
const source = {
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
  contracts: [contract],
  realizations: [],
  authorityContext: {
    authorityDecisions: [authorityDecision],
    acceptances: [
      {
        identity: { identityKind: 'acceptance', value: 'acceptance-1' },
        subject: { identity },
        scope,
        authorityDecision: { identity: authorityDecision.identity },
        provenance: [{ sourceIdentity: identity }],
      },
    ],
    uncertainty: [],
    contradictions: [],
    delegations: [],
  },
  provenance: { records: [], conflicts: [] },
  compatibility: [],
};

describe('validateCandidateSemanticContract', () => {
  it('accepts a candidate conformant to an unambiguous governing source', () => {
    expect(validateCandidateSemanticContract(contract, source)).toEqual({
      valid: true,
      contract: {
        ...contract,
        lifecycle: {
          ...contract.lifecycle,
          lifecycleState: { identity: { identityKind: 'lifecycle', value: 'validated' } },
        },
      },
      evidence: expect.objectContaining({
        subjectIdentity: identity,
        sourceIdentity: identity,
        sourceVersion: '1.0.0',
        result: 'conformant',
      }),
    });
  });

  it('validates the candidate produced by compilation before returning it', () => {
    const result = compileAndValidateCandidateSemanticContract(source);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.contract.lifecycle.lifecycleState.identity.value).toBe('validated');
      expect(result.evidence.result).toBe('conformant');
      expect(result.evidence.provenance.transformations).toHaveLength(1);
      expect(result.evidence.provenance.transformations[0].kind).toBe('resolve');
      expect(result.evidence.provenance.subject).toEqual({ identity });
    }
  });

  it('passes validated output through attributable ratification without applying it', () => {
    const result = compileAndValidateCandidateSemanticContract(source);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const ratification = ratifyValidatedContract({
      contract: result.contract,
      validationEvidence: { identity: result.evidence.provenance.identity },
      ratificationEvent: { identity: { identityKind: 'event', value: 'ratification-1' } },
      authorityDecision: { identity: { identityKind: 'decision', value: 'ratification-1' } },
      authority: {
        authorityIdentity: 'authority-1',
        decisionIdentity: 'ratification-1',
        decisionVersion: '1',
        decisionScope: result.contract.applicability.scope.identity.value,
        contractIdentity: result.contract.identity.value,
        contractVersion: result.contract.version.value,
        provenance: result.evidence.provenance,
      },
    });

    expect(ratification.ok).toBe(true);
    if (ratification.ok) {
      expect(ratification.contract.lifecycle.lifecycleState.identity.value).toBe('ratified');
      expect(ratification.contract.ratification.ratified).toBe(true);
      expect(ratification.contract.ratification.record).toEqual(ratification.record);
      expect(ratification.contract.applicability.applicable).toBe('indeterminate');
    }
    expect(result.contract.ratification.ratified).toBe(false);
  });

  it('applies only an attributable ratified contract', () => {
    const result = compileAndValidateCandidateSemanticContract(source);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const ratification = ratifyValidatedContract({
      contract: result.contract,
      validationEvidence: { identity: result.evidence.provenance.identity },
      ratificationEvent: { identity: { identityKind: 'event', value: 'ratification-1' } },
      authorityDecision: { identity: { identityKind: 'decision', value: 'ratification-1' } },
      authority: {
        authorityIdentity: 'authority-1',
        decisionIdentity: 'ratification-1',
        decisionVersion: '1',
        decisionScope: result.contract.applicability.scope.identity.value,
        contractIdentity: result.contract.identity.value,
        contractVersion: result.contract.version.value,
        provenance: result.evidence.provenance,
      },
    });
    expect(ratification.ok).toBe(true);
    if (!ratification.ok) return;

    const applied = applyRatifiedContract({
      contract: ratification.contract,
      authorityDecision: { identity: { identityKind: 'decision', value: 'apply-1' } },
      authority: {
        authorityIdentity: 'authority-1',
        decisionIdentity: 'apply-1',
        decisionVersion: '1',
        decisionScope: result.contract.applicability.scope.identity.value,
        contractIdentity: result.contract.identity.value,
        contractVersion: result.contract.version.value,
        provenance: result.evidence.provenance,
      },
      exactScope: true,
      effectiveBoundary: true,
    });

    expect(applied.ok).toBe(true);
    if (applied.ok) {
      expect(applied.contract.lifecycle.lifecycleState.identity.value).toBe('applicable');
      expect(applied.contract.applicability).toMatchObject({
        applicable: true,
        authorityDecision: { identity: { value: 'apply-1' } },
      });
    }
  });

  it('fails closed when applicability is attempted before ratification', () => {
    expect(
      applyRatifiedContract({
        contract,
        authorityDecision: { identity: { identityKind: 'decision', value: 'apply-1' } },
        authority: {
          authorityIdentity: 'authority-1',
          decisionIdentity: 'apply-1',
          decisionVersion: '1',
          decisionScope: scope.identity.value,
          contractIdentity: contract.identity.value,
          contractVersion: contract.version.value,
          provenance: contract.provenance,
        },
        exactScope: true,
        effectiveBoundary: true,
      }),
    ).toEqual({ ok: false, reason: 'Only ratified contracts may become applicable' });
  });

  it('fails closed for disconnected applicability authority evidence', () => {
    const result = compileAndValidateCandidateSemanticContract(source);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const ratification = ratifyValidatedContract({
      contract: result.contract,
      validationEvidence: { identity: result.evidence.provenance.identity },
      ratificationEvent: { identity: { identityKind: 'event', value: 'ratification-1' } },
      authorityDecision: { identity: { identityKind: 'decision', value: 'ratification-1' } },
      authority: {
        authorityIdentity: 'authority-1',
        decisionIdentity: 'ratification-1',
        decisionVersion: '1',
        decisionScope: result.contract.applicability.scope.identity.value,
        contractIdentity: result.contract.identity.value,
        contractVersion: result.contract.version.value,
        provenance: result.evidence.provenance,
      },
    });
    expect(ratification.ok).toBe(true);
    if (!ratification.ok) return;

    expect(
      applyRatifiedContract({
        contract: ratification.contract,
        authorityDecision: { identity: { identityKind: 'decision', value: 'other-apply' } },
        authority: {
          authorityIdentity: 'authority-1',
          decisionIdentity: 'apply-1',
          decisionVersion: '1',
          decisionScope: result.contract.applicability.scope.identity.value,
          contractIdentity: result.contract.identity.value,
          contractVersion: result.contract.version.value,
          provenance: result.evidence.provenance,
        },
        exactScope: true,
        effectiveBoundary: true,
      }),
    ).toEqual({
      ok: false,
      reason: 'Applicability authority decision reference does not match authority evidence',
    });
  });

  it('fails closed for disconnected authority and evidence references', () => {
    const result = compileAndValidateCandidateSemanticContract(source);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const input = {
      contract: result.contract,
      validationEvidence: { identity: result.evidence.provenance.identity },
      ratificationEvent: { identity: { identityKind: 'event', value: 'ratification-1' } },
      authorityDecision: { identity: { identityKind: 'decision', value: 'other-decision' } },
      authority: {
        authorityIdentity: 'authority-1',
        decisionIdentity: 'ratification-1',
        decisionVersion: '1',
        decisionScope: result.contract.applicability.scope.identity.value,
        contractIdentity: result.contract.identity.value,
        contractVersion: result.contract.version.value,
        provenance: result.evidence.provenance,
      },
    };

    expect(ratifyValidatedContract(input)).toEqual({
      ok: false,
      reason: 'Ratification authority decision reference does not match authority evidence',
    });
    expect(
      ratifyValidatedContract({
        ...input,
        authorityDecision: { identity: { identityKind: 'decision', value: '' } },
      }),
    ).toEqual({
      ok: false,
      reason: 'Ratification evidence references are invalid',
    });
  });

  it.each([
    ['absent', { ...source, contracts: [] }, 'Governing Semantic Contract source is absent'],
    [
      'ambiguous',
      { ...source, contracts: [contract, contract] },
      'Governing Semantic Contract source is ambiguous',
    ],
    [
      'contradictory',
      {
        ...source,
        authorityContext: {
          ...source.authorityContext,
          contradictions: [
            { identity, claims: [], scope, interpretation: scope.meaning, provenance: [] },
          ],
        },
      },
      'Governing Semantic Contract authority is contradictory',
    ],
  ])('fails closed for %s governing authority', (_name, input, reason) => {
    expect(validateCandidateSemanticContract(contract, input)).toEqual({
      valid: false,
      reason,
      stage: 'validation',
    });
  });

  it('rejects a candidate that changes governed meaning', () => {
    expect(
      validateCandidateSemanticContract(
        { ...contract, version: { ...contract.version, value: '2.0.0' } },
        source,
      ),
    ).toEqual({
      valid: false,
      reason: 'Candidate Semantic Contract is not semantically conformant to governing source',
      stage: 'validation',
    });
  });

  it('fails closed when governing authority contains unresolved uncertainty', () => {
    const uncertainty = {
      identity: { identityKind: 'uncertainty', value: 'uncertainty-1' },
      subject: { identity },
      meaning: scope.meaning,
      provenance: [{ sourceIdentity: identity }],
    };

    expect(
      validateCandidateSemanticContract(contract, {
        ...source,
        authorityContext: { ...source.authorityContext, uncertainty: [uncertainty] },
      }),
    ).toEqual({
      valid: false,
      reason:
        'Candidate Semantic Contract is not eligible for validation: Validation conditions are unsatisfied',
      stage: 'validation',
    });
  });
});
