import type { SemanticContractElements, SemanticContractReference, SemanticIdentity, SemanticIR, SemanticScope } from "./semantic-ir.js";

export type SemanticContract = SemanticContractReference;
export type SemanticContractValidationResult = { valid: true } | { valid: false; reason: string };

export function validateSemanticContract(value: unknown): SemanticContractValidationResult {
  if (!isRecord(value) || !isRecord(value.identity) || !isRecord(value.version) || !isRecord(value.version.semanticIdentity) || !isRecord(value.version.semanticIdentity.identity) || !isRecord(value.version.scope) || !isRecord(value.applicability) || !isRecord(value.applicability.scope) || !isRecord(value.ratification) || !isRecord(value.lifecycle) || !isRecord(value.lifecycle.lifecycleState) || !Array.isArray(value.lifecycle.transitions) || !Array.isArray(value.provenance) || !Array.isArray(value.applicability.provenance) || !Array.isArray(value.ratification.provenance)) return { valid: false, reason: "Semantic Contract structure is invalid" };
  const contract = value as unknown as SemanticContract;
  if (contract.contractKind !== "semantic") return { valid: false, reason: "Semantic Contract kind is invalid" };
  if (!contract.elements || !hasContractElements(contract.elements)) return { valid: false, reason: "Semantic Contract elements are incomplete" };
  if (!isIdentity(contract.identity) || !isIdentity(contract.version.semanticIdentity.identity) || !sameIdentity(contract.identity, contract.version.semanticIdentity.identity)) return { valid: false, reason: "Semantic Contract identity is invalid" };
  if (!isIdentity(contract.lifecycle.lifecycleState.identity) || contract.lifecycle.transitions.some((transition) => !isIdentity(transition.identity))) return { valid: false, reason: "Semantic Contract lifecycle is invalid" };
  if (!contract.version.value || !sameScope(contract.version.scope, contract.applicability.scope)) return { valid: false, reason: "Semantic Contract version scope is invalid" };
  return { valid: true };
}

export function validateSemanticContractReferences(contract: SemanticContractReference, ir: SemanticIR): SemanticContractValidationResult {
  const validation = validateSemanticContract(contract);
  if (!validation.valid || !contract.elements) return validation;
  const identities = new Set(allIdentities(ir).map((item) => identityKey(item)));
  const categoryIdentities = {
    concepts: new Set(ir.concepts.filter((item) => item.kind === "concept").map((item) => identityKey(item.identity))),
    states: new Set(ir.concepts.filter((item) => item.kind === "state").map((item) => identityKey(item.identity))),
    transitions: new Set(ir.transitions.map((item) => identityKey(item.identity))),
    invariants: new Set(ir.constraints.filter((item) => item.kind === "invariant").map((item) => identityKey(item.identity))),
    compatibilityRequirements: new Set(ir.compatibility.map((item) => identityKey(item.identity))),
    authorityBoundaries: new Set(ir.authorityContext.authorityDecisions.map((item) => identityKey(item.identity))),
    realizationObligations: new Set(ir.realizations.map((item) => identityKey(item.identity))),
  };
  for (const category of Object.keys(contract.elements) as (keyof SemanticContractElements)[]) {
    const categoryAllowed = categoryIdentities[category as keyof typeof categoryIdentities];
    const allowed = categoryAllowed && categoryAllowed.size > 0 ? categoryAllowed : identities;
    if (contract.elements[category].some((reference) => !allowed.has(identityKey(reference.identity)))) return { valid: false, reason: `Semantic Contract element reference is invalid for ${category}` };
  }
  return { valid: true };
}

function isIdentity(value: SemanticIdentity): boolean { return Boolean(value && value.identityKind && value.value); }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function hasContractElements(value: SemanticContractElements): boolean {
  const categories: (keyof SemanticContractElements)[] = ["concepts", "dataStructures", "operations", "states", "transitions", "invariants", "authorityBoundaries", "provenanceRequirements", "compatibilityRequirements", "failureBehavior", "realizationObligations"];
  return categories.every((category) => Array.isArray(value[category]) && value[category].length > 0 && value[category].every((reference) => isRecord(reference) && isIdentity(reference.identity)));
}
function sameIdentity(left: SemanticIdentity, right: SemanticIdentity): boolean { return left.identityKind === right.identityKind && left.value === right.value; }
function identityKey(identity: SemanticIdentity): string { return `${identity.identityKind}:${identity.value}`; }
function allIdentities(ir: SemanticIR): SemanticIdentity[] { return [ir.semanticIdentity, ir.semanticScope.identity, ...ir.concepts.map((item) => item.identity), ...ir.relationships.map((item) => item.identity), ...ir.constraints.map((item) => item.identity), ...ir.transitions.map((item) => item.identity), ...ir.derivations.map((item) => item.identity), ...ir.contracts.map((item) => item.identity), ...ir.realizations.map((item) => item.identity), ...ir.authorityContext.authorityDecisions.map((item) => item.identity), ...ir.authorityContext.acceptances.map((item) => item.identity), ...ir.authorityContext.uncertainty.map((item) => item.identity), ...ir.authorityContext.contradictions.map((item) => item.identity), ...ir.authorityContext.delegations.map((item) => item.identity), ...ir.provenance.records.map((item) => item.identity), ...ir.provenance.conflicts.map((item) => item.identity), ...ir.compatibility.map((item) => item.identity)]; }
function sameScope(left: SemanticScope, right: SemanticScope): boolean {
  return sameIdentity(left.identity, right.identity) &&
    left.meaning.statement === right.meaning.statement &&
    left.meaning.terms.length === right.meaning.terms.length &&
    left.meaning.terms.every((term, index) => sameIdentity(term.identity, right.meaning.terms[index].identity));
}