import { describe, it, expect } from '@jest/globals';
import * as Mapping from '../../src/mapping/index.js';
import { PathMappingError } from '../../src/errors/index.js';
import type { AttributePath, ItemMapping } from '../../src/types.js';

describe('Attribute path mapping', () => {
  const itemMapping: ItemMapping = {
    attribute1: {
      mappedName: 'a1',
    },
    attribute2: {
      mappedName: 'a2',
      nestedAttributesMapping: {
        'nested-attribute2': {
          mappedName: 'nested-a2',
        },
      },
    },
    attribute3: {
      mappedName: 'a3',
      nestedAttributesMapping: {
        'nested-attribute3': {
          mappedName: 'nested-a3',
          nestedAttributesMapping: {
            'nested-nested-attribute3': {
              mappedName: 'nested-nested-a3',
            },
          },
        },
      },
    },
  };

  it.each([
    ['simple path', ['attribute1'], ['a1']],
    [
      'one level nesting path',
      ['attribute2', 'nested-attribute2'],
      ['a2', 'nested-a2'],
    ],
    [
      'two level nesting path',
      ['attribute3', 'nested-attribute3', 'nested-nested-attribute3'],
      ['a3', 'nested-a3', 'nested-nested-a3'],
    ],
  ])(
    'should map %s',
    (
      _,
      attributePathToMap: AttributePath,
      expectedAttributeMappedPath: AttributePath,
    ) => {
      const mappedAttributePath = Mapping.mapAttributePath(
        attributePathToMap,
        itemMapping,
      );

      expect(mappedAttributePath).toEqual(expectedAttributeMappedPath);
    },
  );

  it('should throw error if attribute path is not defined', () => {
    const pathToMap = ['attribute4'];

    expect(() => Mapping.mapAttributePath(pathToMap, itemMapping)).toThrow(
      PathMappingError,
    );
  });
});
