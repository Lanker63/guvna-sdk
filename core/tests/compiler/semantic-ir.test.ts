import { describe, expect, it } from "vitest";
import { validateSemanticIR } from "../../src/compiler/semantic-ir.js";

const identity = { identityKind: "semantic", value: "abc" };
const meaning = { statement: "Meaning", terms: [] };
const scope = { identity, meaning };
const validIR = {
  irKind: "guvna-semantic-ir", irVersion: "1", semanticIdentity: identity,
  semanticScope: scope, meaning, concepts: [], relationships: [], constraints: [],
  transitions: [], derivations: [], contracts: [], realizations: [],
  authorityContext: { authorityDecisions: [], acceptances: [], uncertainty: [], contradictions: [], delegations: [] },
  provenance: { records: [], conflicts: [] }, compatibility: [],
};

describe("validateSemanticIR", () => {
  it("accepts a complete minimally populated structural IR", () => {
    expect(validateSemanticIR(validIR)).toEqual({ valid: true });
  });

  it("fails closed for an invalid nested identity or undeclared field", () => {
    expect(validateSemanticIR({ ...validIR, semanticIdentity: { identityKind: "semantic" } }).valid).toBe(false);
    expect(validateSemanticIR({ ...validIR, invented: true }).valid).toBe(false);
  });

  it("fails closed for malformed collection and context records", () => {
    expect(validateSemanticIR({ ...validIR, concepts: [{}] }).valid).toBe(false);
    expect(validateSemanticIR({ ...validIR, authorityContext: {} }).valid).toBe(false);
    expect(validateSemanticIR({ ...validIR, authorityContext: { ...validIR.authorityContext, authorityDecisions: [{}] } }).valid).toBe(false);
    expect(validateSemanticIR({ ...validIR, provenance: { records: [{}], conflicts: [] } }).valid).toBe(false);
  });
});