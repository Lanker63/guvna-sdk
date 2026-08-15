# Guvna Parent Semantic Selection Decision Package

## Purpose

**FACT.** This is a review-bound decision package for a new Parent Guvna
Semantic Contract representation. It is not a Contract, Semantic IR instance,
authority decision, ratification, applicability determination, or
implementation artifact.

**DECISION REQUIRED.** The six decisions below select only from established
meaning and explicitly identify the remaining semantic choices. They do not
assign identities, versions, digests, or lifecycle outcomes.

## Source Basis

**FACT.** This package is derived from the review-bound Parent Guvna Semantic
Inventory and its cited sources: `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`,
`doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`,
`doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md`,
`doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, and
`.guvna/newplan/extracts/contract-state-and-compatibility.md`.

**FACT.** `core/src/compiler/semantic-ir.ts` is used only to describe the
already implemented representation surface. It supplies no populated semantic
content and does not determine any decision in this document.

## Decision 1 - Initial Parent Contract Inventory

**FACT.** Every ID below is a temporary review identifier from the Parent
Guvna Semantic Inventory. `INCLUDE`, `EXCLUDE`, and `REVIEW` are
recommendations, not approvals.

| ID | Candidate | Category | Source | Parent Candidate | Recommended Decision | Rationale |
|---|---|---|---|---|---|---|
| C01 | Semantic Contract | concept | Conceptual Architecture / `Semantic Contract` | YES | INCLUDE | Defines the parent boundary. |
| C02 | Semantic Identity | concept | Semantic Identity doctrine / `Semantic Identity` | YES | INCLUDE | Parent identity rule, not a value. |
| C03 | Semantic Version | concept | Semantic Identity doctrine / `Identity Is Not Version` | YES | INCLUDE | Required distinct semantic dimension. |
| C04 | Lifecycle State | concept | Semantic Identity doctrine / `Identity, Version, and Lifecycle` | YES | INCLUDE | Required distinct semantic dimension. |
| C05 | Provenance | concept | Epistemic Invariants / `Invariant 19-20` | YES | INCLUDE | Required lineage and non-authority rule. |
| C06 | Uncertainty | concept | Epistemic Invariants / `Invariant 21-22` | YES | INCLUDE | Required fail-closed distinction. |
| C07 | Guvna Semantic Compilation | concept | Architectural Invariants / `Invariant 7` | YES | INCLUDE | Establishes doctrine-to-candidate relation. |
| C08 | Contract Ratification | concept | Architectural Invariants / `Contract Ratification and Applicability` | YES | INCLUDE | Distinguishes later authority boundary. |
| C09 | Guvna Semantic History | concept | Architectural Invariants / `Invariant 40` | REVIEW | REVIEW | Requires Decision 2. |
| C10 | Guvna Authority | concept | Epistemic Invariants / `Invariant 43` | YES | INCLUDE | Defines Guvna/Repository authority boundary. |
| R01-R05 | Accepted meaning -> compilation -> candidate -> ratification; identity independent of realization; Contract defines interpretation | relationships | Architectural Invariants / `Contract Ratification and Applicability`, `Invariant 15`; Semantic Identity doctrine / `Canonical Principle` | YES | INCLUDE | Explicit parent relationships. |
| R06 | Projection Contract strictly specializes Semantic Contract | relationship | Conceptual Architecture / `Projection Contract` | NO | EXCLUDE | Projection specialization. |
| R07 | Runtime Contract strictly specializes applicable Semantic Contract | relationship | Conceptual Architecture / `Runtime Contract` | NO | EXCLUDE | Runtime specialization. |
| O01-O06 | validate, ratify, apply, reject, supersede, retire | lifecycle operations | Contract State and Compatibility Extract / `Lifecycle And Acceptance` | YES | INCLUDE | Explicit parent Contract lifecycle operations. |
| ST01-ST07 | candidate, validated, ratified, applicable, superseded, rejected, retired | states | Contract State and Compatibility Extract / `Lifecycle And Acceptance` | YES | INCLUDE | Explicit Contract state vocabulary. |
| T01-T09 | nine listed lifecycle transitions | transitions | Contract State and Compatibility Extract / transition table | YES | INCLUDE | Explicit transition matrix and guards. |
| I01-I09 | source-precedes-realization; Guvna ownership; authority separation; no semantic invention; non-applicability without ratification; distinct dimensions; provenance; semantic compatibility; non-inventing realizations | constitutional/architectural constraints | Epistemic Invariants / `Invariant 19-20`, `43`; Architectural Invariants / `1-2`, `32-33`, `64-67` | YES | INCLUDE | Explicit parent constraints. |
| I10 | Projection strict-specialization constraint | specialization constraint | Conceptual Architecture / `Projection Contract` | NO | EXCLUDE | Projection-only Contract rule. |
| F01-F03 | preserve uncertainty; compatibility fails closed; transition input fails closed | failure semantics | Epistemic Invariants / `21-22`; Architectural Invariants / `33`; Contract State and Compatibility Extract | YES | INCLUDE | Parent-level failure semantics. |
| RO01-RO04 | preserve distinctions, provenance, source ownership, and semantic dimensions | common realization obligations | Architectural Invariants / `1-2`, `31`, `63`; Semantic Identity doctrine / `Identity, Version, and Lifecycle` | YES | INCLUDE | Apply to all realizations without defining specialization behavior. |
| AB01-AB02 | Guvna/Repository authority separation; attributable ratification | authority boundaries | Epistemic Invariants / `43`; Architectural Invariants / `66-67` | YES | INCLUDE | Explicit parent authority rules. |
| P01 | source, authority context, transformation, identity/version, acceptance, manifestation provenance | provenance requirement | Epistemic Invariants / `Invariant 19` | YES | INCLUDE | Explicit required provenance shape at semantic level. |
| K01-K08 | eight preservation predicates | compatibility predicates | Contract State and Compatibility Extract / `Compatibility Evaluation` | REVIEW | REVIEW | Requires Decision 5 classification. |
| REF01 | authority-bearing artifact exposes canonical identity | reference requirement | Semantic Identity doctrine / `Canonical Identity Must Be Carried by the Artifact` | YES | INCLUDE | Parent reference obligation. |
| S01 | identity unambiguous within governing scope | scope rule | Semantic Identity doctrine / `Semantic Identity` | YES | INCLUDE | Parent scope rule, not a selected scope. |
| S02 | Contract is formal boundary between accepted Guvna meaning and realization | subject description | Conceptual Architecture / `Semantic Contract` | YES | INCLUDE | Parent subject meaning. |

### Recommended Initial Parent Boundary

**RECOMMENDATION.** The initial parent Contract governs Guvna-owned semantic
meaning: semantic identity/version/lifecycle/provenance; the formal
doctrine-to-Contract boundary; Contract lifecycle; authority and ratification
boundaries; compatibility and fail-closed requirements; and obligations common
to all realizations.

**FACT.** It excludes repository-specific truth, content, governance, and
acceptance decisions; Runtime behavior; SDK behavior; Host behavior;
Projection-specific semantics; implementation, persistence, transport, and
filesystem details; and process machinery that does not itself state
Guvna-owned meaning. These exclusions follow Conceptual Architecture's
`Semantic Ownership`, `Runtime Contract`, and `Projection Contract` sections.

## Decision 2 - Guvna Semantic History

| Alternative | Source Basis | Semantic Consequence | Implementation Consequence | Identity-Bearing Records | Necessary Initially? |
|---|---|---|---|---|---|
| A. Parent semantic entity | Architectural Invariants / `Invariant 40` | History becomes a selected parent concept | Requires history entity/provenance representation | Yes | No |
| B. Parent obligation/capability, not entity | `Invariant 40` requires preservation | Contract requires preservation without modeling History as a root entity | Provenance/history capability only | No additional history entity | No |
| C. Excluded from initial Contract | `Invariant 40` still governs architecture | No initial Contract representation of history | Deferred representation | No | No |

**RECOMMENDATION.** Choose **B**. It preserves the explicit history obligation
without selecting an additional parent entity before the first representation.
**WHAT WOULD CHANGE IF REJECTED.** A requires a history entity and related
references; C removes the explicit Contract-level history obligation.

## Decision 3 - Governed Scope and Subject

| Source | Exact Source Wording | Meaning | Role | Compatibility |
|---|---|---|---|---|
| Conceptual Architecture / `Semantic Contract` | “a formally compiled semantic boundary between accepted Guvna meaning and realization” | Contract subject boundary | subject | Compatible with all scope alternatives. |
| Semantic Identity doctrine / `Semantic Identity` | “unambiguous within its governing scope” | Scope constraint | governed scope | Requires a separate scope record. |
| Conceptual Architecture / `Semantic Ownership` | “Semantic Contracts” are Guvna-owned | Ownership rule | ownership | Compatible with both alternatives. |
| Architectural Invariants / `Invariant 2` | Guvna-owned semantics originate from governing sources | Source boundary | other | Compatible with both alternatives. |

**FACT.** No governing source equates governed scope with subject scope.

| Alternative | Governed Scope | Subject | Why / Source Basis | Consequence |
|---|---|---|---|---|
| A | Guvna-owned semantic-contract boundary | Formal expression of accepted Guvna meaning for downstream realization | Semantic Contract and Semantic Ownership sections | Narrow parent Contract; excludes specializations. |
| B | Guvna-owned semantic-contract boundary plus explicitly governed common realization obligations | Same Contract subject as A | Architectural Invariants / `1-2`, `31`, `63` | Includes common realization obligations as direct scope content. |
| C | OTHER - specify | OTHER - specify | Must cite governing doctrine | Requires a new source-alignment review. |

**RECOMMENDATION.** Choose **A**. **WHAT WOULD CHANGE IF REJECTED.** B makes
common realization obligations a more direct scope component; C requires new
evidence. Neither alternative permits `governedScope === subjectScope` by
assumption.

## Decision 4 - Identity-Kind Vocabulary

**FACT.** The implementation exposes `SemanticIdentity.identityKind` but does
not establish its vocabulary. The semantic specification establishes an
identity procedure, not names for every kind.

| Name | Source Basis | Identifies | Governing Scope | Derivation Basis | Implemented? |
|---|---|---|---|---|---|
| PROPOSED: semantic-contract | Semantic Identity doctrine identifies Contracts as semantic artifacts; Contract State extract requires Contract identity | The selected parent Contract | Selected governed scope | Canonical content after Decisions 1, 3, 5, 6 | Field supported; vocabulary absent |
| PROPOSED: semantic-scope | Semantic IR requires `SemanticScope`; identity doctrine requires governing scope | The selected governed scope | Guvna semantic boundary | Approved scope content | Field supported; vocabulary absent |
| PROPOSED: semantic-concept | Semantic IR `SemanticEntity`; selected concepts require references | Included concept/state/operation records | Selected Contract scope | Canonical record content | Field supported; vocabulary absent |
| PROPOSED: semantic-constraint | Semantic IR `SemanticConstraint` | Included invariant/constraint/failure/obligation records | Selected Contract scope | Canonical record content | Field supported; vocabulary absent |
| PROPOSED: semantic-relationship | Semantic IR `SemanticRelationship`/`SemanticTransition` | Included relationships and transitions | Selected Contract scope | Canonical record content | Field supported; vocabulary absent |
| PROPOSED: semantic-provenance | Semantic IR provenance records and constitutional provenance rule | Required provenance records | Selected Contract scope | Canonical record content | Field supported; vocabulary absent |

**DECISION REQUIRED.** Select the minimum vocabulary above, or choose
`OTHER - specify` with a governing-source basis. No identity values or digest
are generated.

## Decision 5 - Compatibility Requirements

| Predicate | Source Basis | Semantic Meaning | Parent Relevance | Recommended Classification | Additional Input for Executable Requirement |
|---|---|---|---|---|---|
| obligations-preserved | Compatibility Extract | Preserve obligations | Parent | C. Both | Subject, consumer/dependency, interpretation, authority, provenance |
| relationships-preserved | Compatibility Extract | Preserve relationships | Parent | C. Both | Same |
| invariants-preserved | Compatibility Extract | Preserve invariants | Parent | C. Both | Same |
| authority-boundaries-preserved | Compatibility Extract | Preserve authority boundaries | Parent | C. Both | Same |
| provenance-requirements-preserved | Compatibility Extract | Preserve provenance requirements | Parent | C. Both | Same |
| failure-semantics-preserved | Compatibility Extract | Preserve failure semantics | Parent | C. Both | Same |
| lifecycle-semantics-preserved | Compatibility Extract | Preserve lifecycle semantics | Parent | C. Both | Same |
| scope-compatible | Compatibility Extract | Preserve compatible scope | Parent | C. Both | Same |

**RECOMMENDATION.** Classify all eight as **C. Both**: parent semantic
requirements and evaluator capabilities. **FACT.** An executable requirement
still needs the externally supplied authoritative requirement set,
`predicateInputs`, `requiredInterpretation`, authority reference, scope, and
provenance; none is created here.

## Decision 6 - Collection Ordering

| Collection | Does Order Have Semantic Meaning? | Source Evidence | Recommended Classification | Serialization Consequence |
|---|---|---|---|---|
| concepts | Membership, not sequence, is stated | No sequence doctrine | UNORDERED | Apply approved identity-key ordering after identity exists. |
| relationships | Membership, not sequence, is stated | No sequence doctrine | UNORDERED | Same. |
| constraints | Membership, not sequence, is stated | No sequence doctrine | UNORDERED | Same. |
| transitions | Matrix has from/operation/to semantics, not stated sequence | Lifecycle table | UNORDERED | Same. |
| derivations | No parent derivation sequence established | Semantic IR extract | REVIEW | Fail closed until classified. |
| contracts | No parent Contract collection membership established | Semantic IR extract | REVIEW | Fail closed until classified. |
| realizations | No parent realization collection membership established | Semantic IR extract | REVIEW | Fail closed until classified. |
| authority/acceptance collections | Records are distinct; no sequence stated | Epistemic Invariants | UNORDERED | Apply approved identity-key ordering. |
| provenance records | Transformation lineage may be meaningful | Epistemic Invariants / `Invariant 19` | REVIEW | Preserve supplied order unless decision classifies it. |
| provenance conflicts | No sequence stated | Semantic IR extract | UNORDERED | Apply approved identity-key ordering. |
| compatibility requirements | Requirement-set membership, not sequence, is stated | Compatibility Extract | UNORDERED | Apply approved identity-key ordering. |

**FACT.** The specification supplies the algorithm only after classification:
unordered collections sort by canonical SemanticIdentity serialization;
ordered collections retain supplied order.

## Cross-Decision Dependencies

| Dependency | Result |
|---|---|
| Decision 1 -> Decision 4 | Included records determine the minimum identity kinds. |
| Decision 1 -> Decision 6 | Included collections determine which classifications matter. |
| Decision 1 -> Decision 5 | Included obligations/relationships/invariants determine compatibility relevance. |
| Decision 3 -> Decision 4 | Scope must exist before scope-bound identities can be derived. |
| Decision 3 -> Decision 5 | Compatibility requirements require governed scope. |
| Decision 2 -> Decision 4 | Option A requires a history identity kind; B/C do not. |
| Decision 1 -> provenance/references | Included records determine required provenance and references. |

**DERIVED.** There is no circular dependency if decisions occur in this order:
1, 2, 3, 5, 6, then 4. This sequence avoids assigning a vocabulary before the
selected population and scope are known.

## Recommended Defaults

| Decision | Recommended Default | Why | What Changes If Rejected |
|---|---|---|---|
| 1 | Include all YES candidates; exclude R06, R07, I10; review C09 and K01-K08 | Preserves explicit parent meaning and specialization boundary | Requires individual selection changes. |
| 2 | B | Preserves history without a new entity | A adds history records; C removes obligation. |
| 3 | A | Closest to the stated formal Contract boundary | B broadens direct scope; C needs new evidence. |
| 4 | REVIEW — do not adopt a broader identity-kind vocabulary until governing authority establishes it | `identityKind` vocabulary is not established; historical `semantic-contract` is insufficient to authorize additional kinds | Identity vocabulary remains unresolved until separately established |
| 5 | C for K01-K08 | Predicates express meaning and evaluator capabilities | A/B would separate one established role. |
| 6 | Adopt recommendations; defer only derivations/contracts/realizations/provenance records | Membership is explicit where unordered is recommended; sequence is not | More REVIEW decisions remain before serialization. |

## Human Decision Form

### Decision 1 - Parent Inventory

`DEFAULT`

### Decision 2 - Semantic History

`B`

### Decision 3 - Scope and Subject

`A`

### Decision 4 - Identity Kinds

`REVIEW — no identity-kind vocabulary is currently established by governing authority. semantic-contract is historically established but is not sufficient to authorize a broader taxonomy.`

### Decision 5 - Compatibility

`C`

### Decision 6 - Collection Ordering

`DEFAULT`.

## Consequences of Approval

**DERIVED.** Approval of the six decisions permits, but does not perform:

```text
Human semantic selection
  -> Approved semantic inventory
  -> Populated Semantic Model / Semantic IR
  -> Canonical serialization
  -> New Contract identity
  -> Candidate Contract generation
  -> Validation
  -> Human ratification
  -> Applicability determination
  -> Durable Applicable Contract artifact
  -> Runtime / SDK realization
```

## Historical 1.0.0 Boundary

**FACT.** Historical Contract `1.0.0` and digest
`462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e443`
remain historical evidence only. Its canonical payload is unrecoverable.

**FACT.** This package does not reconstruct it, use its digest as a new
identity, treat its metadata as semantic content, or modify any historical
ratification or applicability record. All six decisions apply only to a new
Contract representation.