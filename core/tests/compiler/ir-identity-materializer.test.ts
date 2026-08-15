import { describe, expect, it } from "vitest";
import { materializeIdentity, type IdentityMaterializationInput } from "../../src/compiler/ir-identity-materializer.js";

const identity = (value: string) => ({ identityKind: "semantic" as const, value });

function input(objectContent: Record<string, unknown>, scope: Record<string, unknown>, derived: ReadonlySet<object>, independent: ReadonlySet<object>, orderings: ReadonlyMap<readonly unknown[], "ordered" | "unordered">): IdentityMaterializationInput {
  return { identityKind: "semantic", objectContent, semanticScope: scope, derivedIdentities: derived, independentIdentities: independent, collectionOrderings: orderings, temporaryReviewReferences: new Set(["C01", "R01"]) };
}

function expectSuccess(result: ReturnType<typeof materializeIdentity>): asserts result is Extract<ReturnType<typeof materializeIdentity>, { ok: true }> {
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.reason);
}

describe("identity preimage materializer", () => {
  it("omits target-derived identities and retains independently evidenced identities", () => {
    const scopeIdentity = identity("scope");
    const targetIdentity = identity("target");
    const nestedIdentity = identity("nested");
    const sourceIdentity = identity("source");
    const terms: unknown[] = [];
    const sources = [{ sourceIdentity }];
    const result = materializeIdentity(input({ identity: targetIdentity, nested: { identity: nestedIdentity }, provenance: sources }, { identity: scopeIdentity, meaning: { statement: "scope", terms } }, new Set([targetIdentity, nestedIdentity]), new Set([scopeIdentity, sourceIdentity]), new Map([[terms, "unordered"], [sources, "unordered"]])));

    expectSuccess(result);
    const preimage = new TextDecoder().decode(result.preimageBytes);
    expect(preimage).not.toContain('"value":"target"');
    expect(preimage).not.toContain('"value":"nested"');
    expect(preimage).toContain('"value":"scope"');
    expect(preimage).toContain('"value":"source"');
    expect(result.identity.identityKind).toBe("semantic");
  });

  it("sorts approved unordered provenance source references and preserves explicit transformation order", () => {
    const scopeIdentity = identity("scope");
    const firstSource = identity("a-source");
    const secondSource = identity("z-source");
    const firstTransformation = identity("first");
    const secondTransformation = identity("second");
    const terms: unknown[] = [];
    const sources = [{ sourceIdentity: secondSource }, { sourceIdentity: firstSource }];
    const transformations = [{ identity: secondTransformation, kind: "second" }, { identity: firstTransformation, kind: "first" }];
    const result = materializeIdentity(input({ provenance: sources, transformations }, { identity: scopeIdentity, meaning: { statement: "scope", terms } }, new Set(), new Set([scopeIdentity, firstSource, secondSource, firstTransformation, secondTransformation]), new Map([[terms, "unordered"], [sources, "unordered"], [transformations, "ordered"]])));

    expectSuccess(result);
    const preimage = new TextDecoder().decode(result.preimageBytes);
    expect(preimage.indexOf("a-source")).toBeLessThan(preimage.indexOf("z-source"));
    expect(preimage.indexOf('"kind":"second"')).toBeLessThan(preimage.indexOf('"kind":"first"'));
  });

  it("fails closed for unresolved ordering, identity dependencies, duplicate keys, cycles, and review references", () => {
    const scopeIdentity = identity("scope");
    const terms: unknown[] = [];
    const scope = { identity: scopeIdentity, meaning: { statement: "scope", terms } };
    const sourceIdentity = identity("source");
    const sources = [{ sourceIdentity }];
    expect(materializeIdentity(input({ provenance: sources }, scope, new Set(), new Set([scopeIdentity, sourceIdentity]), new Map([[terms, "unordered"]]))).reason).toBe("Collection ordering is unresolved");

    expect(materializeIdentity(input({ identity: identity("unresolved") }, scope, new Set(), new Set([scopeIdentity]), new Map([[terms, "unordered"]]))).reason).toBe("Identity dependency is unresolved");

    const duplicate = identity("duplicate");
    const duplicates = [{ sourceIdentity: duplicate, sourcePath: "a" }, { sourceIdentity: duplicate, sourcePath: "b" }];
    expect(materializeIdentity(input({ provenance: duplicates }, scope, new Set(), new Set([scopeIdentity, duplicate]), new Map([[terms, "unordered"], [duplicates, "unordered"]]))).reason).toBe("Equal unordered identity keys have non-identical content");

    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(materializeIdentity(input(cyclic, scope, new Set(), new Set([scopeIdentity]), new Map([[terms, "unordered"]]))).reason).toBe("Identity projection contains a cycle");
    expect(materializeIdentity(input({ review: "C01" }, scope, new Set(), new Set([scopeIdentity]), new Map([[terms, "unordered"]]))).reason).toBe("Temporary review reference cannot be preimage input");
  });

  it("returns identical material for identical supplied synthetic inputs", () => {
    const createInput = () => {
      const scopeIdentity = identity("scope");
      const sourceIdentity = identity("source");
      const terms: unknown[] = [];
      const sources = [{ sourceIdentity }];
      return input({ provenance: sources }, { identity: scopeIdentity, meaning: { statement: "scope", terms } }, new Set(), new Set([scopeIdentity, sourceIdentity]), new Map([[terms, "unordered"], [sources, "unordered"]]));
    };

    expect(materializeIdentity(createInput())).toEqual(materializeIdentity(createInput()));
  });

  it("returns identical material for reversed unordered source references", () => {
    const createInput = (reversed: boolean) => {
      const scopeIdentity = identity("scope");
      const first = identity("a-source");
      const second = identity("z-source");
      const terms: unknown[] = [];
      const sources = reversed ? [{ sourceIdentity: second }, { sourceIdentity: first }] : [{ sourceIdentity: first }, { sourceIdentity: second }];
      return input({ provenance: sources }, { identity: scopeIdentity, meaning: { statement: "scope", terms } }, new Set(), new Set([scopeIdentity, first, second]), new Map([[terms, "unordered"], [sources, "unordered"]]));
    };

    expect(materializeIdentity(createInput(false))).toEqual(materializeIdentity(createInput(true)));
  });

  it("fails closed for invalid kind, malformed scope, references, and projected content", () => {
    const scopeIdentity = identity("scope");
    const terms: unknown[] = [];
    const scope = { identity: scopeIdentity, meaning: { statement: "scope", terms } };
    const orderings = new Map<readonly unknown[], "ordered" | "unordered">([[terms, "unordered"]]);

    expect(materializeIdentity({ ...input({}, scope, new Set(), new Set([scopeIdentity]), orderings), identityKind: "other" as "semantic" }).reason).toBe("Approved identity kind is required");
    expect(materializeIdentity(input({}, { meaning: { statement: "scope", terms } }, new Set(), new Set(), orderings)).reason).toBe("Semantic scope identity is missing or invalid");
    expect(materializeIdentity(input({ subject: { identity: null } }, scope, new Set(), new Set([scopeIdentity]), orderings)).reason).toBe("Malformed SemanticRef-like reference");
    expect(materializeIdentity(input({ subject: { identity: identity("unresolved") } }, scope, new Set(), new Set([scopeIdentity]), orderings)).reason).toBe("Identity dependency is unresolved");
    expect(materializeIdentity(input({ invalid: undefined }, scope, new Set(), new Set([scopeIdentity]), orderings)).reason).toBe("Projected value is not JSON serializable");
  });
});