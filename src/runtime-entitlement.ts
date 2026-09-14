export const runtimeEntitlementSdkContractVersion = 'v1' as const;

type ScopeKind = 'repository' | 'organization';
export interface RuntimeEntitlementScope { kind: ScopeKind; id: string }
export interface RuntimeUseAdmissionRequest { scope: RuntimeEntitlementScope }
export interface RepositoryAuthorityEvidenceAdmissionRequest {
  principalReference: string;
  scope: RuntimeEntitlementScope;
}
export interface RuntimeEntitlementRevocationRequest { artifactReference: string }
export interface RuntimeUseAdmissionResponse {
  outcomeReference: string;
  capabilities: string[];
  validFrom: string;
  validUntil: string;
}
export interface RepositoryAuthorityEvidenceAdmissionResponse {
  outcomeReference: string;
  validFrom: string;
  validUntil: string;
}
export interface RuntimeEntitlementRevocationResponse {
  status: 'current' | 'staleOrUnverifiable';
  observedAt: string;
}
export interface RuntimeEntitlementOutageResponse { availableOperations: string[] }
export type RuntimeEntitlementFailure = 'unresolved' | 'denied' | 'expired' | 'revoked' | 'unavailable';
export type RuntimeEntitlementResult<T> = { ok: true; value: T } | { ok: false; reason: string };
export interface RuntimeEntitlementTransport { send(payload: string, signal?: AbortSignal): Promise<string> }

interface RequestEnvelope {
  protocolVersion: '1';
  requestId: string;
  operation: string;
  payload?: unknown;
}
interface SuccessEnvelope { protocolVersion: '1'; requestId: string; operation: string; ok: true; payload: unknown }
interface FailureEnvelope { protocolVersion: '1'; requestId: string; operation: string; ok: false; reason: string }

export function requestRuntimeUseAdmission(
  request: unknown,
  requestId: string,
  transport: RuntimeEntitlementTransport,
  signal?: AbortSignal,
): Promise<RuntimeEntitlementResult<RuntimeUseAdmissionResponse>> {
  return sendRequest('requestRuntimeUseAdmission', request, requestId, transport, isRuntimeUseAdmissionResponse, signal);
}

export function requestRepositoryAuthorityEvidenceAdmission(
  request: unknown,
  requestId: string,
  transport: RuntimeEntitlementTransport,
  signal?: AbortSignal,
): Promise<RuntimeEntitlementResult<RepositoryAuthorityEvidenceAdmissionResponse>> {
  return sendRequest('requestRepositoryAuthorityEvidenceAdmission', request, requestId, transport, isRepositoryAuthorityEvidenceAdmissionResponse, signal);
}

export function checkRuntimeEntitlementRevocation(
  request: unknown,
  requestId: string,
  transport: RuntimeEntitlementTransport,
  signal?: AbortSignal,
): Promise<RuntimeEntitlementResult<RuntimeEntitlementRevocationResponse>> {
  return sendRequest('checkRevocationStatus', request, requestId, transport, isRevocationResponse, signal);
}

export function getRuntimeEntitlementOutageState(
  requestId: string,
  transport: RuntimeEntitlementTransport,
  signal?: AbortSignal,
): Promise<RuntimeEntitlementResult<RuntimeEntitlementOutageResponse>> {
  return sendRequest('getOutageOperationState', undefined, requestId, transport, isOutageResponse, signal);
}

async function sendRequest<T>(
  operation: string,
  payload: unknown,
  requestId: string,
  transport: RuntimeEntitlementTransport,
  isPayload: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<RuntimeEntitlementResult<T>> {
  if (!isNonEmpty(requestId)) return { ok: false, reason: 'SDK Runtime Entitlement request identifier is missing' };
  if (payload !== undefined && !isRequestPayload(operation, payload)) return { ok: false, reason: 'SDK Runtime Entitlement request is invalid' };
  const encoded = await transport.send(JSON.stringify({ protocolVersion: '1', requestId, operation, ...(payload === undefined ? {} : { payload }) } satisfies RequestEnvelope), signal);
  let value: unknown;
  try { value = JSON.parse(encoded); } catch { return { ok: false, reason: 'SDK Runtime Entitlement response is invalid JSON' }; }
  if (isFailureEnvelope(value, requestId, operation)) return { ok: false, reason: value.reason };
  if (!isSuccessEnvelope(value, requestId, operation) || !isPayload(value.payload)) return { ok: false, reason: 'SDK Runtime Entitlement response is invalid' };
  return { ok: true, value: value.payload };
}

function isRequestPayload(operation: string, value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (operation === 'requestRuntimeUseAdmission') return isScope(value.scope);
  if (operation === 'requestRepositoryAuthorityEvidenceAdmission') return isNonEmpty(value.principalReference) && isScope(value.scope);
  if (operation === 'checkRevocationStatus') return isNonEmpty(value.artifactReference);
  return false;
}
function isRuntimeUseAdmissionResponse(value: unknown): value is RuntimeUseAdmissionResponse {
  return isRecord(value) && isNonEmpty(value.outcomeReference) && isStringArray(value.capabilities) && isDate(value.validFrom) && isDate(value.validUntil);
}
function isRepositoryAuthorityEvidenceAdmissionResponse(value: unknown): value is RepositoryAuthorityEvidenceAdmissionResponse {
  return isRecord(value) && isNonEmpty(value.outcomeReference) && isDate(value.validFrom) && isDate(value.validUntil);
}
function isRevocationResponse(value: unknown): value is RuntimeEntitlementRevocationResponse {
  return isRecord(value) && (value.status === 'current' || value.status === 'staleOrUnverifiable') && isDate(value.observedAt);
}
function isOutageResponse(value: unknown): value is RuntimeEntitlementOutageResponse {
  return isRecord(value) && isStringArray(value.availableOperations);
}
function isSuccessEnvelope(value: unknown, requestId: string, operation: string): value is SuccessEnvelope {
  return isRecord(value) && value.protocolVersion === '1' && value.requestId === requestId && value.operation === operation && value.ok === true && 'payload' in value;
}
function isFailureEnvelope(value: unknown, requestId: string, operation: string): value is FailureEnvelope {
  return isRecord(value) && value.protocolVersion === '1' && value.requestId === requestId && value.operation === operation && value.ok === false && isNonEmpty(value.reason);
}
function isScope(value: unknown): value is RuntimeEntitlementScope { return isRecord(value) && (value.kind === 'repository' || value.kind === 'organization') && isNonEmpty(value.id); }
function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every(isNonEmpty); }
function isDate(value: unknown): value is string { return isNonEmpty(value) && Number.isFinite(Date.parse(value)); }
function isNonEmpty(value: unknown): value is string { return typeof value === 'string' && value.trim().length > 0; }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value); }
