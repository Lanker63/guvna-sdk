import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ArchitecturalLayer } from './architectural-boundary.js';

export const architecturalDoctrinePath = 'doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md';
const dependencySection = 'Architectural Dependency Principle';
const conceptTerms: readonly [ArchitecturalLayer, string][] = [
  ['doctrine', 'Constitutional Doctrine'],
  ['canonical', 'Canonical Models'],
  ['architectural', 'Architectural Doctrine'],
  ['contract', 'Semantic Contracts'],
  ['compilation', 'Guvna Semantic Compilation'],
  ['candidate', 'Candidate Semantic Contract'],
  ['validation', 'Semantic Validation'],
  ['ratification', 'Contract Ratification'],
  ['applicable', 'Applicable Semantic Contract'],
  ['realization', 'Guvna-owned Realizations'],
];

export interface ArchitecturalDoctrineAuthority {
  readonly concepts: readonly [ArchitecturalLayer, string][];
  readonly dependencySection: string;
}

function readDoctrine(): string {
  const workspacePath = resolve(process.cwd(), architecturalDoctrinePath);
  const packagePath = resolve(process.cwd(), '..', architecturalDoctrinePath);
  return readFileSync(existsSync(workspacePath) ? workspacePath : packagePath, 'utf8');
}

export function extractArchitecturalDoctrineAuthority(
  markdown: string,
): ArchitecturalDoctrineAuthority {
  const section =
    markdown.match(new RegExp(`^# ${dependencySection}\\n\\n?([\\s\\S]*?)(?=^# )`, 'm'))?.[1] ?? '';
  if (
    !section.includes('Constitutional Doctrine') ||
    !section.includes('Canonical Models') ||
    !section.includes('Architectural Doctrine') ||
    !section.includes('Semantic Contracts') ||
    !section.includes('Contract Ratification') ||
    !section.includes('Applicable Semantic Contract') ||
    !section.includes('Guvna-owned Realizations')
  )
    throw new Error('Architectural doctrine dependency authority is not recognized');
  return { concepts: conceptTerms.map(([layer, term]) => [layer, term]), dependencySection };
}

export const architecturalDoctrineAuthority = extractArchitecturalDoctrineAuthority(readDoctrine());
