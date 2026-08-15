# Semantic Model Identity Bootstrap Implementation Proposal

**State:** REVIEW
**Scope:** The smallest structural bridge from approved semantic selection to
the existing recursive identity materializer. No implementation, concrete
ReviewBoundSemanticModel, identity, SemanticIR, Contract, artifact, or
authority action is created by this proposal.

## Purpose

This proposal addresses the two implementation seams identified by the
concrete population-boundary review:

```text
Approved Semantic Selection
    -> ReviewBoundSemanticModel
    -> scope identity bootstrap
    -> existing recursive identity materializer
    -> SemanticIR
```

The bridge transports already approved meaning and explicitly supplied
materialization metadata. It does not discover, select, interpret, extend, or
alter semantic content.

## Part 1 - ReviewBoundSemanticModel

### Exact Minimum Shape

```text
ReviewBoundSemanticModel
  selectionReference: ReviewHandle
  governedScope:
    meaning: MeaningDraft
    sourceAttributions: SourceAttribution[]
  subjectMeaning: MeaningDraft
  nodes: ReviewNode[]
  relations: ReviewRelation[]
  constraints: ReviewConstraint[]
  transitions: ReviewTransition[]
  provenanceAttributions: SourceAttribution[]
  compatibilityCapabilities: CompatibilityCapability[]
  emptyCollectionDispositions: CollectionDisposition[]
  referenceResolutionMap: Map<ReviewHandle, ReviewHandle>
  materializationPlans: Map<ReviewHandle, IdentityMaterializationPlan>
  collectionOrderingPolicyMap: Map<CollectionHandle, ordered | unordered>
  transformationDependencyChains: OrderedHandleChain[]
```

Every `ReviewHandle` and `CollectionHandle` is a review-local structural key.
It is not `SemanticIdentity.value`, not an identity preimage input, and not a
semantic reference. The bridge rejects it if it reaches identity projection.

`MeaningDraft` and every node record carry only exact approved semantic
meaning, selected source attribution, parent/specialization classification,
and declared handle links. C09 appears only as the approved
history-preservation obligation/capability. K01-K08 appear only as approved
capability/preservation semantics. The initial compatibility requirement
collection remains explicitly empty because no authoritative comparison
requirement set is selected.

### Field Ownership

| Field or mechanism | Classification | Why |
|---|---|---|
| Selected content, scope meaning, subject meaning, source attribution, C09, K01-K08 | A. approved semantic content | Already selected/approved. |
| Node/record grouping, empty collection dispositions, review handles | B. derived structural representation | Expresses approved selection without adding meaning. |
| Resolution map, materialization plan, ordering map, transformation dependency chains | C. execution/materialization metadata | Explicitly supplies what the materializer cannot infer. |
| SemanticIdentity values, preimages, digests, final SemanticRefs | D. identity output | Generated only in a separately authorized execution. |
| New concepts, scope meaning, relationship, ordering classification, identity kind | E. new semantic decision | Not authorized by this proposal. |

## Part 2 - Scope Bootstrap

### Current Seam

The existing materializer requires an independently evidenced final scope
identity before it can build the preimage from which the scope identity must be
derived. The approved scope meaning exists; a pre-existing scope identity does
not. Supplying a temporary handle or fabricated independent identity would
violate the approved identity boundary.

### Alternatives

| Option | Implementation changes | Semantic consequence | Determinism | Existing algorithm | New authority / policy |
|---|---|---|---|---|---|
| A. Scope as first recursive target | Change current materializer API so `semanticScope` may lack identity when it is the target | None if scope meaning is supplied unchanged | Deterministic if scope projection is explicit | Alters existing materializer input contract | No new semantic decision; requires implementation authorization |
| B. Identity-free scope bootstrap projection | Add a narrow bootstrap function that projects supplied scope meaning without an identity, serializes it, and delegates to existing identity utility; then adapt the graph to current materializer | None; scope is the first identity-bearing target | Deterministic from approved scope meaning, `semantic` kind, and approved serialization | Preserves recursive materializer algorithm and its identity-bearing input contract | No new semantic decision or identity policy |
| C. Existing API only | Require prior independent scope identity | Would require inventing or separately sourcing a pre-existing identity | Cannot proceed from current approved inputs | No code change | Requires unavailable semantic identity source; not supported |

**RECOMMENDATION: B.** It is the smallest option because it isolates the
bootstrap cycle without weakening the existing materializer’s validation or
changing the approved identity algorithm. It creates no new identity policy:
it uses approved `identityKind = semantic`, existing canonical serialization,
and existing `createIdentity` only when a future materialization execution is
separately authorized.

## Part 3 - Materializer Bridge

After the bootstrap scope identity exists, the bridge adapts the review-bound
model to the existing `IdentityMaterializationInput`:

```text
ReviewBoundSemanticModel
  + resolved handle map
  + bootstrap scope identity
  + per-target materialization plan
  + per-array ordering map
    -> identity-bearing graph objects
    -> existing IdentityMaterializationInput
```

The bridge must:

1. resolve each handle only through `referenceResolutionMap`;
2. fail on absent, ambiguous, cyclic, or boundary-crossing resolution;
3. transform review handles into object links only after resolution;
4. build `derivedIdentities` and `independentIdentities` only from the
   explicit per-target plan and bootstrap output;
5. pass every encountered array’s explicit ordering classification;
6. use approved unordered provenance source classifications and declared
   ordered transformation dependency chains; and
7. refuse temporary handles, paths, timestamps, discovery order, or process
   state as semantic or identity inputs.

No change to the recursive materializer’s projection, stripping, ordering, or
fail-closed semantics is needed. The bridge is an adapter; it does not redesign
the materializer.

## Exact Future Implementation Scope

The smallest future implementation is limited to:

```text
core/src/compiler/review-bound-semantic-model.ts
core/src/compiler/semantic-model-identity-bridge.ts
core/tests/compiler/semantic-model-identity-bridge.test.ts
```

The first module defines identity-free review-model structural types and
validation. The second implements scope bootstrap projection plus handle
resolution/adaptation to the existing materializer. The test file uses only
synthetic approved-shape fixtures.

The bridge may import existing `serializeCompactJson`, `createIdentity`, and
`materializeIdentity`. It must not modify `semantic-ir.ts`,
`ir-identity.ts`, `ir-serializer.ts`, or the recursive materializer.

## Required Future Tests

1. A scope bootstrap derives a synthetic scope identity from supplied scope
   meaning without a prior identity or review-handle input.
2. The bridge rejects a scope handle used where a semantic identity is needed.
3. Resolved review handles produce materializer object links only through the
   explicit resolution map.
4. Missing, ambiguous, cyclic, and boundary-crossing handle resolution fails
   closed.
5. Per-target same-preimage and independent-identity plans are carried exactly
   into materializer inputs.
6. Approved unordered provenance arrays and explicit ordered transformation
   chains retain their classifications through adaptation.
7. No review handle, path, timestamp, discovery data, or process metadata
   reaches a canonical preimage.

## Why This Adds No Semantic Meaning

The bridge has no source-discovery or semantic-selection capability. It
accepts only concrete model records already populated from approved selection,
explicit links, source attribution, and approved ordering classifications. It
does not choose meanings, resolve ambiguous references, create scope meaning,
or decide derivation relationships. Any missing supplied input is a blocker.

## Separately Unauthorized Work

This proposal does not authorize implementation, ReviewBoundSemanticModel
population, scope identity generation, preimage/digest generation, SemanticIR
materialization, Contract generation, ratification, applicability, artifacts,
workspace paths, or downstream realization.

RESULT
REVIEW

RECOMMENDED OPTION
B

IMPLEMENTATION SCOPE
`core/src/compiler/review-bound-semantic-model.ts`,
`core/src/compiler/semantic-model-identity-bridge.ts`, and
`core/tests/compiler/semantic-model-identity-bridge.test.ts`

NEW SEMANTIC DECISIONS REQUIRED
NO

IDENTITY GENERATION
NOT AUTHORIZED

SEMANTIR MATERIALIZATION
NOT AUTHORIZED

CONTRACT GENERATION
NOT AUTHORIZED

NEXT AUTHORIZED ACTION
Human review of this proposal only.
