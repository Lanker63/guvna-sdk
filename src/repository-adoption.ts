export interface RepositoryAdoptionWireIdentity {
  identityKind: string;
  value: string;
}

export interface RepositoryAdoptionWireReference {
  identity: RepositoryAdoptionWireIdentity;
}

export interface RepositoryAdoptionWireMeaning {
  statement: string;
  terms: RepositoryAdoptionWireReference[];
}

export interface RepositoryAdoptionWireProvenance {
  sourceIdentity: RepositoryAdoptionWireIdentity;
  sourcePath?: string;
  sourceSection?: string;
}

export interface RepositoryAdoptionWireVersion {
  value: string;
  semanticIdentity: RepositoryAdoptionWireReference;
  scope: RepositoryAdoptionWireScope;
}

export interface RepositoryAdoptionWireScope {
  identity: RepositoryAdoptionWireIdentity;
  meaning: RepositoryAdoptionWireMeaning;
}

export interface RepositoryAdoptionWireEvidence {
  kind: 'evidence';
  identity: RepositoryAdoptionWireIdentity;
  meaning: RepositoryAdoptionWireMeaning;
  uncertainty?: RepositoryAdoptionWireMeaning;
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireProvisionalUnderstanding {
  kind: 'provisional-understanding';
  identity: RepositoryAdoptionWireIdentity;
  meaning: RepositoryAdoptionWireMeaning;
  supportingEvidence: RepositoryAdoptionWireReference[];
  uncertainty?: RepositoryAdoptionWireMeaning;
  provenance: RepositoryAdoptionWireProvenance[];
}

export type RepositoryAdoptionWireLifecycleStatus =
  | 'candidate'
  | 'accepted'
  | 'rejected'
  | 'superseded';

export interface RepositoryAdoptionWireCandidateStatement {
  kind: 'candidate-statement';
  identity: RepositoryAdoptionWireIdentity;
  meaning: RepositoryAdoptionWireMeaning;
  supportingEvidence: RepositoryAdoptionWireReference[];
  uncertainty?: RepositoryAdoptionWireMeaning;
  lifecycleStatus: RepositoryAdoptionWireLifecycleStatus;
  authorityContext?: RepositoryAdoptionWireReference;
  authorityDecision?: RepositoryAdoptionWireReference;
  provenance: RepositoryAdoptionWireProvenance[];
}

export type RepositoryAdoptionWireDecision = 'accept' | 'reject' | 'revise' | 'defer';

export interface RepositoryAdoptionWireAuthorityDecision {
  kind: 'authority-decision';
  identity: RepositoryAdoptionWireIdentity;
  authorityContext: RepositoryAdoptionWireReference;
  candidateStatement: RepositoryAdoptionWireReference;
  decision: RepositoryAdoptionWireDecision;
  applicableSemanticVersion: RepositoryAdoptionWireVersion;
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireAcceptanceProvenance {
  kind: 'acceptance-provenance';
  identity: RepositoryAdoptionWireIdentity;
  sourceEvidence: RepositoryAdoptionWireReference[];
  candidateStatement: RepositoryAdoptionWireReference;
  authorityContext: RepositoryAdoptionWireReference;
  authorityDecision: RepositoryAdoptionWireReference;
  acceptance: RepositoryAdoptionWireReference;
  acceptedIdentity: RepositoryAdoptionWireIdentity;
  applicableSemanticVersion: RepositoryAdoptionWireVersion;
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireAcceptance {
  kind: 'acceptance';
  identity: RepositoryAdoptionWireIdentity;
  candidateStatement: RepositoryAdoptionWireReference;
  authorityDecision: RepositoryAdoptionWireReference;
  acceptedIdentity: RepositoryAdoptionWireIdentity;
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireReplayRecord {
  replayIdentity: string;
  subjectIdentity: RepositoryAdoptionWireIdentity;
  resultBytes: string;
  sourceAcceptanceRecordHash: string;
}

export type RepositoryAdoptionWireReplayResult =
  | { ok: true; replayIdentity: string; state: 'new' | 'replayed'; resultBytes: string }
  | { ok: false; replayIdentity: string; failure: 'conflicting-replay' | 'stale-transition' | 'invalid-input'; reason: string };

export interface RepositoryAdoptionWireContradiction {
  kind: 'contradiction';
  identity: RepositoryAdoptionWireIdentity;
  evidence: RepositoryAdoptionWireReference[];
  provenance: RepositoryAdoptionWireProvenance[];
}

export type RepositoryAdoptionWireProjectionKind = 'provisional' | 'accepted';

export interface RepositoryAdoptionWireProjection {
  kind: 'repository-adoption-projection';
  identity: RepositoryAdoptionWireIdentity;
  projectionKind: RepositoryAdoptionWireProjectionKind;
  sourceCandidate: RepositoryAdoptionWireReference;
  sourceEvidence: RepositoryAdoptionWireReference[];
  sourceContract: RepositoryAdoptionWireVersion;
  sourceAcceptance?: RepositoryAdoptionWireReference;
  sourceAcceptedKnowledge?: RepositoryAdoptionWireIdentity;
  acceptanceRecordHash?: string;
  acceptanceProvenance?: RepositoryAdoptionWireReference;
  projectionStatus: 'non-authoritative' | 'authoritative-derived';
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireCompatibilityRequirement {
  identity: RepositoryAdoptionWireIdentity;
  predicateKind: string;
  authorityReference: RepositoryAdoptionWireIdentity;
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireCompatibilityRequirementSet {
  kind: 'compatibility-requirement-set';
  identity: RepositoryAdoptionWireIdentity;
  priorContract: RepositoryAdoptionWireReference;
  candidateContract: RepositoryAdoptionWireReference;
  governedScope: RepositoryAdoptionWireScope;
  requirements: RepositoryAdoptionWireCompatibilityRequirement[];
  provenance: RepositoryAdoptionWireProvenance[];
}

export interface RepositoryAdoptionWireCompatibilityEvidence {
  kind: 'compatibility-evidence';
  requirementSet: RepositoryAdoptionWireReference;
  evaluations: { requirementIdentity: string; requirementSet: RepositoryAdoptionWireReference; applicable: boolean; result: 'satisfied' | 'violated' | 'unresolved'; provenance: RepositoryAdoptionWireProvenance[] }[];
  classification: 'compatible' | 'projection-compatible' | 'adaptable' | 'migration-required' | 'incompatible' | 'indeterminate';
  provenance: RepositoryAdoptionWireProvenance[];
}

export type RepositoryAdoptionWireTransitionDiagnosticCode =
  | 'invalid-input'
  | 'invalid-transition'
  | 'missing-authority'
  | 'missing-provenance';

export interface RepositoryAdoptionWireTransitionDiagnostic {
  code: RepositoryAdoptionWireTransitionDiagnosticCode;
  message: string;
}

export type RepositoryAdoptionWireAcceptanceTransitionResult =
  | {
      ok: true;
      acceptance: RepositoryAdoptionWireAcceptance;
      acceptanceProvenance: RepositoryAdoptionWireAcceptanceProvenance;
      chain: RepositoryAdoptionWireChain;
    }
  | { ok: false; diagnostics: RepositoryAdoptionWireTransitionDiagnostic[] };

export interface RepositoryAdoptionWireChain {
  evidence: RepositoryAdoptionWireEvidence[];
  provisionalUnderstanding: RepositoryAdoptionWireProvisionalUnderstanding;
  candidateStatement: RepositoryAdoptionWireCandidateStatement;
  authorityDecision: RepositoryAdoptionWireAuthorityDecision;
  acceptanceProvenance: RepositoryAdoptionWireAcceptanceProvenance;
  acceptedIdentity: RepositoryAdoptionWireIdentity;
}

export type RepositoryAdoptionWireRecord =
  | RepositoryAdoptionWireEvidence
  | RepositoryAdoptionWireProvisionalUnderstanding
  | RepositoryAdoptionWireCandidateStatement
  | RepositoryAdoptionWireAuthorityDecision
  | RepositoryAdoptionWireAcceptance
  | RepositoryAdoptionWireContradiction
  | RepositoryAdoptionWireProjection
  | RepositoryAdoptionWireCompatibilityRequirementSet
  | RepositoryAdoptionWireCompatibilityEvidence
  | RepositoryAdoptionWireAcceptanceProvenance
  | RepositoryAdoptionWireChain;

export type RepositoryAdoptionWireFailureKind =
  | 'missing-input'
  | 'ambiguous-input'
  | 'invalid-input'
  | 'incompatible-input'
  | 'unauthorized-input';

export interface RepositoryAdoptionWireFailure {
  kind: RepositoryAdoptionWireFailureKind;
  reason: string;
}

export type RepositoryAdoptionWireResult =
  | { ok: true; record: RepositoryAdoptionWireRecord }
  | { ok: false; failure: RepositoryAdoptionWireFailure };

export function encodeRepositoryAdoptionRecord(
  record: RepositoryAdoptionWireRecord,
): { ok: true; value: string } | { ok: false; reason: string } {
  return isRepositoryAdoptionWireRecord(record)
    ? { ok: true, value: JSON.stringify(record) }
    : { ok: false, reason: 'SDK Repository Adoption record is invalid' };
}

export function decodeRepositoryAdoptionRecord(
  payload: string,
): { ok: true; value: RepositoryAdoptionWireRecord } | { ok: false; reason: string } {
  const parsed = parseJson(payload);
  if (!parsed.ok || !isRepositoryAdoptionWireRecord(parsed.value)) {
    return { ok: false, reason: 'SDK Repository Adoption record is invalid' };
  }
  return { ok: true, value: parsed.value };
}

export function encodeRepositoryAdoptionResult(
  result: RepositoryAdoptionWireResult,
): { ok: true; value: string } | { ok: false; reason: string } {
  return isRepositoryAdoptionWireResult(result)
    ? { ok: true, value: JSON.stringify(result) }
    : { ok: false, reason: 'SDK Repository Adoption result is invalid' };
}

export function decodeRepositoryAdoptionResult(
  payload: string,
): { ok: true; value: RepositoryAdoptionWireResult } | { ok: false; reason: string } {
  const parsed = parseJson(payload);
  if (!parsed.ok || !isRepositoryAdoptionWireResult(parsed.value)) {
    return { ok: false, reason: 'SDK Repository Adoption result is invalid' };
  }
  return { ok: true, value: parsed.value };
}

export function encodeRepositoryAdoptionAcceptanceTransitionResult(
  result: RepositoryAdoptionWireAcceptanceTransitionResult,
): { ok: true; value: string } | { ok: false; reason: string } {
  return isRepositoryAdoptionWireAcceptanceTransitionResult(result)
    ? { ok: true, value: JSON.stringify(result) }
    : { ok: false, reason: 'SDK Repository Adoption acceptance transition result is invalid' };
}

export function decodeRepositoryAdoptionAcceptanceTransitionResult(
  payload: string,
): { ok: true; value: RepositoryAdoptionWireAcceptanceTransitionResult } | { ok: false; reason: string } {
  const parsed = parseJson(payload);
  if (!parsed.ok || !isRepositoryAdoptionWireAcceptanceTransitionResult(parsed.value)) {
    return { ok: false, reason: 'SDK Repository Adoption acceptance transition result is invalid' };
  }
  return { ok: true, value: parsed.value };
}

export function encodeRepositoryAdoptionReplayResult(
  result: RepositoryAdoptionWireReplayResult,
): { ok: true; value: string } | { ok: false; reason: string } {
  return isReplayResult(result)
    ? { ok: true, value: JSON.stringify(result) }
    : { ok: false, reason: 'SDK Repository Adoption replay result is invalid' };
}

export function decodeRepositoryAdoptionReplayResult(
  payload: string,
): { ok: true; value: RepositoryAdoptionWireReplayResult } | { ok: false; reason: string } {
  const parsed = parseJson(payload);
  if (!parsed.ok || !isReplayResult(parsed.value)) return { ok: false, reason: 'SDK Repository Adoption replay result is invalid' };
  return { ok: true, value: parsed.value };
}

function isRepositoryAdoptionWireRecord(value: unknown): value is RepositoryAdoptionWireRecord {
  if (!isRecord(value)) return false;
  if ('evidence' in value) return isChain(value);
  if (!isIdentity(value.identity) || !Array.isArray(value.provenance)) return false;
  return (
    (value.kind === 'evidence' && isMeaning(value.meaning)) ||
    (value.kind === 'provisional-understanding' &&
      isMeaning(value.meaning) &&
      isReferences(value.supportingEvidence)) ||
    (value.kind === 'candidate-statement' &&
      isMeaning(value.meaning) &&
      isReferences(value.supportingEvidence) &&
      typeof value.lifecycleStatus === 'string' &&
      ['candidate', 'accepted', 'rejected', 'superseded'].includes(value.lifecycleStatus)) ||
    (value.kind === 'authority-decision' &&
      isReference(value.authorityContext) &&
      isReference(value.candidateStatement) &&
      typeof value.decision === 'string' &&
      ['accept', 'reject', 'revise', 'defer'].includes(value.decision) &&
      isVersion(value.applicableSemanticVersion)) ||
    (value.kind === 'acceptance' &&
      isReference(value.candidateStatement) &&
      isReference(value.authorityDecision) &&
      isIdentity(value.acceptedIdentity)) ||
    (value.kind === 'contradiction' && isReferences(value.evidence)) ||
    (value.kind === 'repository-adoption-projection' &&
      isReference(value.sourceCandidate) &&
      isReferences(value.sourceEvidence) &&
      isVersion(value.sourceContract) &&
      ['provisional', 'accepted'].includes(String(value.projectionKind)) &&
      ['non-authoritative', 'authoritative-derived'].includes(String(value.projectionStatus))) ||
    (value.kind === 'compatibility-requirement-set' &&
      isReference(value.priorContract) &&
      isReference(value.candidateContract) &&
      isScope(value.governedScope) &&
      Array.isArray(value.requirements) &&
      value.requirements.every(isCompatibilityRequirement)) ||
    (value.kind === 'compatibility-evidence' &&
      isReference(value.requirementSet) &&
      Array.isArray(value.evaluations) &&
      value.evaluations.every(isCompatibilityEvaluation) &&
      ['compatible', 'projection-compatible', 'adaptable', 'migration-required', 'incompatible', 'indeterminate'].includes(String(value.classification))) ||
    (value.kind === 'acceptance-provenance' &&
      isReferences(value.sourceEvidence) &&
      isReference(value.candidateStatement) &&
      isReference(value.authorityContext) &&
      isReference(value.authorityDecision) &&
      isReference(value.acceptance) &&
      isIdentity(value.acceptedIdentity) &&
      isVersion(value.applicableSemanticVersion))
  );
}

function isChain(value: unknown): value is RepositoryAdoptionWireChain {
  return (
    isRecord(value) &&
    Array.isArray(value.evidence) &&
    value.evidence.every(isEvidence) &&
    isRecord(value.provisionalUnderstanding) &&
    isRecord(value.candidateStatement) &&
    isRecord(value.authorityDecision) &&
    isRecord(value.acceptanceProvenance) &&
    isIdentity(value.acceptedIdentity)
  );
}

function isEvidence(value: unknown): value is RepositoryAdoptionWireEvidence {
  return isRecord(value) && value.kind === 'evidence' && isRepositoryAdoptionWireRecord(value);
}

function isMeaning(value: unknown): value is RepositoryAdoptionWireMeaning {
  return isRecord(value) && typeof value.statement === 'string' && isReferences(value.terms);
}

function isVersion(value: unknown): value is RepositoryAdoptionWireVersion {
  return (
    isRecord(value) &&
    typeof value.value === 'string' &&
    isReference(value.semanticIdentity) &&
    isScope(value.scope)
  );
}

function isScope(value: unknown): value is RepositoryAdoptionWireScope {
  return isRecord(value) && isIdentity(value.identity) && isMeaning(value.meaning);
}

function isReference(value: unknown): value is RepositoryAdoptionWireReference {
  return isRecord(value) && isIdentity(value.identity);
}

function isReferences(value: unknown): value is RepositoryAdoptionWireReference[] {
  return Array.isArray(value) && value.every(isReference);
}

function isIdentity(value: unknown): value is RepositoryAdoptionWireIdentity {
  return (
    isRecord(value) &&
    typeof value.identityKind === 'string' &&
    value.identityKind.length > 0 &&
    typeof value.value === 'string' &&
    value.value.length > 0
  );
}

function isRepositoryAdoptionWireResult(value: unknown): value is RepositoryAdoptionWireResult {
  if (!isRecord(value) || typeof value.ok !== 'boolean') return false;
  if (value.ok) return isRepositoryAdoptionWireRecord(value.record);
  if (!isRecord(value.failure)) return false;
  return (
    typeof value.failure.reason === 'string' &&
    typeof value.failure.kind === 'string' &&
    ['missing-input', 'ambiguous-input', 'invalid-input', 'incompatible-input', 'unauthorized-input'].includes(
      value.failure.kind,
    )
  );
}

function isRepositoryAdoptionWireAcceptanceTransitionResult(
  value: unknown,
): value is RepositoryAdoptionWireAcceptanceTransitionResult {
  if (!isRecord(value) || typeof value.ok !== 'boolean') return false;
  if (value.ok) {
    return (
      isAcceptance(value.acceptance) &&
      isAcceptanceProvenance(value.acceptanceProvenance) &&
      isChain(value.chain)
    );
  }
  return (
    Array.isArray(value.diagnostics) &&
    value.diagnostics.every(isTransitionDiagnostic)
  );
}

function isAcceptance(value: unknown): value is RepositoryAdoptionWireAcceptance {
  return (
    isRecord(value) &&
    value.kind === 'acceptance' &&
    isIdentity(value.identity) &&
    isReference(value.candidateStatement) &&
    isReference(value.authorityDecision) &&
    isIdentity(value.acceptedIdentity) &&
    isProvenance(value.provenance)
  );
}

function isAcceptanceProvenance(value: unknown): value is RepositoryAdoptionWireAcceptanceProvenance {
  return (
    isRecord(value) &&
    value.kind === 'acceptance-provenance' &&
    isIdentity(value.identity) &&
    isReferences(value.sourceEvidence) &&
    isReference(value.candidateStatement) &&
    isReference(value.authorityContext) &&
    isReference(value.authorityDecision) &&
    isReference(value.acceptance) &&
    isIdentity(value.acceptedIdentity) &&
    isVersion(value.applicableSemanticVersion) &&
    isProvenance(value.provenance)
  );
}

function isProvenance(value: unknown): value is RepositoryAdoptionWireProvenance[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        isIdentity(item.sourceIdentity) &&
        (item.sourcePath === undefined || typeof item.sourcePath === 'string') &&
        (item.sourceSection === undefined || typeof item.sourceSection === 'string'),
    )
  );
}

function isTransitionDiagnostic(value: unknown): value is RepositoryAdoptionWireTransitionDiagnostic {
  return (
    isRecord(value) &&
    typeof value.code === 'string' &&
    ['invalid-input', 'invalid-transition', 'missing-authority', 'missing-provenance'].includes(value.code) &&
    typeof value.message === 'string'
  );
}

function isCompatibilityRequirement(value: unknown): value is RepositoryAdoptionWireCompatibilityRequirement {
  return isRecord(value) && isIdentity(value.identity) && typeof value.predicateKind === 'string' && isIdentity(value.authorityReference) && isProvenance(value.provenance);
}

function isCompatibilityEvaluation(value: unknown): boolean {
  return isRecord(value) && typeof value.requirementIdentity === 'string' && isReference(value.requirementSet) && typeof value.applicable === 'boolean' && ['satisfied', 'violated', 'unresolved'].includes(String(value.result)) && isProvenance(value.provenance);
}

function isReplayResult(value: unknown): value is RepositoryAdoptionWireReplayResult {
  if (!isRecord(value) || typeof value.ok !== 'boolean' || typeof value.replayIdentity !== 'string') return false;
  if (value.ok) return ['new', 'replayed'].includes(String(value.state)) && typeof value.resultBytes === 'string';
  return ['conflicting-replay', 'stale-transition', 'invalid-input'].includes(String(value.failure)) && typeof value.reason === 'string';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseJson(payload: string): { ok: true; value: unknown } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(payload) };
  } catch {
    return { ok: false };
  }
}
