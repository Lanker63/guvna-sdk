import { describe, expect, it } from "vitest";
import { determineApplicability } from "../../src/compiler/applicability-determination.js";

const validInputs = {
  subjectContractIdentity: "contract-1",
  subjectSemanticVersion: "1.0.0",
  authority: {
    authorityIdentity: "authority-1",
    decisionIdentity: "decision-1",
    decisionVersion: "1",
    subjectContractIdentity: "contract-1",
    subjectContractVersion: "1.0.0",
    attribution: "human-authority",
    decision: "applicable" as const,
    provenance: { source: "authority" },
    status: "valid" as const,
  },
  governedScope: "Guvna Semantic Contract semantic boundary",
  subjectScope: "Guvna-owned Semantic Contract expressing accepted Guvna meaning",
  validated: true,
  ratification: {
    ratified: true,
    decision: "ratify" as const,
    authorityIdentity: "ratifying-authority-1",
    decisionIdentity: "ratification-1",
    decisionVersion: "1",
    contractIdentity: "contract-1",
    contractVersion: "1.0.0",
    subjectScope: "Guvna-owned Semantic Contract expressing accepted Guvna meaning",
    governedScope: "Guvna Semantic Contract semantic boundary",
    provenance: { source: "ratification" },
  },
  validity: { status: "valid" as const, provenance: { source: "validity" } },
  effectiveBoundary: {
    status: "valid" as const,
    provenance: { source: "effective-boundary" },
  },
};

describe("determineApplicability", () => {
  it("returns applicable when authoritative inputs satisfy every condition", () => {
    const result = determineApplicability(validInputs);

    expect(result).toEqual({
      result: "applicable",
      provenance: {
        authority: validInputs.authority.provenance,
        ratification: validInputs.ratification.provenance,
        validity: validInputs.validity.provenance,
        effectiveBoundary: validInputs.effectiveBoundary.provenance,
      },
    });
  });

  it("fails closed when the contract has not crossed the ratification boundary", () => {
    expect(
      determineApplicability({ ...validInputs, ratification: { ...validInputs.ratification, ratified: false } }).result,
    ).toBe("indeterminate");
  });

  it.each([
    ["contract identity", { contractIdentity: "other-contract" }],
    ["contract version", { contractVersion: "2.0.0" }],
    ["decision kind", { decision: "apply" as never }],
  ])("fails closed for a mismatched ratification %s", (_name, change) => {
    expect(
      determineApplicability({
        ...validInputs,
        ratification: { ...validInputs.ratification, ...change },
      }).result,
    ).toBe("indeterminate");
  });

  it("returns not-applicable for an explicit external decision", () => {
    const result = determineApplicability({
      ...validInputs,
      authority: { ...validInputs.authority, decision: "not-applicable" },
    });

    expect(result).toEqual({
      result: "not-applicable",
      provenance: {
        authority: validInputs.authority.provenance,
        ratification: validInputs.ratification.provenance,
        validity: validInputs.validity.provenance,
        effectiveBoundary: validInputs.effectiveBoundary.provenance,
      },
    });
  });

  it("returns indeterminate when required inputs are absent", () => {
    const result = determineApplicability(undefined);

    expect(result).toEqual({ result: "indeterminate", provenance: undefined });
  });

  it("accepts an independently distinct valid subject scope", () => {
    const result = determineApplicability({
      ...validInputs,
      subjectScope: "Guvna-owned Semantic Contract for accepted meaning",
      ratification: {
        ...validInputs.ratification,
        subjectScope: "Guvna-owned Semantic Contract for accepted meaning",
      },
    });

    expect(result.result).toBe("applicable");
  });

  it("fails closed when the governed scope does not match exactly", () => {
    const result = determineApplicability({
      ...validInputs,
      governedScope: "Guvna Semantic Contract semantic boundary ",
    });

    expect(result.result).toBe("indeterminate");
  });

  it.each([undefined, "", 42, null])(
    "fails closed for a missing or invalid subject scope: %s",
    (subjectScope) => {
      expect(
        determineApplicability({
          ...validInputs,
          subjectScope: subjectScope as never,
        }).result,
      ).toBe("indeterminate");
    },
  );

  it("fails closed when validity or effective-boundary conditions fail", () => {
    expect(
      determineApplicability({
        ...validInputs,
        validity: { ...validInputs.validity, status: "invalid" },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        effectiveBoundary: {
          ...validInputs.effectiveBoundary,
          status: "stale",
        },
      }).result,
    ).toBe("indeterminate");
  });

  it("preserves every input provenance for an indeterminate result", () => {
    const authorityProvenance = { source: "authority-2" };
    const validityProvenance = { source: "validity-2" };
    const effectiveBoundaryProvenance = { source: "boundary-2" };

    expect(
      determineApplicability({
        ...validInputs,
        authority: {
          ...validInputs.authority,
          provenance: authorityProvenance,
        },
        validity: { ...validInputs.validity, provenance: validityProvenance },
        effectiveBoundary: {
          ...validInputs.effectiveBoundary,
          provenance: effectiveBoundaryProvenance,
        },
        validated: false,
      }).provenance,
    ).toEqual({
      authority: authorityProvenance,
      ratification: validInputs.ratification.provenance,
      validity: validityProvenance,
      effectiveBoundary: effectiveBoundaryProvenance,
    });
  });

  it("fails closed for a missing authority identity", () => {
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, authorityIdentity: "" },
      }).result,
    ).toBe("indeterminate");
  });

  it.each([
    "ambiguous",
    "conflicting",
    "stale",
    "revoked",
    "unsupported",
  ] as const)("fails closed for %s authority input", (status) => {
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, status },
      }).result,
    ).toBe("indeterminate");
  });

  it("fails closed for missing authority or evidence", () => {
    expect(
      determineApplicability({
        ...validInputs,
        authority: undefined as never,
      }),
    ).toEqual({
      result: "indeterminate",
      provenance: {
        authority: undefined,
        ratification: validInputs.ratification.provenance,
        validity: validInputs.validity.provenance,
        effectiveBoundary: validInputs.effectiveBoundary.provenance,
      },
    });
    expect(
      determineApplicability({
        ...validInputs,
        validity: undefined as never,
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, decisionIdentity: "" },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, decisionVersion: "" },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, attribution: "" },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, provenance: undefined as never },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        validity: { status: "valid", provenance: undefined as never },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        validity: undefined as never,
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        effectiveBoundary: {
          status: "valid",
          provenance: undefined as never,
        },
      }).result,
    ).toBe("indeterminate");
    expect(
      determineApplicability({
        ...validInputs,
        effectiveBoundary: undefined as never,
      }).result,
    ).toBe("indeterminate");
  });

  it("fails closed for an invalid authority decision value", () => {
    expect(
      determineApplicability({
        ...validInputs,
        authority: { ...validInputs.authority, decision: "approved" as never },
      }).result,
    ).toBe("indeterminate");
  });

  it("only evaluates supplied decisions and cannot ratify a contract", () => {
    const inputs = structuredClone(validInputs);

    expect(determineApplicability(inputs).result).toBe("applicable");
    expect(inputs.authority.decision).toBe("applicable");
    expect(
      Object.keys(determineApplicability(inputs)).sort(),
    ).toEqual(["provenance", "result"]);
  });

  it("does not mutate authority input", () => {
    const inputs = structuredClone(validInputs);
    const before = structuredClone(inputs);

    determineApplicability(inputs);

    expect(inputs).toEqual(before);
  });
});
