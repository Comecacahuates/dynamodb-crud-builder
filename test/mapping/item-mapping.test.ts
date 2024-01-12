import { describe, it, expect } from '@jest/globals';
import { mapItem, type MappingSchema } from '../../src/mapping/index.js';
import { type Item } from '../../src/types.js';

describe('Item mapping', () => {
  describe('Simple mapping schema', () => {
    const mappingSchema: MappingSchema = {
      attr: { mapsTo: 'a' },
    };

    type TestCase = {
      testName: string;
      item: Item;
      mappedItem: Item;
    };

    const testCases: Array<TestCase> = [
      {
        testName: 'should map item with single null attribute',
        item: { attr: { NULL: true } },
        mappedItem: { a: { NULL: true } },
      },
      {
        testName: 'should map item with single string attribute',
        item: { attr: { S: 'attribute-value' } },
        mappedItem: { a: { S: 'attribute-value' } },
      },
      {
        testName: 'should map item with single number attribute',
        item: { attr: { N: '123' } },
        mappedItem: { a: { N: '123' } },
      },
      {
        testName: 'should map item with single boolean attribute',
        item: { attr: { BOOL: true } },
        mappedItem: { a: { BOOL: true } },
      },
      {
        testName: 'should map item with single binary attribute',
        item: { attr: { B: new Uint8Array([1, 2, 3]) } },
        mappedItem: { a: { B: new Uint8Array([1, 2, 3]) } },
      },
      {
        testName: 'should map item with single string set attribute',
        item: { attr: { SS: ['value1', 'value2'] } },
        mappedItem: { a: { SS: ['value1', 'value2'] } },
      },
      {
        testName: 'should map item with single number set attribute',
        item: { attr: { NS: ['123', '456'] } },
        mappedItem: { a: { NS: ['123', '456'] } },
      },
      {
        testName: 'should map item with single binary set attribute',
        item: { attr: { BS: [new Uint8Array([1, 2, 3])] } },
        mappedItem: { a: { BS: [new Uint8Array([1, 2, 3])] } },
      },
      {
        testName: 'should map item with single list attribute',
        item: { attr: { L: [{ S: 'value1' }, { S: 'value2' }] } },
        mappedItem: { a: { L: [{ S: 'value1' }, { S: 'value2' }] } },
      },
      {
        testName: 'should map item with single map attribute',
        item: { attr: { M: { attr1: { S: 'value1' } } } },
        mappedItem: { a: { M: { attr1: { S: 'value1' } } } },
      },
      {
        testName: 'should not map item if attribute is not defined',
        item: { attribute: { S: 'attribute-value' } },
        mappedItem: { attribute: { S: 'attribute-value' } },
      },
      {
        testName: 'should only map attributes defined in mapping schema',
        item: { attr: { S: 'value-1' }, attr0: { S: 'value-2' } },
        mappedItem: { a: { S: 'value-1' }, attr0: { S: 'value-2' } },
      },
    ];

    it.each(testCases)('$testName', ({ item, mappedItem }) => {
      const actualMappedItem = mapItem(item, mappingSchema);

      expect(actualMappedItem).toEqual(mappedItem);
    });
  });

  describe('Nested mapping schemas', () => {
    const mappingSchema: MappingSchema = {
      attr1: { mapsTo: 'a1' },
      attr2: {
        mapsTo: 'a2',
        nestedMappingSchema: {
          attr1: { mapsTo: 'a2a1' },
          attr2: {
            mapsTo: 'a2a2',
            nestedMappingSchema: {
              attr1: { mapsTo: 'a2a2a1' },
              attr2: { mapsTo: 'a2a2a2' },
            },
          },
        },
      },
    };

    type TestCase = {
      testName: string;
      item: Item;
      mappedItem: Item;
    };

    const testCases: Array<TestCase> = [
      {
        testName: 'should map item with single attribute',
        item: { attr1: { S: 'value-1' } },
        mappedItem: { a1: { S: 'value-1' } },
      },
      {
        testName: 'should map item with nested attribute',
        item: {
          attr1: { S: 'value-1' },
          attr2: {
            M: {
              attr1: { S: 'value-1' },
              attr2: {
                M: { attr1: { S: 'value-2' }, attr2: { S: 'value-3' } },
              },
            },
          },
        },
        mappedItem: {
          a1: { S: 'value-1' },
          a2: {
            M: {
              a2a1: { S: 'value-1' },
              a2a2: {
                M: { a2a2a1: { S: 'value-2' }, a2a2a2: { S: 'value-3' } },
              },
            },
          },
        },
      },
    ];

    it.each(testCases)('$testName', ({ item, mappedItem }) => {
      const actualMappedItem = mapItem(item, mappingSchema);

      expect(actualMappedItem).toEqual(mappedItem);
    });
  });
});
