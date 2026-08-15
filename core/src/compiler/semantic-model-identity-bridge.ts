import { createIdentity } from "./ir-identity.js";
import { materializeIdentity, type IdentityMaterializationInput } from "./ir-identity-materializer.js";
import { serializeCompactJson } from "./ir-serializer.js";
import type { SemanticIdentity } from "./semantic-ir.js";
import { isReviewCollection, isReviewReference, type ReviewBoundSemanticModel, type ReviewHandle, validateReviewBoundSemanticModel } from "./review-bound-semantic-model.js";

export type ScopeBootstrapResult =
  | { ok: true; identity: SemanticIdentity; preimageBytes: Uint8Array; digest: string }
  | { ok: false; reason: string };

export type BridgeResult = { ok: true; input: IdentityMaterializationInput } | { ok: false; reason: string };

export function bootstrapScopeIdentity(model: ReviewBoundSemanticModel): ScopeBootstrapResult {
  const validation = validateReviewBoundSemanticModel(model);
  if (!validation.ok) return validation;
  if (containsReviewHandle(model.governedScope.content, model.temporaryReviewHandles, new Set<object>())) return { ok: false, reason: "Review handle cannot enter scope bootstrap preimage" };
  const projection = { identityKind: "semantic", semanticScope: model.governedScope.content, objectContent: model.governedScope.content };
  const serialization = serializeCompactJson(projection);
  if (!serialization.ok) return { ok: false, reason: serialization.reason };
  const identity = createIdentity({ identityKind: "semantic", bytes: serialization.bytes });
  if (!identity.ok) return identity;
  return { ok: true, identity: identity.identity, preimageBytes: serialization.bytes, digest: identity.digest };
}

export function bridgeToMaterializationInput(model: ReviewBoundSemanticModel, targetHandle: ReviewHandle, identities: ReadonlyMap<ReviewHandle, SemanticIdentity>): BridgeResult {
  const validation = validateReviewBoundSemanticModel(model);
  if (!validation.ok) return validation;
  const target = allNodes(model).find((node) => node.handle === targetHandle);
  const plan = model.materializationPlans.get(targetHandle);
  const scopeIdentity = identities.get(model.governedScope.handle);
  if (!target || !plan || !scopeIdentity) return { ok: false, reason: "Materialization target, plan, or bootstrap scope identity is unresolved" };

  const collectionOrderings = new Map<readonly unknown[], "ordered" | "unordered">();
  const collections = new Map(model.collections.map((collection) => [collection.handle, collection]));
  const objectContent = resolveValue(target.content, model, identities, collections, collectionOrderings);
  if (!objectContent.ok || !isRecord(objectContent.value)) return objectContent.ok ? { ok: false, reason: "Materialization target content is invalid" } : objectContent;
  const scope = { identity: scopeIdentity, ...model.governedScope.content };
  const derived = identitiesFor(plan.samePreimageHandles, identities);
  const independent = identitiesFor(plan.independentIdentityHandles, identities);
  if (!derived.ok) return derived;
  if (!independent.ok) return independent;
  independent.value.add(scopeIdentity);

  return {
    ok: true,
    input: {
      identityKind: "semantic",
      semanticScope: scope,
      objectContent: objectContent.value,
      derivedIdentities: derived.value,
      independentIdentities: independent.value,
      collectionOrderings,
      temporaryReviewReferences: model.temporaryReviewHandles,
    },
  };
}

export function materializeReviewTarget(model: ReviewBoundSemanticModel, targetHandle: ReviewHandle, identities: ReadonlyMap<ReviewHandle, SemanticIdentity>) {
  const bridge = bridgeToMaterializationInput(model, targetHandle, identities);
  return bridge.ok ? materializeIdentity(bridge.input) : bridge;
}

type ResolutionResult = { ok: true; value: unknown } | { ok: false; reason: string };

function resolveValue(value: unknown, model: ReviewBoundSemanticModel, identities: ReadonlyMap<ReviewHandle, SemanticIdentity>, collections: ReadonlyMap<ReviewHandle, { values: readonly unknown[]; ordering: "ordered" | "unordered" }>, orderings: Map<readonly unknown[], "ordered" | "unordered">): ResolutionResult {
  if (isReviewReference(value)) {
    const target = model.referenceResolutionMap.get(value.reviewRef);
    const identity = target ? identities.get(target) : undefined;
    return identity ? { ok: true, value: { identity } } : { ok: false, reason: "Review reference is unresolved" };
  }
  if (isReviewCollection(value)) {
    const collection = collections.get(value.reviewCollection);
    if (!collection) return { ok: false, reason: "Review collection is unresolved" };
    const resolved: unknown[] = [];
    for (const member of collection.values) {
      const result = resolveValue(member, model, identities, collections, orderings);
      if (!result.ok) return result;
      resolved.push(result.value);
    }
    orderings.set(resolved, collection.ordering);
    return { ok: true, value: resolved };
  }
  if (Array.isArray(value)) return { ok: false, reason: "Review model arrays require an explicit collection handle" };
  if (!isRecord(value)) return typeof value === "string" && model.temporaryReviewHandles.has(value) ? { ok: false, reason: "Review handle cannot enter materialization content" } : { ok: true, value };
  const resolved: Record<string, unknown> = {};
  for (const [key, member] of Object.entries(value)) {
    const result = resolveValue(member, model, identities, collections, orderings);
    if (!result.ok) return result;
    resolved[key] = result.value;
  }
  return { ok: true, value: resolved };
}

function identitiesFor(handles: readonly ReviewHandle[], identities: ReadonlyMap<ReviewHandle, SemanticIdentity>): { ok: true; value: Set<object> } | { ok: false; reason: string } {
  const values = new Set<object>();
  for (const handle of handles) {
    const identity = identities.get(handle);
    if (!identity) return { ok: false, reason: "Planned identity is unresolved" };
    values.add(identity);
  }
  return { ok: true, value: values };
}

function allNodes(model: ReviewBoundSemanticModel) {
  return [model.governedScope, ...model.nodes, ...model.relations, ...model.constraints, ...model.transitions, ...model.compatibilityCapabilities];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function containsReviewHandle(value: unknown, handles: ReadonlySet<string>, ancestors: Set<object>): boolean {
  if (typeof value === "string") return handles.has(value);
  if (value === null || typeof value !== "object") return false;
  if (ancestors.has(value)) return false;
  ancestors.add(value);
  const contained = Array.isArray(value)
    ? value.some((member) => containsReviewHandle(member, handles, ancestors))
    : Object.values(value).some((member) => containsReviewHandle(member, handles, ancestors));
  ancestors.delete(value);
  return contained;
}