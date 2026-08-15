import { parseSemanticVersion } from "./semantic-version.js";
import type { AuthorityDecision, ProvenanceRef, SemanticIdentity, SemanticRef, SemanticScope, SemanticVersion } from "./semantic-ir.js";

export type CompatibilityResult = "compatible" | "incompatible" | "indeterminate";
export type PredicateKind = "obligations-preserved" | "relationships-preserved" | "invariants-preserved" | "authority-boundaries-preserved" | "provenance-requirements-preserved" | "failure-semantics-preserved" | "lifecycle-semantics-preserved" | "scope-compatible";
export interface CompatibilityRequirement { requirementIdentity: string; subjectKind: string; priorSubjectIdentity: SemanticIdentity; priorSubjectVersion: string; candidateSubjectIdentity: SemanticIdentity; candidateSubjectVersion: string; governedScope: SemanticIdentity; direction: "prior-to-candidate"; predicateKind: PredicateKind; predicateInputs: unknown; requiredInterpretation: unknown; authorityReference: SemanticIdentity; provenance: unknown; }
export interface RequirementEvaluation { requirement: CompatibilityRequirement; requirementSet: SemanticRef; applicable: boolean; result: "satisfied" | "violated" | "unresolved"; provenance: ProvenanceRef[]; }
export interface CompatibilityEvaluation { result: CompatibilityResult; evaluations: readonly RequirementEvaluation[]; }
export interface EvidenceRef { identity: SemanticIdentity; provenance: ProvenanceRef[]; }
export interface ContractSubject { identity: SemanticIdentity; version: SemanticVersion; scope: SemanticScope; provenance: ProvenanceRef[]; }
export interface ApplicabilityDecision { identity: SemanticIdentity; authorityIdentity: AuthorityDecision["authorityIdentity"]; subject: SemanticRef; scope: SemanticScope; subjectContractIdentity: SemanticIdentity; subjectContractVersion: string; operation: "apply"; effectiveBoundary: EvidenceRef; provenance: ProvenanceRef[]; }
export interface ApplicableSubjectEvidence { subject: ContractSubject; applicability: { applicable: true; scope: SemanticScope; authorityDecision: SemanticRef; provenance: ProvenanceRef[]; }; ratification: { ratified: true; requiresHumanAuthority: true; authorityDecision: SemanticRef; provenance: ProvenanceRef[]; }; ratificationDecision: AuthorityDecision; applicabilityDecision: ApplicabilityDecision; }
export interface CandidateSubjectEvidence { subject: ContractSubject; lifecycleState: "candidate"; provenance: ProvenanceRef[]; }
export interface AuthoritativeRequirementSet { identity: SemanticIdentity; governedScope: SemanticScope; requirements: CompatibilityRequirement[]; authorityDecision: AuthorityDecision; provenance: ProvenanceRef[]; }
export interface SemanticDeltaContext {
  prior: ApplicableSubjectEvidence;
  candidate: CandidateSubjectEvidence;
  requirementSet: AuthoritativeRequirementSet;
  changedMeaning: EvidenceRef;
  changedObligations: EvidenceRef;
  changedStatesAndTransitions: EvidenceRef;
  changedInvariants: EvidenceRef;
  changedAuthorityRequirements: EvidenceRef;
  changedProvenanceRequirements: EvidenceRef;
  changedCompatibilityRequirements: EvidenceRef;
  changedFailureSemantics: EvidenceRef;
  compatibilityImplications: EvidenceRef;
  affectedRealizationObligations: EvidenceRef;
  sourceProvenance: ProvenanceRef[];
  authorityAttribution: AuthorityDecision;
}

export function evaluateCompatibility(evaluations: readonly RequirementEvaluation[] | null | undefined, context: SemanticDeltaContext | null | undefined): CompatibilityEvaluation {
  if (!isDeltaContextValid(context) || !evaluations || evaluations.length === 0) return { result: "indeterminate", evaluations: evaluations ?? [] };
  let applicableCount = 0;
  for (const evaluation of evaluations) {
    if (!isEvaluationValid(evaluation) || !sameRef(evaluation.requirementSet, context.requirementSet.identity) || !matchesDelta(evaluation.requirement, context)) return { result: "indeterminate", evaluations };
    if (!evaluation.applicable) continue;
    applicableCount += 1;
    if (evaluation.result === "violated") return { result: "incompatible", evaluations };
    if (evaluation.result === "unresolved") return { result: "indeterminate", evaluations };
  }
  return { result: applicableCount === 0 ? "indeterminate" : "compatible", evaluations };
}

function isEvaluationValid(value: RequirementEvaluation): boolean { const requirement = value?.requirement; return Boolean(requirement && typeof requirement.requirementIdentity === "string" && requirement.requirementIdentity.length > 0 && typeof requirement.subjectKind === "string" && requirement.subjectKind.length > 0 && isIdentity(requirement.priorSubjectIdentity) && parseSemanticVersion(requirement.priorSubjectVersion) && isIdentity(requirement.candidateSubjectIdentity) && parseSemanticVersion(requirement.candidateSubjectVersion) && isIdentity(requirement.governedScope) && requirement.direction === "prior-to-candidate" && ["obligations-preserved", "relationships-preserved", "invariants-preserved", "authority-boundaries-preserved", "provenance-requirements-preserved", "failure-semantics-preserved", "lifecycle-semantics-preserved", "scope-compatible"].includes(requirement.predicateKind) && isIdentity(requirement.authorityReference) && requirement.provenance !== undefined && requirement.predicateInputs !== undefined && requirement.requiredInterpretation !== undefined && isRef(value.requirementSet) && isProvenance(value.provenance) && ["satisfied", "violated", "unresolved"].includes(value.result)); }
function isDeltaContextValid(value: SemanticDeltaContext | null | undefined): value is SemanticDeltaContext {
  if (!value || !isApplicableSubject(value.prior) || !isCandidateSubject(value.candidate) || !isRequirementSet(value.requirementSet) || !isProvenance(value.sourceProvenance) || !isAuthorityDecision(value.authorityAttribution)) return false;
  if (!sameScope(value.prior.subject.scope, value.candidate.subject.scope) || !sameScope(value.prior.subject.scope, value.requirementSet.governedScope) || !sameScope(value.prior.subject.scope, value.authorityAttribution.scope)) return false;
  if (!sameIdentity(value.authorityAttribution.identity, value.requirementSet.authorityDecision.identity)) return false;
  return [value.changedMeaning, value.changedObligations, value.changedStatesAndTransitions, value.changedInvariants, value.changedAuthorityRequirements, value.changedProvenanceRequirements, value.changedCompatibilityRequirements, value.changedFailureSemantics, value.compatibilityImplications, value.affectedRealizationObligations].every(isEvidenceRef);
}
function matchesDelta(requirement: CompatibilityRequirement, context: SemanticDeltaContext): boolean { return sameIdentity(requirement.priorSubjectIdentity, context.prior.subject.identity) && requirement.priorSubjectVersion === context.prior.subject.version.value && sameIdentity(requirement.candidateSubjectIdentity, context.candidate.subject.identity) && requirement.candidateSubjectVersion === context.candidate.subject.version.value && sameIdentity(requirement.governedScope, context.prior.subject.scope.identity) && sameIdentity(requirement.authorityReference, context.requirementSet.authorityDecision.identity) && context.requirementSet.requirements.some((item) => item.requirementIdentity === requirement.requirementIdentity); }
function isApplicableSubject(value: ApplicableSubjectEvidence): boolean { return Boolean(isContractSubject(value?.subject) && value.applicability?.applicable === true && sameScope(value.subject.scope, value.applicability.scope) && isProvenance(value.applicability.provenance) && value.ratification?.ratified === true && value.ratification.requiresHumanAuthority === true && isProvenance(value.ratification.provenance) && isAuthorityDecision(value.ratificationDecision) && value.ratificationDecision.decision === "ratify" && sameRef(value.ratification.authorityDecision, value.ratificationDecision.identity) && sameRef(value.ratificationDecision.subject, value.subject.identity) && sameScope(value.ratificationDecision.scope, value.subject.scope) && sameIdentity(value.ratificationDecision.subjectContractIdentity, value.subject.identity) && value.ratificationDecision.subjectContractVersion === value.subject.version.value && isApplicabilityDecision(value.applicabilityDecision) && sameRef(value.applicability.authorityDecision, value.applicabilityDecision.identity) && sameRef(value.applicabilityDecision.subject, value.subject.identity) && sameScope(value.applicabilityDecision.scope, value.subject.scope) && sameIdentity(value.applicabilityDecision.subjectContractIdentity, value.subject.identity) && value.applicabilityDecision.subjectContractVersion === value.subject.version.value); }
function isCandidateSubject(value: CandidateSubjectEvidence): boolean { return Boolean(isContractSubject(value?.subject) && value.lifecycleState === "candidate" && isProvenance(value.provenance)); }
function isRequirementSet(value: AuthoritativeRequirementSet): boolean { return isIdentity(value?.identity) && isScope(value.governedScope) && Array.isArray(value.requirements) && value.requirements.every((requirement) => typeof requirement.requirementIdentity === "string" && requirement.requirementIdentity.length > 0) && isAuthorityDecision(value.authorityDecision) && sameRef(value.authorityDecision.subject, value.identity) && sameScope(value.authorityDecision.scope, value.governedScope) && isProvenance(value.provenance); }
function isContractSubject(value: ContractSubject): boolean { return isIdentity(value?.identity) && isSemanticVersion(value.version) && sameRef(value.version.semanticIdentity, value.identity) && isScope(value.scope) && sameScope(value.version.scope, value.scope) && isProvenance(value.provenance); }
function isEvidenceRef(value: EvidenceRef): boolean { return isIdentity(value?.identity) && isProvenance(value.provenance); }
function isAuthorityDecision(value: AuthorityDecision): boolean { return isIdentity(value?.identity) && isIdentity(value.authorityIdentity?.identity) && isRef(value.authorityIdentity?.principal) && isProvenance(value.authorityIdentity?.provenance) && isRef(value.subject) && isScope(value.scope) && isIdentity(value.subjectContractIdentity) && parseSemanticVersion(value.subjectContractVersion) !== undefined && ["accept", "reject", "ratify", "apply", "supersede", "retire", "delegate"].includes(value.decision) && isProvenance(value.provenance); }
function isApplicabilityDecision(value: ApplicabilityDecision | undefined): value is ApplicabilityDecision { return Boolean(value && isIdentity(value.identity) && isIdentity(value.authorityIdentity?.identity) && isRef(value.authorityIdentity?.principal) && isProvenance(value.authorityIdentity?.provenance) && isRef(value.subject) && isScope(value.scope) && isIdentity(value.subjectContractIdentity) && parseSemanticVersion(value.subjectContractVersion) !== undefined && value.operation === "apply" && isEvidenceRef(value.effectiveBoundary) && isProvenance(value.provenance)); }
function isSemanticVersion(value: SemanticVersion): boolean { return Boolean(value && typeof value.value === "string" && parseSemanticVersion(value.value) && isRef(value.semanticIdentity) && isScope(value.scope)); }
function isProvenance(value: ProvenanceRef[] | undefined): value is ProvenanceRef[] { return Array.isArray(value) && value.length > 0 && value.every((item) => isIdentity(item?.sourceIdentity)); }
function isIdentity(value: SemanticIdentity | undefined): value is SemanticIdentity { return Boolean(value && nonEmpty(value.identityKind) && nonEmpty(value.value)); }
function isRef(value: SemanticRef | undefined): value is SemanticRef { return Boolean(value && isIdentity(value.identity)); }
function isScope(value: SemanticScope | undefined): value is SemanticScope { return Boolean(value && isIdentity(value.identity) && typeof value.meaning?.statement === "string" && value.meaning.statement.length > 0 && Array.isArray(value.meaning.terms) && value.meaning.terms.every(isRef)); }
function sameRef(reference: SemanticRef, identity: SemanticIdentity): boolean { return sameIdentity(reference.identity, identity); }
function sameScope(left: SemanticScope, right: SemanticScope): boolean { return sameIdentity(left.identity, right.identity); }
function sameIdentity(left: SemanticIdentity, right: SemanticIdentity): boolean { return left.identityKind === right.identityKind && left.value === right.value; }
function nonEmpty(value: unknown): value is string { return typeof value === "string" && value.length > 0; }