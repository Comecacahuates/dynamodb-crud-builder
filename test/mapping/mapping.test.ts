import { describe, it, expect } from '@jest/globals';
import * as Mapping from '../../src/mapping/index.js';
import { PathMappingError } from '../../src/errors/index.js';
import { type AttributePath } from '../../src/types.js';

describe('Item mapping', () => {
  it('should map item with single null attribute', () => {
    const itemToMap = {
      attribute: { NULL: true },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = { a: { NULL: true } };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single string attribute', () => {
    const itemToMap = {
      attribute: { S: 'attribute-value' },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = { a: { S: 'attribute-value' } };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single number attribute', () => {
    const itemToMap = {
      attribute: { N: '123' },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = { a: { N: '123' } };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single boolean attribute', () => {
    const itemToMap = {
      attribute: { BOOL: true },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = { a: { BOOL: true } };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single binary attribute', () => {
    const itemToMap = {
      attribute: { B: new Uint8Array([1, 2, 3]) },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = {
      a: { B: new Uint8Array([1, 2, 3]) },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single string set attribute', () => {
    const itemToMap = {
      attribute: { SS: ['value1', 'value2'] },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = {
      a: { SS: ['value1', 'value2'] },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single number set attribute', () => {
    const itemToMap = {
      attribute: { NS: ['1', '2'] },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = {
      a: { NS: ['1', '2'] },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with single binary set attribute', () => {
    const itemToMap = {
      attribute: { BS: [new Uint8Array([1, 2, 3])] },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedMappedItem = {
      a: { BS: [new Uint8Array([1, 2, 3])] },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with nested map attribute', () => {
    const itemToMap = {
      attribute: {
        M: {
          'nested-attribute-name': { S: 'nested-attribute-value' },
        },
      },
    };
    const itemMapping: Mapping.ItemMapping = {
      attribute: {
        mappedName: 'mapped-name',
        nestedAttributesMapping: {
          'nested-attribute-name': {
            mappedName: 'mapped-nested-attribute-name',
          },
        },
      },
    };

    const expectedMappedItem = {
      'mapped-name': {
        M: {
          'mapped-nested-attribute-name': { S: 'nested-attribute-value' },
        },
      },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should map item with multiple attributes', () => {
    const itemToMap = {
      'attribute-1': { S: 'attribute-value-1' },
      'attribute-2': { N: '100' },
      'attribute-3': { BOOL: true },
      'attribute-4': { B: new Uint8Array([1, 2, 3]) },
      'attribute-5': { SS: ['value1', 'value2'] },
      'attribute-6': { NS: ['1', '2'] },
      'attribute-7': { BS: [new Uint8Array([1, 2, 3])] },
      'attribute-8': {
        M: {
          'nested-attribute': { S: 'nested-attribute-value' },
        },
      },
      'attribute-9': { L: [{ S: 'value1' }, { S: 'value2' }] },
    };
    const itemMapping: Mapping.ItemMapping = {
      'attribute-1': { mappedName: 'a1' },
      'attribute-2': { mappedName: 'a2' },
      'attribute-3': { mappedName: 'a3' },
      'attribute-4': { mappedName: 'a4' },
      'attribute-5': { mappedName: 'a5' },
      'attribute-6': { mappedName: 'a6' },
      'attribute-7': { mappedName: 'a7' },
      'attribute-8': {
        mappedName: 'a8',
        nestedAttributesMapping: {
          'nested-attribute': {
            mappedName: 'a8-nested',
          },
        },
      },
      'attribute-9': { mappedName: 'a9' },
    };

    const expectedMappedItem = {
      a1: { S: 'attribute-value-1' },
      a2: { N: '100' },
      a3: { BOOL: true },
      a4: { B: new Uint8Array([1, 2, 3]) },
      a5: { SS: ['value1', 'value2'] },
      a6: { NS: ['1', '2'] },
      a7: { BS: [new Uint8Array([1, 2, 3])] },
      a8: {
        M: {
          'a8-nested': { S: 'nested-attribute-value' },
        },
      },
      a9: { L: [{ S: 'value1' }, { S: 'value2' }] },
    };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });

  it('should not map attribute if mapping is not defined', () => {
    const itemToMap = { attribute: { S: 'attribute-value' } };
    const itemMapping: Mapping.ItemMapping = {};

    const expectedMappedItem = { attribute: { S: 'attribute-value' } };
    const actualMappedItem = Mapping.mapItem(itemToMap, itemMapping);

    expect(actualMappedItem).toEqual(expectedMappedItem);
  });
});

describe('Reverse item mapping', () => {
  it('should build reverse item mapping with single attribute', () => {
    const itemMapping: Mapping.ItemMapping = {
      attribute: { mappedName: 'a' },
    };

    const expectedReverseItemMapping = {
      a: { mappedName: 'attribute' },
    };
    const actualReverseItemMapping =
      Mapping.buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with nested attribute', () => {
    const itemMapping: Mapping.ItemMapping = {
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
    const actualReverseItemMapping =
      Mapping.buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with multiple attributes', () => {
    const itemMapping: Mapping.ItemMapping = {
      'attribute-1': { mappedName: 'a1' },
      'attribute-2': { mappedName: 'a2' },
      'attribute-3': { mappedName: 'a3' },
    };

    const expectedReverseItemMapping = {
      a1: { mappedName: 'attribute-1' },
      a2: { mappedName: 'attribute-2' },
      a3: { mappedName: 'attribute-3' },
    };
    const actualReverseItemMapping =
      Mapping.buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });

  it('should build reverse item mapping with nested attributes', () => {
    const itemMapping: Mapping.ItemMapping = {
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
    const actualReverseItemMapping =
      Mapping.buildReverseItemMapping(itemMapping);

    expect(actualReverseItemMapping).toEqual(expectedReverseItemMapping);
  });
});

describe('Attribute path mapping', () => {
  const itemMapping: Mapping.ItemMapping = {
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
