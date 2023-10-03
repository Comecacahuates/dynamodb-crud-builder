import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';
import { DateAttribute } from '../../src/attribute/DateAttribute.js';
import {
  InvalidAttributeNameError,
  InvalidAttributeValueError,
} from '../../src/attribute/error/index.js';

describe('Creating date attribute', () => {
  it('should return name', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.name).toBe('attribute-name');
  });

  it('should return value', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.value).toEqual(new Date('2021-01-01T00:00:00.000Z'));
  });

  it('should return DynamoDB value', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.dynamoDbValue).toEqual({
      S: '2021-01-01T00:00:00.000Z',
    });
  });

  it('should return attribute name placeholder', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.namePlaceholder).toBe('#attribute-name');
  });

  it('should return attribute value placeholder', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.valuePlaceholder).toBe(':attribute-name');
  });

  describe('Name validation', () => {
    it.each([['attribute-name-with-#'], ['attribute-name-with-:']])(
      `should throw error if name is not valid: %s`,
      (name) => {
        expect(
          () => new DateAttribute(name, new Date('2021-01-01T00:00:00.000Z')),
        ).toThrow(InvalidAttributeNameError);
      },
    );
  });
});

describe('Value validation', () => {
  describe('Default validation', () => {
    it.each([
      ['string'],
      [1],
      [true],
      [{}],
      [[]],
      [null],
      [new Date('invalid-date')],
    ])('should throw error if value is %s', (value) => {
      expect(() => new DateAttribute('attribute-name', value as any)).toThrow(
        InvalidAttributeValueError,
      );
    });
  });

  describe('Custom validation', () => {
    describe.each([
      [
        'greater than 2021-01-01T00:00:00.000Z',
        z.date().min(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2021-01-02T00:00:00.000Z'),
        new Date('2020-12-31T00:00:00.000Z'),
      ],
      [
        'less than 2021-01-01T00:00:00.000Z',
        z.date().max(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2020-12-31T00:00:00.000Z'),
        new Date('2021-01-02T00:00:00.000Z'),
      ],
    ])(
      `Validate date is %s`,
      (_, validationSchema, validValue, invalidValue) => {
        it(`should not throw error if value is ${validValue}`, () => {
          expect(
            () =>
              new DateAttribute('attribute-name', validValue, {
                validationSchema,
              }),
          ).not.toThrow();
        });

        it(`should throw error if value is ${invalidValue}`, () => {
          expect(
            () =>
              new DateAttribute('attribute-name', invalidValue, {
                validationSchema,
              }),
          ).toThrow(InvalidAttributeValueError);
        });
      },
    );
  });
});
