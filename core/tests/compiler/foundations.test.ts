import { describe, expect, it } from 'vitest';
import { evaluateCompatibility } from '../../src/compiler/compatibility.js';
import { evaluateLifecycle } from '../../src/compiler/contract-lifecycle.js';
import { createIdentity } from '../../src/compiler/ir-identity.js';
import { serializeCompactJson, serializeSemanticIR } from '../../src/compiler/ir-serializer.js';
import { appendProvenance, preserveProvenance } from '../../src/compiler/provenance.js';
import {
  compareSemanticVersions,
  parseSemanticVersion,
} from '../../src/compiler/semantic-version.js';

describe('compiler foundations', () => {
  it('serializes compact JSON and rejects unsupported values', () => {
    expect(new TextDecoder().decode(serializeCompactJson({ a: -0, text: 'a\n' }).bytes)).toBe(
      '{"a":0,"text":"a\\n"}',
    );
    expect(
      new TextDecoder().decode(
        serializeCompactJson({
          sourceSection: 'section',
          sourceIdentity: { identityKind: 'semantic', value: 'source' },
        }).bytes,
      ),
    ).toBe(
      '{"sourceIdentity":{"identityKind":"semantic","value":"source"},"sourceSection":"section"}',
    );
    expect(serializeCompactJson('\ud800').ok).toBe(false);
    expect(serializeCompactJson(Infinity).ok).toBe(false);
    expect(serializeCompactJson({ sourceIdentity: undefined }).ok).toBe(false);
  });

  it('uses Semantic IR interface field order regardless of object insertion order', () => {
    const ir = {
      irVersion: '1',
      irKind: 'guvna-semantic-ir',
      semanticIdentity: { value: 'id', identityKind: 'semantic' },
      semanticScope: {
        meaning: { terms: [], statement: 'scope' },
        identity: { value: 'scope', identityKind: 'scope' },
      },
      meaning: { terms: [], statement: 'meaning' },
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
    const serialization = serializeSemanticIR(ir);
    expect(serialization.ok).toBe(true);
    if (serialization.ok) {
      const json = new TextDecoder().decode(serialization.bytes);
      expect(json).toContain('"semanticIdentity":{"identityKind":"semantic","value":"id"}');
      expect(json).not.toContain('"semanticVersion"');
    }
  });

  it('creates base64url identities and SHA-256 digests from exact preimage bytes', () => {
    const result = createIdentity({
      identityKind: 'concept',
      bytes: new TextEncoder().encode(
        '{"identityKind":"concept","semanticScope":"scope","content":"content"}',
      ),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.identity.value).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(result.digest).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it('uses supplied canonical preimage bytes without interpreting their content', () => {
    const bytes = new TextEncoder().encode(
      '{"identityKind":"concept","semanticScope":"scope","content":"content"}',
    );
    const result = createIdentity({ identityKind: 'concept', bytes });
    expect(result).toMatchObject({ ok: true });
    if (result.ok) expect(result.bytes).toEqual(bytes);
    expect(createIdentity({ identityKind: 'concept', bytes: new Uint8Array() }).ok).toBe(false);
  });

  it('permits only a fully guarded declared lifecycle transition', () => {
    const input = {
      state: 'candidate' as const,
      operation: 'validate' as const,
      contractIdentity: 'id',
      contractVersion: '1.0.0',
      scope: 'scope',
      provenance: {},
      guards: {
        structuralAndSemanticValidation: true,
        completeProvenance: true,
        noBlockingGap: true,
      },
    };
    expect(evaluateLifecycle(input)).toEqual({ permitted: true, nextState: 'validated' });
    expect(evaluateLifecycle({ ...input, guards: {} }).permitted).toBe(false);

    const ratification = { ...input, state: 'validated' as const, operation: 'ratify' as const };
    expect(evaluateLifecycle(ratification).permitted).toBe(false);
    const authority = {
      authorityIdentity: 'human',
      decisionIdentity: 'decision',
      decisionVersion: '1',
      decisionScope: 'scope',
      contractIdentity: 'id',
      contractVersion: '1.0.0',
      provenance: {},
    };
    expect(evaluateLifecycle({ ...ratification, guards: { authority } })).toEqual({
      permitted: true,
      nextState: 'ratified',
    });
    expect(
      evaluateLifecycle({
        ...ratification,
        guards: { authority: { ...authority, contractIdentity: 'other' } },
      }).permitted,
    ).toBe(false);
    expect(
      evaluateLifecycle({
        ...ratification,
        guards: { authority: { ...authority, contractVersion: '2.0.0' } },
      }).permitted,
    ).toBe(false);
    expect(
      evaluateLifecycle({
        ...ratification,
        guards: { authority: { ...authority, decisionScope: 'other' } },
      }).permitted,
    ).toBe(false);
    expect(
      evaluateLifecycle({
        ...ratification,
        guards: { authority: { ...authority, decisionVersion: '' } },
      }).permitted,
    ).toBe(false);
    expect(
      evaluateLifecycle({ ...ratification, guards: { authority }, state: 'candidate' as const })
        .permitted,
    ).toBe(false);
    expect(evaluateLifecycle({ ...ratification, guards: { authority } })).not.toMatchObject({
      nextState: 'applicable',
    });
  });

  it('aggregates externally evaluated compatibility requirements without predicate invention', () => {
    const requirement = {
      requirementIdentity: 'r',
      subjectKind: 'semantic',
      priorSubjectIdentity: { identityKind: 'semantic', value: 'p' },
      priorSubjectVersion: '1.0.0',
      candidateSubjectIdentity: { identityKind: 'semantic', value: 'c' },
      candidateSubjectVersion: '2.0.0',
      governedScope: { identityKind: 'semantic', value: 'scope' },
      direction: 'prior-to-candidate' as const,
      predicateKind: 'obligations-preserved' as const,
      predicateInputs: {},
      requiredInterpretation: {},
      authorityReference: { identityKind: 'semantic', value: 'requirement-set-decision' },
      provenance: {},
    };
    const identity = (value: string) => ({ identityKind: 'semantic', value });
    const ref = (value: string) => ({ identity: identity(value) });
    const scope = { identity: identity('scope'), meaning: { statement: 'scope', terms: [] } };
    const provenance = [{ sourceIdentity: identity('source') }];
    const decision = (decisionIdentity: string, subjectIdentity: string) => ({
      identity: identity(decisionIdentity),
      authorityIdentity: {
        identity: identity('authority'),
        principal: ref('principal'),
        provenance,
      },
      subject: ref(subjectIdentity),
      scope,
      subjectContractIdentity: identity(subjectIdentity),
      subjectContractVersion: '1.0.0',
      decision: 'ratify' as const,
      provenance,
    });
    const priorDecision = decision('prior-decision', 'p');
    const requirementSetDecision = decision('requirement-set-decision', 'requirements');
    const applicabilityDecision = {
      identity: identity('apply-decision'),
      authorityIdentity: priorDecision.authorityIdentity,
      subject: ref('p'),
      scope,
      subjectContractIdentity: identity('p'),
      subjectContractVersion: '1.0.0',
      operation: 'apply' as const,
      effectiveBoundary: { identity: identity('boundary'), provenance },
      provenance,
    };
    const subject = (value: string, version: string) => ({
      identity: identity(value),
      version: { value: version, semanticIdentity: ref(value), scope },
      scope,
      provenance,
    });
    const evidence = (value: string) => ({ identity: identity(value), provenance });
    const delta = {
      prior: {
        subject: subject('p', '1.0.0'),
        applicability: {
          applicable: true as const,
          scope,
          authorityDecision: ref('apply-decision'),
          provenance,
        },
        ratification: {
          ratified: true as const,
          requiresHumanAuthority: true as const,
          authorityDecision: ref('prior-decision'),
          provenance,
        },
        ratificationDecision: priorDecision,
        applicabilityDecision,
      },
      candidate: {
        subject: subject('c', '2.0.0'),
        lifecycleState: 'candidate' as const,
        provenance,
      },
      requirementSet: {
        identity: identity('requirements'),
        governedScope: scope,
        requirements: [requirement],
        authorityDecision: requirementSetDecision,
        provenance,
      },
      changedMeaning: evidence('meaning'),
      changedObligations: evidence('obligations'),
      changedStatesAndTransitions: evidence('states'),
      changedInvariants: evidence('invariants'),
      changedAuthorityRequirements: evidence('authority-requirements'),
      changedProvenanceRequirements: evidence('provenance-requirements'),
      changedCompatibilityRequirements: evidence('compatibility-requirements'),
      changedFailureSemantics: evidence('failure-semantics'),
      compatibilityImplications: evidence('implications'),
      affectedRealizationObligations: evidence('realization-obligations'),
      sourceProvenance: provenance,
      authorityAttribution: requirementSetDecision,
    };
    const evaluation = (result: 'satisfied' | 'violated') => ({
      requirement,
      requirementSet: ref('requirements'),
      applicable: true,
      result,
      provenance,
    });
    const satisfied = evaluation('satisfied');
    expect(evaluateCompatibility([satisfied], delta)).toEqual({
      result: 'compatible',
      evaluations: [satisfied],
    });
    expect(evaluateCompatibility([evaluation('violated')], delta).result).toBe('incompatible');
    expect(
      evaluateCompatibility([{ ...satisfied, requirementSet: ref('other-requirements') }], delta)
        .result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        requirementSet: {
          ...delta.requirementSet,
          authorityDecision: decision('other-decision', 'requirements'),
        },
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        authorityAttribution: decision('other-decision', 'other-subject'),
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility(
        [
          {
            ...satisfied,
            requirement: {
              ...requirement,
              candidateSubjectIdentity: { identityKind: 'other', value: 'c' },
            },
          },
        ],
        delta,
      ).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        candidate: { ...delta.candidate, lifecycleState: 'validated' },
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        prior: {
          ...delta.prior,
          applicabilityDecision: { ...applicabilityDecision, operation: 'ratify' },
        },
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        candidate: { ...delta.candidate, subject: subject('other', '2.0.0') },
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], {
        ...delta,
        prior: {
          ...delta.prior,
          applicability: { ...delta.prior.applicability, applicable: false },
        },
      }).result,
    ).toBe('indeterminate');
    expect(
      evaluateCompatibility([satisfied], { ...delta, authorityAttribution: undefined }).result,
    ).toBe('indeterminate');
    expect(evaluateCompatibility([], delta).result).toBe('indeterminate');
  });

  it('preserves provenance and follows SemVer 2 precedence without build metadata', () => {
    const original = [{ source: 'doctrine' }];
    expect(appendProvenance(preserveProvenance(original), { source: 'decision' })).toEqual([
      { source: 'doctrine' },
      { source: 'decision' },
    ]);
    expect(parseSemanticVersion('1.2.3-alpha.1+build.7')?.build).toEqual(['build', '7']);
    expect(compareSemanticVersions('1.0.0+first', '1.0.0+second')).toBe(0);
    expect(compareSemanticVersions('1.0.0-alpha', '1.0.0')).toBe(-1);
    expect(parseSemanticVersion('01.0.0')).toBeUndefined();
  });
});
