# SemanticIR Recursive Identity-Preimage Materializer Implementation Proposal

**State:** REVIEW
**Scope:** The smallest pure compiler implementation needed to construct
identity preimage bytes from already approved semantic graph inputs, then
delegate identity encoding and digest calculation to existing code.

## Purpose

This proposal addresses the implementation gap identified by
`semantic-ir-identity-materialization-implementation-assessment.md`:

```text
approved Semantic Model
    -> recursive identity-stripped projection
    -> approved collection ordering
    -> canonical serialization
    -> identity preimage
    -> deterministic identity values
    -> valid SemanticIR
```

It proposes implementation capability only. It does not authorize SemanticIR
materialization for any current population, identity-value generation,
preimage generation, digest generation, Contract generation, ratification,
applicability, artifacts, workspace paths, Runtime/SDK/Host/Projection work,
or semantic selection.

## Governing and Approved Inputs

- `.guvna/newplan/extracts/semantic-ir.md`, `Identity and Digest`, requires an
  acyclic preimage containing explicit identity kind, projected semantic scope,
  and projected object content; it excludes the generated identity and nested
  identities derived from the same preimage.
- The same extract, `Unordered Collection Ordering`, requires approved
  ordered/unordered classifications and fail-closed behavior for unresolved
  identity keys or equal keys with different content.
- `semantic-ir-minimum-identity-kind-policy-review-proposal.md` approves the
  sole identity-kind policy `identityKind = semantic`.
- `semantic-ir-provenance-ordering-review-proposal.md` approves the three
  provenance source-reference collections as unordered.
- `core/src/compiler/ir-identity.ts` already base64url-encodes supplied bytes
  and computes their SHA-256 digest.
- `core/src/compiler/ir-serializer.ts` already produces compact canonical JSON
  for supplied values, including field order and JSON validation.

## Existing Capability and Gap

**FACT.** Current `createIdentity` accepts arbitrary non-empty bytes. It does
not inspect a graph, project content, exclude derived identities, establish
collection order, or fail on semantic dependency ambiguity.

**FACT.** `serializeSemanticIR` only accepts a complete valid SemanticIR, whose
identities already have non-empty values. It cannot serialize the identity-
stripped projection required to produce those values.

**DERIVED.** A new pure identity-preimage materializer is required before any
later authorized SemanticIR materialization can derive valid identity values.

## Proposed Smallest Change

Add one compiler module:

```text
core/src/compiler/ir-identity-materializer.ts
```

Add focused tests only for that module:

```text
core/tests/compiler/ir-identity-materializer.test.ts
```

The module shall not alter `semantic-ir.ts`, `ir-serializer.ts`, or
`ir-identity.ts`. It shall use `serializeCompactJson` for the projected
preimage bytes and call `createIdentity` only after successful projection.

## Proposed Pure Interface

The precise TypeScript spelling remains an implementation concern, but the
module requires these semantic-neutral inputs:

| Input | Required purpose | Not supplied by the module |
|---|---|---|
| Target object | Identifies the object whose identity is to be materialized | Semantic content selection |
| Target identity kind | Explicit approved kind; currently `semantic` | Alternative kind policy |
| Projected semantic scope | Required identity-preimage component | Scope selection or meaning |
| Object graph | Provides nested semantic content and references | Discovery, doctrine parsing, or reference invention |
| Identity derivation relation | Declares which nested identities derive from the same target preimage | Inference of dependency or provenance |
| Collection ordering classification | Declares ordered/unordered for every encountered collection | Semantic ordering decision |
| Independent identity evidence | Establishes that a retained nested identity is not derived from the target preimage | Source identity invention |

The result is either:

```text
{ ok: true, preimageBytes, identity, digest }
```

or an explicit fail-closed blocker. `identity` and `digest` are output
capabilities of the module, not values authorized for generation by this
proposal.

## Required Algorithm

1. Validate that target, scope, identity kind, derivation relation, ordering
   classifications, and all required graph references are supplied.
2. Recursively walk the target's semantic scope and object content.
3. Omit the target identity.
4. Omit every nested identity declared as derived from the target preimage.
5. Retain a nested identity only when supplied independent-identity evidence
   establishes that it is not derived from the target preimage.
6. Preserve semantically ordered collections in supplied order.
7. For an explicitly unordered collection, obtain each member's resolved
   SemanticIdentity serialization, compare as unsigned UTF-8 bytes, preserve
   multiplicity, and fail if equal keys identify non-identical content.
8. Fail if any encountered collection has no ordering classification, any
   identity dependency is unresolved, any required identity is absent, a graph
   cycle prevents acyclic projection, or an independent identity claim lacks
   supplied evidence.
9. Construct the projection containing explicit `identityKind`, projected
   semantic scope, and projected object content.
10. Serialize only that projection through `serializeCompactJson`.
11. Delegate the exact resulting bytes to `createIdentity`.

The module must not use temporary review IDs, filesystem paths, insertion
order, discovery order, timestamps, generated names, implementation state, or
historical Contract metadata as preimage input.

## Materialization Order and Cycles

The materializer must not choose an identity-derivation order. It may process
only an explicitly supplied acyclic derivation relation. If an identity graph
cycle cannot be eliminated by the approved identity-stripping rule, it returns
a blocker.

This preserves the distinction between an implementation's graph traversal and
semantic authority over identity dependency. No topological order is inferred
from array position or object traversal order.

## Fail-Closed Result Conditions

The module must return a blocker for at least:

- absent or non-approved identity kind;
- absent scope or object content;
- unresolved graph reference;
- unclassified collection ordering;
- unordered member without resolved identity;
- duplicate unordered identity keys with non-identical canonical content;
- identity derivation cycle;
- missing independent-identity evidence;
- non-JSON/cyclic projected value; or
- any request to infer semantic content, source identity, authority,
  chronology, precedence, or ordering.

## Required Test Coverage

Focused tests must demonstrate:

1. target and same-preimage nested identities are omitted;
2. independently evidenced nested identities are retained;
3. unordered provenance source-reference collections use the approved existing
   identity-key procedure;
4. explicitly ordered transformation dependencies retain supplied order;
5. missing ordering classification fails closed;
6. unresolved identity dependencies and cycles fail closed;
7. equal unordered identity keys with distinct content fail closed;
8. identical supplied semantic graph inputs yield byte-identical preimages,
   identity values, and digests; and
9. the module never uses temporary review IDs or realization/process data.

Tests shall use synthetic semantic fixtures only. They shall not materialize
the approved Semantic Model, generate a Contract, or encode historical
Contract material.

## Exact Boundary

This proposal authorizes neither input selection nor use of the proposed
module against the approved Semantic Model. It does not change any approved
semantic input, and it cannot convert a review-bound model into SemanticIR by
itself.

The module's eventual use remains gated by separate authorization to:

1. materialize the approved Semantic Model;
2. generate identity values and, if needed, digests; and
3. supply all remaining valid scope, graph, derivation, and ordering inputs.

Candidate or other Contract generation remains downstream of a valid
identity-bearing SemanticIR and is not authorized here.

## Requested Human Review

Approve or revise the implementation boundary above. Approval would authorize
only implementation and focused tests within the two listed compiler paths.
It would not authorize running the materializer on the approved Semantic
Model, generating any identity-related output, or performing downstream
Contract work.
