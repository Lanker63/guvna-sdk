import { describe, expect, it } from 'vitest';
import { compileCandidateSemanticContract } from '../../src/compiler/semantic-compilation.js';
import { compileAndValidateCandidateSemanticContract } from '../../src/compiler/semantic-validation.js';

const packIdentity = { identityKind: 'semantic', value: 'domain-pack-information-contract' };
const packScope = {
  identity: { identityKind: 'scope', value: 'domain-pack' },
  meaning: { statement: 'Domain Pack contract scope', terms: [] },
};
const packElements = Object.fromEntries(
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
  ].map((category) => [category, [{ identity: packIdentity }]]),
);
const authorityDecision = {
  identity: { identityKind: 'decision', value: 'domain-pack-acceptance-decision' },
  authorityIdentity: {
    identity: { identityKind: 'authority', value: 'domain-pack-authority' },
    principal: { identity: packIdentity },
    provenance: [{ sourceIdentity: packIdentity }],
  },
  subject: { identity: packIdentity },
  scope: packScope,
  subjectContractIdentity: packIdentity,
  subjectContractVersion: '1.0.0',
  decision: 'accept' as const,
  provenance: [{ sourceIdentity: packIdentity }],
};
packElements.authorityBoundaries = [{ identity: authorityDecision.identity }];

const domainPackContract = {
  identity: packIdentity,
  version: {
    value: '1.0.0',
    semanticIdentity: { identity: packIdentity },
    scope: packScope,
  },
  contractKind: 'semantic' as const,
  elements: packElements,
  lifecycle: {
    lifecycleState: { identity: { identityKind: 'lifecycle', value: 'candidate' } },
    transitions: [],
  },
  applicability: {
    applicable: 'indeterminate' as const,
    scope: packScope,
    conditions: [],
    provenance: [{ sourceIdentity: packIdentity }],
  },
  ratification: {
    ratified: false,
    requiresHumanAuthority: true,
    provenance: [{ sourceIdentity: packIdentity }],
  },
  provenance: [{ sourceIdentity: packIdentity }],
};

const domainPackIR = {
  irKind: 'guvna-semantic-ir',
  irVersion: '1',
  semanticIdentity: packIdentity,
  semanticVersion: {
    value: '1.0.0',
    semanticIdentity: { identity: packIdentity },
    scope: packScope,
  },
  semanticScope: packScope,
  meaning: { statement: 'Domain Pack semantic contract', terms: [] },
  concepts: [],
  relationships: [],
  constraints: [],
  transitions: [],
  derivations: [],
  contracts: [domainPackContract],
  realizations: [],
  authorityContext: {
    authorityDecisions: [authorityDecision],
    acceptances: [
      {
        identity: { identityKind: 'acceptance', value: 'domain-pack-acceptance' },
        subject: { identity: packIdentity },
        scope: packScope,
        authorityDecision: { identity: authorityDecision.identity },
        provenance: [{ sourceIdentity: packIdentity }],
      },
    ],
    uncertainty: [],
    contradictions: [],
    delegations: [],
  },
  provenance: { records: [], conflicts: [] },
  compatibility: [],
};

describe('Domain Pack semantic contract realization', () => {
  it('compiles an attributable Domain Pack contract as a non-applicable candidate', () => {
    const result = compileCandidateSemanticContract(domainPackIR);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.contract.identity).toEqual(packIdentity);
    expect(result.contract.version.value).toBe('1.0.0');
    expect(result.contract.version.scope).toEqual(packScope);
    expect(result.contract.elements).toEqual(packElements);
    expect(result.contract.provenance).toEqual([{ sourceIdentity: packIdentity }]);
    expect(result.contract.lifecycle.lifecycleState.identity.value).toBe('candidate');
    expect(result.contract.applicability.applicable).toBe('indeterminate');
    expect(result.contract.applicability.authorityDecision).toBeUndefined();
    expect(result.contract.ratification.ratified).toBe(false);
    expect(result.contract.ratification.authorityDecision).toBeUndefined();
    expect(result.provenance.subject).toEqual({ identity: packIdentity });
  });

  it('validates the compiled candidate with attributable evidence', () => {
    const result = compileAndValidateCandidateSemanticContract(domainPackIR);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.contract.identity).toEqual(packIdentity);
    expect(result.contract.lifecycle.lifecycleState.identity.value).toBe('validated');
    expect(result.contract.applicability.applicable).toBe('indeterminate');
    expect(result.contract.ratification.ratified).toBe(false);
    expect(result.evidence.subjectIdentity).toEqual(packIdentity);
    expect(result.evidence.sourceIdentity).toEqual(packIdentity);
    expect(result.evidence.sourceVersion).toBe('1.0.0');
    expect(result.evidence.result).toBe('conformant');
    expect(result.evidence.provenance.subject).toEqual({ identity: packIdentity });
    expect(result.evidence.provenance.sources).toEqual([
      { sourceIdentity: packIdentity },
      { sourceIdentity: packIdentity },
    ]);
  });

  it.each([
    ['missing identity', { ...domainPackContract, identity: undefined }],
    ['malformed identity', { ...domainPackContract, identity: { identityKind: 'semantic' } }],
    ['missing provenance', { ...domainPackContract, provenance: undefined }],
  ])('fails closed for a Domain Pack with %s', (_reason, contract) => {
    const result = compileCandidateSemanticContract({ ...domainPackIR, contracts: [contract] });

    expect(result.ok).toBe(false);
    expect(result.stage).toBe('compilation');
  });

  it.each([
    ['absent', []],
    ['ambiguous', [domainPackContract, domainPackContract]],
  ])('fails closed for a Domain Pack source that is %s', (_reason, contracts) => {
    const result = compileCandidateSemanticContract({ ...domainPackIR, contracts });

    expect(result).toEqual({
      ok: false,
      reason: `Semantic Contract source is ${_reason}`,
      stage: 'compilation',
    });
  });
});