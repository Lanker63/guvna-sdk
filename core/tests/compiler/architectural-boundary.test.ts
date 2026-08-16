import { describe, expect, it } from "vitest";
import { architecturalDependencies, createValidatedArchitecturalBoundary, repositoryProjectionDependencies, validateArchitecturalBoundary, validateArchitecturalDependencyProjection, type ArchitecturalBinding } from "../../src/compiler/architectural-boundary.js";
import { createBoundedArchitecturalView } from "../../src/compiler/architectural-view.js";
import { architecturalModel, validateArchitecturalModel } from "../../src/compiler/architectural-model.js";
import { canonicalModel } from "../../src/compiler/canonical-model.js";

const ir = {
  irKind: "guvna-semantic-ir" as const, irVersion: "1", semanticIdentity: { identityKind: "semantic", value: "abc" },
  semanticVersion: { value: "1.0.0", semanticIdentity: { identity: { identityKind: "semantic", value: "abc" } }, scope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } } },
  semanticScope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } }, meaning: { statement: "Meaning", terms: [] },
  concepts: [], relationships: [], constraints: [], transitions: [], derivations: [], contracts: [{ identity: { identityKind: "semantic", value: "contract" }, version: { value: "1.0.0", semanticIdentity: { identity: { identityKind: "semantic", value: "contract" } }, scope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } } }, contractKind: "runtime" as const, lifecycle: { lifecycleState: { identity: { identityKind: "semantic", value: "active" } }, transitions: [] }, applicability: { applicable: true as const, scope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } }, conditions: [], authorityDecision: { identity: { identityKind: "semantic", value: "apply" } }, provenance: [] }, ratification: { ratified: true, requiresHumanAuthority: true, authorityDecision: { identity: { identityKind: "semantic", value: "ratify" } }, provenance: [] }, provenance: [] }], realizations: [{ identity: { identityKind: "semantic", value: "runtime" }, realizationKind: "runtime" as const, realizes: { identity: { identityKind: "semantic", value: "abc" } }, conformsTo: [{ identity: { identityKind: "semantic", value: "contract" } }], compatibility: { requirements: [], result: "compatible" as const, provenance: [] }, provenance: [] }],
  authorityContext: { authorityDecisions: [{ identity: { identityKind: "semantic", value: "apply" }, authorityIdentity: { identity: { identityKind: "semantic", value: "authority" }, principal: { identity: { identityKind: "semantic", value: "principal" } }, provenance: [] }, subject: { identity: { identityKind: "semantic", value: "contract" } }, scope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } }, subjectContractIdentity: { identityKind: "semantic", value: "contract" }, subjectContractVersion: "1.0.0", decision: "apply" as const, provenance: [] }, { identity: { identityKind: "semantic", value: "ratify" }, authorityIdentity: { identity: { identityKind: "semantic", value: "authority" }, principal: { identity: { identityKind: "semantic", value: "principal" } }, provenance: [] }, subject: { identity: { identityKind: "semantic", value: "contract" } }, scope: { identity: { identityKind: "semantic", value: "abc" }, meaning: { statement: "Meaning", terms: [] } }, subjectContractIdentity: { identityKind: "semantic", value: "contract" }, subjectContractVersion: "1.0.0", decision: "ratify" as const, provenance: [] }], acceptances: [], uncertainty: [], contradictions: [], delegations: [] }, provenance: { records: [], conflicts: [] }, compatibility: [],
};

const binding = (identity: string, layer: ArchitecturalBinding["layer"], owner: ArchitecturalBinding["owner"] = "guvna", path: ArchitecturalBinding["path"] = "guvna", contentOwner: ArchitecturalBinding["contentOwner"] = owner): ArchitecturalBinding => ({ identity: { identityKind: "semantic", value: identity }, path, layer, owner, contentOwner, provenance: [{ sourceIdentity: { identityKind: "semantic", value: "abc" } }] });
const completeBindings = [binding("abc", "canonical"), binding("contract", "contract"), binding("runtime", "realization", "runtime"), binding("apply", "ratification"), binding("ratify", "ratification")];

describe("architectural boundary", () => {
  it("validates the complete doctrine dependency projection", () => {
    expect(validateArchitecturalDependencyProjection()).toEqual({ ok: true });
    expect(validateArchitecturalModel(architecturalModel, architecturalDependencies)).toEqual({ ok: true });
    expect(architecturalDependencies.map(({ source, target }) => [source, target])).toEqual([
      ["doctrine", "canonical"], ["canonical", "architectural"], ["architectural", "contract"], ["contract", "compilation"], ["compilation", "candidate"],
      ["candidate", "validation"], ["validation", "ratification"], ["ratification", "applicable"], ["applicable", "realization"],
    ]);
    expect(repositoryProjectionDependencies.map(({ source, target }) => [source, target])).toEqual([
      ["repository", "accepted-knowledge"], ["accepted-knowledge", "understanding"], ["understanding", "governance"],
      ["governance", "projection-compilation"], ["projection-compilation", "governance-projection"], ["governance-projection", "projection-contract"], ["projection-contract", "runtime"],
    ]);
  });

  it("fails closed for an incomplete architectural concept surface", () => {
    expect(validateArchitecturalModel({ concepts: architecturalModel.concepts.slice(1) }, architecturalDependencies)).toEqual({ ok: false, reason: "Architectural concept inventory is incomplete" });
  });

  it("fails closed when an architectural concept meaning drifts from its governing source", () => {
    expect(validateArchitecturalModel({ ...architecturalModel, concepts: [{ ...architecturalModel.concepts[0], meaning: "invented" }, ...architecturalModel.concepts.slice(1)] }, architecturalDependencies)).toEqual({ ok: false, reason: "Architectural concept does not conform to governing source" });
  });

  it("accepts complete attributable bindings", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: completeBindings, canonicalModel })).toEqual({ ok: true });
  });

  it("rejects a realization without an applicable ratified contract", () => {
    const result = createBoundedArchitecturalView({ ...ir, realizations: [{ ...ir.realizations[0], conformsTo: [], compatibility: { ...ir.realizations[0].compatibility, result: "compatible" as const } }] });
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: completeBindings, canonicalModel })).toEqual({ ok: false, reason: "Realization contract applicability is invalid" });
  });

  it("rejects a realization with indeterminate compatibility", () => {
    const result = createBoundedArchitecturalView({ ...ir, realizations: [{ ...ir.realizations[0], compatibility: { ...ir.realizations[0].compatibility, result: "indeterminate" as const } }] });
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: completeBindings, canonicalModel })).toEqual({ ok: false, reason: "Realization contract applicability is invalid" });
  });

  it("fails closed when a binding is missing", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "canonical")], canonicalModel })).toEqual({ ok: false, reason: "Architectural binding is missing" });
  });

  it("fails closed when Guvna meaning is not Guvna-owned", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "canonical", "runtime"), binding("runtime", "realization", "runtime")], canonicalModel })).toEqual({ ok: false, reason: "Guvna semantic meaning must be Guvna-owned" });
  });

  it("accepts Governed Repository-owned projection meaning on the repository path", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "governance-projection", "governed-repository", "repository"), ...completeBindings.filter((candidate) => candidate.identity.value !== "abc")], canonicalModel })).toEqual({ ok: true });
  });

  it("requires an identity-specific contract boundary for repository projections", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "projection-contract", "governed-repository", "repository"), ...completeBindings.filter((candidate) => candidate.identity.value !== "abc")], canonicalModel })).toEqual({ ok: false, reason: "Repository projection contract has no attributable Guvna contract boundary" });
  });

  it("rejects repository-owned Runtime semantics", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "governance-projection", "governed-repository", "repository"), binding("runtime", "runtime", "governed-repository", "repository")], canonicalModel })).toEqual({ ok: false, reason: "Runtime semantics must remain Guvna-owned or Runtime-realized" });
  });

  it("provides an integrated validated boundary result", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(createValidatedArchitecturalBoundary({ view: result.view, bindings: completeBindings, canonicalModel }).ok).toBe(true);
  });

  it("rejects a realization promoted to a semantic source layer", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [...completeBindings.filter((candidate) => candidate.identity.value !== "runtime"), binding("runtime", "contract", "guvna")], canonicalModel })).toEqual({ ok: false, reason: "Realization boundary is invalid" });
  });

  it("rejects a realization whose binding owner disagrees with its realization kind", () => {
    const result = createBoundedArchitecturalView({ ...ir, realizations: [{ ...ir.realizations[0], realizationKind: "sdk" as const }] });
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "canonical"), binding("contract", "contract"), binding("runtime", "realization", "host") , binding("apply", "ratification"), binding("ratify", "ratification")], canonicalModel })).toEqual({ ok: false, reason: "Realization owner does not match realization kind" });
  });

  it("rejects content ownership that is detached from semantic ownership", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "canonical", "guvna", "guvna", "runtime"), binding("runtime", "realization", "runtime", "guvna", "runtime")], canonicalModel })).toEqual({ ok: false, reason: "Architectural content ownership must match semantic ownership" });
  });

  it("rejects a derivation from a downstream realization into an upstream layer", () => {
    const derivedIR = { ...ir, derivations: [{ identity: { identityKind: "semantic", value: "derivation" }, sources: [{ identity: { identityKind: "semantic", value: "runtime" } }], result: { identity: { identityKind: "semantic", value: "abc" } }, relation: "derives" as const, transformation: { statement: "derived", terms: [] }, provenance: [] }] };
    const result = createBoundedArchitecturalView(derivedIR);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [...completeBindings, binding("derivation", "canonical")], canonicalModel })).toEqual({ ok: false, reason: "Architectural dependency direction is invalid" });
  });

  it("requires bindings for every identity-bearing IR element", () => {
    const relationshipIR = { ...ir, relationships: [{ identity: { identityKind: "semantic", value: "relationship" }, subject: { identity: ir.semanticIdentity }, predicate: { identity: ir.semanticIdentity }, object: { identity: ir.semanticIdentity }, scope: ir.semanticScope, constraints: [], provenance: [] }] };
    const result = createBoundedArchitecturalView(relationshipIR);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "canonical"), binding("runtime", "realization", "runtime")], canonicalModel })).toEqual({ ok: false, reason: "Architectural binding is missing" });
  });

  it("rejects unresolved binding provenance", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [{ ...binding("abc", "canonical"), provenance: [{ sourceIdentity: { identityKind: "semantic", value: "missing" } }] }, binding("runtime", "realization", "runtime")], canonicalModel })).toEqual({ ok: false, reason: "Architectural binding provenance is unresolved" });
  });

  it("rejects a repository binding on the Guvna path", () => {
    const result = createBoundedArchitecturalView(ir);
    expect(result.ok).toBe(true);
    if (result.ok) expect(validateArchitecturalBoundary({ view: result.view, bindings: [binding("abc", "governance-projection", "governed-repository"), binding("runtime", "realization", "runtime")], canonicalModel })).toEqual({ ok: false, reason: "Architectural binding crosses semantic paths" });
  });
});