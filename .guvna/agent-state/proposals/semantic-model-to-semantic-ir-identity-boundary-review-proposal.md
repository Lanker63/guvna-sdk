# Semantic Model to SemanticIR Identity Boundary Review Proposal

**State:** REVIEW
**Scope:** Review-bound Semantic Model population and the boundary to the
implemented identity-bearing `SemanticIR` representation.

## Purpose

This proposal records the boundary identified by the accepted Identity
Requirement Reconciliation. It does not authorize SemanticIR materialization,
identity-kind selection, identity-value generation, digest generation,
canonical serialization, Contract generation, ratification, applicability,
artifact creation, workspace-path designation, or downstream realization.

## Governing Basis

- `docs/implementation/GUVNA-PARENT-SEMANTIC-SELECTION-DECISION-PACKAGE.md`,
  Decision 4: identity-kind vocabulary remains `REVIEW` and no identity value
  or digest is assigned.
- `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`,
  `Semantic Identity`: identity is semantic, stable, referenceable,
  unambiguous within governing scope, independent of filesystem location, and
  suitable for provenance.
- `.guvna/newplan/extracts/semantic-ir.md`, `Structural Kernel` and
  `Identity and Digest`: SemanticIR is identity-bearing; a generated identity
  preimage requires identity kind, semantic scope, and semantic content.
- `core/src/compiler/semantic-ir.ts`: `SemanticIdentity` requires non-empty
  `identityKind` and non-empty `value`; the root and nested SemanticIR records
  require SemanticIdentity directly or through SemanticRef/SemanticScope.

## Proposed Review Boundary

### 1. Semantic Model is distinct from SemanticIR

The approved Semantic Model is the review-bound populated representation of
the selected Parent Guvna Semantic Inventory. It uses temporary inventory
references solely for review traceability, selection, source mapping, and
dependency tracking.

The implemented `SemanticIR` is a distinct machine-readable representation.
It is identity-bearing at the root and throughout its nested reference graph.
It cannot represent unresolved identity values.

### 2. Temporary inventory references are non-semantic

Temporary inventory references, including identifiers such as `C01`, `R01`,
`O01`, `I01`, `F01`, `RO01`, `AB01`, `P01`, `K01`, `REF01`, and `S01`:

- are review-local labels, not SemanticIdentity fields;
- preserve no canonical semantic identity claim;
- MUST NOT be used as `SemanticIdentity.value`;
- MUST NOT be transformed, encoded, hashed, or treated as identity-preimage
  input; and
- expire as review references once an authorized identity-materialization step
  produces distinct semantic identities.

The evidence for this distinction is the approved decision package's statement
that these are temporary review identifiers, together with the Semantic
Identity doctrine's rule that identity belongs to meaning rather than a
representation, label, filesystem position, chronology, or convenience.

### 3. Exact conversion boundary

The boundary is:

```text
Approved selected inventory + source mappings + temporary review references
    -> review-bound Semantic Model
    -> [separately authorized identity materialization]
    -> identity-bearing SemanticIR
```

The review-bound Semantic Model contains only the selected semantic content,
its source passages, parent/specialization classification, dependencies, and
unresolved matters. It is not a valid SemanticIR instance.

SemanticIR materialization begins only when every required SemanticIdentity
field, including nested references and scope identities, can be supplied under
the approved identity procedure. This conversion is not Contract generation.

### 4. Inputs required to cross the boundary

| Input | Classification | Required before SemanticIR materialization? |
|---|---|---:|
| Approved selected Semantic Model content | semantic selection already represented in the decision package | Yes |
| Governing scope content | semantic decision/selection | Yes |
| Identity-kind policy | separate human-authorized semantic policy | Yes |
| Collection ordering classifications | approved semantic input where canonical ordering applies | Yes for canonical identity materialization |
| Canonical serialization rules | already established representation rule | Yes |
| Canonical identity preimage bytes | deterministic derivation | Yes |
| `SemanticIdentity.value` values | deterministic derivation from preimage bytes | Yes |
| SHA-256 digest | deterministic derivation from preimage bytes | No for structural representation; not authorized here |

Identity kinds are semantic-policy inputs. Identity values are not
human-selected: they are derived only after identity-kind policy, scope,
content, ordering, and canonical serialization inputs are established.

### 5. Required later authority

A separately authorized identity-kind policy is required before SemanticIR
materialization because `SemanticIdentity.identityKind` is mandatory and the
approved decision package intentionally leaves its vocabulary unresolved.

That later policy must establish only the minimum vocabulary necessary for the
selected population. It must not assign identity values, generate a digest,
ratify a Contract, determine applicability, or authorize Contract generation.

### 6. Preserved implementation boundary

This proposal authorizes no change to `core/src/compiler/semantic-ir.ts`, its
validator, serializer, identity generator, tests, or any other implementation
file. The current SemanticIR invariant remains intact: unresolved identity
values are not structurally representable.

### 7. Downstream boundary

Contract generation remains downstream of SemanticIR materialization:

```text
review-bound Semantic Model
    -> authorized identity materialization
    -> SemanticIR
    -> later Candidate Contract generation
```

No Contract, ratification, applicability, artifact, workspace path, Runtime,
SDK, Host, Projection, or other realization is authorized by this proposal.

## Requested Human Review

Confirm that the review-bound Semantic Model is distinct from SemanticIR and
may use temporary non-semantic inventory references; confirm that conversion
to SemanticIR is a later identity-materialization step requiring separately
authorized identity-kind policy and deterministic identity-value derivation.

Approval of this proposal would establish the representation boundary only. It
would not authorize conversion or any downstream operation.