import type {
	RuntimeContractAttribution,
	RuntimeEvaluationInput,
	RuntimeOperation,
} from './runtime-contract.js';
import {
	validateRuntimeEvaluationInput,
	validateRuntimeOperation,
} from './runtime-contract.js';

export type RuntimeOperationFactoryResult =
	| { ok: true; operation: RuntimeOperation }
	| { ok: false; reason: string };

export function createRuntimeEvaluationOperation(
	input: RuntimeEvaluationInput,
	attribution: RuntimeContractAttribution,
): RuntimeOperationFactoryResult {
	const inputValidation = validateRuntimeEvaluationInput(input);
	if (!inputValidation.valid) return { ok: false, reason: inputValidation.reason };
	const operation: RuntimeOperation = {
		operationKind: 'evaluate',
		identity: {
			identityKind: 'runtime-operation',
			value: JSON.stringify({ operationKind: 'evaluate', input, attribution }),
		},
		input,
		attribution,
	};
	const operationValidation = validateRuntimeOperation(operation);
	return operationValidation.valid
		? { ok: true, operation }
		: { ok: false, reason: operationValidation.reason };
}