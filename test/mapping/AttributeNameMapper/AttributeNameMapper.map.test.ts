import { describe, it, expect } from '@jest/globals';
import {
  AttributeNameMapper,
  type MappingSchema,
} from '../../../src/mapping/AttributeNameMapper.js';
import { type DatabaseItem } from '../../../src/types.js';

describe('map attribute names', () => {
  describe('given a one-level nesting database item and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
      name: 'John Smith',
      age: 33,
      isActive: true,
    };
    const mappingSchema: MappingSchema = {
      name: { mappedName: 'n' },
      age: { mappedName: 'a' },
      isActive: { mappedName: 'ia' },
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

  describe('given a three-level nesting database item and a mapping schema', () => {
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
    const mappingSchema: MappingSchema = {
      name: { mappedName: 'n' },
      age: { mappedName: 'a' },
      isActive: { mappedName: 'ia' },
      address: {
        mappedName: 'ad',
        mappingSchema: {
          street: { mappedName: 's' },
          city: { mappedName: 'c' },
          state: { mappedName: 'st' },
          zip: { mappedName: 'z' },
          nested: {
            mappedName: 'ne',
            mappingSchema: {
              attribute1: { mappedName: 'a1' },
              attribute2: { mappedName: 'a2' },
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
    const mappingSchema: MappingSchema = {
      groups: { mappedName: 'g' },
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
    const mappingSchema: MappingSchema = {
      addresses: {
        mappedName: 'a',
        mappingSchema: {
          street: { mappedName: 's' },
          state: { mappedName: 'st' },
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
    const mappingSchema: MappingSchema = {
      tuple: {
        mappedName: 't',
        mappingSchema: [null, { object: { mappedName: 'o' } }],
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
    const mappingSchema: MappingSchema = {
      tuple: {
        mappedName: 't',
        mappingSchema: [
          {
            item1: { mappedName: 'i1' },
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
    const mappingSchema: MappingSchema = {
      tuple: {
        mappedName: 't',
        mappingSchema: [
          {
            item1: { mappedName: 'i1' },
          },
          {
            item2: { mappedName: 'i2' },
          },
          {
            item3: { mappedName: 'i3' },
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
    const mappingSchema: MappingSchema = {
      name: { mappedName: 'n' },
      age: { mappedName: 'a' },
      isActive: { mappedName: 'ia' },
      address: {
        mappedName: 'ad',
        mappingSchema: {
          street: { mappedName: 's' },
          city: { mappedName: 'c' },
          state: { mappedName: 'st' },
          zip: { mappedName: 'z' },
          nested: {
            mappedName: 'ne',
            mappingSchema: {
              attribute1: { mappedName: 'a1' },
              attribute2: { mappedName: 'a2' },
            },
          },
        },
      },
      groups: { mappedName: 'g' },
      addresses: {
        mappedName: 'ads',
        mappingSchema: {
          street: { mappedName: 'str' },
          state: { mappedName: 'sta' },
        },
      },
      tuple: {
        mappedName: 'tup',
        mappingSchema: [
          null,
          {
            object: { mappedName: 'obj' },
          },
          {
            another: {
              mappedName: 'an',
              mappingSchema: { attribute0: { mappedName: 'att0' } },
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
    const mappingSchema: MappingSchema = {
      age: { mappedName: 'a' },
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
