import type { ArchitecturalLayer, ArchitecturalDependency } from './architectural-boundary.js';
import { architecturalDoctrineAuthority } from './architectural-doctrine-authority.js';

export interface ArchitecturalConcept {
  name: ArchitecturalLayer;
  meaning: string;
  sourceAttributions: readonly { source: string; section: string }[];
}

export interface ArchitecturalModel {
  concepts: readonly ArchitecturalConcept[];
  contractBoundaries: readonly ArchitecturalContractBoundary[];
}

export interface ArchitecturalContractBoundary {
  source: 'projection-contract';
  target: 'contract';
  sourceAttributions: readonly { source: string; section: string }[];
}

const architecturalSource = 'doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md';
const architecturalSection = 'Architectural Dependency Principle';

const approvedArchitecturalConcepts = architecturalDoctrineAuthority.concepts;

export const architecturalConcepts: readonly ArchitecturalConcept[] =
  approvedArchitecturalConcepts.map(([name, meaning]) => ({
    name,
    meaning,
    sourceAttributions: [{ source: architecturalSource, section: architecturalSection }],
  }));

export const architecturalModel: ArchitecturalModel = {
  concepts: architecturalConcepts,
  contractBoundaries: [
    {
      source: 'projection-contract',
      target: 'contract',
      sourceAttributions: [{ source: architecturalSource, section: 'Architectural Principle' }],
    },
  ],
};

export function validateArchitecturalModel(
  model: ArchitecturalModel,
  dependencies: readonly ArchitecturalDependency[],
): { ok: true } | { ok: false; reason: string } {
  if (model.concepts.length !== dependencies.length + 1)
    return { ok: false, reason: 'Architectural concept inventory is incomplete' };
  for (const [index, concept] of model.concepts.entries()) {
    if (concept.name !== dependencies[index - 1]?.target && index > 0)
      return {
        ok: false,
        reason: 'Architectural concept order does not match dependency projection',
      };
    const expected = {
      name: approvedArchitecturalConcepts[index][0],
      meaning: approvedArchitecturalConcepts[index][1],
      source: architecturalSource,
      section: architecturalSection,
    };
    if (
      concept.name !== expected.name ||
      concept.meaning !== expected.meaning ||
      concept.sourceAttributions.length !== 1 ||
      concept.sourceAttributions[0].source !== expected.source ||
      concept.sourceAttributions[0].section !== expected.section
    )
      return { ok: false, reason: 'Architectural concept does not conform to governing source' };
  }
  if (
    model.contractBoundaries.length !== 1 ||
    model.contractBoundaries.some(
      (boundary) =>
        boundary.source !== 'projection-contract' ||
        boundary.target !== 'contract' ||
        boundary.sourceAttributions.length === 0 ||
        boundary.sourceAttributions.some(
          (attribution) =>
            attribution.source !== architecturalSource ||
            attribution.section !== 'Architectural Principle',
        ),
    )
  )
    return { ok: false, reason: 'Architectural contract boundary is incomplete or unattributed' };
  return { ok: true };
}
