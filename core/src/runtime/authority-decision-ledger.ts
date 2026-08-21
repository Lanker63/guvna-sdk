const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type AuthorityScope = 'organization' | 'repository';
export type AuthorityDecisionKind = 'promote' | 'revoke';
export type AuthorityFreshnessStatus = 'fresh' | 'stale' | 'revoked' | 'indeterminate';

/**
 * A single immutable, append-only authority-change record as held in the
 * web authority datastore (see platform-services-authority-ledger.md,
 * "Approved: Repository Authority freshness and acceptance decisions").
 * Core only reads this shape to resolve freshness; it never stores it.
 */
export interface AuthorityChangeRecord {
  authorityChangeRecordId: string;
  principalId: string;
  scope: AuthorityScope;
  organizationId?: string;
  governedRepositoryId?: string;
  decision: AuthorityDecisionKind;
  actingAdminId: string;
  decidedAt: string;
  revision: number;
}

function isWellFormedRecord(record: AuthorityChangeRecord): boolean {
  if (!record || typeof record !== 'object') return false;
  if (!uuidPattern.test(record.authorityChangeRecordId)) return false;
  if (!record.principalId || !record.actingAdminId || !record.decidedAt) return false;
  if (record.decision !== 'promote' && record.decision !== 'revoke') return false;
  if (!Number.isFinite(record.revision) || record.revision < 0) return false;
  if (record.scope === 'repository') return !!record.governedRepositoryId;
  if (record.scope === 'organization') return !!record.organizationId;
  return false;
}

/**
 * Resolves the freshness status of a principal's authority over a Governed
 * Repository from its append-only decision history. Repository-specific
 * decisions take precedence over organization-wide grants; conflicting
 * histories resolve by newest (highest-revision) decision; ties and
 * malformed histories fail closed to `indeterminate`. `liveCallSucceeded`
 * models the live authenticated call to my.guvna.org required at each
 * freshness check point; a failed/unreachable live call fails closed to
 * `stale` regardless of ledger content.
 */
export function resolveAuthorityFreshnessStatus(
  records: AuthorityChangeRecord[] | null | undefined,
  principalId: string,
  governedRepositoryId: string,
  liveCallSucceeded: boolean,
): AuthorityFreshnessStatus {
  if (!liveCallSucceeded) return 'stale';
  if (!principalId || !governedRepositoryId || !Array.isArray(records)) return 'indeterminate';

  const principalRecords = records.filter((record) => record?.principalId === principalId);
  if (principalRecords.some((record) => !isWellFormedRecord(record))) return 'indeterminate';

  const repositoryScoped = principalRecords.filter(
    (record) => record.scope === 'repository' && record.governedRepositoryId === governedRepositoryId,
  );
  const organizationScoped = principalRecords.filter((record) => record.scope === 'organization');
  const applicable = repositoryScoped.length > 0 ? repositoryScoped : organizationScoped;
  if (applicable.length === 0) return 'indeterminate';

  const maxRevision = Math.max(...applicable.map((record) => record.revision));
  const latest = applicable.filter((record) => record.revision === maxRevision);
  const decisions = new Set(latest.map((record) => record.decision));
  if (decisions.size !== 1) return 'indeterminate';

  return latest[0].decision === 'promote' ? 'fresh' : 'revoked';
}
