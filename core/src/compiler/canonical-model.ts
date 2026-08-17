import { canonicalDoctrineAuthority } from './canonical-doctrine-authority.js';

export const canonicalConceptNames = [
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

export type CanonicalConceptName = (typeof canonicalConceptNames)[number];

export interface CanonicalConcept {
  name: CanonicalConceptName;
  meaning: string;
  sourceAttributions: readonly SourceAttribution[];
  relationships: readonly CanonicalRelationship[];
}

export interface CanonicalRelationship {
  subject: CanonicalConceptName;
  predicate: 'flows-to';
  object: CanonicalConceptName;
  sourceAttributions: readonly SourceAttribution[];
}

export interface SourceAttribution {
  source: string;
  section?: string;
}

export type CanonicalModel = readonly CanonicalConcept[];

export type CanonicalModelValidationResult = { ok: true } | { ok: false; reason: string };

export function validateCanonicalModel(model: CanonicalModel): CanonicalModelValidationResult {
  if (
    canonicalConceptNames.length !== canonicalDoctrineAuthority.conceptNames.length ||
    canonicalConceptNames.some(
      (name, index) => name !== canonicalDoctrineAuthority.conceptNames[index],
    )
  ) {
    return { ok: false, reason: 'Canonical implementation inventory does not match doctrine' };
  }
  if (
    canonicalConceptNames.some(
      (name) => canonicalMeanings[name] !== canonicalDoctrineAuthority.meanings[name],
    )
  ) {
    return { ok: false, reason: 'Canonical implementation meanings do not match doctrine' };
  }
  if (
    canonicalRelationships.length !== canonicalDoctrineAuthority.relationships.length ||
    canonicalRelationships.some(
      (relationship, index) =>
        relationship.subject !== canonicalDoctrineAuthority.relationships[index].subject ||
        relationship.predicate !== canonicalDoctrineAuthority.relationships[index].predicate ||
        relationship.object !== canonicalDoctrineAuthority.relationships[index].object,
    )
  ) {
    return { ok: false, reason: 'Canonical implementation relationships do not match doctrine' };
  }
  if (model.length !== canonicalDoctrineAuthority.conceptNames.length)
    return { ok: false, reason: 'Canonical concept inventory is incomplete or expanded' };

  const names = new Set<string>();
  for (const concept of model) {
    if (
      !canonicalConceptNames.includes(concept.name) ||
      names.has(concept.name) ||
      concept.sourceAttributions.length === 0 ||
      !Array.isArray(concept.relationships)
    ) {
      return {
        ok: false,
        reason: 'Canonical concepts require unique names and source attribution',
      };
    }
    if (concept.meaning !== canonicalDoctrineAuthority.meanings[concept.name])
      return { ok: false, reason: 'Canonical concept meaning does not match doctrine' };
    if (
      concept.sourceAttributions.length !== 1 ||
      concept.sourceAttributions[0].source !==
        canonicalDoctrineAuthority.conceptAttribution.source ||
      concept.sourceAttributions[0].section !==
        canonicalDoctrineAuthority.conceptAttribution.section
    ) {
      return { ok: false, reason: 'Canonical source attribution does not match doctrine' };
    }
    const expectedRelationships = canonicalDoctrineAuthority.relationships.filter(
      (relationship) => relationship.subject === concept.name,
    );
    if (concept.relationships.length !== expectedRelationships.length)
      return { ok: false, reason: 'Canonical relationship inventory does not match doctrine' };
    for (const relationship of concept.relationships) {
      if (
        relationship.subject !== concept.name ||
        !canonicalConceptNames.includes(relationship.object) ||
        relationship.predicate !== 'flows-to' ||
        relationship.sourceAttributions.length === 0 ||
        relationship.sourceAttributions.some(
          (attribution: SourceAttribution) =>
            attribution.source.length === 0 || attribution.section?.length === 0,
        )
      )
        return {
          ok: false,
          reason: 'Canonical relationships must be attributable and target known concepts',
        };
      const expectedRelationship = expectedRelationships.find(
        (candidate) =>
          candidate.object === relationship.object &&
          candidate.predicate === relationship.predicate,
      );
      if (
        !expectedRelationship ||
        relationship.sourceAttributions.length !== expectedRelationship.sourceAttributions.length ||
        relationship.sourceAttributions.some(
          (attribution: SourceAttribution, index: number) =>
            attribution.source !== expectedRelationship.sourceAttributions[index].source ||
            attribution.section !== expectedRelationship.sourceAttributions[index].section,
        )
      )
        return { ok: false, reason: 'Canonical relationship attribution does not match doctrine' };
    }
    names.add(concept.name);
  }
  for (const relationship of canonicalDoctrineAuthority.relationships) {
    const subject = model.find((concept) => concept.name === relationship.subject);
    if (
      !subject?.relationships.some(
        (candidate) =>
          candidate.object === relationship.object &&
          candidate.predicate === relationship.predicate,
      )
    )
      return { ok: false, reason: 'Required canonical relationship is missing' };
  }
  return { ok: true };
}

export const canonicalMeanings: Readonly<Record<CanonicalConceptName, string>> = {
  'Repository Information':
    'Repository Information consists of information available to the repository that may contribute to repository understanding.',
  'Repository Knowledge':
    'Repository Knowledge consists of durable knowledge representing Repository Truth accepted by Repository Authority.',
  'Repository Intelligence':
    'Repository Intelligence is derived reasoning over Repository Information and Repository Knowledge.',
  'Repository Wisdom':
    'Repository Wisdom represents informed judgment derived from Repository Intelligence and applicable Repository Knowledge.',
  'Repository Authority':
    'Repository Authority is the authority mechanism capable of establishing Repository Truth for a Governed Repository within its applicable scope.',
  Acceptance:
    'Acceptance is the authoritative mechanism through which Repository Authority establishes or changes Repository Truth.',
  'Repository Truth':
    'Repository Truth represents repository meaning that has been established through Repository Authority acceptance.',
  'Repository Understanding':
    "Repository Understanding represents the repository's current accepted understanding of itself.",
  'Knowledge Manifestations':
    'Knowledge Manifestations are durable expressions of Repository Knowledge.',
  Realizations:
    'Realizations are operational or representational expressions of Repository Knowledge or Repository Understanding.',
  Evidence:
    'Evidence is Repository Information that is relevant to evaluating a proposition, interpretation, decision, or repository state.',
  Provenance: 'Every governed epistemic transformation SHALL preserve provenance.',
  'Candidate Statements':
    'A Candidate Statement is a proposed representation of repository meaning that has not yet become accepted Repository Knowledge.',
  'Authority Decisions':
    'Repository Authority Decisions are durable Knowledge Manifestations that preserve the authoritative outcome of Repository Authority judgment.',
};

export const canonicalRelationships: readonly CanonicalRelationship[] = [
  ['Repository Information', 'Repository Intelligence'],
  ['Repository Intelligence', 'Repository Wisdom'],
  ['Repository Wisdom', 'Repository Authority'],
  ['Repository Authority', 'Acceptance'],
  ['Acceptance', 'Repository Truth'],
  ['Repository Truth', 'Repository Knowledge'],
  ['Repository Knowledge', 'Repository Understanding'],
].map(([subject, object]) => ({
  subject: subject as CanonicalConceptName,
  predicate: 'flows-to' as const,
  object: object as CanonicalConceptName,
  sourceAttributions: [
    {
      source: 'doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md',
      section: 'Canonical Epistemic Relationship',
    },
  ],
}));

export const canonicalModel: CanonicalModel = canonicalConceptNames.map((name) => ({
  name,
  meaning: canonicalMeanings[name],
  sourceAttributions: [
    {
      source: 'doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md',
      section: 'Canonical Epistemic Concepts',
    },
  ],
  relationships: canonicalRelationships.filter((relationship) => relationship.subject === name),
}));
