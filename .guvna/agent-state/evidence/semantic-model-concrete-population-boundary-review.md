# Semantic Model Concrete Population Boundary Review

**Result:** BLOCKED
**Scope:** Define the minimum concrete review-bound Semantic Model input needed
between approved selection and later identity materialization. No Semantic
Model, SemanticIR, identity, preimage, digest, Contract, or authority record is
created by this review.

## Current State

The repository contains:

- approved parent-selection decisions and review identifiers;
- doctrine extraction and population evidence expressed as prose/tables;
- approved identity-kind policy `semantic`;
- approved C09 treatment as parent obligation/capability, not entity;
- approved K01-K08 treatment as evaluator/semantic capabilities without
  concrete initial `CompatibilityRequirement` records;
- approved provenance source-reference classifications; and
- an identity-bearing SemanticIR schema and materializer implementation.

It does **not** contain a concrete review-bound Semantic Model object graph,
a review-model schema, stable non-semantic node handles, a reference-resolution
map, an identity derivation relation, an independent-identity evidence set, or
an array-instance ordering map. The prior population evidence explicitly says
general reference resolution and deterministic identity derivation were not
performed.

## Required Concrete Semantic Model

The minimum model is a review-bound structured graph, not a SemanticIR and not
a Contract. It must preserve the approved selection without relying on prose
as executable input:

```text
ReviewBoundSemanticModel
  selectionReference
  governedScopeMeaning
  subjectMeaning
  nodes[]
  relations[]
  constraints[]
  transitions[]
  provenanceAttributions[]
  compatibilityCapabilities[]
  emptyCollectionDispositions
  referenceResolutionMap
  transformationDependencyChains
  collectionOrderingPolicyMap
  temporaryReviewHandles
```

`nodes`, `relations`, `constraints`, and `transitions` must carry the exact
approved meaning and source attribution selected by the Parent Semantic
Selection Decision Package. C09 must be represented as an obligation/capability
node or constraint, not a history entity. K01-K08 must be represented as
capability/preservation semantics, while the eventual SemanticIR
`compatibility` collection is explicitly empty because no authoritative
comparison requirement set is selected.

The graph requires review-local handles for wiring only. Handles are not
SemanticIdentity values and must be excluded from future preimages, as already
required by the approved Semantic Model-to-SemanticIR boundary.

## Field Classification

| Required field or structure | Classification | Determination |
|---|---|---|
| Selected concepts, relationships, constraints, transitions, failures, common obligations, authority boundaries, provenance meaning | A. APPROVED SEMANTIC CONTENT | Selected by the approved inventory and bounded by cited doctrine. |
| C09 as history-preservation obligation/capability | A. APPROVED SEMANTIC CONTENT | Approved treatment; no root history entity. |
| K01-K08 predicate/capability semantics | A. APPROVED SEMANTIC CONTENT | Approved evaluator/parent preservation semantics. |
| Empty compatibility requirement collection and its non-comparative disposition | B. DERIVED STRUCTURAL REPRESENTATION | Follows approved absence of prior comparison subject and requirement set; does not assert compatibility. |
| Node grouping into entities, relationships, constraints, transitions, provenance records, and empty SemanticIR collections | B. DERIVED STRUCTURAL REPRESENTATION | Maps approved selected content to the existing structural kernel; it adds no semantic content. |
| Review-local handles and source pointers | B. DERIVED STRUCTURAL REPRESENTATION | Required to express graph wiring before semantic identities exist; never semantic identity input. |
| Source-attribution records | A. APPROVED SEMANTIC CONTENT | Provenance preservation is approved; concrete references must preserve selected source passages. |
| Reference-resolution map | C. MATERIALIZER INPUT / EXECUTION METADATA | Resolves review handles to selected graph nodes; must be explicit and complete, not inferred. |
| Derived/same-preimage relation | C. MATERIALIZER INPUT / EXECUTION METADATA | Declares identity-materialization dependency; it is not a semantic relationship chosen by the materializer. |
| Independent-identity evidence | C. MATERIALIZER INPUT / EXECUTION METADATA | Establishes whether an already resolved identity may remain in a projection; it is not a new semantic identity. |
| Per-array ordering map | C. MATERIALIZER INPUT / EXECUTION METADATA | Carries already approved semantic ordering classifications to the materializer. |
| `identityKind: semantic` | A. APPROVED SEMANTIC CONTENT | Approved identity-kind policy. |
| Identity values, preimage bytes, and SHA-256 digests | D. IDENTITY OUTPUT | Deterministic outputs, not model input. |
| Scope identity bootstrap value required by the current materializer | C. MATERIALIZER INPUT / EXECUTION METADATA **and implementation seam** | The current API requires it, but no independently evidenced scope identity exists before identity materialization. |
| New semantic scope meaning | E. NEW HUMAN SEMANTIC DECISION REQUIRED only if the approved scope wording is rejected | Current scope meaning is already approved; no new decision is presently needed. |

## Scope Identity Analysis

### Approved scope meaning

The approved subject is the formal expression of accepted Guvna meaning for
downstream realization. The approved governed scope is the Guvna-owned
semantic-contract boundary. Governing sources also require identity to be
unambiguous within governing scope.

### Current materializer requirement

`materializeIdentity` requires `semanticScope.identity` to be a valid,
non-empty SemanticIdentity before projection. It also requires that identity
to appear in `independentIdentities`, otherwise projection returns `Identity
dependency is unresolved`.

### Determination

The scope's **meaning** is A. APPROVED SEMANTIC CONTENT. Its concrete
SemanticIdentity value is D. IDENTITY OUTPUT when the scope is itself being
materialized. No approved source supplies an independently evidenced scope
identity that predates the materialization operation.

Therefore the requirement for a finalized, independently evidenced scope
identity is **not** currently authorized semantic content and is **not** a
missing human semantic decision. It is an implementation seam: the current
materializer API cannot bootstrap the scope identity it requires to construct
the root projection.

No temporary scope identity may be invented. A correct future design must
either materialize the scope as an explicitly declared first identity target
from its approved meaning or permit an identity-free scope projection while
generating that target's identity. Neither behavior is represented by the
current API.

## Derived / Independent Identity Relation

The current API accepts object-reference sets:

```text
derivedIdentities: Set<object>
independentIdentities: Set<object>
```

Their required meaning is:

- `derivedIdentities`: identity objects omitted because their values derive
  from the same preimage as the current target;
- `independentIdentities`: pre-existing identity objects that may remain in the
  projection because supplied evidence establishes they do not derive from the
  current target;
- neither set is a semantic graph relation, authority assertion, or source of
  identity values.

The review-bound model must therefore contain a declarative per-target
identity-materialization plan, using review handles rather than values:

```text
targetHandle
samePreimageHandleSet
independentIdentityEvidence[]
```

That plan is C. MATERIALIZER INPUT / EXECUTION METADATA. It must be explicit,
acyclic, and traceable to the model's source/derivation structure. The current
object-reference-set API is an execution-specific realization of that plan; it
cannot be created until concrete model objects exist.

## Ordering Map

The concrete model must carry a per-collection-instance map rather than rely
on generic collection names or traversal order:

```text
collectionHandle -> ordered | unordered
```

It is C. MATERIALIZER INPUT / EXECUTION METADATA whose entries are justified
by A. APPROVED SEMANTIC CONTENT or B. DERIVED STRUCTURAL REPRESENTATION.

Required entries include:

| Collection instance | Classification | Basis |
|---|---|---|
| ProvenanceRecord.sources | unordered | Approved provenance ordering decision. |
| ConflictProvenance.sources | unordered | Approved provenance ordering decision. |
| Attached ProvenanceRef arrays | unordered | Approved provenance ordering decision. |
| Explicit transformation dependency chains | ordered when dependency is established | Approved provenance ordering boundary. |
| Other encountered arrays | explicit classification required | Materializer fails closed; no default classification exists. |

## Reference Resolution

References must be represented in the review model as handle-based links with
an explicit resolution table:

```text
referenceHandle -> targetHandle
```

For every link the model must identify its relation role and source basis. A
reference is unresolved when the handle is absent, resolves to no selected
node, resolves to more than one target, crosses a declared parent/specialization
boundary without approved basis, or lacks required provenance.

The map is C. MATERIALIZER INPUT / EXECUTION METADATA. The selected reference
semantics and their source passages are A. APPROVED SEMANTIC CONTENT. Final
SemanticRef identities are D. IDENTITY OUTPUT and cannot appear in the
review-bound model.

## Missing Inputs

The following inputs are genuinely absent from the repository:

1. A concrete ReviewBoundSemanticModel graph that materializes every selected
   record with exact meaning, source attribution, and non-semantic review
   handles.
2. An explicit reference-resolution map for that graph.
3. A per-target same-preimage/independent-identity materialization plan.
4. A per-array ordering map covering every collection instance in that graph.
5. A scope-bootstrap materialization design that resolves the current API seam
   without inventing a prior scope identity.

Items 1-4 are structural materialization work over approved selection, not new
semantic decisions. Item 5 is an implementation-boundary issue, not a semantic
gap.

## Implementation Seams

1. **Scope bootstrap:** the materializer requires a finalized independent
   scope identity before it can derive the scope/root identity.
2. **Identity-free reference bridge:** the materializer accepts final
   SemanticIdentity/SemanticRef-shaped objects rather than review handles and
   a resolution map, so it cannot consume a genuinely pre-identity model.
3. **Object-reference execution metadata:** sets/maps are suitable runtime
   inputs but not a durable review-bound semantic model representation.

These seams must not be filled with invented identities, review labels, paths,
or implementation-derived values.

## Recommended Next Action

Authorize a bounded design and implementation proposal for an
**identity-free review-model representation plus scope-bootstrap projection**.
It must define only the structural model envelope, handle/reference map,
per-target materialization plan, and ordering-map transport needed to feed the
existing materializer or a narrowly adapted identity-bootstrap interface. It
must not select or alter semantic content, generate identities, materialize
SemanticIR, or generate a Contract.
