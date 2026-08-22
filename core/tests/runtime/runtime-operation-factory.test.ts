import { describe, expect, it } from 'vitest';
import { createRuntimeEvaluationOperation } from '../../src/runtime/runtime-operation-factory.js';

describe('Runtime operation factory', () => {
	it('fails closed for invalid evaluation input', () => {
		const result = createRuntimeEvaluationOperation(
			{} as never,
			{} as never,
		);

		expect(result).toEqual({ ok: false, reason: 'Runtime evaluation input is invalid' });
	});
});