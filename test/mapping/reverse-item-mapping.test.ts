import { describe, it, expect } from '@jest/globals';
import {
  type MappingSchema,
  buildReverseItemMapping,
} from '../../src/mapping/index.js';

describe('Reverse item mapping', () => {
  it('should build reverse item mapping with single attribute', () => {
    const itemMapping: MappingSchema = {
      attribute: { mappedName: 'a' },
    };

    const expectedReverseItemMapping = {
      a: { mappedName: 'attribute' },
    };
    const actualReverseItemMapping = buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with nested attribute', () => {
    const itemMapping: MappingSchema = {
      attribute: {
        mappedName: 'a',
        nestedAttributesMapping: {
          'nested-attribute': {
            mappedName: 'nested-a',
          },
        },
      },
    };

    const expectedReverseItemMapping = {
      a: {
        mappedName: 'attribute',
        nestedAttributesMapping: {
          'nested-a': { mappedName: 'nested-attribute' },
        },
      },
    };
    const actualReverseItemMapping = buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with multiple attributes', () => {
    const itemMapping: MappingSchema = {
      'attribute-1': { mappedName: 'a1' },
      'attribute-2': { mappedName: 'a2' },
      'attribute-3': { mappedName: 'a3' },
    };

    const expectedReverseItemMapping = {
      a1: { mappedName: 'attribute-1' },
      a2: { mappedName: 'attribute-2' },
      a3: { mappedName: 'attribute-3' },
    };
    const actualReverseItemMapping = buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with nested attributes', () => {
    const itemMapping: MappingSchema = {
      'attribute-1': {
        mappedName: 'a1',
        nestedAttributesMapping: {
          'nested-attribute-1': {
            mappedName: 'nested-a1',
          },
        },
      },
      'attribute-2': {
        mappedName: 'a2',
        nestedAttributesMapping: {
          'nested-attribute-2': {
            mappedName: 'nested-a2',
          },
        },
      },
    };

    const expectedReverseItemMapping = {
      a1: {
        mappedName: 'attribute-1',
        nestedAttributesMapping: {
          'nested-a1': { mappedName: 'nested-attribute-1' },
        },
      },
      a2: {
        mappedName: 'attribute-2',
        nestedAttributesMapping: {
          'nested-a2': { mappedName: 'nested-attribute-2' },
        },
      },
    };
    const actualReverseItemMapping = buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });
});
