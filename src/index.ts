export type ApplicableSemanticContext = object;
export type RuntimeOperation = object;
export type RuntimeOperationResult = object;

export type AcceptanceRecordStatus = 'candidate' | 'accepted' | 'rejected' | 'superseded';
export type AcceptanceSubjectKind = 'single-artifact' | 'change-set';
export type AcceptanceChangeKind = 'created' | 'updated' | 'removed';

export interface AcceptanceRecordAuthorityContext {
  principalId: string;
  governedRepositoryId: string;
  authorityScope: string;
  verifiedAt: string;
}

export interface AcceptanceRecordFileManifestEntry {
  path: string;
  changeKind: AcceptanceChangeKind;
  contentHash: string;
}

export interface AcceptanceRecord {
  acceptanceRecordId: string;
  contractVersion: string;
  governedRepositoryId: string;
  subjectKind: AcceptanceSubjectKind;
  subjectIdentity: string;
  status: AcceptanceRecordStatus;
  authorityContext: AcceptanceRecordAuthorityContext;
  candidateStatementIdentity: string;
  authorityDecisionIdentity?: string;
  evidenceIdentities: string[];
  fileManifest?: AcceptanceRecordFileManifestEntry[];
  supersedesAcceptanceRecordId?: string;
  decidedAt?: string;
}

export interface AcceptanceRecordDiscoveryResponse {
  contractVersion: '1';
  governedRepositoryId: string;
  records: AcceptanceRecord[];
}

export type RuntimeValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export interface RuntimeProtocolAdapter {
  admitContext(
    context: ApplicableSemanticContext | null | undefined,
  ): SdkAdmissionResult;
  validateOperation(value: unknown): RuntimeValidationResult;
  validateOperationResult(value: unknown): RuntimeValidationResult;
}

export type SdkAdmissionResult =
  | { ok: true; context: ApplicableSemanticContext }
  | { ok: false; reason: string };

export type SdkTransportResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: string };

export interface RuntimeProtocolRequest {
  protocolVersion: '1';
  requestId: string;
  operation: string;
  context: ApplicableSemanticContext;
  payload: RuntimeOperation;
}

export interface RuntimeProtocolResponse {
  protocolVersion: '1';
  requestId: string;
  ok: true;
  payload: RuntimeOperationResult;
}

export interface RuntimeProtocolFailureResponse {
  protocolVersion: '1';
  requestId: string;
  ok: false;
  reason: string;
}

export type RuntimeProtocolResponseEnvelope =
  | RuntimeProtocolResponse
  | RuntimeProtocolFailureResponse;

export type DomainPackHostOperation = 'discoverDomainPacks' | 'installDomainPack';

export interface DomainPackHostRequest {
  protocolVersion: '1';
  requestId: string;
  operation: DomainPackHostOperation;
  context: ApplicableSemanticContext;
  payload: unknown;
}

export interface DomainPackInstallResponse {
  packIdentity: string;
  manifest: string;
}

export function decodeDomainPackInstallResponse(
  requestId: string,
  payload: string,
): SdkTransportResult<DomainPackInstallResponse> {
  if (!requestId) return { ok: false, reason: 'SDK request identifier is missing' };
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  if (!isDomainPackInstallResponseEnvelope(parsed.value, requestId)) {
    return { ok: false, reason: 'SDK Domain Pack installation response is invalid' };
  }
  return { ok: true, value: parsed.value.payload };
}

export function encodeAcceptanceRecord(record: AcceptanceRecord): SdkTransportResult<string> {
  if (!isAcceptanceRecord(record)) {
    return { ok: false, reason: 'SDK acceptance record is invalid' };
  }
  return { ok: true, value: JSON.stringify(record) };
}

export function decodeAcceptanceRecord(payload: string): SdkTransportResult<AcceptanceRecord> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isAcceptanceRecord(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK acceptance record is invalid' };
}

export function encodeAcceptanceRecordDiscoveryResponse(
  response: AcceptanceRecordDiscoveryResponse,
): SdkTransportResult<string> {
  if (!isAcceptanceRecordDiscoveryResponse(response)) {
    return { ok: false, reason: 'SDK acceptance record discovery response is invalid' };
  }
  return { ok: true, value: JSON.stringify(response) };
}

export function decodeAcceptanceRecordDiscoveryResponse(
  payload: string,
): SdkTransportResult<AcceptanceRecordDiscoveryResponse> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isAcceptanceRecordDiscoveryResponse(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK acceptance record discovery response is invalid' };
}

export function encodeDomainPackRequest(
  requestId: string,
  operation: DomainPackHostOperation,
  context: ApplicableSemanticContext | null | undefined,
  payload: unknown,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<string> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  if (!requestId) return { ok: false, reason: 'SDK request identifier is missing' };
  return {
    ok: true,
    value: JSON.stringify({
      protocolVersion: '1',
      requestId,
      operation,
      context: admission.context,
      payload,
    } satisfies DomainPackHostRequest),
  };
}

export function encodeRuntimeRequest(
  requestId: string,
  context: ApplicableSemanticContext | null | undefined,
  operation: RuntimeOperation | null | undefined,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<string> {
  const encodedOperation = encodeRuntimeOperation(context, operation, adapter);
  if (!encodedOperation.ok) return encodedOperation;
  if (!requestId) return { ok: false, reason: 'SDK request identifier is missing' };
  if (!operation || typeof operation !== 'object' || !('operationKind' in operation))
    return { ok: false, reason: 'SDK Runtime operation is missing' };
  if (!context) return { ok: false, reason: 'Runtime context is not admitted' };
  const runtimeOperation = operation as RuntimeOperation & { operationKind: string };
  return {
    ok: true,
    value: JSON.stringify({
      protocolVersion: '1',
      requestId,
      operation: runtimeOperation.operationKind,
      context,
      payload: operation,
    } satisfies RuntimeProtocolRequest),
  };
}

export function decodeRuntimeRequest(
  context: ApplicableSemanticContext | null | undefined,
  payload: string,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<RuntimeProtocolRequest> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  if (!isRequestEnvelope(parsed.value))
    return { ok: false, reason: 'SDK Runtime request envelope is invalid' };
  const operation = decodeRuntimeOperation(context, JSON.stringify(parsed.value.payload), adapter);
  if (!operation.ok) return operation;
  return { ok: true, value: { ...parsed.value, payload: operation.value } };
}

export function encodeRuntimeResponse(
  requestId: string,
  context: ApplicableSemanticContext | null | undefined,
  result: RuntimeOperationResult | null | undefined,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<string> {
  const encodedResult = encodeRuntimeOperationResult(context, result, adapter);
  if (!encodedResult.ok) return encodedResult;
  if (!requestId) return { ok: false, reason: 'SDK request identifier is missing' };
  if (result === null || result === undefined)
    return { ok: false, reason: 'SDK Runtime operation result is missing' };
  return {
    ok: true,
    value: JSON.stringify({ protocolVersion: '1', requestId, ok: true, payload: result } satisfies RuntimeProtocolResponse),
  };
}

export function encodeRuntimeFailureResponse(
  requestId: string,
  reason: string,
): SdkTransportResult<string> {
  if (!requestId) return { ok: false, reason: 'SDK request identifier is missing' };
  if (!reason) return { ok: false, reason: 'SDK failure reason is missing' };
  return {
    ok: true,
    value: JSON.stringify({ protocolVersion: '1', requestId, ok: false, reason } satisfies RuntimeProtocolFailureResponse),
  };
}

function parseJson(payload: string): SdkTransportResult<unknown> {
  try {
    return { ok: true, value: JSON.parse(payload) };
  } catch {
    return { ok: false, reason: 'SDK protocol payload is invalid JSON' };
  }
}

function isRequestEnvelope(value: unknown): value is RuntimeProtocolRequest {
  return (
    typeof value === 'object' && value !== null &&
    (value as Record<string, unknown>).protocolVersion === '1' &&
    typeof (value as Record<string, unknown>).requestId === 'string' &&
    typeof (value as Record<string, unknown>).operation === 'string' &&
    'context' in value && 'payload' in value
  );
}

function isDomainPackInstallResponseEnvelope(
  value: unknown,
  requestId: string,
): value is { protocolVersion: '1'; requestId: string; ok: true; payload: DomainPackInstallResponse } {
  if (typeof value !== 'object' || value === null) return false;
  const envelope = value as Record<string, unknown>;
  if (envelope.protocolVersion !== '1' || envelope.requestId !== requestId || envelope.ok !== true) return false;
  if (typeof envelope.payload !== 'object' || envelope.payload === null) return false;
  const response = envelope.payload as Record<string, unknown>;
  return typeof response.packIdentity === 'string' && response.packIdentity.length > 0
    && typeof response.manifest === 'string';
}

function isAcceptanceRecord(value: unknown): value is AcceptanceRecord {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  const authority = record.authorityContext;
  const manifest = record.fileManifest;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const subjectIdentityPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return typeof record.acceptanceRecordId === 'string' && uuidPattern.test(record.acceptanceRecordId)
    && typeof record.contractVersion === 'string' && record.contractVersion.length > 0
    && typeof record.governedRepositoryId === 'string' && record.governedRepositoryId.length > 0
    && (record.subjectKind === 'single-artifact' || record.subjectKind === 'change-set')
    && typeof record.subjectIdentity === 'string' && subjectIdentityPattern.test(record.subjectIdentity)
    && !/^\d+$/.test(record.subjectIdentity)
    && (record.status === 'candidate' || record.status === 'accepted' || record.status === 'rejected' || record.status === 'superseded')
    && typeof authority === 'object' && authority !== null
    && typeof (authority as Record<string, unknown>).principalId === 'string'
    && typeof (authority as Record<string, unknown>).governedRepositoryId === 'string'
    && (authority as Record<string, unknown>).governedRepositoryId === record.governedRepositoryId
    && typeof (authority as Record<string, unknown>).authorityScope === 'string'
    && typeof (authority as Record<string, unknown>).verifiedAt === 'string'
    && typeof record.candidateStatementIdentity === 'string' && record.candidateStatementIdentity.length > 0
    && Array.isArray(record.evidenceIdentities) && record.evidenceIdentities.every((item) => typeof item === 'string')
    && !(record.status === 'superseded' && record.supersedesAcceptanceRecordId)
    && (record.subjectKind !== 'change-set' || Array.isArray(manifest) && manifest.length > 0)
    && (manifest === undefined || Array.isArray(manifest) && manifest.every(isAcceptanceManifestEntry)
      && new Set(manifest.map((entry) => entry.path)).size === manifest.length);
}

function isAcceptanceRecordDiscoveryResponse(
  value: unknown,
): value is AcceptanceRecordDiscoveryResponse {
  if (typeof value !== 'object' || value === null) return false;
  const response = value as Record<string, unknown>;
  return response.contractVersion === '1'
    && typeof response.governedRepositoryId === 'string'
    && response.governedRepositoryId.length > 0
    && Array.isArray(response.records)
    && response.records.every((record) => isAcceptanceRecord(record)
      && record.governedRepositoryId === response.governedRepositoryId);
}

function isAcceptanceManifestEntry(value: unknown): value is AcceptanceRecordFileManifestEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return isRepositoryRelativePath(entry.path)
    && (entry.changeKind === 'created' || entry.changeKind === 'updated' || entry.changeKind === 'removed')
    && typeof entry.contentHash === 'string' && /^sha256:[0-9a-f]{64}$/.test(entry.contentHash);
}

function isRepositoryRelativePath(path: unknown): path is string {
  return typeof path === 'string' && path.length > 0 && !path.startsWith('/')
    && !path.includes('\\') && !path.split('/').includes('..') && !path.split('/').includes('');
}

// Repository Authority freshness and acceptance-decision transport.
// See docs/implementation/plans/repository-adoption-acceptance-record-contract-plan.md
// and guvna-web/docs/implementation/plans/platform-services-authority-ledger.md
// ("Approved: Repository Authority freshness and acceptance decisions").
// Unknown contractVersion, malformed payloads, and ambiguous statuses all fail closed.

export const authorityTransportContractVersion = '1' as const;
export type AuthorityTransportContractVersion = typeof authorityTransportContractVersion;

export const authorityFreshnessStatuses = ['fresh', 'stale', 'revoked', 'indeterminate'] as const;
export type AuthorityFreshnessStatus = (typeof authorityFreshnessStatuses)[number];

export const acceptanceDecisions = ['accepted', 'rejected'] as const;
export type AcceptanceDecision = (typeof acceptanceDecisions)[number];

export interface ConfirmRepositoryAuthorityRequest {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
}

export interface RevalidateAuthorityRequest {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
  snapshotObservedAt: string;
}

export interface AuthorityFreshnessResponse {
  contractVersion: AuthorityTransportContractVersion;
  principalId: string;
  governedRepositoryId: string;
  status: AuthorityFreshnessStatus;
  observedAt: string;
}

export interface SubmitAcceptanceDecisionRequest {
  contractVersion: AuthorityTransportContractVersion;
  acceptanceRecordId: string;
  decision: AcceptanceDecision;
  authorityContext: AcceptanceRecordAuthorityContext;
  freshnessStatus: AuthorityFreshnessStatus;
  decidedAt: string;
}

export function encodeConfirmRepositoryAuthorityRequest(
  request: ConfirmRepositoryAuthorityRequest,
): SdkTransportResult<string> {
  if (!isConfirmRepositoryAuthorityRequest(request)) {
    return { ok: false, reason: 'SDK confirmRepositoryAuthority request is invalid' };
  }
  return { ok: true, value: JSON.stringify(request) };
}

export function decodeConfirmRepositoryAuthorityRequest(
  payload: string,
): SdkTransportResult<ConfirmRepositoryAuthorityRequest> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isConfirmRepositoryAuthorityRequest(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK confirmRepositoryAuthority request is invalid' };
}

export function encodeRevalidateAuthorityRequest(
  request: RevalidateAuthorityRequest,
): SdkTransportResult<string> {
  if (!isRevalidateAuthorityRequest(request)) {
    return { ok: false, reason: 'SDK revalidateAuthority request is invalid' };
  }
  return { ok: true, value: JSON.stringify(request) };
}

export function decodeRevalidateAuthorityRequest(
  payload: string,
): SdkTransportResult<RevalidateAuthorityRequest> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isRevalidateAuthorityRequest(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK revalidateAuthority request is invalid' };
}

export function encodeAuthorityFreshnessResponse(
  response: AuthorityFreshnessResponse,
): SdkTransportResult<string> {
  if (!isAuthorityFreshnessResponse(response)) {
    return { ok: false, reason: 'SDK authority freshness response is invalid' };
  }
  return { ok: true, value: JSON.stringify(response) };
}

export function decodeAuthorityFreshnessResponse(
  payload: string,
): SdkTransportResult<AuthorityFreshnessResponse> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isAuthorityFreshnessResponse(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK authority freshness response is invalid' };
}

/**
 * Submitting an Acceptance decision (accepted or rejected) is only valid
 * transport when `freshnessStatus` is `fresh`; stale, revoked, or
 * indeterminate freshness fails closed regardless of the requested
 * decision (freshness precedes acceptance).
 */
export function encodeSubmitAcceptanceDecisionRequest(
  request: SubmitAcceptanceDecisionRequest,
): SdkTransportResult<string> {
  if (!isSubmitAcceptanceDecisionRequest(request)) {
    return { ok: false, reason: 'SDK submitAcceptanceDecision request is invalid' };
  }
  return { ok: true, value: JSON.stringify(request) };
}

export function decodeSubmitAcceptanceDecisionRequest(
  payload: string,
): SdkTransportResult<SubmitAcceptanceDecisionRequest> {
  const parsed = parseJson(payload);
  if (!parsed.ok) return parsed;
  return isSubmitAcceptanceDecisionRequest(parsed.value)
    ? { ok: true, value: parsed.value }
    : { ok: false, reason: 'SDK submitAcceptanceDecision request is invalid' };
}

function isConfirmRepositoryAuthorityRequest(
  value: unknown,
): value is ConfirmRepositoryAuthorityRequest {
  if (typeof value !== 'object' || value === null) return false;
  const request = value as Record<string, unknown>;
  return request.contractVersion === authorityTransportContractVersion
    && typeof request.principalId === 'string' && request.principalId.length > 0
    && typeof request.governedRepositoryId === 'string' && request.governedRepositoryId.length > 0;
}

function isRevalidateAuthorityRequest(value: unknown): value is RevalidateAuthorityRequest {
  if (typeof value !== 'object' || value === null) return false;
  const request = value as Record<string, unknown>;
  return request.contractVersion === authorityTransportContractVersion
    && typeof request.principalId === 'string' && request.principalId.length > 0
    && typeof request.governedRepositoryId === 'string' && request.governedRepositoryId.length > 0
    && typeof request.snapshotObservedAt === 'string' && request.snapshotObservedAt.length > 0;
}

function isAuthorityFreshnessResponse(value: unknown): value is AuthorityFreshnessResponse {
  if (typeof value !== 'object' || value === null) return false;
  const response = value as Record<string, unknown>;
  return response.contractVersion === authorityTransportContractVersion
    && typeof response.principalId === 'string' && response.principalId.length > 0
    && typeof response.governedRepositoryId === 'string' && response.governedRepositoryId.length > 0
    && typeof response.observedAt === 'string' && response.observedAt.length > 0
    && authorityFreshnessStatuses.includes(response.status as AuthorityFreshnessStatus);
}

function isSubmitAcceptanceDecisionRequest(value: unknown): value is SubmitAcceptanceDecisionRequest {
  if (typeof value !== 'object' || value === null) return false;
  const request = value as Record<string, unknown>;
  const authority = request.authorityContext;
  return request.contractVersion === authorityTransportContractVersion
    && typeof request.acceptanceRecordId === 'string' && request.acceptanceRecordId.length > 0
    && acceptanceDecisions.includes(request.decision as AcceptanceDecision)
    && typeof request.decidedAt === 'string' && request.decidedAt.length > 0
    && request.freshnessStatus === 'fresh'
    && typeof authority === 'object' && authority !== null
    && typeof (authority as Record<string, unknown>).principalId === 'string'
    && typeof (authority as Record<string, unknown>).governedRepositoryId === 'string'
    && typeof (authority as Record<string, unknown>).authorityScope === 'string'
    && typeof (authority as Record<string, unknown>).verifiedAt === 'string';
}

export function admitSdkContext(
  context: ApplicableSemanticContext | null | undefined,
  adapter: RuntimeProtocolAdapter,
): SdkAdmissionResult {
  return adapter.admitContext(context);
}

export function encodeRuntimeOperation(
  context: ApplicableSemanticContext | null | undefined,
  operation: RuntimeOperation | null | undefined,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<string> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  const validation = adapter.validateOperation(operation);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return { ok: true, value: JSON.stringify(operation) };
}

export function decodeRuntimeOperation(
  context: ApplicableSemanticContext | null | undefined,
  payload: string,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<RuntimeOperation> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  let value: unknown;
  try {
    value = JSON.parse(payload);
  } catch {
    return { ok: false, reason: 'SDK Runtime operation payload is invalid JSON' };
  }
  const validation = adapter.validateOperation(value);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return isRuntimeOperation(value, adapter)
    ? { ok: true, value }
    : { ok: false, reason: 'SDK Runtime operation payload is invalid' };
}

export function encodeRuntimeOperationResult(
  context: ApplicableSemanticContext | null | undefined,
  result: RuntimeOperationResult | null | undefined,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<string> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  const validation = adapter.validateOperationResult(result);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return { ok: true, value: JSON.stringify(result) };
}

export function decodeRuntimeOperationResult(
  context: ApplicableSemanticContext | null | undefined,
  payload: string,
  adapter: RuntimeProtocolAdapter,
): SdkTransportResult<RuntimeOperationResult> {
  const admission = admitSdkContext(context, adapter);
  if (!admission.ok) return admission;
  let value: unknown;
  try {
    value = JSON.parse(payload);
  } catch {
    return { ok: false, reason: 'SDK Runtime operation result payload is invalid JSON' };
  }
  const validation = adapter.validateOperationResult(value);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return isRuntimeOperationResult(value, adapter)
    ? { ok: true, value }
    : { ok: false, reason: 'SDK Runtime operation result payload is invalid' };
}

function isRuntimeOperation(
  value: unknown,
  adapter: RuntimeProtocolAdapter,
): value is RuntimeOperation {
  return adapter.validateOperation(value).valid;
}

function isRuntimeOperationResult(
  value: unknown,
  adapter: RuntimeProtocolAdapter,
): value is RuntimeOperationResult {
  return adapter.validateOperationResult(value).valid;
}
