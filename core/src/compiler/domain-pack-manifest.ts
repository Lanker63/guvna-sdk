import type {
  CompatibilityRequirement,
  ProvenanceRef,
  SemanticIdentity,
  SemanticVersion,
} from './semantic-ir.js';

export const domainPackContentClasses = [
  'ontology-terminology',
  'agent',
  'skill',
  'template',
  'workflow',
] as const;

export type DomainPackContentClass = (typeof domainPackContentClasses)[number];

export interface DomainPackContentEntry {
  identity: SemanticIdentity;
  contentClass: DomainPackContentClass;
  provenance: ProvenanceRef[];
  authorityClaim?: SemanticIdentity;
}

export interface DomainPackManifest {
  packIdentity: SemanticIdentity;
  packVersion: SemanticVersion;
  targetGuvnaSemanticVersion: SemanticVersion;
  contents: DomainPackContentEntry[];
  provenance: ProvenanceRef[];
  compatibility: CompatibilityRequirement[];
}

export type DomainPackManifestValidationResult =
  | { valid: true; manifest: DomainPackManifest }
  | { valid: false; status: 'invalid' | 'ambiguous' | 'unresolved'; reason: string };

export interface DomainPackManifestValidationContext {
  acceptedRepositoryTermIdentities?: SemanticIdentity[];
}

export function validateDomainPackManifest(
  value: unknown,
  context: DomainPackManifestValidationContext = {},
): DomainPackManifestValidationResult {
  if (!isRecord(value)) return invalid('Domain Pack manifest is not an object');
  if (!isIdentity(value.packIdentity)) return invalid('Domain Pack identity is invalid');
  if (!isVersion(value.packVersion)) return invalid('Domain Pack version is invalid');
  if (!isVersion(value.targetGuvnaSemanticVersion))
    return invalid('Domain Pack target Guvna semantic version is invalid');
  if (!Array.isArray(value.contents)) return invalid('Domain Pack contents are invalid');
  if (!Array.isArray(value.provenance) || !value.provenance.every(isProvenance))
    return invalid('Domain Pack provenance is invalid');
  if (!Array.isArray(value.compatibility) || !value.compatibility.every(isCompatibilityRequirement))
    return invalid('Domain Pack compatibility is invalid');

  for (const content of value.contents) {
    if (!isRecord(content) || !isIdentity(content.identity))
      return invalid('Domain Pack content identity is invalid');
    if (!('contentClass' in content)) return unresolved('Domain Pack content class is unresolved');
    if (Array.isArray(content.contentClass))
      return ambiguous('Domain Pack content class is ambiguous');
    if (!isContentClass(content.contentClass))
      return unresolved('Domain Pack content class is unresolved');
    if (!Array.isArray(content.provenance) || !content.provenance.every(isProvenance))
      return unresolved('Domain Pack content provenance is unresolved');
    if ('authorityClaim' in content && !isIdentity(content.authorityClaim))
      return invalid('Domain Pack authority claim is invalid');
    if (content.contentClass === 'agent' && content.authorityClaim)
      return invalid('Bundled Domain Pack agents cannot claim authority');
    if (
      content.contentClass === 'ontology-terminology' &&
      context.acceptedRepositoryTermIdentities?.some((accepted) =>
        sameIdentity(accepted, content.identity as SemanticIdentity),
      )
    )
      return unresolved('Domain Pack content conflicts with accepted repository terminology');
  }

  return { valid: true, manifest: value as unknown as DomainPackManifest };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIdentity(value: unknown): value is SemanticIdentity {
  return (
    isRecord(value) &&
    typeof value.identityKind === 'string' &&
    value.identityKind.length > 0 &&
    typeof value.value === 'string' &&
    value.value.length > 0
  );
}

function isVersion(value: unknown): value is SemanticVersion {
  return (
    isRecord(value) &&
    typeof value.value === 'string' &&
    value.value.length > 0 &&
    isRecord(value.semanticIdentity) &&
    isIdentity(value.semanticIdentity.identity) &&
    isRecord(value.scope) &&
    isIdentity(value.scope.identity) &&
    isRecord(value.scope.meaning) &&
    typeof value.scope.meaning.statement === 'string' &&
    Array.isArray(value.scope.meaning.terms)
  );
}

function isProvenance(value: unknown): value is ProvenanceRef {
  return isRecord(value) && isIdentity(value.sourceIdentity);
}

function isCompatibilityRequirement(value: unknown): value is CompatibilityRequirement {
  return (
    isRecord(value) &&
    isIdentity(value.identity) &&
    isRecord(value.subject) &&
    isIdentity(value.subject.identity) &&
    isRecord(value.scope) &&
    isIdentity(value.scope.identity) &&
    isRecord(value.scope.meaning) &&
    typeof value.scope.meaning.statement === 'string' &&
    Array.isArray(value.scope.meaning.terms) &&
    value.scope.meaning.terms.every((term) => isRecord(term) && isIdentity(term.identity)) &&
    isRecord(value.meaning) &&
    typeof value.meaning.statement === 'string' &&
    Array.isArray(value.meaning.terms) &&
    value.meaning.terms.every((term) => isRecord(term) && isIdentity(term.identity))
  );
}

function isContentClass(value: unknown): value is DomainPackContentClass {
  return typeof value === 'string' && domainPackContentClasses.includes(value as DomainPackContentClass);
}

function sameIdentity(left: SemanticIdentity, right: SemanticIdentity): boolean {
  return left.identityKind === right.identityKind && left.value === right.value;
}

function invalid(reason: string): DomainPackManifestValidationResult {
  return { valid: false, status: 'invalid', reason };
}

function ambiguous(reason: string): DomainPackManifestValidationResult {
  return { valid: false, status: 'ambiguous', reason };
}

function unresolved(reason: string): DomainPackManifestValidationResult {
  return { valid: false, status: 'unresolved', reason };
}