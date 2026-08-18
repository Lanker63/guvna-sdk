export type ApplicableSemanticContext = object;
export type RuntimeOperation = object;
export type RuntimeOperationResult = object;

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
