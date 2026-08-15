# Semantic Model / Semantic IR Doctrine-Extraction Audit

**Status:** REVIEW  
**Population:** Not retried  
**Candidate Contract:** Not generated  
**Scope:** The seven Class 1 categories from the accepted remaining-blocker inventory only

## Classification Rule

- **A:** The recorded partial result is an incomplete extraction of concrete meaning already established by accepted doctrine.
- **B:** The remaining category meaning is genuinely absent or ambiguous in accepted doctrine and requires a new human semantic decision. No value is proposed.

The audit does not treat generic Semantic Contract category names as semantic content. It also does not use implementation, Runtime, SDK, Host, Projection, repository, filesystem, process, generated output, identity, or general reference resolution as semantic authority.

## 1. Concepts — A

### Exact source passages

- `doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md`, **Semantic Contract**: a Semantic Contract is a versioned expression of accepted Guvna semantics and defines, as applicable, concepts, data structures, operations, states, transitions, invariants, authority boundaries, provenance requirements, compatibility requirements, failure behavior, and realization obligations.
- `doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Information Classes**: Authority Context, Evidence, Provisional Understanding, Candidate Statements, Authority Decision, Acceptance, Acceptance Provenance, Normalized Repository Knowledge, and Knowledge Projection are explicit semantic information classes.
- `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, **Contract Ratification and Applicability** and **Invariant 2**: Candidate, Validated, Ratified, Applicable, Superseded, and Incompatible or Rejected contracts remain distinct; Guvna owns Guvna semantics and realizations do not invent them.
- `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`, **Authority Scope**: Repository Authority is scoped and cannot be generalized to Guvna Semantic Contracts or unrelated domains.

### Concrete content extractable now

The populated model may include the explicitly named concepts and distinctions above, including:

- Semantic Contract;
- accepted Guvna meaning;
- downstream realization;
- Authority Context;
- Evidence;
- Provisional Understanding;
- Candidate Statement;
- Authority Decision;
- Acceptance;
- Acceptance Provenance;
- Normalized Repository Knowledge;
- Knowledge Projection;
- Candidate, Validated, Ratified, Applicable, Superseded, Incompatible, Rejected, and Retired contract states where already approved;
- Guvna semantic ownership; and
- Repository Authority as a separate, scoped authority boundary.

Each concept must retain its named source and must not absorb repository-specific content.

### Audit conclusion

The previous `APPLICABLE-PARTIAL` result is an incomplete extraction of doctrine-established concepts: **A**. The audit does not establish that doctrine supplies an exhaustive concept inventory for every possible parent-contract concern. Any concept not concretely defined by a named accepted source remains outside the model or is a separately reportable semantic gap; no missing concept value is proposed here.

## 2. Data Structures — B

### Exact source passages

- `CONCEPTUAL-ARCHITECTURE.md`, **Semantic Contract**: data structures are listed as a possible contract category “as applicable.”
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Contract Identity**: a Repository Adoption Contract SHOULD expose Contract Identity, Contract Version, Guvna Semantic Version, applicable Runtime Semantic Version, supported result kinds, supported transitions, and compatibility information.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Information Classes**: the contract distinguishes information classes, but these passages define their semantic meaning, not a complete parent data-structure schema.

### Audit conclusion

The current `OUTSIDE-POPULATED-MODEL` result reflects a genuine absence/ambiguity for the complete parent data-structure meaning: **B**.

The sources establish that data structures may be contract content and name some semantic records/fields for the Repository Adoption contract, but they do not establish whether those structures constitute the complete data-structure set for this approved parent Guvna Semantic Contract boundary, nor do they provide a complete parent schema. No data-structure value or human decision is proposed in this audit.

## 3. Operations — A

### Exact source passages

- `CONCEPTUAL-ARCHITECTURE.md`, **Semantic Contract**: operations are a possible contract category “as applicable.”
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Authority Decision**: an Authority Decision may accept, reject, revise, defer, or otherwise resolve a Candidate Statement according to the applicable contract.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Acceptance**: the explicit acceptance transition is Candidate Statement -> Authority Decision -> accept -> Acceptance -> Repository Truth -> Accepted Repository Knowledge.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Normalization Boundary** and **Projection Boundary**: normalization follows acceptance; projection follows normalized accepted knowledge unless an explicit contract permits provisional projection.
- Approved Gate 4 Decision Group 1: lifecycle operations and their transition preconditions are approved.
- Approved Gate 4 Decision Group 2: prior-applicable-contract to candidate compatibility evaluation and its predicates/results are approved.

### Concrete content extractable now

The model may extract these operations and transitions with their source-defined meanings:

- Authority Decision outcomes: `accept`, `reject`, `revise`, `defer`;
- Acceptance as an explicit, attributable transition;
- normalization after acceptance, preserving provenance;
- projection after normalized accepted knowledge unless explicitly permitted otherwise;
- approved lifecycle transition operations; and
- approved compatibility evaluation operation and direction.

No additional operation may be inferred from APIs, implementation, or generic IR fields.

### Audit conclusion

The previous `APPLICABLE-PARTIAL` result is an incomplete extraction of operations already concretely established by accepted doctrine and approved decisions: **A**. The audit does not claim that doctrine provides a complete operation set beyond these named operations. Any additional operation remains outside the model or requires a separate semantic-gap finding; no operation value is proposed here.

## 4. Invariants / Constraints — A

### Exact source passages

- `ARCHITECTURAL-INVARIANTS.md`, **Architectural Dependency Principle**: dependency direction runs from doctrine through Semantic Contracts and compilation to realizations; Runtime, SDK, Host, and filesystem organization cannot reverse semantic ownership.
- `ARCHITECTURAL-INVARIANTS.md`, **Contract Ratification and Applicability**: compilation, validation, ratification, and applicability are distinct; generated or consumed candidates are not automatically applicable.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 2 — Guvna Owns Guvna Semantics**: Runtime, SDK, Host, generated code, and tooling realize Guvna semantics and do not invent them.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 16 — Projection Contract Defines Projection Obligations** and **Invariant 69**: Projection Contracts specialize parent semantics and do not introduce independent Guvna semantics.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 70 — Runtime Interpretation Is Contract-Bounded**: Runtime cannot introduce obligations for implementation convenience or missing contract rules.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Acceptance**, **Normalization Boundary**, and **Projection Boundary**: acceptance is explicit and attributable; normalization preserves meaning and provenance; projections remain derivative.

### Concrete content extractable now

The model may extract the following constraints:

- doctrine precedes semantic compilation and realization;
- compilation cannot ratify or establish applicability;
- generated/persisted/consumed state cannot establish applicability;
- Guvna owns Guvna contract meaning;
- repository-specific meaning and Repository Authority remain separate;
- Runtime/SDK/Host/tooling cannot invent meaning;
- specializations preserve parent obligations;
- Runtime interpretation is contract-bounded;
- acceptance is explicit, attributable, and provenance-preserving;
- normalization cannot silently change accepted meaning; and
- projections remain derivative and cannot become authority.

### Audit conclusion

The previous `APPLICABLE-PARTIAL` result is an incomplete extraction of explicit doctrine invariants and constraints: **A**. The audit does not invent an exhaustive constraint list; any constraint not established by a named source remains unpopulated or requires a separate gap.

## 5. Failure Meanings — A

### Exact source passages

- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Diagnostics**: diagnostics communicate insufficiency, contradiction, ambiguity, invalid transition, incompatibility, missing authority, missing provenance, normalization failure, projection failure, and other contract violations; diagnostics preserve provenance and do not become Repository Knowledge.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Acceptance**: acceptance cannot be inferred from an accept label alone, persistence, normalization, projection, execution, model confidence, consensus, or Host behavior.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Normalization Boundary**: semantic reinterpretation during normalization requires the applicable authority process.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 72 — Compatibility Is Multi-Dimensional**: `Indeterminate` is distinct and cannot silently become `Compatible` or `Incompatible`.
- Approved Gate 4 Decision Groups 1 and 2: unsupported, ambiguous, conflicting, stale, or missing transition/compatibility inputs fail closed; compatibility results are `compatible`, `incompatible`, or `indeterminate`.

### Concrete content extractable now

The model may extract these named failure meanings:

- insufficiency;
- contradiction;
- ambiguity;
- invalid transition;
- incompatibility;
- missing authority;
- missing provenance;
- normalization failure;
- projection failure;
- unsupported/stale/conflicting transition or compatibility input;
- and indeterminate compatibility.

Each diagnostic remains non-authoritative, provenance-bearing, and distinct from accepted meaning.

### Audit conclusion

The previous `APPLICABLE-PARTIAL` result is an incomplete extraction of failure meanings explicitly established by accepted doctrine and approved decisions: **A**. The audit does not establish an additional universal failure taxonomy. Failure meanings not named by accepted sources remain outside the model or are a separate semantic gap; no classification value is proposed.

## 6. Common Realization Obligations — A

### Exact source passages

- `CONCEPTUAL-ARCHITECTURE.md`, **Semantic Contract**: the contract defines obligations required of downstream realizations and includes realization obligations as applicable.
- `CONCEPTUAL-ARCHITECTURE.md`, **Runtime Contract**: a Runtime Contract derives from and remains within the parent boundary, preserving parent obligations and not introducing independent Guvna semantics.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 2**: Runtime, SDK, Host, generated code, and tooling realize Guvna semantics and do not invent them.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 69**: Projection Contracts specialize an applicable parent without weakening or redefining governing obligations.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 70**: Runtime interprets only within applicable contract semantics and cannot add obligations for implementation convenience.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Projection Contract Boundary**: Projection Contracts define projection obligations; Governance Projections provide repository-owned meaning.

### Concrete content extractable now

The parent-bound common obligations are:

- downstream realizations must honor the parent Semantic Contract;
- realizations must preserve the parent semantic boundary and obligations;
- realizations cannot introduce independent Guvna semantics;
- Runtime interpretation must remain contract-bounded;
- Projection Contracts must specialize, not weaken or redefine, parent obligations; and
- repository-owned projection content remains distinct from Guvna-owned projection obligations.

Runtime-, SDK-, Host-, and Projection-specific obligations are not common parent obligations unless separately established by named doctrine.

### Audit conclusion

The previous `APPLICABLE-PARTIAL` result is an incomplete extraction of common parent-boundary obligations explicitly established by doctrine: **A**. The audit does not resolve the boundary of any specialization-specific obligations; those remain outside this parent extraction.

## 7. Interpretation Rules for Included Concepts — A

### Exact source passages

- `CONCEPTUAL-ARCHITECTURE.md`, **Invariant 15 — Semantic Contract Defines Interpretation**: Semantic Contracts define how downstream realizations interpret Guvna-owned semantics and repository-specific inputs; Runtime interprets projections according to the applicable contract and cannot invent repository semantics outside it.
- `ARCHITECTURAL-INVARIANTS.md`, **Invariant 70 — Runtime Interpretation Is Contract-Bounded**: Runtime interprets governed inputs only within applicable Semantic Contract and Projection Contract semantics.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Fundamental Principle**: Host carries adoption information, Core defines what it means, and Repository Authority determines what becomes accepted; Host and models do not invent adoption semantics.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Acceptance**, **Normalization Boundary**, and **Projection Boundary**: acceptance is explicit; normalization preserves accepted meaning; projections are derivative and remain bounded by contracts.
- `SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`, **Canonical Principle**: semantic identity/meaning precede and govern filesystem realization; filesystem organization cannot become canonical semantic meaning.

### Concrete content extractable now

For each included concept, the model may record these interpretation rules where applicable:

- interpret Guvna-owned semantics through the Semantic Contract;
- interpret repository-specific inputs only within the contract boundary;
- do not treat Host, model, Runtime, SDK, filesystem, or generated state as semantic authority;
- require Repository Authority acceptance for accepted repository-specific meaning;
- preserve acceptance, provenance, uncertainty, contradiction, lifecycle, and realization distinctions;
- normalize only without silently changing accepted meaning; and
- treat projections and realizations as derivative, contract-bounded representations.

### Audit conclusion

The previous “complete interpretation rules not established” result is an incomplete extraction of interpretation rules already established for the included concepts: **A**. The sources do not provide a complete domain-specific interpretation for every possible concept; concepts without a named concrete interpretation remain outside the populated model or are a separate gap. No interpretation is inferred here.

## Summary

| Category | Classification | Audit result |
|---|---|---|
| Concepts | A | Concrete concepts and distinctions are explicitly established and were only partially extracted. |
| Data structures | B | No complete parent data-structure meaning/schema is established by accepted doctrine. |
| Operations | A | Acceptance, normalization, projection, lifecycle, and compatibility operations are explicitly established but incomplete extraction remains. |
| Invariants/constraints | A | Multiple parent invariants are explicit and extractable with provenance. |
| Failure meanings | A | Diagnostics and fail-closed/indeterminate meanings are explicitly established and extractable. |
| Common realization obligations | A | Parent-preservation and contract-bounded realization obligations are explicit and extractable. |
| Interpretation rules | A | Contract-bounded, authority-preserving interpretation rules are explicit and extractable. |

## Genuine Semantic Decision Identified

Only the following Class 1 category is classified **B** by this audit:

- **Data structures:** the exact complete parent data-structure meaning and applicability are absent/ambiguous in accepted doctrine. No value is proposed.

For categories classified **A**, the audit supports further deterministic extraction of the listed source-grounded content. It does not authorize inference of omitted content or claim that every possible generic category member is applicable.

**Current status:** `REVIEW`  
**Population:** not retried  
**Candidate Contract:** not generated
