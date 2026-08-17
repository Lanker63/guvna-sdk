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
