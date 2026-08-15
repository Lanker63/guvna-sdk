# Semantic Model / Semantic IR Population Execution

**Process:** approved Semantic Model / Semantic IR population re-run
**Result:** `COMPLETE-PENDING-HUMAN-DECISION`
**Review status:** review-bound; approval not recorded; returned for the separate Gate 4-input decision
**Applicability rule:** Candidate A scope, approved Alternative 3, and approved Alternative 1 parent data-structure disposition
**Audit input:** `.guvna/agent-state/evidence/semantic-model-ir-doctrine-extraction-audit.md`

## Scope binding

**Subject:** Guvna-owned Semantic Contract expressing accepted Guvna meaning.
**Boundary:** Guvna Semantic Contract semantic boundary, with parent-contract
context and no Runtime, SDK, Host, or Projection specialization.

Included only when established by an approved input or named accepted
`doctrine/core/**` source: Guvna-owned concepts, interpretation rules, states,
transitions, invariants, authority boundaries, provenance, compatibility,
failure, and realization obligations. Excluded: repository truth/content,
Repository Authority, Runtime/SDK implementation, Host behavior, Projection
content, filesystem realization, package/process state, and generated output.

## Source and semantic extraction map

| Source | Extracted semantic elements | Status |
|---|---|---|
| `doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md` | Semantic Contract as versioned expression of accepted Guvna semantics; obligations and interpretation rules; Guvna ownership; realization boundary; parent-contract specialization boundary | Included |
| `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md` | doctrine-to-contract dependency; compilation/validation/ratification/applicability distinction; lifecycle-state distinguishability; no realization as semantic source; provenance, compatibility, and authority boundaries | Included |
| `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md` | semantic meaning/lifecycle/provenance/realization separation; filesystem and generated output are not semantic sources; identity excluded from this population | Included except identity, which is out of scope |
| `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md` | Guvna semantic authority versus Repository Authority; acceptance and authority scope; no authority generalization | Included |
| `doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` | named concrete information classes, state/transition preconditions, authority context, provenance, normalization, projection boundary, compatibility context, and fail-closed adoption behavior | Included where parent-boundary meaning is explicit; repository-specific content excluded |
| approved Gate 4 Decision Groups 1 and 2, as named by the accepted audit | lifecycle operations and transition preconditions; compatibility evaluation and predicates/results | Included only as the audit states them |

Gate 1 remains a non-authoritative `REVIEW` design sketch. The proposal
approving Alternative 3 is an authority input and not itself semantic content.

## Populated Semantic Model / IR elements and provenance

Each element below is traceable to the source map above; no element is inferred
from category presence or implementation structure.

| Element | Populated meaning | Provenance |
|---|---|---|
| concepts | Semantic Contract; accepted Guvna meaning; downstream realization; Authority Context; Evidence; Provisional Understanding; Candidate Statement; Authority Decision; Acceptance; Acceptance Provenance; Normalized Repository Knowledge; Knowledge Projection; named contract states; Guvna semantic ownership; scoped Repository Authority | `CONCEPTUAL-ARCHITECTURE.md` (Semantic Contract); `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Information Classes); `ARCHITECTURAL-INVARIANTS.md` (Contract Ratification and Applicability; Invariant 2); `EPISTEMIC-INVARIANTS.md` (Authority Scope) |
| operations | Authority Decision outcomes `accept`, `reject`, `revise`, `defer`; Acceptance transition; normalization after acceptance; projection after normalized accepted knowledge; approved lifecycle operations; approved compatibility evaluation | `CONCEPTUAL-ARCHITECTURE.md` (Semantic Contract); `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Authority Decision, Acceptance, Normalization Boundary, Projection Boundary); approved Gate 4 Decision Groups 1 and 2 |
| invariants and constraints | doctrine precedes compilation and realization; compilation cannot ratify/apply; generated or consumed state cannot establish applicability; Guvna owns Guvna meaning; realization cannot invent meaning; specializations preserve parent obligations; Runtime interpretation is contract-bounded; acceptance is explicit/attributable/provenance-preserving; normalization preserves meaning; projections remain derivative | `ARCHITECTURAL-INVARIANTS.md` (Architectural Dependency Principle; Contract Ratification and Applicability; Invariant 2; Invariants 16, 69, 70); `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Acceptance, Normalization Boundary, Projection Boundary) |
| failure meanings | insufficiency; contradiction; ambiguity; invalid transition; incompatibility; missing authority; missing provenance; normalization failure; projection failure; unsupported/stale/conflicting transition or compatibility input; indeterminate compatibility | `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Diagnostics, Acceptance, Normalization Boundary); `ARCHITECTURAL-INVARIANTS.md` (Invariant 72); approved Gate 4 Decision Groups 1 and 2 |
| common realization obligations | honor parent Semantic Contract; preserve parent boundary and obligations; do not introduce independent Guvna semantics; remain contract-bounded; specialize without weakening/redefining parent obligations; keep repository-owned projection content distinct from Guvna-owned obligations | `CONCEPTUAL-ARCHITECTURE.md` (Semantic Contract; Runtime Contract); `ARCHITECTURAL-INVARIANTS.md` (Invariants 2, 69, 70); `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Projection Contract Boundary) |
| interpretation rules | interpret Guvna-owned semantics through the Semantic Contract; constrain repository inputs to the contract boundary; do not treat Host/model/Runtime/SDK/filesystem/generated state as authority; require Repository Authority acceptance; preserve acceptance, provenance, uncertainty, contradiction, lifecycle, and realization distinctions; normalize without silent reinterpretation; keep projections and realizations derivative and contract-bounded | `CONCEPTUAL-ARCHITECTURE.md` (Invariant 15); `ARCHITECTURAL-INVARIANTS.md` (Invariant 70); `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` (Fundamental Principle, Acceptance, Normalization Boundary, Projection Boundary); `SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md` (Canonical Principle) |

## Category applicability report

| Generic category | Determination | Basis or disposition |
|---|---|---|
| concepts | `APPLICABLE` (bounded) | all audit-listed A content extracted; no exhaustive inventory claimed |
| data structures | `OUTSIDE-POPULATED-MODEL` | no complete parent data-structure meaning is named by accepted sources |
| operations | `APPLICABLE` (bounded) | all audit-listed operations extracted; no omitted operation inferred |
| states | `APPLICABLE` | Gate 4 lifecycle vocabulary and Gate 2 distinctions |
| transitions | `APPLICABLE` | Gate 4 transition matrix and preconditions |
| invariants/constraints | `APPLICABLE` (bounded) | all audit-listed constraints extracted; no exhaustive inventory claimed |
| authority boundaries | `APPLICABLE` | Guvna/Repository Authority and realization boundaries are explicit |
| provenance requirements | `APPLICABLE` | provenance preservation and attribution are explicit |
| compatibility requirements | `APPLICABLE` | approved Gate 4 Group 2 schema, predicates, results, and direction |
| failure behavior | `APPLICABLE` (bounded) | all audit-listed meanings extracted; no broader taxonomy inferred |
| realization obligations | `APPLICABLE` (bounded) | parent obligations extracted; specialization-only obligations excluded |

## Data-structure applicability disposition

Approved Alternative 1 resolves the parent data-structure category without
introducing a schema: the Candidate A parent Guvna Semantic Contract has no
separately required concrete data-structure schema at this stage.

Repository Adoption structures remain specialization structures; Repository
Understanding and Knowledge System structures remain repository-specific;
indexes, manifests, and registries remain derivative/realization structures;
Host, SDK, Runtime, and Projection structures remain realization or
specialization structures; and the canonical artifact metadata surface remains
a semantic requirement without a concrete representation.

Accordingly, `data structures` is represented as `NOT-REQUIRED-AT-PARENT`
with provenance to the approved Alternative 1 disposition and the proposal's
accepted source classifications. This is an explicit applicability result,
not a schema and not an inference from the generic category name.

## Unsupported and ambiguous categories

No in-scope semantic category remains unsupported or ambiguous after the
approved Alternative 1 disposition. Other categories remain bounded to the
exact audit-listed content; absence of an exhaustive generic inventory is not
filled by inference.

## Reference resolution and identity disposition

General reference resolution was not performed, as expressly required. No
target was guessed or merged.

Deterministic identity was not derived. Identity is outside this approved
population decision, and no identity preimage or digest is emitted.

## Deterministic population evidence

The extraction order is the fixed source map order above, followed by the
approved Gate 2 decisions and Gate 4 decision groups. Each included element has
one or more named sources, and equivalent boundary statements are normalized
without changing meaning. Unsupported categories are retained as explicit
dispositions. Repeating the process with the same source contents and approved
inputs yields the same rows, meanings, provenance, and blockers; no filesystem,
discovery, insertion, timestamp, implementation, or generated value affects
the result.

No Candidate Semantic Contract, artifact, path designation, authority-ledger
update, ratification, applicability result, or approval claim was produced.

## Required human decision

**APPROVE** the populated Semantic Model/Semantic IR as complete and suitable
Gate 4 input, or **REVISE / BLOCK**.

This output records the required separate human decision and does not mark the
instance approved, generate a Candidate Semantic Contract, ratify/apply it, or
reopen Gate 2/Gate 4 decisions.
