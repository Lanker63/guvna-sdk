import { describe, expect, it } from 'vitest';
import { validateSemanticIR } from '../../src/compiler/semantic-ir.js';
import { validateSemanticContract } from '../../src/compiler/semantic-contract.js';
import { compileCandidateSemanticContract } from '../../src/compiler/semantic-compilation.js';

const identity = { identityKind: 'semantic', value: 'abc' };
const meaning = { statement: 'Meaning', terms: [] };
const scope = { identity, meaning };
const contractElements = {
  concepts: [{ identity }],
  dataStructures: [{ identity }],
  operations: [{ identity }],
  states: [{ identity }],
  transitions: [{ identity }],
  invariants: [{ identity }],
  authorityBoundaries: [{ identity }],
  provenanceRequirements: [{ identity }],
  compatibilityRequirements: [{ identity }],
  failureBehavior: [{ identity }],
  realizationObligations: [{ identity }],
};
const validIR = {
  irKind: 'guvna-semantic-ir',
  irVersion: '1',
  semanticIdentity: identity,
  semanticVersion: { value: '1.0.0', semanticIdentity: { identity }, scope },
  semanticScope: scope,
  meaning,
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

const authorityDecision = {
  identity,
  authorityIdentity: { identity, principal: { identity }, provenance: [] },
  subject: { identity },
  scope,
  subjectContractIdentity: identity,
  subjectContractVersion: '1.0.0',
  decision: 'apply' as const,
  provenance: [],
};

describe('validateSemanticIR', () => {
  it('accepts a complete minimally populated structural IR', () => {
    expect(validateSemanticIR(validIR)).toEqual({ valid: true });
  });

  it('fails closed for an invalid nested identity or undeclared field', () => {
    expect(
      validateSemanticIR({ ...validIR, semanticIdentity: { identityKind: 'semantic' } }).valid,
    ).toBe(false);
    expect(validateSemanticIR({ ...validIR, invented: true }).valid).toBe(false);
  });

  it('fails closed for malformed collection and context records', () => {
    expect(validateSemanticIR({ ...validIR, concepts: [{}] }).valid).toBe(false);
    expect(validateSemanticIR({ ...validIR, authorityContext: {} }).valid).toBe(false);
    expect(
      validateSemanticIR({
        ...validIR,
        authorityContext: { ...validIR.authorityContext, authorityDecisions: [{}] },
      }).valid,
    ).toBe(false);
    expect(
      validateSemanticIR({ ...validIR, provenance: { records: [{}], conflicts: [] } }).valid,
    ).toBe(false);
  });

  it('requires authority for accepted entity meaning', () => {
    const entity = {
      identity,
      kind: 'concept' as const,
      meaning,
      attributes: [],
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      acceptance: { accepted: true, scope, provenance: [] },
      provenance: [],
    };

    expect(validateSemanticIR({ ...validIR, concepts: [entity] }).valid).toBe(false);
    expect(
      validateSemanticIR({
        ...validIR,
        concepts: [
          { ...entity, acceptance: { ...entity.acceptance, authorityDecision: { identity } } },
        ],
        authorityContext: {
          ...validIR.authorityContext,
          authorityDecisions: [{ ...authorityDecision, decision: 'accept' as const }],
        },
      }).valid,
    ).toBe(true);
  });

  it('requires authority for ratified contracts', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: 'indeterminate' as const,
        scope,
        conditions: [],
        provenance: [{ sourceIdentity: identity }],
      },
      ratification: {
        ratified: true,
        requiresHumanAuthority: true,
        provenance: [{ sourceIdentity: identity }],
        record: {
          candidateContractIdentity: identity,
          candidateContractVersion: '1.0.0',
          validationEvidence: { identity },
          validationResult: 'conformant' as const,
          ratificationEvent: { identity },
          ratifiedContractVersion: '1.0.0',
          applicableScope: scope,
        },
      },
      provenance: [{ sourceIdentity: identity }],
    };

    expect(validateSemanticIR({ ...validIR, contracts: [contract] }).valid).toBe(false);
    expect(
      validateSemanticIR({
        ...validIR,
        contracts: [
          {
            ...contract,
            ratification: { ...contract.ratification, authorityDecision: { identity } },
          },
        ],
        authorityContext: {
          ...validIR.authorityContext,
          authorityDecisions: [{ ...authorityDecision, decision: 'ratify' as const }],
        },
      }).valid,
    ).toBe(true);
  });

  it('accepts an attributable ratification record without making the contract applicable', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: 'indeterminate' as const,
        scope,
        conditions: [],
        provenance: [{ sourceIdentity: identity }],
      },
      ratification: {
        ratified: true,
        requiresHumanAuthority: true,
        authorityDecision: { identity },
        provenance: [{ sourceIdentity: identity }],
        record: {
          candidateContractIdentity: identity,
          candidateContractVersion: '1.0.0',
          validationEvidence: { identity },
          validationResult: 'conformant' as const,
          ratificationEvent: { identity },
          ratifiedContractVersion: '1.0.0',
          applicableScope: scope,
        },
      },
      provenance: [{ sourceIdentity: identity }],
    };

    expect(
      validateSemanticIR({
        ...validIR,
        contracts: [contract],
        authorityContext: {
          ...validIR.authorityContext,
          authorityDecisions: [{ ...authorityDecision, decision: 'ratify' as const }],
        },
      }).valid,
    ).toBe(true);
    expect(contract.applicability.applicable).toBe('indeterminate');
  });

  it('requires authority for applicable contracts', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: true,
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

    expect(validateSemanticIR({ ...validIR, contracts: [contract] }).valid).toBe(false);
  });

  it('rejects applicable contracts that have not been ratified', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: true,
        scope,
        conditions: [],
        authorityDecision: { identity },
        provenance: [{ sourceIdentity: identity }],
      },
      ratification: {
        ratified: false,
        requiresHumanAuthority: true,
        provenance: [{ sourceIdentity: identity }],
      },
      provenance: [{ sourceIdentity: identity }],
    };

    expect(
      validateSemanticIR({
        ...validIR,
        contracts: [contract],
        authorityContext: {
          ...validIR.authorityContext,
          authorityDecisions: [{ ...authorityDecision, decision: 'apply' as const }],
        },
      }).valid,
    ).toBe(false);
  });

  it('labels authority-link failures as semantic validation failures', () => {
    const result = validateSemanticIR({
      ...validIR,
      contracts: [
        {
          identity,
          version: { value: '1.0.0', semanticIdentity: { identity }, scope },
          contractKind: 'semantic' as const,
          elements: contractElements,
          lifecycle: { lifecycleState: { identity }, transitions: [] },
          applicability: {
            applicable: true,
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
        },
      ],
    });

    expect(result).toEqual({
      valid: false,
      reason: 'Accepted or ratified meaning lacks attributable authority',
      stage: 'semantic',
    });
  });
});

describe('validateSemanticContract', () => {
  it('accepts a versioned, scoped, attributable semantic contract reference', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
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

    expect(validateSemanticContract(contract)).toEqual({ valid: true });
  });

  it('fails closed when mandatory contract elements are absent', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: 'indeterminate' as const,
        scope,
        conditions: [],
        provenance: [],
      },
      ratification: { ratified: false, requiresHumanAuthority: true, provenance: [] },
      provenance: [],
    };

    expect(validateSemanticContract(contract)).toEqual({
      valid: false,
      reason: 'Semantic Contract elements are incomplete',
    });
  });

  it.each([
    ['non-semantic contract kind', { contractKind: 'runtime' }],
    ['malformed provenance', { provenance: undefined }],
    [
      'version with a different identity',
      {
        version: {
          value: '1.0.0',
          semanticIdentity: { identity: { identityKind: 'semantic', value: 'other' } },
          scope,
        },
      },
    ],
  ])('fails closed for %s', (_reason, change) => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
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
      ...change,
    };

    expect(validateSemanticContract(contract as never).valid).toBe(false);
  });
});

describe('compileCandidateSemanticContract', () => {
  it('preserves source identity and bindings while producing a non-applicable candidate', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: 'indeterminate' as const,
        scope,
        conditions: [],
        provenance: [],
      },
      ratification: { ratified: false, requiresHumanAuthority: true, provenance: [] },
      provenance: [{ sourceIdentity: identity }],
    };
    const result = compileCandidateSemanticContract({ ...validIR, contracts: [contract] });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.contract.identity).toEqual(identity);
      expect(result.contract.elements).toEqual(contractElements);
      expect(result.contract.lifecycle.lifecycleState.identity.value).toBe('candidate');
      expect(result.contract.applicability.applicable).toBe('indeterminate');
      expect(result.contract.ratification.ratified).toBe(false);
      expect(result.contract.applicability.authorityDecision).toBeUndefined();
      expect(result.contract.ratification.authorityDecision).toBeUndefined();
      expect(result.provenance.subject).toEqual({ identity });
      expect(result.provenance.transformations[0].kind).toBe('compile');
      expect(result.provenance.transformations[0].inputs).toEqual([{ identity }]);
      expect(result.provenance.transformations[0].outputs).toEqual([{ identity }]);
    }
  });

  it('fails closed when semantic contract source is absent', () => {
    expect(compileCandidateSemanticContract(validIR)).toEqual({
      ok: false,
      reason: 'Semantic Contract source is absent',
      stage: 'compilation',
    });
  });

  it('fails closed when semantic contract source is ambiguous', () => {
    const contract = {
      identity,
      version: { value: '1.0.0', semanticIdentity: { identity }, scope },
      contractKind: 'semantic' as const,
      elements: contractElements,
      lifecycle: { lifecycleState: { identity }, transitions: [] },
      applicability: {
        applicable: 'indeterminate' as const,
        scope,
        conditions: [],
        provenance: [],
      },
      ratification: { ratified: false, requiresHumanAuthority: true, provenance: [] },
      provenance: [{ sourceIdentity: identity }],
    };

    expect(
      compileCandidateSemanticContract({ ...validIR, contracts: [contract, contract] }),
    ).toEqual({ ok: false, reason: 'Semantic Contract source is ambiguous', stage: 'compilation' });
  });
});
