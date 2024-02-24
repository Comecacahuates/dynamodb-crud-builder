import { describe, it, expect } from '@jest/globals';
import { AttributeNameMapper } from '../../../src/mapping/AttributeNameMapper.js';
import { type DatabaseItem } from '../../../src/types.js';

describe('reverse map attribute names', () => {
  describe('given a one-level nesting database item and a reverse attribute name mapper', () => {
    const databaseItem: DatabaseItem = {
      n: 'John Smith',
      a: 33,
      ia: true,
    };
    const reverseAttributeNameMapper = new AttributeNameMapper({
      name: { mappedName: 'n' },
      age: { mappedName: 'a' },
      isActive: { mappedName: 'ia' },
    }).getReverseMapper();

    describe('when reverse mapping attribute names', () => {
      it('should have reverse mapped attribute names', () => {
        expect(reverseAttributeNameMapper.map(databaseItem)).toEqual({
          name: 'John Smith',
          age: 33,
          isActive: true,
        });
      });
    });
  });

  describe('given a complex database item and a mapping schema', () => {
    const databaseItem: DatabaseItem = {
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
    };
    const reverseAttributeNameMapper = new AttributeNameMapper({
      name: { mappedName: 'n' },
      age: { mappedName: 'a' },
      isActive: { mappedName: 'ia' },
      address: {
        mappedName: 'ad',
        nestedMappingSchema: {
          street: { mappedName: 's' },
          city: { mappedName: 'c' },
          state: { mappedName: 'st' },
          zip: { mappedName: 'z' },
          nested: {
            mappedName: 'ne',
            nestedMappingSchema: {
              attribute1: { mappedName: 'a1' },
              attribute2: { mappedName: 'a2' },
            },
          },
        },
      },
      groups: { mappedName: 'g' },
      addresses: {
        mappedName: 'ads',
        nestedMappingSchema: {
          street: { mappedName: 'str' },
          state: { mappedName: 'sta' },
        },
      },
      tuple: {
        mappedName: 'tup',
        nestedMappingSchema: [
          null,
          {
            object: { mappedName: 'obj' },
          },
          {
            another: {
              mappedName: 'an',
              nestedMappingSchema: { attribute0: { mappedName: 'att0' } },
            },
          },
        ],
      },
    }).getReverseMapper();

    describe('when reverse mapping attribute names', () => {
      it('should have reverse mapped attribute names', () => {
        expect(reverseAttributeNameMapper.map(databaseItem)).toEqual({
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
        });
      });
    });
  });
});
