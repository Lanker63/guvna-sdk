# Architecture Doctrine

This directory contains accepted architectural doctrine for Guvna Core.

Architectural doctrine describes enduring architectural boundaries, ownership, and invariants that realize accepted constitutional doctrine and canonical models.

## Doctrine Map

- `CONCEPTUAL-ARCHITECTURE.md` - canonical architectural structure, concepts, and dependency direction for Guvna Core.
- `ARCHITECTURAL-INVARIANTS.md` - immutable architectural invariants that all downstream realizations must preserve.
- `HOST-IMPLEMENTATION-ARCHITECTURE.md` - host-agnostic host boundary doctrine and ownership responsibilities between Guvna Core, Host Implementations, and Governed Repositories.
- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` - core-owned Repository Adoption information boundary, information classes, phase ordering, invariants, fail-closed behavior, and host obligations.

## Cross-Doctrine Traceability

The Repository Adoption Information Contract doctrine is consumed alongside `HOST-IMPLEMENTATION-ARCHITECTURE.md` for host realization boundaries and ownership rules.

These artifacts are complementary and non-competing:

- `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` defines adoption information classes, provenance expectations, ordering constraints, and compatibility obligations.

- `HOST-IMPLEMENTATION-ARCHITECTURE.md` defines what hosts may realize and what they must not reinterpret.
