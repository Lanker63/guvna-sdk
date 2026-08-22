import { resolveApplicableSemanticContext, type ApplicableSemanticContextRequest } from './applicable-semantic-context.js';
import { runRuntimeOperation, type RuntimeSemanticRules } from './runtime-semantics.js';
import type { ApplicableSemanticContext } from './applicable-semantic-context.js';
import { validateRuntimeOperation, type RuntimeOperation } from './runtime-contract.js';
import type { SemanticContractReference } from '../compiler/semantic-ir.js';

export interface RuntimeGatewayContextSource {
	getProjection(): Promise<RuntimeGatewayProjection>;
}

export interface RuntimeGatewayProjection {
	governedRepositoryIdentity: SemanticContractReference['identity'];
	projectionIdentity: SemanticContractReference['identity'];
	projectionVersion: string;
	compiledAt: string;
	freshness: RuntimeProjectionFreshness;
	contracts: readonly SemanticContractReference[];
}

export interface RuntimeProjectionFreshness {
	status: 'current' | 'superseded' | 'revoked' | 'unknown';
	checkedAt: string;
	currentProjectionVersion?: string;
	verifiedBy?: SemanticContractReference['identity'];
}

export interface RuntimeGatewayDependencies {
	contextSource: RuntimeGatewayContextSource;
	rules: RuntimeSemanticRules;
}

export interface RuntimeGateway {
	handle(payload: string): Promise<string>;
}

export function createRuntimeGateway(dependencies: RuntimeGatewayDependencies): RuntimeGateway {
	return {
		handle: async (payload) => handleRequest(payload, dependencies),
	};
}

async function handleRequest(payload: string, dependencies: RuntimeGatewayDependencies): Promise<string> {
	const parsed = parse(payload);
	if (!parsed.ok) return failure('', parsed.reason);
	const request = parsed.value;
	if (request.protocolVersion !== '1' || typeof request.requestId !== 'string' || !request.requestId || typeof request.operation !== 'string') {
		return failure(typeof request.requestId === 'string' ? request.requestId : '', 'Runtime gateway request envelope is invalid');
	}
	if (request.operation === 'admitApplicableSemanticContext') {
		const admissionRequest = request.payload as ApplicableSemanticContextRequest;
		const projection = await dependencies.contextSource.getProjection();
		const admission = resolveApplicableSemanticContext(
			projection.contracts,
			admissionRequest,
		);
		return admission.ok ? success(request.requestId, admission.context, projection) : failure(request.requestId, admission.reason);
	}
	if (request.operation !== 'evaluate' && request.operation !== 'produceDirective' && request.operation !== 'recordEvidence') {
		return failure(request.requestId, 'Runtime gateway operation is unknown');
	}
	const operationValidation = validateRuntimeOperation(request.payload);
	if (!operationValidation.valid) return failure(request.requestId, operationValidation.reason);
	const context = request.context as ApplicableSemanticContext;
	const admission = resolveApplicableSemanticContext([context.contract], {
		contractIdentity: context.identity,
		contractVersion: context.version,
		scope: context.scope.identity,
	});
	if (!admission.ok) return failure(request.requestId, admission.reason);
	return success(request.requestId, runRuntimeOperation(request.payload as RuntimeOperation, dependencies.rules));
}

function parse(payload: string): { ok: true; value: Record<string, unknown> } | { ok: false; reason: string } {
	try {
		const value: unknown = JSON.parse(payload);
		return typeof value === 'object' && value !== null && !Array.isArray(value)
			? { ok: true, value: value as Record<string, unknown> }
			: { ok: false, reason: 'Runtime gateway request is invalid JSON' };
	} catch {
		return { ok: false, reason: 'Runtime gateway request is invalid JSON' };
	}
}

function success(requestId: string, payload: unknown, provenance?: RuntimeGatewayProjection): string {
	return JSON.stringify({
		protocolVersion: '1', requestId, ok: true, payload,
		...(provenance ? { provenance: {
			governedRepositoryIdentity: provenance.governedRepositoryIdentity,
			projectionIdentity: provenance.projectionIdentity,
			projectionVersion: provenance.projectionVersion,
			compiledAt: provenance.compiledAt,
				freshness: provenance.freshness,
		} } : {}),
	});
}

function failure(requestId: string, reason: string): string {
	return JSON.stringify({ protocolVersion: '1', requestId, ok: false, reason });
}