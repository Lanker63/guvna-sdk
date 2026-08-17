import {
  admitApplicableSemanticContext,
  validateRuntimeOperation,
  validateRuntimeOperationResult,
  type ApplicableSemanticContext,
  type RuntimeOperation,
  type RuntimeOperationResult,
} from 'guvna-core';

export type {
  ApplicableSemanticContext,
  RuntimeOperation,
  RuntimeOperationResult,
};

export type SdkAdmissionResult =
  | { ok: true; context: ApplicableSemanticContext }
  | { ok: false; reason: string };

export type SdkTransportResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: string };

export function admitSdkContext(
  context: ApplicableSemanticContext | null | undefined,
): SdkAdmissionResult {
  return admitApplicableSemanticContext(context);
}

export function encodeRuntimeOperation(
  context: ApplicableSemanticContext | null | undefined,
  operation: RuntimeOperation | null | undefined,
): SdkTransportResult<string> {
  const admission = admitSdkContext(context);
  if (!admission.ok) return admission;
  const validation = validateRuntimeOperation(operation);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return { ok: true, value: JSON.stringify(operation) };
}

export function decodeRuntimeOperation(
  context: ApplicableSemanticContext | null | undefined,
  payload: string,
): SdkTransportResult<RuntimeOperation> {
  const admission = admitSdkContext(context);
  if (!admission.ok) return admission;
  let value: unknown;
  try {
    value = JSON.parse(payload);
  } catch {
    return { ok: false, reason: 'SDK Runtime operation payload is invalid JSON' };
  }
  const validation = validateRuntimeOperation(value);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return isRuntimeOperation(value)
    ? { ok: true, value }
    : { ok: false, reason: 'SDK Runtime operation payload is invalid' };
}

export function encodeRuntimeOperationResult(
  context: ApplicableSemanticContext | null | undefined,
  result: RuntimeOperationResult | null | undefined,
): SdkTransportResult<string> {
  const admission = admitSdkContext(context);
  if (!admission.ok) return admission;
  const validation = validateRuntimeOperationResult(result);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return { ok: true, value: JSON.stringify(result) };
}

export function decodeRuntimeOperationResult(
  context: ApplicableSemanticContext | null | undefined,
  payload: string,
): SdkTransportResult<RuntimeOperationResult> {
  const admission = admitSdkContext(context);
  if (!admission.ok) return admission;
  let value: unknown;
  try {
    value = JSON.parse(payload);
  } catch {
    return { ok: false, reason: 'SDK Runtime operation result payload is invalid JSON' };
  }
  const validation = validateRuntimeOperationResult(value);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  return isRuntimeOperationResult(value)
    ? { ok: true, value }
    : { ok: false, reason: 'SDK Runtime operation result payload is invalid' };
}

function isRuntimeOperation(value: unknown): value is RuntimeOperation {
  return validateRuntimeOperation(value).valid;
}

function isRuntimeOperationResult(value: unknown): value is RuntimeOperationResult {
  return validateRuntimeOperationResult(value).valid;
}
