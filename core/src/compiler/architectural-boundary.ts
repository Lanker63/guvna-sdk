import type { BoundedArchitecturalView } from "./architectural-view.js";
import type { SemanticIdentity } from "./semantic-ir.js";
import { canonicalConceptNames, validateCanonicalModel, type CanonicalConceptName, type CanonicalModel, type SourceAttribution } from "./canonical-model.js";

export const architecturalLayers = ["canonical", "architectural", "contract", "compilation", "candidate", "validation", "ratification", "applicable", "realization"] as const;
export type ArchitecturalLayer = (typeof architecturalLayers)[number];
export const repositoryProjectionLayers = ["repository", "accepted-knowledge", "understanding", "governance", "projection-compilation", "governance-projection", "projection-contract", "runtime"] as const;
export type RepositoryProjectionLayer = (typeof repositoryProjectionLayers)[number];
export type ArchitecturalPath = "guvna" | "repository";
export type SemanticOwner = "guvna" | "governed-repository" | "runtime" | "sdk" | "host";
export type ArchitecturalBindingLayer = ArchitecturalLayer | RepositoryProjectionLayer;
const layerOrder = new Map<ArchitecturalBindingLayer, number>([
  ...architecturalLayers.map((layer, index) => [layer, index] as const),
  ...repositoryProjectionLayers.map((layer, index) => [layer, index] as const),
]);

export interface ArchitecturalBinding {
  identity: SemanticIdentity;
  path: ArchitecturalPath;
  layer: ArchitecturalBindingLayer;
  owner: SemanticOwner;
  provenance: readonly { sourceIdentity: SemanticIdentity; sourcePath?: string; sourceSection?: string }[];
}

export interface ArchitecturalBoundaryInput {
  view: BoundedArchitecturalView;
  bindings: readonly ArchitecturalBinding[];
  canonicalModel: CanonicalModel;
}

export interface ArchitecturalDependency {
  source: CanonicalConceptName | ArchitecturalLayer | RepositoryProjectionLayer;
  target: CanonicalConceptName | ArchitecturalLayer | RepositoryProjectionLayer;
  sourceAttributions: readonly SourceAttribution[];
}

export const architecturalDependencies: readonly ArchitecturalDependency[] = [
  ["canonical", "architectural"],
  ["architectural", "contract"],
  ["contract", "compilation"],
  ["compilation", "candidate"],
  ["candidate", "validation"],
  ["validation", "ratification"],
  ["ratification", "applicable"],
  ["applicable", "realization"],
].map(([source, target]) => ({ source: source as ArchitecturalLayer, target: target as ArchitecturalLayer, sourceAttributions: [{ source: "doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md", section: "Architectural Dependency Principle" }] }));

export const repositoryProjectionDependencies: readonly ArchitecturalDependency[] = [
  ["repository", "accepted-knowledge"], ["accepted-knowledge", "understanding"], ["understanding", "governance"],
  ["governance", "projection-compilation"], ["projection-compilation", "governance-projection"],
  ["governance-projection", "projection-contract"], ["projection-contract", "runtime"],
].map(([source, target]) => ({ source: source as RepositoryProjectionLayer, target: target as RepositoryProjectionLayer, sourceAttributions: [{ source: "doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md", section: "Architectural Dependency Principle" }] }));

export type ArchitecturalBoundaryValidationResult = { ok: true } | { ok: false; reason: string };

export function validateArchitecturalDependencyProjection(): ArchitecturalBoundaryValidationResult {
  if (architecturalDependencies.length !== architecturalLayers.length - 1) return { ok: false, reason: "Architectural dependency projection is incomplete" };
  for (const [index, dependency] of architecturalDependencies.entries()) {
    if (dependency.source !== architecturalLayers[index] || dependency.target !== architecturalLayers[index + 1] || dependency.sourceAttributions.length === 0 || dependency.sourceAttributions.some((attribution) => attribution.source.length === 0 || attribution.section?.length === 0)) return { ok: false, reason: "Architectural dependency projection is invalid" };
  }
  if (repositoryProjectionDependencies.length !== repositoryProjectionLayers.length - 1) return { ok: false, reason: "Repository projection dependency projection is incomplete" };
  for (const [index, dependency] of repositoryProjectionDependencies.entries()) {
    if (dependency.source !== repositoryProjectionLayers[index] || dependency.target !== repositoryProjectionLayers[index + 1] || dependency.sourceAttributions.length === 0 || dependency.sourceAttributions.some((attribution) => attribution.source.length === 0 || attribution.section?.length === 0)) return { ok: false, reason: "Repository projection dependency projection is invalid" };
  }
  return { ok: true };
}

export type ValidatedArchitecturalBoundary = { ok: true; input: ArchitecturalBoundaryInput } | { ok: false; reason: string };

export function createValidatedArchitecturalBoundary(input: ArchitecturalBoundaryInput): ValidatedArchitecturalBoundary {
  const validation = validateArchitecturalBoundary(input);
  return validation.ok ? { ok: true, input } : validation;
}

export function validateArchitecturalBoundary(input: ArchitecturalBoundaryInput): ArchitecturalBoundaryValidationResult {
  const canonicalValidation = validateCanonicalModel(input.canonicalModel);
  if (!canonicalValidation.ok) return { ok: false, reason: `Canonical model is invalid: ${canonicalValidation.reason}` };
  const dependencyValidation = validateArchitecturalDependencyProjection();
  if (!dependencyValidation.ok) return dependencyValidation;
  const identities = new Map<string, SemanticIdentity>();
  for (const identity of [
    input.view.semanticIdentity,
    input.view.semanticScope.identity,
    ...input.view.concepts.map((concept) => concept.identity),
    ...input.view.relationships.map((relationship) => relationship.identity),
    ...input.view.constraints.map((constraint) => constraint.identity),
    ...input.view.transitions.map((transition) => transition.identity),
    ...input.view.derivations.map((derivation) => derivation.identity),
    ...input.view.contracts.map((contract) => contract.identity),
    ...input.view.realizations.map((realization) => realization.identity),
    ...input.view.authorityContext.authorityDecisions.map((decision) => decision.identity),
    ...input.view.authorityContext.acceptances.map((acceptance) => acceptance.identity),
    ...input.view.authorityContext.uncertainty.map((uncertainty) => uncertainty.identity),
    ...input.view.authorityContext.contradictions.map((contradiction) => contradiction.identity),
    ...input.view.authorityContext.delegations.map((delegation) => delegation.identity),
    ...input.view.provenance.records.map((record) => record.identity),
    ...input.view.provenance.conflicts.map((conflict) => conflict.identity),
    ...input.view.compatibility.map((requirement) => requirement.identity),
  ]) identities.set(identity.value, identity);
  const bindings = new Map<string, ArchitecturalBinding>();
  for (const binding of input.bindings) {
    if (!identities.has(binding.identity.value) || bindings.has(binding.identity.value) || binding.provenance.length === 0) return { ok: false, reason: "Architectural binding is unknown, duplicated, or unattributed" };
    const expectedLayers = binding.path === "guvna" ? architecturalLayers : repositoryProjectionLayers;
    if (!expectedLayers.includes(binding.layer as never)) return { ok: false, reason: "Architectural binding crosses semantic paths" };
    if (binding.path === "guvna" && binding.layer !== "realization" && binding.owner !== "guvna") return { ok: false, reason: "Guvna semantic meaning must be Guvna-owned" };
    if (binding.path === "repository" && binding.layer !== "runtime" && binding.owner !== "governed-repository") return { ok: false, reason: "Repository projection meaning must be Governed Repository-owned" };
    if (binding.layer === "runtime" && binding.owner !== "guvna" && binding.owner !== "runtime") return { ok: false, reason: "Runtime semantics must remain Guvna-owned or Runtime-realized" };
    if (binding.provenance.some((provenance) => !identities.has(provenance.sourceIdentity.value))) return { ok: false, reason: "Architectural binding provenance is unresolved" };
    bindings.set(binding.identity.value, binding);
  }
  if (bindings.size !== identities.size) return { ok: false, reason: "Architectural binding is missing" };
  for (const derivation of input.view.derivations) {
    const result = bindings.get(derivation.result.identity.value);
    if (!result || derivation.sources.some((source) => {
      const sourceBinding = bindings.get(source.identity.value);
      return !sourceBinding || sourceBinding.path !== result.path || (layerOrder.get(sourceBinding.layer) ?? -1) > (layerOrder.get(result.layer) ?? -1);
    })) return { ok: false, reason: "Architectural dependency direction is invalid" };
  }
  for (const realization of input.view.realizations) {
    const realizationBinding = bindings.get(realization.identity.value);
    const sourceBinding = bindings.get(realization.realizes.identity.value);
    const contracts = input.view.contracts.filter((contract) => realization.conformsTo.some((reference) => reference.identity.value === contract.identity.value));
    if (!realizationBinding || !sourceBinding || realizationBinding.layer !== (realizationBinding.path === "guvna" ? "realization" : "runtime") || sourceBinding.layer === realizationBinding.layer) return { ok: false, reason: "Realization boundary is invalid" };
    if (contracts.length === 0 || realization.compatibility.result !== "compatible" || contracts.some((contract) => contract.applicability.applicable !== true || !contract.ratification.ratified)) return { ok: false, reason: "Realization contract applicability is invalid" };
  }
  return { ok: true };
}