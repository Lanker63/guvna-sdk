import { SEMANTIC_IR_FIELD_ORDER, validateSemanticIR, type SemanticIR } from './semantic-ir.js';

export type SerializationResult = { ok: true; bytes: Uint8Array } | { ok: false; reason: string };

export function serializeSemanticIR(value: unknown): SerializationResult {
  const validation = validateSemanticIR(value);
  if (!validation.valid) return { ok: false, reason: validation.reason };
  try {
    return {
      ok: true,
      bytes: new TextEncoder().encode(
        encode(value as SemanticIR, new Set<object>(), SEMANTIC_IR_FIELD_ORDER),
      ),
    };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : 'Serialization failed' };
  }
}

export function serializeCompactJson(value: unknown): SerializationResult {
  try {
    return { ok: true, bytes: new TextEncoder().encode(encode(value, new Set<object>())) };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : 'Serialization failed' };
  }
}

function encode(value: unknown, ancestors: Set<object>, fieldOrder?: readonly string[]): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return JSON.stringify(assertScalarString(value));
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Numbers must be finite');
    return Object.is(value, -0) ? '0' : JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((item) => encode(item, ancestors)).join(',')}]`;
  if (typeof value !== 'object' || value === undefined)
    throw new Error('Value is not JSON serializable');
  if (ancestors.has(value)) throw new Error('Value must be acyclic');
  ancestors.add(value);
  const keys = fieldOrder
    ? fieldOrder.filter((key) => key in value)
    : (canonicalFieldOrder(value) ?? Object.keys(value));
  const result = `{${keys.map((key) => `${JSON.stringify(assertScalarString(key))}:${encode((value as Record<string, unknown>)[key], ancestors)}`).join(',')}}`;
  ancestors.delete(value);
  return result;
}

const IR_RECORD_FIELD_ORDERS = [
  [
    'identity',
    'version',
    'contractKind',
    'lifecycle',
    'applicability',
    'ratification',
    'provenance',
    'elements',
  ],
  [
    'concepts',
    'dataStructures',
    'operations',
    'states',
    'transitions',
    'invariants',
    'authorityBoundaries',
    'provenanceRequirements',
    'compatibilityRequirements',
    'failureBehavior',
    'realizationObligations',
  ],
  ['identityKind', 'value'],
  ['identity'],
  ['value', 'semanticIdentity', 'scope'],
  ['identity', 'meaning'],
  ['statement', 'terms'],
  ['sourceIdentity', 'sourcePath', 'sourceSection'],
  ['lifecycleState', 'transitions'],
  ['accepted', 'scope', 'authorityDecision', 'provenance'],
  ['applicable', 'scope', 'conditions', 'authorityDecision', 'provenance'],
  ['ratified', 'authorityDecision', 'requiresHumanAuthority', 'provenance'],
  ['identity', 'meaning', 'value'],
  ['identity', 'kind', 'meaning', 'attributes', 'lifecycle', 'acceptance', 'provenance'],
  ['identity', 'subject', 'predicate', 'object', 'scope', 'constraints', 'provenance'],
  ['identity', 'subject', 'kind', 'meaning', 'enforcementScope', 'provenance'],
  ['identity', 'from', 'operation', 'to', 'authorityReference', 'scope', 'provenance'],
  ['identity', 'sources', 'result', 'relation', 'transformation', 'provenance'],
  ['identity', 'contractKind', 'lifecycle', 'applicability', 'ratification', 'provenance'],
  ['identity', 'realizationKind', 'realizes', 'conformsTo', 'compatibility', 'provenance'],
  ['authorityDecisions', 'acceptances', 'uncertainty', 'contradictions', 'delegations'],
  ['records', 'conflicts'],
  ['identity', 'subject', 'scope', 'meaning', 'consumer', 'contract', 'dependency'],
  ['requirements', 'result', 'provenance'],
  ['identity', 'condition', 'provenance'],
  ['identity', 'kind', 'inputs', 'outputs'],
  ['identity', 'subject', 'sources', 'transformations', 'authorityDecision'],
  ['identity', 'sources', 'resolution'],
];

function canonicalFieldOrder(value: object): readonly string[] | undefined {
  const keys = Object.keys(value);
  const order = IR_RECORD_FIELD_ORDERS.find(
    (candidate) =>
      keys.every((key) => candidate.includes(key)) &&
      candidate.filter((key) => keys.includes(key)).length === keys.length,
  );
  return order?.filter((key) => key in value);
}

function assertScalarString(value: string): string {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      if (
        index + 1 >= value.length ||
        value.charCodeAt(index + 1) < 0xdc00 ||
        value.charCodeAt(index + 1) > 0xdfff
      )
        throw new Error('Strings cannot contain unpaired UTF-16 surrogates');
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff)
      throw new Error('Strings cannot contain unpaired UTF-16 surrogates');
  }
  return value;
}
