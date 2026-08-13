# Architectural Invariants

## Purpose

The Architectural Invariants define the immutable architectural laws governing how Guvna Core realizes the accepted constitutional doctrine and canonical models.

They preserve the dependency direction, ownership boundaries, realization boundaries, and semantic authority established by the accepted architecture.

All architectural doctrine, Repository Adoption capabilities, Repository Governance mechanisms, Runtime behavior, Host Implementations, repository projections, scaffolds, and other realizations SHALL preserve these invariants.

These invariants are architectural.

They do not establish constitutional ontology.

They do not redefine canonical repository understanding.

They govern how accepted repository understanding is realized throughout the platform while preserving provenance, semantic ownership, and the distinction between understanding, governance, projection, and realization.

Where an architectural realization conflicts with these invariants, these invariants prevail.

These invariants cross-reference the dependency chain and boundary language used by [CONCEPTUAL-ARCHITECTURE.md](./CONCEPTUAL-ARCHITECTURE.md) and [HOST-IMPLEMENTATION-ARCHITECTURE.md](./HOST-IMPLEMENTATION-ARCHITECTURE.md).

---

Invariant 1

Repository Understanding is the semantic source of every downstream repository-semantic realization, including governance content, compiled governance projections, runtime directives, repository projections, scaffolds, and filesystem organization.

---

Invariant 2

No runtime component may infer repository semantics directly from repository organization, layout, or local presentation state.

---

Invariant 3

Repository Runtime consumes compiled governance projections only for repository-semantic input.

---

Invariant 4

Host Implementations realize Runtime Directives.

They do not derive repository semantics.

---

Invariant 5

Repository organization is always a realization.

Never a semantic authority.

---

Invariant 6

Every projection must trace back to one or more canonical dimensions of Repository Understanding.

Projection families are dimension-specific rather than collapsed into one generalized bucket. Indexes and discovery surfaces originate from the Knowledge System. Guidance and runbooks originate from the Operating Model. Templates and starter repositories originate from the Governance Model. Workspace views originate from the Work System. Repository scaffolds and filesystem organization originate from accepted Repository Understanding.

---

Invariant 7

No implementation concern may introduce a new semantic authority surface.

---

Invariant 8

Repository Governance Content is derived from the Governance Model and becomes runtime-consumable only after compilation into a governance projection.