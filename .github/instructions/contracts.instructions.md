---
description: "Use when discussing, generating, validating, or ratifying Semantic/Runtime/SDK/Projection Contracts (Candidate, Validated, Ratified, Applicable, Superseded, or Rejected states) anywhere in the Guvna workspace."
---
Guvna distinguishes at least six contract lifecycle states: Candidate,
Validated, Ratified, Applicable, Superseded, and Incompatible/Rejected (see
`doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, "Contract
Ratification and Applicability", and
`doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`).

- Never treat a contract as applicable merely because it exists, parses, was
  generated successfully, or is already consumed by Runtime or SDK code.
  State its actual lifecycle state explicitly whenever you reference it.
- Contract Ratification is human authority only (Gate 5). No agent —
  including `semantic-compiler`, which produces the Candidate Semantic
  Contract — may ratify or declare a contract applicable.
- The workspace does not yet define a concrete filesystem convention for
  where compiled contracts live (`core/runtime/` and `core/sdk/` are
  currently empty placeholders). Do not invent one; propose a location via
  `guvna-steward` before writing a contract artifact anywhere.
- A contract version changes only when the contractual semantic boundary
  materially changes, not for documentation, generation-mechanics, or
  serialization changes.
