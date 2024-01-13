import { describe, it, expect } from '@jest/globals';
import { mapItem } from '../../src/mapping/item-mapping.js';
import { type MappingSchema } from '../../src/mapping/index.js';
import { type Item } from '../../src/item/index.js';
import { ItemMappingError } from '../../src/errors/index.js';

describe('Item mapping', () => {
  describe('Parsing items with different types of attributes', () => {
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

  describe('Nested mapping schemas with maps', () => {
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
        testName: 'should map partial item',
        item: { attr1: { S: 'value-1' } },
        mappedItem: { a1: { S: 'value-1' } },
      },
      {
        testName: 'should map full item',
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

  describe('Nested mapping schemas with lists', () => {
    const mappingSchema: MappingSchema = {
      attr1: {
        mapsTo: 'a1',
        nestedMappingSchema: {
          attr2: {
            mapsTo: 'b1',
            nestedMappingSchema: {
              attr3: { mapsTo: 'c1' },
              attr4: { mapsTo: 'c2' },
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
        testName: 'should map item with list of maps',
        item: {
          attr1: {
            L: [
              {
                M: {
                  attr2: {
                    M: { attr3: { S: 'value-1' }, attr4: { S: 'value-2' } },
                  },
                },
              },
              {
                M: {
                  attr2: {
                    M: { attr3: { S: 'value-3' }, attr4: { S: 'value-4' } },
                  },
                },
              },
              {
                M: {
                  attr2: {
                    M: { attr3: { S: 'value-5' }, attr4: { S: 'value-6' } },
                  },
                },
              },
            ],
          },
        },
        mappedItem: {
          a1: {
            L: [
              {
                M: {
                  b1: {
                    M: { c1: { S: 'value-1' }, c2: { S: 'value-2' } },
                  },
                },
              },
              {
                M: {
                  b1: {
                    M: { c1: { S: 'value-3' }, c2: { S: 'value-4' } },
                  },
                },
              },
              {
                M: {
                  b1: {
                    M: { c1: { S: 'value-5' }, c2: { S: 'value-6' } },
                  },
                },
              },
            ],
          },
        },
      },
    ];

    it.each(testCases)('$testName', ({ item, mappedItem }) => {
      const actualMappedItem = mapItem(item, mappingSchema);

      expect(actualMappedItem).toEqual(mappedItem);
    });
  });

  describe('Strict item mapping', () => {
    it('should not throw error if there is no mapping defined for attribute name and strict option is false', () => {
      const mappingSchema: MappingSchema = {
        attr0: { mapsTo: 'a' },
      };

      const item = { attr1: { S: 'attribute-value' } };

      expect(() => mapItem(item, mappingSchema)).not.toThrow();
    });

    it('should throw error if there is no mapping defined for attribute name and strict option is true', () => {
      const mappingSchema: MappingSchema = {
        attr0: { mapsTo: 'a' },
      };

      const item = { attr1: { S: 'attribute-value' } };

      expect(() => mapItem(item, mappingSchema, { strict: true })).toThrow(
        ItemMappingError,
      );
    });
  });
});