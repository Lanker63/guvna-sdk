import { describe, expect, it } from 'vitest';
import {
  createDomainPackRuntimeRules,
  evaluateDomainPack,
  runRuntimeOperation,
  type DomainPackRuntimeInput,
} from '../../src/runtime/index.js';

const identity = { identityKind: 'semantic', value: 'domain-pack-1' };
const scope = { identity: { identityKind: 'scope', value: 'scope-1' }, meaning: { statement: 'scope', terms: [] } };
const version = { value: '1.0.0', semanticIdentity: { identity }, scope };
const provenance = [{ sourceIdentity: identity }];
const attribution = { contractIdentity: identity, contractVersion: '1.0.0', scope, provenance };
const admittedContract = {
  identity,
  version,
  contractKind: 'semantic' as const,
  lifecycle: { lifecycleState: { identity: { identityKind: 'lifecycle', value: 'applicable' } }, transitions: [] },
  applicability: { applicable: true as const, scope, conditions: [], authorityDecision: { identity }, provenance },
  ratification: {
    ratified: true,
    requiresHumanAuthority: true,
    authorityDecision: { identity },
    provenance,
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
  provenance,
  elements: Object.fromEntries(
    ['concepts', 'dataStructures', 'operations', 'states', 'transitions', 'invariants', 'authorityBoundaries', 'provenanceRequirements', 'compatibilityRequirements', 'failureBehavior', 'realizationObligations'].map((category) => [category, [{ identity }]]),
  ),
};
const manifest = {
  packIdentity: identity,
  packVersion: version,
  targetGuvnaSemanticVersion: version,
  contents: [{ identity, contentClass: 'skill' as const, provenance }],
  provenance,
  compatibility: [],
};
const input = (overrides: Partial<DomainPackRuntimeInput> = {}) =>
  ({
    manifest,
    acceptedContent: [identity],
    compatibility: 'compatible' as const,
    context: { contract: admittedContract, identity, version: '1.0.0', scope },
    semanticEvidence: { identity, ir: { identity }, scope, provenance },
    execution: { identity, state: {}, provenance },
    authority: { identity, decisions: [], scope, provenance },
    provenance: { identity, sources: provenance, transformations: [] },
    ...overrides,
  }) as DomainPackRuntimeInput;

describe('Domain Pack Runtime evaluation', () => {
  it('returns conformant only for accepted compatible content', () => {
    expect(evaluateDomainPack(input())).toEqual({
      ok: true,
      value: { outcome: { outcomeKind: 'conformant', findings: [] }, authorityBasis: [] },
    });
  });

  it('returns indeterminate for missing acceptance or compatibility evidence', () => {
    expect(evaluateDomainPack(input({ acceptedContent: [] }))).toMatchObject({
      ok: true,
      value: { outcome: { outcomeKind: 'indeterminate' } },
    });
    expect(evaluateDomainPack(input({ compatibility: 'indeterminate' }))).toMatchObject({
      ok: true,
      value: { outcome: { outcomeKind: 'indeterminate' } },
    });
  });

  it('returns nonConformant for explicit incompatibility', () => {
    expect(evaluateDomainPack(input({ compatibility: 'incompatible' }))).toMatchObject({
      ok: true,
      value: { outcome: { outcomeKind: 'nonConformant' } },
    });
  });

  it('fails unauthorized bundled-agent authority claims closed', () => {
    expect(
      evaluateDomainPack(
        input({
          manifest: {
            ...manifest,
            contents: [{ identity, contentClass: 'agent', provenance, authorityClaim: identity }],
          },
        }),
      ),
    ).toMatchObject({ ok: false, failure: { failureKind: 'unauthorized-input' } });
  });

  it('fails malformed manifests closed without throwing', () => {
    expect(evaluateDomainPack(input({ manifest: null as never }))).toMatchObject({
      ok: false,
      failure: { failureKind: 'invalid-input' },
    });
  });

  it('rejects incomplete Domain Pack input at the typed adapter boundary', () => {
    const rules = createDomainPackRuntimeRules({
      acceptEvaluation: () => true,
      produceDirective: () => {
        throw new Error('not used');
      },
    });

    expect(rules.evaluate(input({ compatibility: undefined }))).toMatchObject({
      ok: false,
      failure: { failureKind: 'invalid-input' },
    });
    expect(rules.evaluate(input({ manifest: null as never }))).toMatchObject({
      ok: false,
      failure: { failureKind: 'invalid-input' },
    });
    expect(rules.evaluate(input({ acceptedContent: [null as never] }))).toMatchObject({
      ok: false,
      failure: { failureKind: 'invalid-input' },
    });
  });

  it('runs Domain Pack evaluation through the admitted generic Runtime operation', () => {
    const runtimeInput = input();
    const rules = createDomainPackRuntimeRules({
      acceptEvaluation: () => true,
      produceDirective: () => ({
        resultKind: 'noDirective',
        identity: { identityKind: 'no-directive', value: 'none' },
        attribution: {
          ...attribution,
          executionContext: { identity: runtimeInput.execution.identity },
          authorityBasis: [],
        },
      }),
    });

    const result = runRuntimeOperation(
      {
        operationKind: 'evaluate',
        identity: { identityKind: 'operation', value: 'domain-pack-evaluate' },
        input: runtimeInput,
        attribution,
      },
      rules,
    );

    expect(result).toMatchObject({
      ok: true,
      value: { outcome: { outcomeKind: 'conformant' } },
    });

    if (!result.ok) throw new Error('Expected Domain Pack evaluation to succeed');
    const evidence = runRuntimeOperation(
      {
        operationKind: 'recordEvidence',
        identity: { identityKind: 'operation', value: 'domain-pack-evidence' },
        evaluation: result.value,
        outcome: result.value.outcome,
        attribution,
      },
      rules,
    );

    expect(evidence).toMatchObject({
      ok: true,
      value: { outcome: { outcomeKind: 'conformant' } },
    });
  });
});
