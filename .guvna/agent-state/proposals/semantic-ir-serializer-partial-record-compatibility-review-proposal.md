# SemanticIR Serializer Partial-Record Compatibility Review Proposal

**State:** REVIEW
**Scope:** Assess only whether `serializeCompactJson` is compatible with the
approved identity-preimage projection when valid projected records omit optional
members.

## Purpose

This proposal answers whether the current compact serializer can serialize the
identity-stripped partial records required by the approved recursive
identity-preimage materializer boundary. It authorizes no implementation.

No serializer or materializer change, identity value, preimage, digest,
SemanticIR, Contract, ratification, applicability, artifact, workspace path,
or realization is created by this proposal.

## Governing Canonical Serialization Rule

`.guvna/newplan/extracts/semantic-ir.md`, `Serialization`, states:

> Omit absent optional properties; emit required empty collections as `[]`;
> never emit `undefined`.

The same section requires object member names in interface-field order. These
rules are compatible: member order governs the order of **present** members;
it does not require absent optional members to be emitted.

Therefore an absent optional member is:

- **omitted** from canonical JSON;
- not represented as `undefined`;
- not represented as `null` unless `null` is the actual semantic value; and
- not otherwise encoded.

## Current Serializer Behavior

`core/src/compiler/ir-serializer.ts` has two distinct key-selection paths:

```ts
const keys = fieldOrder
  ? fieldOrder.filter((key) => key in value)
  : canonicalFieldOrder(value) ?? Object.keys(value);
```

The root SemanticIR path passes `SEMANTIC_IR_FIELD_ORDER` explicitly and
correctly filters absent optional fields. The nested-record path calls
`canonicalFieldOrder(value)`, which returns a matching **full** field-order
list. `encode` subsequently emits every returned key, including missing
optional fields whose lookup result is `undefined`.

For example, a valid `ProvenanceRef` with only `sourceIdentity` matches the
declared order:

```text
["sourceIdentity", "sourcePath", "sourceSection"]
```

and then attempts to serialize absent `sourcePath` as `undefined`. The
serializer rejects that with `Value is not JSON serializable`.

## Compatibility Determination

**Classification: D. Conflict between governing canonical serialization rules
and the current implementation.**

This is an **implementation defect**, not an intentional serializer invariant:

- governing rules expressly require omission of absent optional properties;
- the current nested-record ordering path instead attempts emission of absent
  optional members;
- no existing test establishes rejection of a valid partial record as intended;
  `foundations.test.ts` tests primitive serialization and a fully populated
  root IR fixture only; and
- the approved identity-preimage materializer requires recursively projected
  records that may validly omit generated identities and optional fields.

This is not a specification ambiguity. The governing serialization rule is
explicit. It affects both ordinary valid nested SemanticIR records with absent
optional fields and identity-stripped partial projections; it is not solely a
materializer-specific concern.

## Smallest Assessed Change

The smallest supported mutation is confined to:

```text
core/src/compiler/ir-serializer.ts
core/tests/compiler/foundations.test.ts
```

The implementation should preserve a declared record's field order while
selecting only keys that are present in the supplied record. In effect, the
nested inferred-order path must apply the same present-key selection already
used by the explicit root field-order path.

The change must:

- preserve declared interface-field order among present fields;
- omit absent optional fields;
- never emit `undefined`;
- preserve required-field validation in `validateSemanticIR`;
- preserve empty required collections as `[]`;
- preserve primitive handling, Unicode handling, number handling, and cycle
  rejection;
- preserve approved unordered-collection behavior; and
- preserve fail-closed behavior for invalid values.

Focused tests should establish that:

1. a partial `ProvenanceRef` containing only `sourceIdentity` serializes with
   only that member;
2. an optional member, when present, appears in declared field order;
3. a valid root SemanticIR with absent optional `semanticVersion` remains
   serialized without that member; and
4. `undefined` remains rejected when supplied as an actual value.

## Relationship to Approved Boundaries

The approved Semantic Model-to-SemanticIR boundary remains unchanged.
The approved `identityKind = semantic` policy remains unchanged. The approved
provenance source-reference collections remain unordered. The serializer fix
would make the existing canonical serialization rule implementable for valid
partial records; it would not select semantic content, ordering, scope,
derivation relationships, authority, or identity values.

The recursive materializer remains unimplemented. Even after a serializer fix,
its separate authorization and all materialization boundaries remain required.

CLASSIFICATION
D

IS SERIALIZER CHANGE REQUIRED?
YES

SMALLEST AUTHORIZED CHANGE
None under this REVIEW proposal. If separately approved: modify only
`core/src/compiler/ir-serializer.ts` and
`core/tests/compiler/foundations.test.ts` to preserve field order while
omitting absent optional fields.

NEXT AUTHORIZED ACTION
Human review of this serializer-boundary proposal only.
