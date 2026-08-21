export const acceptanceRecordStatuses = [
  'candidate',
  'accepted',
  'rejected',
  'superseded',
] as const;

export type AcceptanceRecordStatus = (typeof acceptanceRecordStatuses)[number];
export type AcceptanceSubjectKind = 'single-artifact' | 'change-set';
export type ChangeKind = 'created' | 'updated' | 'removed';

export interface AcceptanceAuthorityContext {
  principalId: string;
  governedRepositoryId: string;
  authorityScope: string;
  verifiedAt: string;
}

export interface AcceptanceFileManifestEntry {
  path: string;
  changeKind: ChangeKind;
  contentHash: string;
}

export interface AcceptanceRecord {
  acceptanceRecordId: string;
  contractVersion: string;
  governedRepositoryId: string;
  subjectKind: AcceptanceSubjectKind;
  subjectIdentity: string;
  status: AcceptanceRecordStatus;
  authorityContext: AcceptanceAuthorityContext;
  candidateStatementIdentity: string;
  authorityDecisionIdentity?: string;
  evidenceIdentities: string[];
  fileManifest?: AcceptanceFileManifestEntry[];
  supersedesAcceptanceRecordId?: string;
  decidedAt?: string;
}

export interface AcceptanceRecordValidationResult {
  valid: boolean;
  reason?: string;
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const subjectIdentityPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hashPattern = /^sha256:[0-9a-f]{64}$/;

export function validateAcceptanceRecord(
  record: AcceptanceRecord,
): AcceptanceRecordValidationResult {
  if (!record || typeof record !== 'object') {
    return { valid: false, reason: 'acceptance record is invalid' };
  }
  if (!uuidPattern.test(record.acceptanceRecordId)) {
    return { valid: false, reason: 'acceptanceRecordId must be a UUID' };
  }
  if (!subjectIdentityPattern.test(record.subjectIdentity) || /^\d+$/.test(record.subjectIdentity)) {
    return {
      valid: false,
      reason: 'subjectIdentity must be non-ordinal kebab-case',
    };
  }
  if (!record.authorityContext || !record.authorityContext.principalId
    || record.authorityContext.governedRepositoryId !== record.governedRepositoryId
    || !record.authorityContext.authorityScope
    || !record.authorityContext.verifiedAt) {
    return { valid: false, reason: 'authority context is missing or out of repository scope' };
  }
  if (!acceptanceRecordStatuses.includes(record.status)) {
    return { valid: false, reason: 'acceptance status is unsupported' };
  }
  if (record.status === 'superseded' && record.supersedesAcceptanceRecordId) {
    return { valid: false, reason: 'superseded records are terminal' };
  }
  if (record.subjectKind === 'change-set' && !record.fileManifest?.length) {
    return { valid: false, reason: 'change-set records require a file manifest' };
  }
  const paths = new Set<string>();
  for (const entry of record.fileManifest ?? []) {
    if (!isRepositoryRelativePath(entry.path) || !hashPattern.test(entry.contentHash)) {
      return { valid: false, reason: 'file manifest entries require path and contentHash' };
    }
    if (paths.has(entry.path)) {
      return { valid: false, reason: 'file manifest paths must be unique' };
    }
    paths.add(entry.path);
  }
  return { valid: true };
}

function isRepositoryRelativePath(path: string): boolean {
  return path.length > 0 && !path.startsWith('/') && !path.includes('\\')
    && !path.split('/').includes('..') && !path.split('/').includes('');
}