import { describe, expect, it } from 'vitest';
import {
  createBoundedArchitecturalView,
  validateBoundedArchitecturalView,
} from '../../src/compiler/architectural-view.js';
import type { SemanticIR } from '../../src/compiler/semantic-ir.js';

function validIR(): SemanticIR {
  return {
    irKind: 'guvna-semantic-ir',
    irVersion: '1',
    semanticIdentity: { identityKind: 'semantic', value: 'ir' },
    semanticScope: {
      identity: { identityKind: 'scope', value: 'scope' },
      meaning: { statement: 'scope', terms: [] },
    },
    meaning: { statement: 'meaning', terms: [] },
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
}

describe('bounded architectural view', () => {
  it('projects only existing architecture-relevant IR fields', () => {
    const ir = validIR();
    const result = createBoundedArchitecturalView(ir);

    expect(result).toEqual({
      ok: true,
      view: {
        semanticIdentity: ir.semanticIdentity,
        semanticVersion: ir.semanticVersion,
        semanticScope: ir.semanticScope,
        meaning: ir.meaning,
        concepts: ir.concepts,
        relationships: ir.relationships,
        constraints: ir.constraints,
        transitions: ir.transitions,
        derivations: ir.derivations,
        contracts: ir.contracts,
        realizations: ir.realizations,
        authorityContext: ir.authorityContext,
        provenance: ir.provenance,
        compatibility: ir.compatibility,
      },
    });
  });

  it('fails closed for an invalid IR rather than inferring an architectural view', () => {
    const result = createBoundedArchitecturalView({ ...validIR(), irVersion: '' });
    expect(result.ok).toBe(false);
  });

  it('fails closed for an unresolved declared realization reference', () => {
    const ir = validIR();
    ir.realizations.push({
      identity: { identityKind: 'realization', value: 'runtime' },
      realizationKind: 'runtime',
      realizes: { identity: { identityKind: 'semantic', value: 'missing' } },
      conformsTo: [],
      compatibility: { requirements: [], result: 'indeterminate', provenance: [] },
      provenance: [],
    });
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.reason).toBe('Architectural realization references an unknown IR identity');
  });

  it('accepts a bounded view whose declared references are resolvable', () => {
    const ir = validIR();
    const realization = {
      identity: { identityKind: 'realization', value: 'runtime' },
      realizationKind: 'runtime' as const,
      realizes: { identity: ir.semanticIdentity },
      conformsTo: [],
      compatibility: { requirements: [], result: 'indeterminate' as const, provenance: [] },
      provenance: [],
    };
    ir.realizations.push(realization);
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateBoundedArchitecturalView(result.view)).toEqual({ ok: true });
  });

  it('rejects an unresolved compatibility reference', () => {
    const result = createBoundedArchitecturalView({
      ...validIR(),
      compatibility: [
        {
          identity: { identityKind: 'compatibility', value: 'requirement' },
          subject: { identity: { identityKind: 'semantic', value: 'missing' } },
          scope: validIR().semanticScope,
          meaning: { statement: 'requirement', terms: [] },
        },
      ],
    });
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.reason).toBe('Architectural view references an unknown IR identity');
  });
});
