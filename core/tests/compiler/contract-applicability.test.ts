import { describe, expect, it } from 'vitest';
import { evaluateSuppliedContractApplicability } from '../../src/compiler/contract-applicability.js';

const validInput = {
  subjectContractIdentity: 'contract-1',
  subjectSemanticVersion: '1.0.0',
  applicability: {
    authority: {
      authorityIdentity: 'authority-1',
      decisionIdentity: 'decision-1',
      decisionVersion: '1',
      subjectContractIdentity: 'contract-1',
      subjectContractVersion: '1.0.0',
      decisionTimestamp: '2026-08-15T14:00:00Z',
      attribution: 'human-authority',
      decision: 'applicable' as const,
      provenance: { source: 'authority' },
      status: 'valid' as const,
    },
    governedScope: 'Guvna Semantic Contract semantic boundary',
    subjectScope: 'Guvna-owned Semantic Contract expressing accepted Guvna meaning',
    validated: true,
    ratification: {
      ratified: true,
      decision: 'ratify' as const,
      authorityIdentity: 'ratifying-authority-1',
      decisionIdentity: 'ratification-1',
      decisionVersion: '1',
      subjectContractIdentity: 'contract-1',
      subjectContractVersion: '1.0.0',
      contractIdentity: 'contract-1',
      contractVersion: '1.0.0',
      subjectScope: 'Guvna-owned Semantic Contract expressing accepted Guvna meaning',
      governedScope: 'Guvna Semantic Contract semantic boundary',
      provenance: { source: 'ratification' },
    },
    validity: { status: 'valid' as const, provenance: { source: 'validity' } },
    effectiveBoundary: {
      status: 'valid' as const,
      provenance: { source: 'effective-boundary' },
      declaration: { kind: 'revision' as const, value: 'revision-1' },
    },
  },
};

describe('evaluateSuppliedContractApplicability', () => {
  it('preserves supplied contract and authority data for an applicable result', () => {
    expect(evaluateSuppliedContractApplicability(validInput)).toEqual({
      subjectContractIdentity: 'contract-1',
      subjectSemanticVersion: '1.0.0',
      governedScope: validInput.applicability.governedScope,
      authorityIdentity: validInput.applicability.authority.authorityIdentity,
      decisionIdentity: validInput.applicability.authority.decisionIdentity,
      decisionVersion: validInput.applicability.authority.decisionVersion,
      decisionTimestamp: validInput.applicability.authority.decisionTimestamp,
      attribution: validInput.applicability.authority.attribution,
      effectiveBoundary: validInput.applicability.effectiveBoundary,
      result: 'applicable',
      provenance: {
        authority: validInput.applicability.authority.provenance,
        ratification: validInput.applicability.ratification.provenance,
        validity: validInput.applicability.validity.provenance,
        effectiveBoundary: validInput.applicability.effectiveBoundary.provenance,
      },
    });
  });

  it('preserves an explicit externally supplied not-applicable decision', () => {
    const result = evaluateSuppliedContractApplicability({
      ...validInput,
      applicability: {
        ...validInput.applicability,
        authority: {
          ...validInput.applicability.authority,
          decision: 'not-applicable',
        },
      },
    });

    expect(result.result).toBe('not-applicable');
    expect(result.provenance).toEqual({
      authority: validInput.applicability.authority.provenance,
      ratification: validInput.applicability.ratification.provenance,
      validity: validInput.applicability.validity.provenance,
      effectiveBoundary: validInput.applicability.effectiveBoundary.provenance,
    });
  });

  it('permits absent optional decision and boundary metadata', () => {
    const result = evaluateSuppliedContractApplicability({
      ...validInput,
      applicability: {
        ...validInput.applicability,
        authority: {
          ...validInput.applicability.authority,
          decisionTimestamp: undefined,
        },
        effectiveBoundary: {
          ...validInput.applicability.effectiveBoundary,
          declaration: undefined,
        },
      },
    });

    expect(result.result).toBe('applicable');
  });

  it.each([
    {
      name: 'an empty decision timestamp',
      input: {
        ...validInput,
        applicability: {
          ...validInput.applicability,
          authority: {
            ...validInput.applicability.authority,
            decisionTimestamp: '',
          },
        },
      },
    },
    {
      name: 'an empty timestamp declaration value',
      input: {
        ...validInput,
        applicability: {
          ...validInput.applicability,
          effectiveBoundary: {
            ...validInput.applicability.effectiveBoundary,
            declaration: { kind: 'timestamp', value: '' },
          },
        },
      },
    },
    {
      name: 'an empty revision declaration value',
      input: {
        ...validInput,
        applicability: {
          ...validInput.applicability,
          effectiveBoundary: {
            ...validInput.applicability.effectiveBoundary,
            declaration: { kind: 'revision', value: '' },
          },
        },
      },
    },
    {
      name: 'an empty boundary reference identity',
      input: {
        ...validInput,
        applicability: {
          ...validInput.applicability,
          effectiveBoundary: {
            ...validInput.applicability.effectiveBoundary,
            declaration: { kind: 'boundary-reference', identity: '' },
          },
        },
      },
    },
    {
      name: 'an unsupported declaration kind',
      input: {
        ...validInput,
        applicability: {
          ...validInput.applicability,
          effectiveBoundary: {
            ...validInput.applicability.effectiveBoundary,
            declaration: { kind: 'unknown', value: 'value' },
          },
        },
      },
    },
  ])('fails closed for $name', ({ input }) => {
    const result = evaluateSuppliedContractApplicability(input as never);

    expect(result.result).toBe('indeterminate');
    expect(result.provenance).toEqual({
      authority: validInput.applicability.authority.provenance,
      ratification: validInput.applicability.ratification.provenance,
      validity: validInput.applicability.validity.provenance,
      effectiveBoundary: validInput.applicability.effectiveBoundary.provenance,
    });
  });

  it('fails closed for a missing contract identity while preserving available provenance', () => {
    const result = evaluateSuppliedContractApplicability({
      ...validInput,
      subjectContractIdentity: '',
    });

    expect(result.result).toBe('indeterminate');
    expect(result.provenance).toEqual({
      authority: validInput.applicability.authority.provenance,
      ratification: validInput.applicability.ratification.provenance,
      validity: validInput.applicability.validity.provenance,
      effectiveBoundary: validInput.applicability.effectiveBoundary.provenance,
    });
  });

  it('preserves inputs without mutating them', () => {
    const input = structuredClone(validInput);
    const before = structuredClone(input);

    evaluateSuppliedContractApplicability(input);

    expect(input).toEqual(before);
  });
});
