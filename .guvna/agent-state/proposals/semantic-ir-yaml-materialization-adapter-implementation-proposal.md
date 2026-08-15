# SemanticIR YAML Materialization Adapter Implementation Proposal

**State:** REVIEW
**Scope:** YAML representation conversion and identity-materialization execution
boundary only. No implementation, YAML load, identity output, SemanticIR,
Contract, authority action, artifact, or realization is authorized.

## Objective

The approved YAML review model is declarative. The existing bridge accepts an
in-memory TypeScript `ReviewBoundSemanticModel`. This proposal defines the
smallest adapter boundary between them and determines whether an orchestrator
can produce SemanticIR without semantic inference.

## Exact YAML to TypeScript Mapping

| YAML field | Existing TypeScript representation | Adapter rule |
|---|---|---|
| `governed_scope.meaning`, `subject_meaning`, source handles | `governedScope.content`, `sourceAttributions` | Copy exact meaning; convert each source handle to an attribution object. |
| nodes, relations, constraints, transitions, capabilities | category-specific `ReviewNode[]` | Convert each record to a node with original handle, structural content, and source attributions. |
| `reference_resolution_map` | `ReadonlyMap<ReviewHandle, ReviewHandle>` | Convert entries exactly; reject missing or duplicate handle. |
| `reference_uses` | `{ reviewRef }` inside node content | Convert only declared use; reject missing target mapping. |
| `per_target_dependency_classifications` | `materializationPlans: ReadonlyMap` | Expand every listed target to exactly one explicit plan; reject missing/duplicate/dependency handle. |
| `collection_ordering_policy_map` | `ReviewCollectionEntry[]` | Bind declared collection handles to concrete arrays; reject unclassified arrays. |
| `transformation_dependency_chains` | ordered handle arrays | Preserve declared order; never derive one from YAML or discovery order. |

An internal parsed-YAML DTO is permitted for validation only. It is not a
second semantic model and it cannot select, add, remove, or reinterpret
semantic content.

## Scope Bootstrap

The orchestrator must invoke existing `bootstrapScopeIdentity` once, only after
adapter validation. It must use approved `identityKind = semantic`, supplied
scope meaning, and existing `serializeCompactJson`/`createIdentity` behavior.
It must reject review handles, paths, timestamps, and prior scope identities in
the bootstrap projection.

## Execution Orchestrator

After bootstrap, an orchestrator may adapt each explicit target plan to the
existing bridge/materializer. It must:

1. use only `reference_resolution_map` for reference targets;
2. supply only explicit same-preimage and independent dependencies;
3. supply only approved collection ordering classifications;
4. reject missing, ambiguous, cyclic, boundary-crossing, or unclassified
   execution input; and
5. never use YAML order, object insertion order, filesystem order, discovery,
   timestamp, or lexical handle order as execution order.

The approved target plans do not contain a unique execution ordering policy.
The orchestrator must fail closed when more than one eligible target exists
unless a separately approved execution-order classification is supplied.

## Mandatory SemanticIR Mapping Blockers

The adapter itself is structural. A SemanticIR-producing orchestrator is
blocked because the approved YAML does not select these mandatory SemanticIR
fields:

| Required field | Missing approved selection | Classification |
|---|---|---|
| Per-entity lifecycle context | No lifecycle state/transition membership selected for each entity | E |
| Per-entity acceptance context | No `accepted` value, acceptance scope, authority-decision presence, or provenance membership selected | E |
| `SemanticTransition.authorityReference` | Transition authority requirement exists, but no semantic reference target is selected | E |
| `ProvenanceRef.sourceIdentity` for doctrine sources | Source handles/path/section exist, but no approved source semantic identities exist | E |
| Root `irVersion` / optional `semanticVersion` | No value selected for this new IR | E |
| Root aggregate lifecycle/authority/provenance context | No approved source-to-root SemanticIR mapping selected | E |
| Execution-order policy | Dependency sets do not select a unique target execution sequence | E |

The adapter/orchestrator must not default or infer any E field. These are not
identity-algorithm defects and are not resolved by parsing YAML.

## Exact Future Implementation Scope

If the E blockers are resolved, the minimal implementation paths are:

```text
core/package.json
core/src/compiler/review-bound-semantic-model-yaml-adapter.ts
core/src/compiler/semantic-ir-materialization-orchestrator.ts
core/tests/compiler/review-bound-semantic-model-yaml-adapter.test.ts
core/tests/compiler/semantic-ir-materialization-orchestrator.test.ts
```

`core/package.json` changes only if a standards-compliant YAML parser is added;
the current package has no YAML parser. The adapter must not use ad hoc string
parsing. No change is proposed to `semantic-ir.ts`, `ir-identity.ts`,
`ir-serializer.ts`, or `ir-identity-materializer.ts`.

## Required Tests

Synthetic YAML only. Tests must prove deterministic conversion; one-to-one
target-handle mapping; preservation of 64 plans, references, and ordering;
handle rejection from preimages; unchanged scope meaning; no added/removed
semantic record; and fail-closed malformed YAML, missing plan/reference,
unsupported ordering, ambiguous execution order, and each E mapping blocker.

## Authority Classification

| Item | Classification |
|---|---|
| Approved YAML meaning, scope, references, plans, source/order metadata | A/C as already approved |
| Parser DTO and `Map`/`Set` conversion | B |
| Execution graph/readiness/error collection | C |
| Identities, preimages, digests, SemanticRefs | D |
| Mandatory mapping blockers table | E |

No new semantic meaning, scope meaning, relationship, provenance, ordering
policy, or identity-kind taxonomy is proposed.

RESULT
REVIEW

RECOMMENDED IMPLEMENTATION
Implement the loader/adapter only after review; retain orchestration as
fail-closed scaffolding until E fields are decided.

ADAPTER
Deterministic YAML-to-existing-`ReviewBoundSemanticModel` conversion only.

ORCHESTRATOR
Existing bootstrap/bridge/materializer calls only after explicit ordering and
mandatory SemanticIR mapping inputs exist; otherwise fail closed.

SEMANTIC DECISIONS REQUIRED
YES - all E fields in the mandatory mapping blockers table.

IDENTITY GENERATION
NOT AUTHORIZED

SEMANTIR
NOT AUTHORIZED

CONTRACT
NOT AUTHORIZED

NEXT AUTHORIZED ACTION
Human review of this implementation proposal only.
