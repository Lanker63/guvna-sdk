# Bounded Realization Plan

This plan is an engineering sequence, not a governance workflow. It creates no
authority decision, Contract, Candidate, Applicable Contract, or repository
meaning.

## Phase A: Pure Compiler Foundations

**Goal:** realize only the supplied-input, deterministic library behavior
described in [Semantic IR Implementation Extract](extracts/semantic-ir.md) and
[Contract State And Compatibility Extract](extracts/contract-state-and-compatibility.md).

| Work item | Status | Candidate paths | Inputs / outputs | Non-goals |
|---|---|---|---|---|
| IR types and structural validation | COMPLETE - validated by `semantic-ir.test.ts` | `core/src/compiler/semantic-ir.ts`, `core/tests/compiler/semantic-ir.test.ts` | In-memory IR values / structural result | No populated IR or Contract generation. |
| Deterministic serialization | COMPLETE - validated by `foundations.test.ts` | `core/src/compiler/ir-serializer.ts`, matching tests | Supplied IR value / bytes or explicit failure | No discovery, source parsing, or semantic equivalence inference. |
| Identity and digest | COMPLETE - validated by `foundations.test.ts` | `core/src/compiler/ir-identity.ts`, matching tests | Supplied canonical bytes / base64url identity and SHA-256 digest | No assignment of identity kind or Contract identity. |
| Lifecycle evaluator | COMPLETE - validated by `foundations.test.ts` | `core/src/compiler/contract-lifecycle.ts`, matching tests | Supplied state, operation, and guard data / permitted or fail-closed result | No authority creation or lifecycle instance persistence. |
| Compatibility evaluator | COMPLETE - validated by `foundations.test.ts` | `core/src/compiler/compatibility.ts`, matching tests | Supplied requirement evaluations / tri-state result with provenance | No predicate invention or requirement selection. |
| Provenance utilities | COMPLETE - validated by `foundations.test.ts` | `core/src/compiler/provenance.ts`, matching tests | Supplied provenance / preserved lineage | No authority inference or source selection. |

Each item requires only the source-defined behavior, focused conformance tests,
and these commands:

```text
pnpm -C core build
pnpm -C core typecheck
pnpm -C core test
```

## Phase B: Applicability Integration

**Status:** COMPLETE - the supplied-input integration primitive and focused
tests are present in `contract-applicability.ts` and
`contract-applicability.test.ts`.

Keep [`determineApplicability`](../../core/src/compiler/applicability-determination.ts)
as an independent supplied-input evaluator. New compiler primitives may call it
only after assembling the same externally supplied authority, scope, validity,
effective-boundary, and provenance input shape. They must not expand it into
ratification, authority mutation, artifact loading, or repository applicability.

The completed integration primitive preserves those boundaries: it assembles
the supplied contract identity and semantic version, delegates evaluation, and
returns the result with available authority and provenance fields. It does not
load artifacts, mutate authority, or establish repository applicability.

## Phase C: Stop Boundary

**Status:** BLOCKED - required Contract and interface inputs are absent.

Do not schedule an executable Runtime, SDK, Host, projection compiler,
persistence layer, transport, provider integration, or repository interaction
from current evidence.

Those surfaces require concrete interfaces and inputs that do not exist in the
repository, including a recoverable Contract payload and Runtime/SDK/Projection
schemas. The appropriate outcome is an explicit unspecified-design boundary,
not inferred behavior.

## Next Action

No Phase B action is scheduled. Phase C remains blocked pending the missing
authoritative Contract and interface specifications.