# SemanticIR Provenance Ordering Review Proposal

**State:** APPROVED
**Scope:** Semantic ordering classification only for `ProvenanceRecord.sources`,
`ConflictProvenance.sources`, and attached `ProvenanceRef[]` collections.

## Purpose

This proposal resolves whether member sequence itself has semantic meaning for
the three remaining provenance source-reference collections. It does not
reopen the approved Parent Semantic Inventory, C09, K01-K08, identity-kind
policy, or Semantic Model-to-SemanticIR boundary.

It authorizes no identity value, preimage, digest, SemanticIR materialization,
Contract generation, ratification, applicability, artifact, workspace path,
realization, compiler change, test change, serializer change, or
identity-generator change.

## Governing Basis

- `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`, `Invariant 19`:
  provenance preserves source, authority context, transformation, semantic
  identity, semantic version, acceptance, and resulting manifestation as
  required by the applicable Semantic Contract.
- `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`, `Invariant 20`:
  provenance explains source and transformation; it does not establish
  authority.
- `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`,
  `Canonical Identity Must Be Carried by the Artifact`: identity does not
  depend on creation chronology or insertion order.
- `.guvna/newplan/extracts/semantic-ir.md`, `Unordered Collection Ordering`:
  only a semantically unordered collection is sorted by compact-JSON UTF-8
  serialization of each element's SemanticIdentity; semantically ordered
  collections retain supplied order.
- `core/src/compiler/semantic-ir.ts`: the three collections are arrays of
  `ProvenanceRef`; the representation does not assign member position a
  semantic field.

## Collection A - ProvenanceRecord.sources

### Governing Evidence

`ProvenanceRecord.sources` represents the source provenance for one identified
subject. Constitutional provenance requires observability of source and
transformation, but does not state that one source precedes, outranks, or
enables another by member position.

### Semantic Meaning of Membership

Each member attributes the subject to an applicable source identity, with an
optional source path and source section. Membership means the source belongs
to the subject's preserved provenance.

### Semantic Meaning of Sequence

No governing source assigns chronology, priority, authority, dependency,
presentation order, discovery order, or canonical order to array position.
Transformation dependency belongs to `ProvenanceRecord.transformations`, not
to the source-reference membership collection.

**Classification:** UNORDERED

**Evidence Classification:** SOURCE-DERIVABLE. The source meaning is a set of
attributions; the explicit absence of sequence semantics means member position
does not carry additional meaning.

### Canonical Serialization Consequence

Later canonical serialization applies the existing approved unordered-
collection procedure: sort by compact-JSON UTF-8 serialization of each
member's SemanticIdentity, preserve multiplicity, and fail closed for missing
or conflicting identity keys. This proposal introduces no new algorithm.

### Identity Consequence

This collection no longer blocks deterministic identity materialization on an
ordering question once identity materialization is separately authorized and
the required identities exist.

## Collection B - ConflictProvenance.sources

### Governing Evidence

`ConflictProvenance.sources` identifies the sources involved in one conflict.
Constitutional provenance requires source observability, and provenance does
not establish authority. No source assigns conflict-source position any
precedence, chronology, or resolution meaning.

### Semantic Meaning of Membership

Each member identifies a source participating in the conflict provenance.
Membership means the source is part of the preserved basis for the conflict.

### Semantic Meaning of Sequence

Conflict precedence and resolution must be established separately; source-array
position cannot supply either. No governing source gives member position an
independent semantic role.

**Classification:** UNORDERED

**Evidence Classification:** SOURCE-DERIVABLE. The collection preserves
membership in a conflict basis, while precedence and resolution are distinct
semantic fields or decisions.

### Canonical Serialization Consequence

Later canonical serialization applies the existing approved unordered-
collection procedure, with the same identity-key, multiplicity, and
fail-closed conditions as Collection A.

### Identity Consequence

This collection no longer blocks deterministic identity materialization on an
ordering question once identity materialization is separately authorized and
the required identities exist.

## Collection C - Attached ProvenanceRef[]

### Governing Evidence

The `provenance` arrays attached to entities, relationships, constraints,
transitions, and compatibility contexts carry source attribution for the
record they accompany. The governing provenance rules require source and
transformation preservation, but do not assign source-array position semantic
meaning.

### Semantic Meaning of Membership

Each member states that the attached semantic record is attributable to the
identified source, optionally narrowed by path or section. Membership does not
express a transformation edge, authority rank, chronology, or priority.

### Semantic Meaning of Sequence

No governing source establishes position as semantically meaningful. Where an
actual transformation dependency exists, it must be represented in an explicit
transformation chain, not inferred from this attribution array.

**Classification:** UNORDERED

**Evidence Classification:** SOURCE-DERIVABLE. The attached arrays are source
attribution membership; semantic ordering would add meaning not established by
the governing sources.

### Canonical Serialization Consequence

Later canonical serialization applies the existing approved unordered-
collection procedure, with the same identity-key, multiplicity, and
fail-closed conditions as Collections A and B.

### Identity Consequence

This collection no longer blocks deterministic identity materialization on an
ordering question once identity materialization is separately authorized and
the required identities exist.

## Decision Table

| Collection | Classification | Evidence basis | Canonicalization consequence |
|---|---|---|---|
| `ProvenanceRecord.sources` | UNORDERED | SOURCE-DERIVABLE: attribution membership; no position semantics | Apply the existing approved unordered-collection procedure later. |
| `ConflictProvenance.sources` | UNORDERED | SOURCE-DERIVABLE: conflict-source membership; precedence is separate | Apply the existing approved unordered-collection procedure later. |
| Attached `ProvenanceRef[]` | UNORDERED | SOURCE-DERIVABLE: record-source attribution; dependencies are separate transformations | Apply the existing approved unordered-collection procedure later. |

## Recommended Resolution

**RECOMMENDATION.** Classify all three source-reference collections as
**UNORDERED**. This follows the source-established distinction between source
membership and explicit transformation lineage. It is not chosen to make
hashing possible, and it does not classify transformation chains: an explicit
transformation dependency remains ordered only when that dependency is
independently established.

No provenance source-reference ordering blocker remains if this review
resolution is approved. Identity materialization remains separately blocked by
its own authorization and implementation prerequisites.

## Human Approval Recorded

Human authority approves the following source-derived classifications:

```text
ProvenanceRecord.sources = UNORDERED
ConflictProvenance.sources = UNORDERED
attached ProvenanceRef[] = UNORDERED
```

This approval applies only to provenance source-reference ordering. It does
not authorize identity values, preimages, digests, SemanticIR materialization,
Contract generation, ratification, applicability, artifacts, workspace paths,
realization, or implementation modification.
