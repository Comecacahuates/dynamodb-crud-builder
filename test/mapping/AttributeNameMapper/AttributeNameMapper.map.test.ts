import { describe, it, expect } from '@jest/globals';
import {
  AttributeNameMapper,
  type AttributeNameMappingSchema,
} from '../../../src/mapping/AttributeNameMapper.js';
import { type DatabaseItem } from '../../../src/types.js';

describe('attribute names mapping', () => {
  describe('given a one nesting level database item and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      name: 'John Smith',
      age: 33,
      isActive: true,
    };
    const mappingSchema: AttributeNameMappingSchema = {
      name: { mapsTo: 'n' },
      age: { mapsTo: 'a' },
      isActive: { mapsTo: 'ia' },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          n: 'John Smith',
          a: 33,
          ia: true,
        });
      });
    });
  });

  describe('given a three nesting level database item and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      name: 'John Smith',
      age: 33,
      isActive: true,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        nested: {
          attribute1: 'value1',
          attribute2: false,
        },
      },
    };
    const mappingSchema: AttributeNameMappingSchema = {
      name: { mapsTo: 'n' },
      age: { mapsTo: 'a' },
      isActive: { mapsTo: 'ia' },
      address: {
        mapsTo: 'ad',
        nestedMapping: {
          street: { mapsTo: 's' },
          city: { mapsTo: 'c' },
          state: { mapsTo: 'st' },
          zip: { mapsTo: 'z' },
          nested: {
            mapsTo: 'ne',
            nestedMapping: {
              attribute1: { mapsTo: 'a1' },
              attribute2: { mapsTo: 'a2' },
            },
          },
        },
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          n: 'John Smith',
          a: 33,
          ia: true,
          ad: {
            s: '123 Main St',
            c: 'Anytown',
            st: 'CA',
            z: '12345',
            ne: {
              a1: 'value1',
              a2: false,
            },
          },
        });
      });
    });
  });

  describe('given a database item with an array of strings and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      groups: ['group-00', 'group-00'],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      groups: { mapsTo: 'g' },
    };

    describe('when mapping attribute names', () => {
      const databaseItemMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(databaseItemMapper.map(databaseItem)).toEqual({
          g: ['group-00', 'group-00'],
        });
      });
    });
  });

  describe('given a database item with an array of objects and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      addresses: [
        {
          street: '123 Main St',
          state: 'CA',
        },
        {
          street: '456 Elm St',
          state: 'AC',
        },
      ],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      addresses: {
        mapsTo: 'a',
        nestedMapping: {
          street: { mapsTo: 's' },
          state: { mapsTo: 'st' },
        },
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          a: [
            { s: '123 Main St', st: 'CA' },
            { s: '456 Elm St', st: 'AC' },
          ],
        });
      });
    });
  });

  describe('given a database item with a tuple and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      tuple: ['value-0', { object: 2 }],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      tuple: {
        mapsTo: 't',
        nestedMapping: [null, { object: { mapsTo: 'o' } }],
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          t: ['value-0', { o: 2 }],
        });
      });
    });
  });

  describe('given a database item with a tuple and a tuple mapping schema with less items', () => {
    const databaseItem: DatabaseItem = {
      tuple: [{ item1: 1 }, { item2: 2 }],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      tuple: {
        mapsTo: 't',
        nestedMapping: [
          {
            item1: { mapsTo: 'i1' },
          },
        ],
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should not map attribute names not defined in the mapping schema', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          t: [{ i1: 1 }, { item2: 2 }],
        });
      });
    });
  });

  describe('given a database item with a tuple and a tuple mapping schema with more items', () => {
    const databaseItem: DatabaseItem = {
      tuple: [{ item1: 1 }, { item2: 2 }],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      tuple: {
        mapsTo: 't',
        nestedMapping: [
          {
            item1: { mapsTo: 'i1' },
          },
          {
            item2: { mapsTo: 'i2' },
          },
          {
            item3: { mapsTo: 'i3' },
          },
        ],
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should map only attribute names in database item', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          t: [{ i1: 1 }, { i2: 2 }],
        });
      });
    });
  });

  describe('given a complex database item and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      name: 'John Smith',
      age: 33,
      isActive: true,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        nested: {
          attribute1: 'value1',
          attribute2: false,
        },
      },
      groups: ['group-00', 'group-00'],
      addresses: [
        {
          street: '123 Main St',
          state: 'CA',
        },
        {
          street: '456 Elm St',
          state: 'AC',
        },
      ],
      tuple: [
        'value-0',
        {
          object: 2,
        },
        {
          another: { attribute0: false },
        },
      ],
    };
    const mappingSchema: AttributeNameMappingSchema = {
      name: { mapsTo: 'n' },
      age: { mapsTo: 'a' },
      isActive: { mapsTo: 'ia' },
      address: {
        mapsTo: 'ad',
        nestedMapping: {
          street: { mapsTo: 's' },
          city: { mapsTo: 'c' },
          state: { mapsTo: 'st' },
          zip: { mapsTo: 'z' },
          nested: {
            mapsTo: 'ne',
            nestedMapping: {
              attribute1: { mapsTo: 'a1' },
              attribute2: { mapsTo: 'a2' },
            },
          },
        },
      },
      groups: { mapsTo: 'g' },
      addresses: {
        mapsTo: 'ads',
        nestedMapping: {
          street: { mapsTo: 'str' },
          state: { mapsTo: 'sta' },
        },
      },
      tuple: {
        mapsTo: 'tup',
        nestedMapping: [
          null,
          {
            object: { mapsTo: 'obj' },
          },
          {
            another: {
              mapsTo: 'an',
              nestedMapping: { attribute0: { mapsTo: 'att0' } },
            },
          },
        ],
      },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should have mapped attribute names', () => {
        expect(attributeNameMapper.map(databaseItem)).toEqual({
          n: 'John Smith',
          a: 33,
          ia: true,
          ad: {
            s: '123 Main St',
            c: 'Anytown',
            st: 'CA',
            z: '12345',
            ne: {
              a1: 'value1',
              a2: false,
            },
          },
          g: ['group-00', 'group-00'],
          ads: [
            { str: '123 Main St', sta: 'CA' },
            { str: '456 Elm St', sta: 'AC' },
          ],
          tup: ['value-0', { obj: 2 }, { an: { att0: false } }],
        });
      });
    });
  });

  describe('given a database item and a mapping schema with not matching attributes', () => {
    const databaseItem: DatabaseItem = {
      name: 'John Smith',
      age: 10,
    };
    const mappingSchema: AttributeNameMappingSchema = {
      age: { mapsTo: 'a' },
    };

    describe('when mapping attribute names', () => {
      const attributeNameMapper = new AttributeNameMapper(mappingSchema);

      it('should not map attribute names not defined in the mapping schema', () => {
        expect(attributeNameMapper.map(databaseItem)).toMatchObject({
          name: 'John Smith',
        });
      });

      it('should map attribute names defined in the mapping schema', () => {
        expect(attributeNameMapper.map(databaseItem)).toMatchObject({
          a: 10,
        });
      });
    });
  });
});
