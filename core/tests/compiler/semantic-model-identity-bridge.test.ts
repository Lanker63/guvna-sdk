import { describe, expect, it } from 'vitest';
import {
  bootstrapScopeIdentity,
  bridgeToMaterializationInput,
} from '../../src/compiler/semantic-model-identity-bridge.js';
import type { ReviewBoundSemanticModel } from '../../src/compiler/review-bound-semantic-model.js';

function model(overrides: Partial<ReviewBoundSemanticModel> = {}): ReviewBoundSemanticModel {
  const scope = {
    handle: 'scope',
    content: { meaning: 'approved scope meaning' },
    sourceAttributions: [{ source: 'doctrine' }],
  };
  const target = {
    handle: 'target',
    content: { subject: { reviewRef: 'ref-source' }, provenance: { reviewCollection: 'sources' } },
    sourceAttributions: [{ source: 'doctrine' }],
  };
  const source = {
    handle: 'source',
    content: { meaning: 'source' },
    sourceAttributions: [{ source: 'doctrine' }],
  };
  return {
    selectionReference: 'selection',
    governedScope: scope,
    subjectMeaning: { statement: 'subject' },
    nodes: [target, source],
    relations: [],
    constraints: [],
    transitions: [],
    provenanceAttributions: [{ source: 'doctrine' }],
    compatibilityCapabilities: [],
    emptyCollectionDispositions: ['compatibility'],
    referenceResolutionMap: new Map([['ref-source', 'source']]),
    materializationPlans: new Map([
      ['target', { samePreimageHandles: [], independentIdentityHandles: ['source'] }],
    ]),
    collections: [
      {
        handle: 'sources',
        values: [{ sourceIdentity: { reviewRef: 'ref-source' } }],
        ordering: 'unordered',
      },
    ],
    transformationDependencyChains: [],
    temporaryReviewHandles: new Set(['selection', 'scope', 'target', 'source', 'sources']),
    ...overrides,
  };
}

describe('semantic model identity bridge', () => {
  it('bootstraps scope identity from supplied scope meaning without a prior scope identity', () => {
    const result = bootstrapScopeIdentity(model());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.identity.identityKind).toBe('semantic');
      expect(new TextDecoder().decode(result.preimageBytes)).not.toContain('"reviewRef"');
    }
  });

  it('resolves handles only through the explicit resolution map and carries approved ordering', () => {
    const reviewModel = model();
    const bootstrap = bootstrapScopeIdentity(reviewModel);
    expect(bootstrap.ok).toBe(true);
    if (!bootstrap.ok) return;
    const sourceIdentity = { identityKind: 'semantic' as const, value: 'source' };
    const bridge = bridgeToMaterializationInput(
      reviewModel,
      'target',
      new Map([
        ['scope', bootstrap.identity],
        ['source', sourceIdentity],
      ]),
    );
    if (!bridge.ok) throw new Error(bridge.reason);
    if (bridge.ok) {
      expect(bridge.input.identityKind).toBe('semantic');
      expect(bridge.input.collectionOrderings.size).toBe(1);
      expect(bridge.input.objectContent).toEqual({
        subject: { identity: sourceIdentity },
        provenance: [{ sourceIdentity: { identity: sourceIdentity } }],
      });
    }
  });

  it('fails closed for unresolved, cyclic, and handle-leaking review model inputs', () => {
    const bootstrap = bootstrapScopeIdentity(model());
    expect(bootstrap.ok).toBe(true);
    if (!bootstrap.ok) return;
    const identities = new Map([['scope', bootstrap.identity]]);
    expect(
      bridgeToMaterializationInput(
        model({ referenceResolutionMap: new Map() }),
        'target',
        identities,
      ).ok,
    ).toBe(false);
    expect(
      bootstrapScopeIdentity(
        model({ referenceResolutionMap: new Map([['ref-source', 'missing']]) }),
      ).ok,
    ).toBe(false);
    expect(
      bootstrapScopeIdentity(
        model({
          referenceResolutionMap: new Map([
            ['ref-source', 'ref-other'],
            ['ref-other', 'ref-source'],
          ]),
        }),
      ).ok,
    ).toBe(false);
    expect(
      bootstrapScopeIdentity(
        model({
          governedScope: {
            handle: 'scope',
            content: { meaning: 'scope' },
            sourceAttributions: [{ source: 'scope' }],
          },
          temporaryReviewHandles: new Set(['scope']),
        }),
      ).ok,
    ).toBe(false);
  });
});
