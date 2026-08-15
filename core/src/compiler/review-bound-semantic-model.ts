import type { CollectionOrdering } from "./ir-identity-materializer.js";

export type ReviewHandle = string;

export interface SourceAttribution {
  source: string;
  section?: string;
}

export interface ReviewReference {
  reviewRef: ReviewHandle;
}

export interface ReviewCollection {
  reviewCollection: ReviewHandle;
}

export interface IdentityMaterializationPlan {
  samePreimageHandles: readonly ReviewHandle[];
  independentIdentityHandles: readonly ReviewHandle[];
}

export interface ReviewNode {
  handle: ReviewHandle;
  content: Record<string, unknown>;
  sourceAttributions: readonly SourceAttribution[];
}

export interface ReviewCollectionEntry {
  handle: ReviewHandle;
  values: readonly unknown[];
  ordering: CollectionOrdering;
}

export interface ReviewBoundSemanticModel {
  selectionReference: ReviewHandle;
  governedScope: ReviewNode;
  subjectMeaning: Record<string, unknown>;
  nodes: readonly ReviewNode[];
  relations: readonly ReviewNode[];
  constraints: readonly ReviewNode[];
  transitions: readonly ReviewNode[];
  provenanceAttributions: readonly SourceAttribution[];
  compatibilityCapabilities: readonly ReviewNode[];
  emptyCollectionDispositions: readonly string[];
  referenceResolutionMap: ReadonlyMap<ReviewHandle, ReviewHandle>;
  materializationPlans: ReadonlyMap<ReviewHandle, IdentityMaterializationPlan>;
  collections: readonly ReviewCollectionEntry[];
  transformationDependencyChains: readonly ReviewHandle[][];
  temporaryReviewHandles: ReadonlySet<ReviewHandle>;
}

export type ReviewModelValidationResult = { ok: true } | { ok: false; reason: string };

export function validateReviewBoundSemanticModel(model: ReviewBoundSemanticModel): ReviewModelValidationResult {
  if (!isHandle(model.selectionReference) || !isHandle(model.governedScope.handle)) return { ok: false, reason: "Review model handles are required" };
  if (!isRecord(model.governedScope.content) || model.governedScope.sourceAttributions.length === 0) return { ok: false, reason: "Governed scope meaning and source attribution are required" };
  const nodes = [model.governedScope, ...model.nodes, ...model.relations, ...model.constraints, ...model.transitions, ...model.compatibilityCapabilities];
  const handles = new Set<string>();
  for (const node of nodes) {
    if (!isHandle(node.handle) || handles.has(node.handle) || !isRecord(node.content) || node.sourceAttributions.length === 0) return { ok: false, reason: "Review model nodes must have unique handles, content, and source attribution" };
    handles.add(node.handle);
  }
  for (const [source, target] of model.referenceResolutionMap) {
    if (!isHandle(source) || !handles.has(target)) return { ok: false, reason: "Review reference resolution is unresolved" };
  }
  for (const node of nodes) {
    const references = validateReferences(node.content, model.referenceResolutionMap, handles, new Set<object>());
    if (!references.ok) return references;
  }
  for (const collection of model.collections) {
    if (!isHandle(collection.handle) || !["ordered", "unordered"].includes(collection.ordering)) return { ok: false, reason: "Review collection ordering is unresolved" };
  }
  for (const [target, plan] of model.materializationPlans) {
    if (!handles.has(target)) return { ok: false, reason: "Materialization target is unresolved" };
    if (plan.samePreimageHandles.some((handle) => !handles.has(handle)) || plan.independentIdentityHandles.some((handle) => !handles.has(handle)) || plan.samePreimageHandles.some((handle) => plan.independentIdentityHandles.includes(handle))) return { ok: false, reason: "Identity materialization plan is invalid" };
  }
  return { ok: true };
}

export function isReviewReference(value: unknown): value is ReviewReference {
  return isRecord(value) && Object.keys(value).length === 1 && isHandle(value.reviewRef);
}

export function isReviewCollection(value: unknown): value is ReviewCollection {
  return isRecord(value) && Object.keys(value).length === 1 && isHandle(value.reviewCollection);
}

function validateReferences(value: unknown, resolution: ReadonlyMap<ReviewHandle, ReviewHandle>, nodes: ReadonlySet<string>, ancestors: Set<object>): ReviewModelValidationResult {
  if (isReviewReference(value)) return resolution.has(value.reviewRef) && nodes.has(resolution.get(value.reviewRef) ?? "") ? { ok: true } : { ok: false, reason: "Review reference resolution is unresolved" };
  if (value === null || typeof value !== "object") return { ok: true };
  if (ancestors.has(value)) return { ok: false, reason: "Review reference resolution is cyclic" };
  ancestors.add(value);
  const members = Array.isArray(value) ? value : Object.values(value);
  for (const member of members) {
    const result = validateReferences(member, resolution, nodes, ancestors);
    if (!result.ok) return result;
  }
  ancestors.delete(value);
  return { ok: true };
}

function isHandle(value: unknown): value is ReviewHandle {
  return typeof value === "string" && value.length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}