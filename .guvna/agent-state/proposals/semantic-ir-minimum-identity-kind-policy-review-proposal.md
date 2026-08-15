# SemanticIR Minimum Identity-Kind Policy Review Proposal

**State:** APPROVED
**Scope:** Identity-kind policy only for a later conversion of the approved
review-bound Semantic Model into the implemented SemanticIR.

## Purpose

This proposal requests review of the minimum identity-kind policy necessary
before a valid SemanticIR can be materialized. It does not select identity
values, generate canonical preimages or SHA-256 digests, materialize
SemanticIR, generate a Contract, ratify, determine applicability, create an
artifact, or modify implementation.

## Identity Kind Is Not Identity Value

An **identity kind** is the policy-controlled classification in
`SemanticIdentity.identityKind`. An **identity value** is the non-empty
`SemanticIdentity.value` derived later from canonical preimage bytes.

This proposal concerns only identity kind. Identity values remain entirely
outside scope and cannot be assigned, selected, generated, encoded, or hashed
by approval of this proposal.

## Governing Basis

- `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`,
  `Semantic Identity`: identity is assigned according to the meaning and
  semantic role represented, and must be semantic, stable, referenceable,
  unambiguous within governing scope, filesystem-independent, and provenance
  suitable.
- `.guvna/newplan/extracts/semantic-ir.md`, `Identity and Digest`: identity
  preimages require an explicit identity kind, projected semantic scope, and
  projected object content.
- `core/src/compiler/semantic-ir.ts`: every `SemanticIdentity` has a non-empty
  `identityKind` and `value`; the implementation does not constrain the
  vocabulary beyond non-empty string validation.
- `.guvna/agent-state/proposals/semantic-model-to-semantic-ir-identity-boundary-review-proposal.md`:
  the review-bound Semantic Model is distinct from identity-bearing SemanticIR
  and conversion requires separately authorized identity-kind policy.

## Identity-Bearing Structures Required by the Selected Population

| SemanticIR structure | Semantic thing identified in the selected population | Existing kind source | Distinct kind necessary? | Common kind equivalent? |
|---|---|---|---|---|
| `SemanticIR.semanticIdentity` | The populated semantic representation itself, not a Contract | No explicit kind | No source establishes a separate root category | Yes; root position identifies its role |
| `SemanticScope.identity` | The selected governed scope | No explicit kind | No source establishes a scope-kind category | Yes; scope position and meaning identify its role |
| `SemanticEntity.identity` | Selected concepts, states, and lifecycle operations represented as entities | No explicit kind | No source establishes concept/state/operation kinds as identity categories | Yes; `SemanticEntity.kind` and meaning identify role |
| `SemanticRelationship.identity` | Selected R01-R05 relationships | No explicit kind | No source establishes relationship kind as an identity category | Yes; relationship structure identifies role |
| `SemanticConstraint.identity` | Selected invariants, authority boundaries, failures, common obligations, and compatibility requirements | No explicit kind | No source establishes constraint/failure/obligation kinds as identity categories | Yes; `SemanticConstraint.kind` and meaning identify role |
| `SemanticTransition.identity` | Selected T01-T09 Contract lifecycle transitions | No explicit kind | No source establishes transition kind as an identity category | Yes; transition structure identifies role |
| `ProvenanceRecord`, `TransformationRef`, and `ConflictProvenance` identities when needed | Provenance required by P01 and the conversion transformation | No explicit kind | No source establishes a provenance kind category | Yes; provenance record structure identifies role |
| `SemanticRef` and `ProvenanceRef.sourceIdentity` | References to the above identified material and governing sources | No new thing; references reuse target identities | No | Yes; references reuse the target's common kind |

**FACT.** `contracts`, `realizations`, authority decisions, acceptances,
delegations, conditions, and semantic attributes are not selected population
records under the approved parent boundary. Their required SemanticIR
collections may be empty; this proposal does not select identity kinds for
unselected records.

## Evaluation of Minimum Vocabulary

### A. Minimum single-kind policy

**Proposed value:** `semantic`

| Item | Determination |
|---|---|
| Semantic things identified | Every identity-bearing structure listed above, when and only when it is materialized from the selected population |
| Governing source | Semantic Identity doctrine establishes one general Semantic Identity concept; no source establishes role-specific identity-kind categories |
| Classification | GENUINELY PROPOSED literal value; SOURCE-DERIVABLE one-kind policy from the absence of established distinctions plus record-contained role semantics |
| Why separate kinds are unnecessary | The selected semantic role is already explicit in the semantic record type, `SemanticEntity.kind`, `SemanticConstraint.kind`, relationship/transition structure, source provenance, and governing scope. A kind split would add category meaning not established by doctrine. |
| Is an existing common kind semantically equivalent? | No existing literal is established. The proposed common literal is the smallest policy that can express the doctrine's general Semantic Identity concept. |
| Implementation consequence | Satisfies the required non-empty string field uniformly. It does not generate any identity value or relax validation. |

### B. Minimum multi-kind policy

**Determination:** No multi-kind policy is source-derivable.

The earlier labels `semantic-contract`, `semantic-scope`, `semantic-concept`,
`semantic-constraint`, `semantic-relationship`, and `semantic-provenance`
would create distinctions not established as identity-kind categories by the
governing sources. The types need different record roles, but type roles do
not establish distinct semantic identity kinds.

A multi-kind policy is therefore genuinely proposed and would require a
separate semantic rationale for every additional category. It is not the
minimum policy for the selected population.

### C. Unresolved policy

**Determination:** Not required by current sources.

The governing sources do not establish a literal value, but they establish a
single general Semantic Identity concept and no required kind distinctions.
Human authority may authorize the minimum single-kind literal without choosing
an ungrounded taxonomy.

## Recommendation

**RECOMMENDATION.** Approve Alternative A: a single identity kind with proposed
value `semantic` for every identity-bearing record materialized from the
selected Semantic Model population.

This is the minimum policy because it supplies the required `identityKind`
field while preserving all source-established distinctions in the records'
own structures and meanings. It does not assert that all identified things are
the same semantic thing; it asserts only that doctrine has not established
different identity-kind categories for them.

## Effect of Approval

Approval would authorize **only identity-kind selection**. It would not
authorize:

- identity values;
- canonical preimages;
- SHA-256 digests;
- canonical serialization;
- SemanticIR materialization;
- Contract generation, ratification, or applicability;
- artifacts, workspace paths, or downstream realization; or
- any implementation modification.

Identity values may be deterministically derived only in a separately
authorized identity-materialization operation after all required scope,
selected content, collection-ordering, and serialization inputs are
established.

## Requested Human Review

Select one finite alternative:

```text
A. Approve the minimum single-kind policy: identityKind = semantic.
B. Approve a multi-kind policy only with a governing-source rationale for each additional kind.
C. Leave identity-kind policy unresolved; SemanticIR materialization remains blocked.
```

No selection in this proposal constitutes identity materialization or a
Contract-related authority action.

## Human Approval Recorded

Human authority selected Alternative A:

```text
identityKind = semantic
```

This approval authorizes only the minimum single-kind policy for every
identity-bearing record materialized from the selected Semantic Model
population. It does not authorize identity values, canonical preimages,
SHA-256 digests, SemanticIR materialization, Contract generation,
ratification, applicability, artifacts, workspace paths, realization, or
implementation modification.
