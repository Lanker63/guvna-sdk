# Architectural Baseline

This is a derivative engineering assessment. It does not define or alter any
Guvna semantic boundary.

| Surface | Established responsibility | Current implementation | Missing design or implementation |
|---|---|---|---|
| Guvna Core semantic layer | Owns Guvna meaning, contracts, Runtime/SDK semantics, provenance, and compatibility semantics. | Doctrine only. | Executable semantic-model realization. |
| Semantic Contract layer | Defines versioned interpretation obligations for downstream realizations. | No recoverable Contract payload. | Contract representation and concrete instance. |
| Semantic IR / compiler | Expresses Guvna meaning while preserving identity, provenance, and compatibility boundaries. | `determineApplicability` only. | IR types, serializer, identity, lifecycle, compatibility, and validators. |
| Runtime | Consumes applicable contracts, compatible projections, execution context, authority state, and provenance; produces directives, decisions, diagnostics, evidence, and history. | MISSING. | INSUFFICIENTLY SPECIFIED: Runtime Contract, inputs, outputs, errors, loading, and projection schema. |
| SDK | Exposes Core contracts and Runtime capabilities to Hosts. | MISSING. | INSUFFICIENTLY SPECIFIED: SDK bindings, operations, result types, and transport contract. |
| Host Implementation | Owns presentation, interaction, lifecycle, transport, and environment integration. | MISSING. | INSUFFICIENTLY SPECIFIED: host protocol and integration API. |
| Governed Repository | Owns repository-specific truth, accepted knowledge, understanding, governance, authority context, and projections. | MISSING. | Repository-specific content, authority model, and representation. |
| Repository realization | Produces repository-owned projections conforming to Guvna contracts. | MISSING. | Projection Contract, projection schema, compiler, and validation. |

## Current Executable Boundary

[`core/src/compiler/applicability-determination.ts`](../../core/src/compiler/applicability-determination.ts)
is the independent supplied-input evaluator. The integration boundary is
[`core/src/compiler/contract-applicability.ts`](../../core/src/compiler/contract-applicability.ts),
which assembles supplied contract identity and semantic version inputs, delegates
to the evaluator, and returns the tri-state result with available authority and
provenance.

These compiler primitives do not load a contract, ratify a contract, create or
alter an authority decision, consume repository knowledge, start Runtime, expose
an SDK, persist state, or communicate with a Host.