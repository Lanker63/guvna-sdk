import {
  validateAcceptanceRecord,
  type AcceptanceRecord,
} from '../compiler/acceptance-record-contract.js';

export interface RepositoryAuthoritySnapshot {
  principalId: string;
  governedRepositoryId: string;
  active: boolean;
  observedAt: string;
}

export interface RepositoryAuthorityFreshness {
  acquireAuthority(): RepositoryAuthoritySnapshot | null;
  revalidateAcquisition(snapshot: RepositoryAuthoritySnapshot): boolean;
  revalidateAcceptance(snapshot: RepositoryAuthoritySnapshot): boolean;
  revalidateWebCall(snapshot: RepositoryAuthoritySnapshot): boolean;
}

export type AcceptanceResult =
  | { ok: true; record: AcceptanceRecord }
  | { ok: false; reason: string };

export function finalizeAcceptance(
  record: AcceptanceRecord | null | undefined,
  authorityDecisionIdentity: string | null | undefined,
  snapshot: RepositoryAuthoritySnapshot | null | undefined,
  freshness: RepositoryAuthorityFreshness | null | undefined,
  decidedAt: string | null | undefined,
): AcceptanceResult {
  if (!record) return { ok: false, reason: 'Acceptance record is absent' };
  const validation = validateAcceptanceRecord(record);
  if (!validation.valid) return { ok: false, reason: validation.reason ?? 'Acceptance record is invalid' };
  if (record.status !== 'candidate') return { ok: false, reason: 'Only candidate records may be accepted' };
  if (!authorityDecisionIdentity || !decidedAt) {
    return { ok: false, reason: 'Acceptance decision identity and timestamp are required' };
  }
  if (!canAcceptWithFreshAuthority(snapshot, freshness)) {
    return { ok: false, reason: 'Repository Authority is not fresh or active' };
  }
  return {
    ok: true,
    record: { ...record, status: 'accepted', authorityDecisionIdentity, decidedAt },
  };
}

export function acquireFreshAuthority(
  freshness: RepositoryAuthorityFreshness | null | undefined,
): RepositoryAuthoritySnapshot | null {
  const snapshot = freshness?.acquireAuthority() ?? null;
  return snapshot && snapshot.active && freshness?.revalidateAcquisition(snapshot) ? snapshot : null;
}

export function canAcceptWithFreshAuthority(
  snapshot: RepositoryAuthoritySnapshot | null | undefined,
  freshness: RepositoryAuthorityFreshness | null | undefined,
): boolean {
  if (!snapshot || !freshness || !snapshot.active) return false;
  return freshness.revalidateAcceptance(snapshot);
}

export function canCallWebSurfaceWithFreshAuthority(
  snapshot: RepositoryAuthoritySnapshot | null | undefined,
  freshness: RepositoryAuthorityFreshness | null | undefined,
): boolean {
  if (!snapshot || !freshness || !snapshot.active) return false;
  return freshness.revalidateWebCall(snapshot);
}