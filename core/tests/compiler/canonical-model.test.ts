import { describe, expect, it } from "vitest";
import { extractCanonicalDoctrineAuthority } from "../../src/compiler/canonical-doctrine-authority.js";
import { canonicalConceptNames, canonicalMeanings, canonicalModel, canonicalRelationships, validateCanonicalModel } from "../../src/compiler/canonical-model.js";

describe("canonical model", () => {
  it("rejects altered doctrine inventory during extraction", () => {
    expect(() => extractCanonicalDoctrineAuthority("# Canonical Epistemic Concepts\n\n1. Invented")).toThrow("Missing doctrine section");
  });

  it("realizes the doctrine-named concepts with attribution", () => {
    expect(canonicalModel.map((concept) => concept.name)).toEqual(canonicalConceptNames);
    expect(Object.fromEntries(canonicalModel.map((concept) => [concept.name, concept.meaning]))).toEqual(canonicalMeanings);
    expect(validateCanonicalModel(canonicalModel)).toEqual({ ok: true });
  });

  it("realizes the doctrine-defined canonical epistemic relationship", () => {
    const relationships = canonicalModel.flatMap((concept) => concept.relationships).sort((left, right) => canonicalRelationships.indexOf(left) - canonicalRelationships.indexOf(right));
    expect(relationships).toEqual(canonicalRelationships);
  });

  it("fails closed when a concept loses source attribution", () => {
    const withoutAttribution = canonicalModel.map((concept, index) => index === 0 ? { ...concept, sourceAttributions: [] } : concept);
    expect(validateCanonicalModel(withoutAttribution)).toEqual({ ok: false, reason: "Canonical concepts require unique names and source attribution" });
  });

  it("fails closed when a concept loses its doctrine-defined meaning", () => {
    const withoutMeaning = canonicalModel.map((concept, index) => index === 0 ? { ...concept, meaning: "" } : concept);
      expect(validateCanonicalModel(withoutMeaning)).toEqual({ ok: false, reason: "Canonical concept meaning does not match doctrine" });
  });

  it("fails closed when a concept attribution is replaced", () => {
    const altered = canonicalModel.map((concept, index) => index === 0 ? { ...concept, sourceAttributions: [{ source: "other-doctrine", section: "Canonical Epistemic Concepts" }] } : concept);
    expect(validateCanonicalModel(altered)).toEqual({ ok: false, reason: "Canonical source attribution does not match doctrine" });
  });

  it("fails closed when a concept meaning is replaced with another non-empty meaning", () => {
    const altered = canonicalModel.map((concept, index) => index === 0 ? { ...concept, meaning: "different" } : concept);
    expect(validateCanonicalModel(altered)).toEqual({ ok: false, reason: "Canonical concept meaning does not match doctrine" });
  });

  it("fails closed when a canonical relationship loses attribution", () => {
    const withoutRelationshipAttribution = canonicalModel.map((concept, index) => index === 0 ? { ...concept, relationships: concept.relationships.map((relationship) => ({ ...relationship, sourceAttributions: [] })) } : concept);
    expect(validateCanonicalModel(withoutRelationshipAttribution)).toEqual({ ok: false, reason: "Canonical relationships must be attributable and target known concepts" });
  });

  it("fails closed when a canonical relationship attribution is replaced", () => {
    const altered = canonicalModel.map((concept, index) => index === 0 ? { ...concept, relationships: concept.relationships.map((relationship) => ({ ...relationship, sourceAttributions: [{ source: "other-doctrine" }] })) } : concept);
    expect(validateCanonicalModel(altered)).toEqual({ ok: false, reason: "Canonical relationship attribution does not match doctrine" });
  });

  it("fails closed when an additional canonical relationship is supplied", () => {
    const expanded = canonicalModel.map((concept, index) => index === 0 ? { ...concept, relationships: [...concept.relationships, { subject: concept.name, predicate: "flows-to" as const, object: "Evidence" as const, sourceAttributions: [{ source: "doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md", section: "Canonical Epistemic Relationship" }] }] } : concept);
    expect(validateCanonicalModel(expanded)).toEqual({ ok: false, reason: "Canonical relationship inventory does not match doctrine" });
  });

  it("fails closed when an extra concept is supplied", () => {
    const expanded = [...canonicalModel, { name: "invented" as never, sourceAttributions: [{ source: "doctrine" }] }];
    expect(validateCanonicalModel(expanded)).toEqual({ ok: false, reason: "Canonical concept inventory is incomplete or expanded" });
  });
});