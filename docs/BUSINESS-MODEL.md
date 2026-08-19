# Business Model

Guvna is positioned as an asymmetric digital business model: the public SDK is distributed as the developer artifact for third-party host adoption, while `@guvna/core` is a licensed, compiled runtime on the Guvna-owned side of the boundary. The preferred host exposure for the runtime is a stable local runtime protocol. This document is business-model and positioning language only. It does not define doctrine, runtime semantics, SDK semantics, or host realization boundaries.

```text
Guvna
|-- PUBLIC SDK
|   `-- Third-party hosts
|       |-- Acme Host
|       |-- Beta Host
|       `-- Gamma Host
`-- LICENSED COMPILED RUNTIME
   `-- @guvna/core
      `-- Stable local runtime protocol
```

Third-party hosts are complements. They consume the public SDK independently and realize transport, presentation, and lifecycle around the SDK boundary. The runtime is monetized as a licensed compiled product rather than as a public developer dependency.

The exact licensing terms for the runtime are governed outside this document and are not established here.

## Authentication Positioning

This section documents an approved business-model recommendation on authentication. It is business-model and positioning language only. It does not define doctrine, runtime semantics, SDK semantics, host realization boundaries, or identity/attribution semantics.

- Authentication is required for platform services, licensed capabilities, synchronization, and governed operations.

- A constrained offline mode is defined for explicitly permitted local work, for use when authentication is not available or not yet established.

- The unauthenticated local principal is preserved as provenance rather than discarded or overwritten.

- On reconnection, the system records an explicit, auditable association between the local provenance and the authenticated account. The original attribution is not silently replaced.

- Whether a Guvna profile is mandatory for every host and every use is not decided here. It remains an unresolved product and authority decision.

## Domain Pack Marketplace

This section documents ratified business decisions about the Domain Pack marketplace. It is business-model and positioning language only. It does not define doctrine, runtime semantics, SDK semantics, or host realization boundaries, and it does not restate or reinterpret doctrine's semantic definition of what a Domain Pack is or how it is admitted or evaluated by the Runtime.

- The Domain Pack marketplace is Guvna-operated. It is a first-party channel, not a third-party-run storefront.

- Third-party authorship of Domain Packs is desired long-term, but only through an authorized and certified vendor program. Certification is an intake process into the marketplace, made up of three components:
  - Structure and rules coherence review.
  - Intellectual correctness evaluation.
  - Author qualification (preferred/promoted vendor status).

  Certification is a marketplace trust and quality gate performed by Guvna at listing time. It is not, and must not be described as, a substitute for or extension of the Runtime's own semantic admission of a pack's content. A certified pack can still be accepted or rejected by the Runtime at use time.

- Revenue share and commercial terms for third-party vendors must be formalized before any third-party contributions are allowed into the marketplace. Until those terms are formalized, the marketplace offers Guvna-authored Domain Packs only.

- Marketplace access model: acquiring and using the full Domain Pack requires an active Guvna license (org or user). A limited public metadata catalog is available to unlicensed users, to support marketing and discoverability. The public metadata allow-list is: name, publisher, version, category, and short description (with room for a small number of similarly non-revealing fields later). No structural detail or content specifics of the pack itself may be exposed in the public catalog, to prevent reconstruction of the pack's content from metadata alone.

- Licensing scope: a Domain Pack license/entitlement is granted at the organization or user level, not per Governed Repository. A licensee may use a purchased/licensed Domain Pack across every Governed Repository they administer, without needing a separate license per repository.

- Redistribution position: copying a licensed Domain Pack to another org or user is not a permitted use of the license. This is prevented through technical entitlement enforcement, not through limiting the number of repositories a license covers — enforcement of licensee identity is a technical/runtime concern, not a repository-count restriction. Detailed enforcement mechanics are out of scope for this document and are documented separately in [docs/implementation/plans/domain-pack-licensing-entitlement-plan.md](implementation/plans/domain-pack-licensing-entitlement-plan.md).

Boundary note: this page does not redefine doctrine, runtime semantics, SDK semantics, or host realization boundaries.