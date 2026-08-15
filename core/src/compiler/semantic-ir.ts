export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface SemanticIdentity { identityKind: string; value: string; }
export interface SemanticRef { identity: SemanticIdentity; }
export interface SemanticVersion { value: string; semanticIdentity: SemanticRef; scope: SemanticScope; }
export interface SemanticScope { identity: SemanticIdentity; meaning: MeaningContext; }
export interface MeaningContext { statement: string; terms: SemanticRef[]; }
export interface ProvenanceRef { sourceIdentity: SemanticIdentity; sourcePath?: string; sourceSection?: string; }
export interface LifecycleContext { lifecycleState: SemanticRef; transitions: SemanticRef[]; }
export interface AcceptanceContext { accepted: boolean; scope: SemanticScope; authorityDecision?: SemanticRef; provenance: ProvenanceRef[]; }
export interface ApplicabilityContext { applicable: boolean | "indeterminate"; scope: SemanticScope; conditions: ConditionRef[]; authorityDecision?: SemanticRef; provenance: ProvenanceRef[]; }
export interface RatificationContext { ratified: boolean; authorityDecision?: SemanticRef; requiresHumanAuthority: boolean; provenance: ProvenanceRef[]; }
export interface SemanticAttribute { identity: SemanticIdentity; meaning: MeaningContext; value: unknown; }
export interface SemanticEntity { identity: SemanticIdentity; kind: "concept" | "artifact" | "actor" | "scope" | "state"; meaning: MeaningContext; attributes: SemanticAttribute[]; lifecycle: LifecycleContext; acceptance: AcceptanceContext; provenance: ProvenanceRef[]; }
export interface SemanticRelationship { identity: SemanticIdentity; subject: SemanticRef; predicate: SemanticRef; object: SemanticRef; scope: SemanticScope; constraints: SemanticRef[]; provenance: ProvenanceRef[]; }
export interface SemanticConstraint { identity: SemanticIdentity; subject: SemanticRef; kind: "invariant" | "compatibility" | "authority" | "condition" | "ambiguity"; meaning: MeaningContext; enforcementScope: SemanticScope; provenance: ProvenanceRef[]; }
export interface SemanticTransition { identity: SemanticIdentity; from: SemanticRef; operation: SemanticRef; to: SemanticRef; authorityReference: SemanticRef; scope: SemanticScope; provenance: ProvenanceRef[]; }
export interface SemanticDerivation { identity: SemanticIdentity; sources: SemanticRef[]; result: SemanticRef; relation: "derives" | "projects" | "realizes" | "compiles" | "normalizes"; transformation: MeaningContext; provenance: ProvenanceRef[]; }
export interface SemanticContractReference { identity: SemanticIdentity; version: SemanticVersion; contractKind: "semantic" | "runtime" | "sdk" | "projection"; lifecycle: LifecycleContext; applicability: ApplicabilityContext; ratification: RatificationContext; provenance: ProvenanceRef[]; }
export interface RealizationReference { identity: SemanticIdentity; realizationKind: "runtime" | "sdk" | "host" | "governance-projection"; realizes: SemanticRef; conformsTo: SemanticRef[]; compatibility: CompatibilityContext; provenance: ProvenanceRef[]; }
export interface AuthorityIdentity { identity: SemanticIdentity; principal: SemanticRef; provenance: ProvenanceRef[]; }
export interface AuthorityDecision { identity: SemanticIdentity; authorityIdentity: AuthorityIdentity; subject: SemanticRef; scope: SemanticScope; subjectContractIdentity: SemanticIdentity; subjectContractVersion: string; decision: "accept" | "reject" | "ratify" | "apply" | "supersede" | "retire" | "delegate"; provenance: ProvenanceRef[]; }
export interface AcceptanceRecord { identity: SemanticIdentity; subject: SemanticRef; scope: SemanticScope; authorityDecision: SemanticRef; provenance: ProvenanceRef[]; }
export interface CapabilityRef { identity: SemanticIdentity; capability: SemanticRef; }
export interface ConditionRef { identity: SemanticIdentity; condition: MeaningContext; provenance: ProvenanceRef[]; }
export interface DelegationRecord { identity: SemanticIdentity; delegator: AuthorityIdentity; delegate: AuthorityIdentity; delegatedAuthorityIdentity: AuthorityIdentity; scope: SemanticScope; capabilities: CapabilityRef[]; conditions: ConditionRef[]; governingAuthority: SemanticRef; provenance: ProvenanceRef[]; }
export interface UncertaintyRecord { identity: SemanticIdentity; subject: SemanticRef; meaning: MeaningContext; provenance: ProvenanceRef[]; }
export interface ContradictionRecord { identity: SemanticIdentity; claims: SemanticRef[]; scope: SemanticScope; interpretation: MeaningContext; provenance: ProvenanceRef[]; }
export interface AuthorityAcceptanceContext { authorityDecisions: AuthorityDecision[]; acceptances: AcceptanceRecord[]; uncertainty: UncertaintyRecord[]; contradictions: ContradictionRecord[]; delegations: DelegationRecord[]; }
export interface TransformationRef { identity: SemanticIdentity; kind: "discover" | "parse" | "normalize" | "resolve" | "compile" | "project" | "realize"; inputs: SemanticRef[]; outputs: SemanticRef[]; }
export interface ProvenanceRecord { identity: SemanticIdentity; subject: SemanticRef; sources: ProvenanceRef[]; transformations: TransformationRef[]; authorityDecision?: SemanticRef; }
export interface ConflictProvenance { identity: SemanticIdentity; sources: ProvenanceRef[]; resolution?: SemanticRef; }
export interface ProvenanceGraph { records: ProvenanceRecord[]; conflicts: ConflictProvenance[]; }
export interface CompatibilityRequirement { identity: SemanticIdentity; subject: SemanticRef; consumer?: SemanticRef; contract?: SemanticRef; dependency?: SemanticRef; scope: SemanticScope; meaning: MeaningContext; }
export interface CompatibilityContext { requirements: SemanticRef[]; result: "compatible" | "incompatible" | "indeterminate"; provenance: ProvenanceRef[]; }
export interface SemanticIR { irKind: "guvna-semantic-ir"; irVersion: string; semanticIdentity: SemanticIdentity; semanticVersion?: SemanticVersion; semanticScope: SemanticScope; meaning: MeaningContext; concepts: SemanticEntity[]; relationships: SemanticRelationship[]; constraints: SemanticConstraint[]; transitions: SemanticTransition[]; derivations: SemanticDerivation[]; contracts: SemanticContractReference[]; realizations: RealizationReference[]; authorityContext: AuthorityAcceptanceContext; provenance: ProvenanceGraph; compatibility: CompatibilityRequirement[]; }

export type StructuralValidationResult =
  | { valid: true }
  | { valid: false; reason: string };
export type SemanticValidationResult =
  | { valid: true }
  | { valid: false; reason: string; stage: "semantic" };
export type SemanticIRValidationResult = StructuralValidationResult | SemanticValidationResult;

const REQUIRED_IR_FIELDS = ["irKind", "irVersion", "semanticIdentity", "semanticScope", "meaning", "concepts", "relationships", "constraints", "transitions", "derivations", "contracts", "realizations", "authorityContext", "provenance", "compatibility"];
const OPTIONAL_IR_FIELDS = ["semanticVersion"];
export const SEMANTIC_IR_FIELD_ORDER = ["irKind", "irVersion", "semanticIdentity", "semanticVersion", "semanticScope", "meaning", "concepts", "relationships", "constraints", "transitions", "derivations", "contracts", "realizations", "authorityContext", "provenance", "compatibility"];

export function validateSemanticIR(value: unknown): SemanticIRValidationResult {
  const structural = validateSemanticIRStructure(value);
  if (!structural.valid) return structural;
  if (!hasAttributableAuthorityLinks(value as SemanticIR)) return { valid: false, reason: "Accepted or ratified meaning lacks attributable authority", stage: "semantic" };
  return { valid: true };
}

export function validateSemanticIRStructure(value: unknown): StructuralValidationResult {
  if (!isRecord(value)) return invalid("SemanticIR must be an object");
  if (!hasOnlyFields(value, REQUIRED_IR_FIELDS, OPTIONAL_IR_FIELDS)) return invalid("SemanticIR fields are invalid");
  if (value.irKind !== "guvna-semantic-ir" || !isNonEmptyString(value.irVersion)) return invalid("SemanticIR kind or version is invalid");
  if (!isIdentity(value.semanticIdentity) || !isScope(value.semanticScope) || !isMeaning(value.meaning)) return invalid("SemanticIR shared fields are invalid");
  if ("semanticVersion" in value && !isSemanticVersion(value.semanticVersion)) return invalid("SemanticIR semanticVersion is invalid");
  if (!isArrayOf(value.concepts, isEntity) || !isArrayOf(value.relationships, isRelationship) || !isArrayOf(value.constraints, isConstraint) || !isArrayOf(value.transitions, isTransition) || !isArrayOf(value.derivations, isDerivation) || !isArrayOf(value.contracts, isContract) || !isArrayOf(value.realizations, isRealization) || !isArrayOf(value.compatibility, isCompatibilityRequirement)) return invalid("SemanticIR collections are invalid");
  if (!isAuthorityContext(value.authorityContext) || !isProvenanceGraph(value.provenance)) return invalid("SemanticIR contexts are invalid");
  return { valid: true };
}

function invalid(reason: string): StructuralValidationResult { return { valid: false, reason }; }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function isNonEmptyString(value: unknown): value is string { return typeof value === "string" && value.length > 0; }
function isIdentity(value: unknown): value is SemanticIdentity { return isRecord(value) && hasOnlyFields(value, ["identityKind", "value"], []) && isNonEmptyString(value.identityKind) && isNonEmptyString(value.value); }
function isRef(value: unknown): value is SemanticRef { return isRecord(value) && hasOnlyFields(value, ["identity"], []) && isIdentity(value.identity); }
function isMeaning(value: unknown): value is MeaningContext { return isRecord(value) && hasOnlyFields(value, ["statement", "terms"], []) && isNonEmptyString(value.statement) && Array.isArray(value.terms) && value.terms.every(isRef); }
function isScope(value: unknown): value is SemanticScope { return isRecord(value) && hasOnlyFields(value, ["identity", "meaning"], []) && isIdentity(value.identity) && isMeaning(value.meaning); }
function isSemanticVersion(value: unknown): value is SemanticVersion { return isRecord(value) && hasOnlyFields(value, ["value", "semanticIdentity", "scope"], []) && isNonEmptyString(value.value) && isRef(value.semanticIdentity) && isScope(value.scope); }
function hasOnlyFields(value: Record<string, unknown>, required: string[], optional: string[]): boolean { const keys = Object.keys(value); return required.every((field) => field in value) && keys.every((field) => required.includes(field) || optional.includes(field)); }
function isArrayOf(value: unknown, predicate: (item: unknown) => boolean): boolean { return Array.isArray(value) && value.every(predicate); }
function isProvenanceRef(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["sourceIdentity"], ["sourcePath", "sourceSection"]) && isIdentity(value.sourceIdentity) && (![value.sourcePath, value.sourceSection].some((item) => item !== undefined && typeof item !== "string")); }
function isLifecycle(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["lifecycleState", "transitions"], []) && isRef(value.lifecycleState) && isArrayOf(value.transitions, isRef); }
function isAcceptance(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["accepted", "scope", "provenance"], ["authorityDecision"]) && typeof value.accepted === "boolean" && isScope(value.scope) && isArrayOf(value.provenance, isProvenanceRef) && (value.authorityDecision === undefined || isRef(value.authorityDecision)); }
function isEntity(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "kind", "meaning", "attributes", "lifecycle", "acceptance", "provenance"], []) && isIdentity(value.identity) && ["concept", "artifact", "actor", "scope", "state"].includes(value.kind as string) && isMeaning(value.meaning) && isArrayOf(value.attributes, isAttribute) && isLifecycle(value.lifecycle) && isAcceptance(value.acceptance) && isArrayOf(value.provenance, isProvenanceRef); }
function isAttribute(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "meaning", "value"], []) && isIdentity(value.identity) && isMeaning(value.meaning) && isJson(value.value); }
function isRelationship(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "predicate", "object", "scope", "constraints", "provenance"], []) && isIdentity(value.identity) && isRef(value.subject) && isRef(value.predicate) && isRef(value.object) && isScope(value.scope) && isArrayOf(value.constraints, isRef) && isArrayOf(value.provenance, isProvenanceRef); }
function isConstraint(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "kind", "meaning", "enforcementScope", "provenance"], []) && isIdentity(value.identity) && isRef(value.subject) && ["invariant", "compatibility", "authority", "condition", "ambiguity"].includes(value.kind as string) && isMeaning(value.meaning) && isScope(value.enforcementScope) && isArrayOf(value.provenance, isProvenanceRef); }
function isTransition(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "from", "operation", "to", "authorityReference", "scope", "provenance"], []) && isIdentity(value.identity) && isRef(value.from) && isRef(value.operation) && isRef(value.to) && isRef(value.authorityReference) && isScope(value.scope) && isArrayOf(value.provenance, isProvenanceRef); }
function isDerivation(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "sources", "result", "relation", "transformation", "provenance"], []) && isIdentity(value.identity) && isArrayOf(value.sources, isRef) && isRef(value.result) && ["derives", "projects", "realizes", "compiles", "normalizes"].includes(value.relation as string) && isMeaning(value.transformation) && isArrayOf(value.provenance, isProvenanceRef); }
function isContract(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "version", "contractKind", "lifecycle", "applicability", "ratification", "provenance"], []) && isIdentity(value.identity) && isSemanticVersion(value.version) && sameIdentity(value.version.semanticIdentity.identity, value.identity) && ["semantic", "runtime", "sdk", "projection"].includes(value.contractKind as string) && isLifecycle(value.lifecycle) && isApplicability(value.applicability) && isRatification(value.ratification) && isArrayOf(value.provenance, isProvenanceRef); }
function isApplicability(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["applicable", "scope", "conditions", "provenance"], ["authorityDecision"]) && (typeof value.applicable === "boolean" || value.applicable === "indeterminate") && isScope(value.scope) && isArrayOf(value.conditions, isCondition) && isArrayOf(value.provenance, isProvenanceRef) && (value.authorityDecision === undefined || isRef(value.authorityDecision)); }
function isRatification(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["ratified", "requiresHumanAuthority", "provenance"], ["authorityDecision"]) && typeof value.ratified === "boolean" && typeof value.requiresHumanAuthority === "boolean" && isArrayOf(value.provenance, isProvenanceRef) && (value.authorityDecision === undefined || isRef(value.authorityDecision)); }
function isCondition(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "condition", "provenance"], []) && isIdentity(value.identity) && isMeaning(value.condition) && isArrayOf(value.provenance, isProvenanceRef); }
function isRealization(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "realizationKind", "realizes", "conformsTo", "compatibility", "provenance"], []) && isIdentity(value.identity) && ["runtime", "sdk", "host", "governance-projection"].includes(value.realizationKind as string) && isRef(value.realizes) && isArrayOf(value.conformsTo, isRef) && isCompatibilityContext(value.compatibility) && isArrayOf(value.provenance, isProvenanceRef); }
function isCompatibilityContext(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["requirements", "result", "provenance"], []) && isArrayOf(value.requirements, isRef) && ["compatible", "incompatible", "indeterminate"].includes(value.result as string) && isArrayOf(value.provenance, isProvenanceRef); }
function isAuthorityContext(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["authorityDecisions", "acceptances", "uncertainty", "contradictions", "delegations"], []) && isArrayOf(value.authorityDecisions, isAuthorityDecision) && isArrayOf(value.acceptances, isAcceptanceRecord) && isArrayOf(value.uncertainty, isUncertainty) && isArrayOf(value.contradictions, isContradiction) && isArrayOf(value.delegations, isDelegation); }
function isAuthorityIdentity(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "principal", "provenance"], []) && isIdentity(value.identity) && isRef(value.principal) && isArrayOf(value.provenance, isProvenanceRef); }
function isAuthorityDecision(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "authorityIdentity", "subject", "scope", "subjectContractIdentity", "subjectContractVersion", "decision", "provenance"], []) && isIdentity(value.identity) && isAuthorityIdentity(value.authorityIdentity) && isRef(value.subject) && isScope(value.scope) && isIdentity(value.subjectContractIdentity) && isNonEmptyString(value.subjectContractVersion) && ["accept", "reject", "ratify", "apply", "supersede", "retire", "delegate"].includes(value.decision as string) && isArrayOf(value.provenance, isProvenanceRef); }
function isAcceptanceRecord(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "scope", "authorityDecision", "provenance"], []) && isIdentity(value.identity) && isRef(value.subject) && isScope(value.scope) && isRef(value.authorityDecision) && isArrayOf(value.provenance, isProvenanceRef); }
function isUncertainty(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "meaning", "provenance"], []) && isIdentity(value.identity) && isRef(value.subject) && isMeaning(value.meaning) && isArrayOf(value.provenance, isProvenanceRef); }
function isContradiction(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "claims", "scope", "interpretation", "provenance"], []) && isIdentity(value.identity) && isArrayOf(value.claims, isRef) && isScope(value.scope) && isMeaning(value.interpretation) && isArrayOf(value.provenance, isProvenanceRef); }
function isDelegation(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "delegator", "delegate", "delegatedAuthorityIdentity", "scope", "capabilities", "conditions", "governingAuthority", "provenance"], []) && isIdentity(value.identity) && isAuthorityIdentity(value.delegator) && isAuthorityIdentity(value.delegate) && isAuthorityIdentity(value.delegatedAuthorityIdentity) && isScope(value.scope) && isArrayOf(value.capabilities, isCapability) && isArrayOf(value.conditions, isCondition) && isRef(value.governingAuthority) && isArrayOf(value.provenance, isProvenanceRef); }
function isCapability(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "capability"], []) && isIdentity(value.identity) && isRef(value.capability); }
function isProvenanceGraph(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["records", "conflicts"], []) && isArrayOf(value.records, isProvenanceRecord) && isArrayOf(value.conflicts, isConflict); }
function isProvenanceRecord(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "sources", "transformations"], ["authorityDecision"]) && isIdentity(value.identity) && isRef(value.subject) && isArrayOf(value.sources, isProvenanceRef) && isArrayOf(value.transformations, isTransformation) && (value.authorityDecision === undefined || isRef(value.authorityDecision)); }
function isTransformation(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "kind", "inputs", "outputs"], []) && isIdentity(value.identity) && ["discover", "parse", "normalize", "resolve", "compile", "project", "realize"].includes(value.kind as string) && isArrayOf(value.inputs, isRef) && isArrayOf(value.outputs, isRef); }
function isConflict(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "sources"], ["resolution"]) && isIdentity(value.identity) && isArrayOf(value.sources, isProvenanceRef) && (value.resolution === undefined || isRef(value.resolution)); }
function isCompatibilityRequirement(value: unknown): boolean { return isRecord(value) && hasOnlyFields(value, ["identity", "subject", "scope", "meaning"], ["consumer", "contract", "dependency"]) && isIdentity(value.identity) && isRef(value.subject) && isScope(value.scope) && isMeaning(value.meaning) && [value.consumer, value.contract, value.dependency].every((item) => item === undefined || isRef(item)); }
function isJson(value: unknown): boolean { if (value === null || typeof value === "boolean" || typeof value === "string") return true; if (typeof value === "number") return Number.isFinite(value); if (Array.isArray(value)) return value.every(isJson); return isRecord(value) && Object.values(value).every(isJson); }

function hasAttributableAuthorityLinks(value: SemanticIR): boolean {
  const decisions = value.authorityContext.authorityDecisions;
  const decisionFor = (reference: SemanticRef | undefined, subject: SemanticIdentity, scope: SemanticScope, expectedDecision: AuthorityDecision["decision"], contractIdentity: SemanticIdentity, contractVersion: string | undefined): boolean => {
    if (!reference) return false;
    const decision = decisions.find((candidate) => sameIdentity(candidate.identity, reference.identity));
    return Boolean(decision && decision.decision === expectedDecision && sameIdentity(decision.subject.identity, subject) && sameScope(decision.scope, scope) && sameIdentity(decision.subjectContractIdentity, contractIdentity) && contractVersion !== undefined && decision.subjectContractVersion === contractVersion);
  };
  const semanticVersion = value.semanticVersion?.value;
  return value.concepts.every((entity) => !entity.acceptance.accepted || decisionFor(entity.acceptance.authorityDecision, entity.identity, entity.acceptance.scope, "accept", value.semanticIdentity, semanticVersion)) &&
    value.contracts.every((contract) => (!contract.ratification.ratified || decisionFor(contract.ratification.authorityDecision, contract.identity, contract.applicability.scope, "ratify", contract.identity, contract.version.value)) &&
      (contract.applicability.applicable !== true || (contract.ratification.ratified && decisionFor(contract.applicability.authorityDecision, contract.identity, contract.applicability.scope, "apply", contract.identity, contract.version.value))));
}

function sameIdentity(left: SemanticIdentity, right: SemanticIdentity): boolean { return left.identityKind === right.identityKind && left.value === right.value; }
function sameScope(left: SemanticScope, right: SemanticScope): boolean {
  return sameIdentity(left.identity, right.identity) &&
    left.meaning.statement === right.meaning.statement &&
    left.meaning.terms.length === right.meaning.terms.length &&
    left.meaning.terms.every((term, index) => sameIdentity(term.identity, right.meaning.terms[index].identity));
}