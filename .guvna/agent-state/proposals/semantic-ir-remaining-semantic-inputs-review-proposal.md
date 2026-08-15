# SemanticIR Remaining Semantic Inputs Review Proposal

**State:** REVIEW
**Scope:** Only the remaining semantic or representation inputs before a later
SemanticIR materialization. The approved `identityKind = semantic` policy is
preserved and is not reopened.

## Purpose

This proposal answers: **What semantic or representation decisions remain
before SemanticIR materialization?** It considers only C09, K01-K08, and
provenance-record ordering. It does not reopen the approved Parent Semantic
Inventory, identity-kind policy, or Semantic Model-to-SemanticIR boundary.

This proposal does not authorize identity values, canonical preimages,
SHA-256 digests, SemanticIR materialization, Contract generation, ratification,
applicability, artifacts, workspace paths, realization, or implementation
changes.

## Governing Basis

- `docs/implementation/GUVNA-PARENT-SEMANTIC-SELECTION-DECISION-PACKAGE.md`,
  Decisions 2, 5, and 6.
- `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, `Invariant 40`:
  Guvna semantic history must preserve prior/current doctrine, Contracts,
  semantic deltas, and generation lineage.
- `.guvna/newplan/extracts/contract-state-and-compatibility.md`,
  `Compatibility Evaluation`: the eight predicate labels and the requirement
  fields required only for an externally supplied authoritative requirement.
- `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`, `Invariant 19`:
  provenance must remain observable across governed transformations.
- `.guvna/newplan/extracts/semantic-ir.md`, `Unordered Collection Ordering`:
  an unordered collection may be sorted only after a semantic rule classifies
  it as unordered; ordered collections retain supplied order.

## C09 - Guvna Semantic History

| Alternative | Classification | Source-established content | Consequence before SemanticIR materialization |
|---|---|---|---|
| A. Parent semantic entity | DECISION REQUIRED | Invariant 40 requires history preservation | Adds selected history entity and provenance/references. |
| B. Parent obligation/capability, not entity | SOURCE-DERIVABLE | Invariant 40 establishes preservation without requiring a root history entity | Record history preservation as a selected obligation; no history entity is materialized. |
| C. Excluded from initial Contract | DECISION REQUIRED | The invariant remains governing doctrine | Defers Contract representation while retaining doctrine outside the selected population. |

**RECOMMENDATION.** Select **B**. The governing source establishes preservation
but does not establish a required root history entity. B preserves the source
obligation without adding an unselected semantic object.

## K01-K08 - Compatibility Predicates and Requirement Records

| Predicate | Classification | Current selected-model treatment | Concrete requirement record required now? |
|---|---|---|---:|
| `obligations-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `relationships-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `invariants-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `authority-boundaries-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `provenance-requirements-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `failure-semantics-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `lifecycle-semantics-preserved` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |
| `scope-compatible` | SOURCE-ESTABLISHED | Evaluator capability and parent preservation semantic | No |

**SOURCE-ESTABLISHED.** A concrete `CompatibilityRequirement` needs an
authoritative requirement identity, prior and candidate subjects, governed
scope, predicate inputs, required interpretation, authority reference, and
provenance. The compatibility extract also requires an attributable prior
applicable subject for an actual comparison.

**DECISION REQUIRED.** No comparison subject, authoritative requirement set,
or requirement-specific interpretation is selected for this initial
population. Therefore no concrete compatibility requirement records may be
created now. The predicates remain selected evaluator capabilities and parent
preservation semantics until a later comparison subject and authoritative
requirement set exist.

**RECOMMENDATION.** Retain K01-K08 as evaluator capabilities and semantic
preservation categories, with the SemanticIR `compatibility` collection empty
for the initial non-comparative materialization. This is not an empty
authoritative requirement set and does not assert compatibility.

## Provenance Ordering

| Provenance collection | Classification | Source basis | Recommended treatment |
|---|---|---|---|
| `ProvenanceRecord.sources` | DECISION REQUIRED | Invariant 19 requires lineage but does not state sequence semantics | REVIEW; do not order or serialize canonically yet. |
| `ProvenanceRecord.transformations` | SOURCE-DERIVABLE | A transformation may depend on prior inputs/outputs; provenance records transformation lineage | ORDERED by source-established transformation dependency when such dependency is explicit; otherwise REVIEW. |
| `ProvenanceGraph.records` | SOURCE-DERIVABLE | Records are membership-bearing provenance of separate subjects; no global sequence is stated | UNORDERED. |
| `ProvenanceGraph.conflicts` | SOURCE-DERIVABLE | Conflicts are separate records; no global sequence is stated | UNORDERED. |
| `ConflictProvenance.sources` | DECISION REQUIRED | Conflict source membership is required; no sequence semantics are stated | REVIEW. |
| `ProvenanceRef[]` attached to entities, relationships, constraints, transitions, and compatibility contexts | DECISION REQUIRED | Source attribution is required; no sequence semantics are stated | REVIEW. |

**FACT.** “Unordered” is a semantic classification, not an implementation
fallback. The `sources` collections and general `ProvenanceRef[]` arrays may
have source-order or transformation-lineage significance that the governing
sources do not settle.

**RECOMMENDATION.** Approve only the source-derivable classifications above:
`ProvenanceGraph.records` and `ProvenanceGraph.conflicts` as unordered, and
explicit dependency-ordered transformation chains where the source establishes
the dependency. Keep all source-reference ordering as REVIEW until a semantic
rule establishes whether sequence matters.

## Remaining Decision Summary

| Item | Status | Minimum action |
|---|---|---|
| C09 | DECISION REQUIRED | B |
| K01-K08 concrete requirement records | SOURCE-ESTABLISHED absence of required comparison inputs | Confirm no requirement records are materialized until an authoritative comparison context exists. |
| Provenance source-reference ordering | DECISION REQUIRED | Establish ordered/unordered semantics for source lists before canonical identity materialization. |

## Preserved Boundaries

No identity value, preimage, digest, SemanticIR, Contract, authority decision,
ratification, applicability result, artifact, workspace path, or realization
is created by this proposal. Historical Contract `1.0.0` is not an input and
is not reconstructed.
