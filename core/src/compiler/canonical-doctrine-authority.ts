import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const canonicalDoctrinePath = 'doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md';
const reviewManifestPath = resolve(__dirname, 'canonical-doctrine-review.json');
const conceptSection = 'Canonical Epistemic Concepts';
const relationshipSection = 'Canonical Epistemic Relationship';

export interface DoctrineAuthority {
  readonly source: string;
  readonly sourceHash: string;
  readonly conceptNames: readonly string[];
  readonly meanings: Readonly<Record<string, string>>;
  readonly conceptAttribution: { readonly source: string; readonly section: string };
  readonly relationships: readonly {
    readonly subject: string;
    readonly predicate: 'flows-to';
    readonly object: string;
    readonly sourceAttributions: readonly { readonly source: string; readonly section: string }[];
  }[];
}

const expectedConceptNames = [
  'Repository Information',
  'Repository Knowledge',
  'Repository Intelligence',
  'Repository Wisdom',
  'Repository Authority',
  'Acceptance',
  'Repository Truth',
  'Repository Understanding',
  'Knowledge Manifestations',
  'Realizations',
  'Evidence',
  'Provenance',
  'Candidate Statements',
  'Authority Decisions',
];

function sectionBody(markdown: string, heading: string): string {
  const match = markdown.match(
    new RegExp(
      `^# ${heading.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\n\\n?([\\s\\S]*?)(?=^# )`,
      'm',
    ),
  );
  if (!match) throw new Error(`Missing doctrine section: ${heading}`);
  return match[1].trim();
}

export function extractCanonicalDoctrineAuthority(markdown: string): DoctrineAuthority {
  const conceptsBody = sectionBody(markdown, conceptSection);
  const conceptNames = [...conceptsBody.matchAll(/^\d+\. (.+)$/gm)].map((match) => match[1].trim());
  if (conceptNames.join('\n') !== expectedConceptNames.join('\n'))
    throw new Error('Canonical doctrine concept inventory is not recognized');

  const meanings: Record<string, string> = {};
  for (const name of expectedConceptNames) {
    const heading = name === 'Authority Decisions' ? 'Repository Authority Decisions' : name;
    const body = sectionBody(markdown, heading);
    const firstParagraph = body
      .split(/\n\s*\n/)[0]
      .replace(/\s+/g, ' ')
      .trim();
    if (!firstParagraph) throw new Error(`Missing doctrine definition: ${name}`);
    meanings[name] = firstParagraph;
  }

  const relationshipBody = sectionBody(markdown, relationshipSection);
  const relationshipBlock = relationshipBody.match(/```text\n([\s\S]*?)```/)?.[1];
  if (!relationshipBlock)
    throw new Error('Canonical doctrine relationship chain is not recognized');
  const relationshipNames = relationshipBlock
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => expectedConceptNames.includes(line));
  if (relationshipNames.length !== 8)
    throw new Error('Canonical doctrine relationship chain is not recognized');
  const relationships = relationshipNames.slice(0, -1).map((subject, index) => ({
    subject,
    predicate: 'flows-to' as const,
    object: relationshipNames[index + 1],
    sourceAttributions: [{ source: canonicalDoctrinePath, section: relationshipSection }],
  }));

  return {
    source: canonicalDoctrinePath,
    sourceHash: createHash('sha256').update(markdown).digest('hex'),
    conceptNames,
    meanings,
    conceptAttribution: { source: canonicalDoctrinePath, section: conceptSection },
    relationships,
  };
}

function readCanonicalDoctrine(): string {
  const workspacePath = resolve(process.cwd(), canonicalDoctrinePath);
  const packagePath = resolve(process.cwd(), '..', canonicalDoctrinePath);
  const sourcePath = existsSync(workspacePath) ? workspacePath : packagePath;
  return readFileSync(sourcePath, 'utf8');
}

function readReviewedHash(): string {
  const manifest = JSON.parse(readFileSync(reviewManifestPath, 'utf8')) as {
    source?: string;
    sha256?: string;
    reviewStatus?: string;
  };
  if (
    manifest.source !== canonicalDoctrinePath ||
    manifest.reviewStatus !== 'human-reviewed' ||
    !manifest.sha256
  ) {
    throw new Error('Canonical doctrine review manifest is invalid');
  }
  return manifest.sha256;
}

export const canonicalDoctrineAuthority =
  extractCanonicalDoctrineAuthority(readCanonicalDoctrine());

if (canonicalDoctrineAuthority.sourceHash !== readReviewedHash()) {
  throw new Error('Canonical doctrine changed and requires human review');
}
