import { describe, expect, it } from 'vitest';
import {
  admitApplicableSemanticContext,
  resolveApplicableSemanticContext,
  selectApplicableSemanticContext,
} from '../../src/runtime/index.js';

const identity = { identityKind: 'semantic', value: 'contract-1' };
const scope = {
  identity: { identityKind: 'scope', value: 'scope-1' },
  meaning: { statement: 'runtime scope', terms: [] },
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
const request = { contractIdentity: identity, contractVersion: '1.0.0', scope: scope.identity };

describe('selectApplicableSemanticContext', () => {
  it('selects exactly one applicable ratified contract', () => {
    expect(selectApplicableSemanticContext([contract], request)).toEqual({
      ok: true,
      context: { contract, identity, version: '1.0.0', scope },
    });
  });

  it.each([
    ['missing contract', [], 'No applicable ratified contract matches the selection request'],
    [
      'malformed contract',
      [null as never],
      'No applicable ratified contract matches the selection request',
    ],
    [
      'candidate contract',
      [
        {
          ...contract,
          lifecycle: {
            ...contract.lifecycle,
            lifecycleState: { identity: { identityKind: 'lifecycle', value: 'candidate' } },
          },
          applicability: { ...contract.applicability, applicable: 'indeterminate' as const },
          ratification: { ...contract.ratification, ratified: false },
        },
      ],
      'No applicable ratified contract matches the selection request',
    ],
    ['wrong version', [contract], 'No applicable ratified contract matches the selection request'],
  ])('fails closed for %s', (_name, contracts, reason) => {
    expect(
      selectApplicableSemanticContext(contracts, {
        ...request,
        contractVersion: _name === 'wrong version' ? '2.0.0' : request.contractVersion,
      }),
    ).toEqual({ ok: false, reason });
  });

  it('fails closed for a malformed selection version', () => {
    expect(
      selectApplicableSemanticContext([contract], { ...request, contractVersion: null as never }),
    ).toEqual({ ok: false, reason: 'Applicable contract selection request is invalid' });
  });

  it('fails closed when the selected scope meaning terms differ', () => {
    const term = { identity: { identityKind: 'term', value: 'term-1' } };
    const scopedContract = {
      ...contract,
      applicability: {
        ...contract.applicability,
        scope: { ...scope, meaning: { ...scope.meaning, terms: [term] } },
      },
    };
    const selected = selectApplicableSemanticContext([scopedContract], request);
    expect(selected.ok && admitApplicableSemanticContext({ ...selected.context, scope })).toEqual({
      ok: false,
      reason: 'Runtime requires a valid applicable ratified semantic context',
    });
  });

  it('fails closed for ambiguous applicable contracts', () => {
    expect(selectApplicableSemanticContext([contract, contract], request)).toEqual({
      ok: false,
      reason: 'Applicable contract selection is ambiguous',
    });
  });

  it.each([
    [
      'missing applicability authority',
      { applicability: { ...contract.applicability, authorityDecision: undefined } },
    ],
    [
      'missing ratification authority',
      { ratification: { ...contract.ratification, authorityDecision: undefined } },
    ],
    [
      'missing ratification record',
      { ratification: { ...contract.ratification, record: undefined } },
    ],
  ])('fails closed for %s', (_name, replacement) => {
    expect(selectApplicableSemanticContext([{ ...contract, ...replacement }], request)).toEqual({
      ok: false,
      reason: 'No applicable ratified contract matches the selection request',
    });
  });
});

describe('admitApplicableSemanticContext', () => {
  it('admits only a selected applicable semantic context', () => {
    const selected = selectApplicableSemanticContext([contract], request);

    expect(selected.ok && admitApplicableSemanticContext(selected.context)).toEqual({
      ok: true,
      context: selected.context,
    });
  });

  it.each([
    ['missing context', undefined],
    ['malformed context', { contract, identity, version: '', scope }],
    [
      'non-applicable contract',
      {
        contract: {
          ...contract,
          applicability: { ...contract.applicability, applicable: 'indeterminate' as const },
        },
        identity,
        version: '1.0.0',
        scope,
      },
    ],
    [
      'unratified contract',
      {
        contract: { ...contract, ratification: { ...contract.ratification, ratified: false } },
        identity,
        version: '1.0.0',
        scope,
      },
    ],
  ])('fails closed for %s', (_name, context) => {
    expect(admitApplicableSemanticContext(context)).toEqual({
      ok: false,
      reason: 'Runtime requires a valid applicable ratified semantic context',
    });
  });
});

describe('resolveApplicableSemanticContext', () => {
  it('uses selection and admission as the runtime entry boundary', () => {
    expect(resolveApplicableSemanticContext([contract], request)).toEqual({
      ok: true,
      context: { contract, identity, version: '1.0.0', scope },
    });
  });

  it('fails closed before runtime admission for ambiguous selection', () => {
    expect(resolveApplicableSemanticContext([contract, contract], request)).toEqual({
      ok: false,
      reason: 'Applicable contract selection is ambiguous',
    });
  });
});
