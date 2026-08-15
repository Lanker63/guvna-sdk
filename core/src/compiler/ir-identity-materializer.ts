import { createIdentity } from "./ir-identity.js";
import { serializeCompactJson } from "./ir-serializer.js";
import type { SemanticIdentity } from "./semantic-ir.js";

export type CollectionOrdering = "ordered" | "unordered";

export interface IdentityMaterializationInput {
  identityKind: "semantic";
  semanticScope: unknown;
  objectContent: unknown;
  derivedIdentities: ReadonlySet<object>;
  independentIdentities: ReadonlySet<object>;
  collectionOrderings: ReadonlyMap<readonly unknown[], CollectionOrdering>;
  temporaryReviewReferences: ReadonlySet<string>;
}

export type IdentityMaterializationResult =
  | { ok: true; preimageBytes: Uint8Array; identity: SemanticIdentity; digest: string }
  | { ok: false; reason: string };

const OMIT = Symbol("omit-derived-identity");
const REFERENCE_FIELDS = ["semanticIdentity", "authorityDecision", "authorityReference", "subject", "predicate", "object", "from", "operation", "to", "result", "consumer", "contract", "dependency", "realizes", "governingAuthority"];

export function materializeIdentity(input: IdentityMaterializationInput): IdentityMaterializationResult {
  if (input.identityKind !== "semantic") return { ok: false, reason: "Approved identity kind is required" };
  if (!isRecord(input.semanticScope) || !isRecord(input.objectContent)) return { ok: false, reason: "Semantic scope and object content are required" };
  const validation = validateStructure(input);
  if (!validation.ok) return validation;

  const projection = project({ identityKind: input.identityKind, semanticScope: input.semanticScope, objectContent: input.objectContent }, input, new Set<object>());
  if (!projection.ok) return projection;

  const serialization = serializeCompactJson(projection.value);
  if (!serialization.ok) return { ok: false, reason: serialization.reason };
  const identity = createIdentity({ identityKind: input.identityKind, bytes: serialization.bytes });
  if (!identity.ok) return identity;
  return { ok: true, preimageBytes: serialization.bytes, identity: identity.identity, digest: identity.digest };
}

type ProjectionResult = { ok: true; value: unknown } | { ok: false; reason: string };

function validateStructure(input: IdentityMaterializationInput): { ok: true } | { ok: false; reason: string } {
  if (!isRecord(input.semanticScope) || !isIdentity(input.semanticScope.identity)) return { ok: false, reason: "Semantic scope identity is missing or invalid" };
  for (const identity of input.derivedIdentities) {
    if (input.independentIdentities.has(identity)) return { ok: false, reason: "Identity derivation relation is contradictory" };
  }
  const scopeValidation = validateValue(input.semanticScope, new Set<object>());
  if (!scopeValidation.ok) return scopeValidation;
  return validateValue(input.objectContent, new Set<object>());
}

function validateValue(value: unknown, ancestors: Set<object>): { ok: true } | { ok: false; reason: string } {
  if (value === null || typeof value === "boolean" || typeof value === "string" || typeof value === "number") return { ok: true };
  if (!isRecord(value) && !Array.isArray(value)) return { ok: false, reason: "Projected value is not JSON serializable" };
  if (ancestors.has(value)) return { ok: true };
  ancestors.add(value);

  if (Array.isArray(value)) {
    for (const member of value) {
      const result = validateValue(member, ancestors);
      if (!result.ok) return result;
    }
  } else {
    if (("identityKind" in value || "value" in value) && !isIdentity(value)) return { ok: false, reason: "Malformed SemanticIdentity" };
    if ("identity" in value && !isIdentity(value.identity)) return { ok: false, reason: "Required identity is missing or invalid" };
    if ("sourceIdentity" in value && !isIdentity(value.sourceIdentity)) return { ok: false, reason: "Source identity is missing or invalid" };
    if (("kind" in value || ("sources" in value && "transformations" in value)) && !isIdentity(value.identity)) return { ok: false, reason: "Required identity is missing or invalid" };
    for (const field of REFERENCE_FIELDS) {
      if (field in value && !isSemanticRef(value[field])) return { ok: false, reason: "Malformed SemanticRef-like reference" };
    }
    for (const member of Object.values(value)) {
      const result = validateValue(member, ancestors);
      if (!result.ok) return result;
    }
  }

  ancestors.delete(value);
  return { ok: true };
}

function project(value: unknown, input: IdentityMaterializationInput, ancestors: Set<object>): ProjectionResult {
  if (typeof value === "string" && input.temporaryReviewReferences.has(value)) return { ok: false, reason: "Temporary review reference cannot be preimage input" };
  if (value === null || typeof value === "boolean" || typeof value === "string" || typeof value === "number") return { ok: true, value };
  if (!isRecord(value) && !Array.isArray(value)) return { ok: false, reason: "Projected value is not JSON serializable" };
  if (isIdentity(value)) {
    if (input.derivedIdentities.has(value)) return { ok: true, value: OMIT };
    if (!input.independentIdentities.has(value)) return { ok: false, reason: "Identity dependency is unresolved" };
    return { ok: true, value: { identityKind: value.identityKind, value: value.value } };
  }
  if (ancestors.has(value)) return { ok: false, reason: "Identity projection contains a cycle" };
  ancestors.add(value);
  const result = Array.isArray(value) ? projectArray(value, input, ancestors) : projectRecord(value, input, ancestors);
  ancestors.delete(value);
  return result;
}

function projectArray(value: readonly unknown[], input: IdentityMaterializationInput, ancestors: Set<object>): ProjectionResult {
  const ordering = input.collectionOrderings.get(value);
  if (!ordering) return { ok: false, reason: "Collection ordering is unresolved" };

  const members: Array<{ original: unknown; projected: unknown }> = [];
  for (const member of value) {
    const result = project(member, input, ancestors);
    if (!result.ok) return result;
    if (result.value !== OMIT) members.push({ original: member, projected: result.value });
  }
  if (ordering === "ordered") return { ok: true, value: members.map((member) => member.projected) };

  const keyed = [] as Array<{ key: Uint8Array; content: Uint8Array; projected: unknown }>;
  for (const member of members) {
    const identity = memberIdentity(member.original);
    if (!identity || input.derivedIdentities.has(identity) || !input.independentIdentities.has(identity)) return { ok: false, reason: "Unordered collection member identity is unresolved" };
    const key = serializeCompactJson(identity);
    const content = serializeCompactJson(member.projected);
    if (!key.ok) return { ok: false, reason: key.reason };
    if (!content.ok) return { ok: false, reason: content.reason };
    keyed.push({ key: key.bytes, content: content.bytes, projected: member.projected });
  }

  keyed.sort((left, right) => compareBytes(left.key, right.key));
  for (let index = 1; index < keyed.length; index += 1) {
    if (compareBytes(keyed[index - 1].key, keyed[index].key) === 0 && compareBytes(keyed[index - 1].content, keyed[index].content) !== 0) return { ok: false, reason: "Equal unordered identity keys have non-identical content" };
  }
  return { ok: true, value: keyed.map((member) => member.projected) };
}

function projectRecord(value: Record<string, unknown>, input: IdentityMaterializationInput, ancestors: Set<object>): ProjectionResult {
  const projected: Record<string, unknown> = {};
  for (const [key, member] of Object.entries(value)) {
    const result = project(member, input, ancestors);
    if (!result.ok) return result;
    if (result.value !== OMIT) projected[key] = result.value;
  }
  return { ok: true, value: projected };
}

function memberIdentity(value: unknown): SemanticIdentity | undefined {
  if (isIdentity(value)) return value;
  if (!isRecord(value)) return undefined;
  if (isIdentity(value.identity)) return value.identity;
  if (isIdentity(value.sourceIdentity)) return value.sourceIdentity;
  return undefined;
}

function isIdentity(value: unknown): value is SemanticIdentity {
  return isRecord(value) && Object.keys(value).length === 2 && typeof value.identityKind === "string" && value.identityKind.length > 0 && typeof value.value === "string" && value.value.length > 0;
}

function isSemanticRef(value: unknown): boolean {
  return isRecord(value) && Object.keys(value).length === 1 && isIdentity(value.identity);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function compareBytes(left: Uint8Array, right: Uint8Array): number {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return left.length - right.length;
}