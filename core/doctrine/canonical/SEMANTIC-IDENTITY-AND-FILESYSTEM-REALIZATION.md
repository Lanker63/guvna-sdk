# Semantic Identity and Filesystem Realization

## Purpose

This document is canonical doctrine.

It defines how authority-bearing governance artifacts are identified, named, organized, and discovered within the repository.

It realizes the accepted repository understanding that canonical identity is semantic and independent of filesystem location, while filesystem layout remains a repository realization.

This doctrine is subordinate to the constitutional invariants.

---

## Governing Principles

### Canonical identities are semantic

Authority-bearing governance artifacts SHALL have canonical identities that are semantic, stable, referenceable, and independent of filesystem location.

Canonical identity SHALL be carried by the artifact itself on its authoritative surface.

Canonical identity SHALL NOT be inferred from:

- filename ordinality;
- directory depth;
- repository path;
- creation chronology; or
- storage location.

### Filesystem paths are realizations

Filesystem paths, filenames, and directory structures are repository realizations.

They MAY serve as compatibility aliases during migration.

They SHALL NOT be treated as canonical identity.

### Filenames derive from canonical identity only when useful

Where a filename conveys useful readability, it MAY be derived from canonical identity or from a stable semantic slug associated with that identity.

No filename SHALL be required to encode ordinality in order to make the artifact authoritative.

No filename SHALL be required to preserve governance meaning.

### Ordinality has no enduring architectural purpose for authority-bearing governance artifacts

Ordinal naming MAY persist only as a migration compatibility alias where existing consumers still depend on it and where deterministic resolution remains possible.

Ordinal naming SHALL NOT be used as a source of governance authority.

Ordinal naming SHALL NOT be used as the primary navigation mechanism for authoritative governance artifacts.

Ordinality may remain useful only as a transient coordination aid while older aliases are being retired.

### Governance authority never depends on sequence or chronology

The acceptance order of artifacts, the order of their creation, and the order of their filenames SHALL NOT establish authority.

Chronology MAY remain useful as provenance metadata.

Chronology SHALL NOT be elevated into identity.

Chronology SHALL NOT be used to determine which artifact is canonical.

---

## Repository Organization

Authority-bearing governance artifacts SHOULD be organized by artifact family and governance role rather than by ordinal filename.

Repository organization SHOULD optimize for semantic grouping, stable identity, and explicit relationships.

The following organizational concerns are permitted and useful:

- grouping by artifact family;
- grouping by doctrinal layer;
- grouping by lifecycle stage;
- grouping by governing boundary; and
- grouping by accepted relationship.

The following organizational concerns are not canonical identity mechanisms:

- numeric prefixes;
- insertion order;
- chronological filename sorting; and
- path-based authority inference.

---

## Discoverability and Navigation

Discoverability SHALL be provided through explicit repository indexes, manifests, or catalogs that reference canonical identities directly.

Repository navigation SHALL NOT depend on ordinal filenames.

Indexes MAY provide:

- canonical identity;
- family or doctrinal layer;
- status or lifecycle state;
- accepted relationships;
- current repository alias paths; and
- provenance links.

Such indexes are navigation aids and derived representations.
They SHALL NOT become alternate authority surfaces.

An index MAY be the primary entry point for finding an artifact by identity, but it SHALL remain derivative of the authoritative artifact and accepted governance records.

---

## Migration Guidance

Existing ordinal filenames MAY remain temporarily as compatibility aliases.

Migration SHOULD preserve deterministic resolution from existing aliases to canonical identities.

Migration SHOULD prefer:

1. canonical identity on the artifact surface;
2. semantic filename conventions where naming is still useful;
3. explicit repository indexes for discovery; and
4. gradual retirement of ordinal aliases once consumers no longer require them.

Migration SHALL NOT reinterpret ordinality as identity.

Migration SHALL NOT create a second authority surface in an index, manifest, or catalog.

---

## Architectural Consequences

Eliminating ordinal naming reduces the risk that repository layout will be mistaken for governance meaning.

It strengthens long-term maintainability by making canonical identity stable across rename, rehome, and reorganization.

It also requires a deliberate discovery surface so humans and automation can navigate by identity rather than by path order.

The main trade-off is operational: ordinal filenames are easy to scan, but they encode a false implication that sequence is authority.

This doctrine rejects that implication in favor of semantic identity and explicit navigation.

---

## Repository Default Reference Implementation

The default reference implementation for this doctrine is the existing repository guidance that treats canonical identity as belonging to the artifact and filesystem location as a compatibility alias.

This document refines that guidance by making the following rules explicit:

- canonical identity is semantic;
- filenames are realizations, not identities;
- ordinality is transitional only; and
- discoverability comes from indexes and metadata, not from numbered filenames.
