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
      `should throw error if name is %s`,
      (name: string) => {
        expect(
          () => new DateAttribute(name, new Date('2021-01-01T00:00:00.000Z')),
        ).toThrow(InvalidAttributeNameError);
      },
    );
  });
});

describe('Value validation', () => {
  describe('Default validation schema', () => {
    it('should not throw error if value is valid date', () => {
      expect(
        () =>
          new DateAttribute(
            'attribute-name',
            new Date('2021-01-01T00:00:00.000Z'),
          ),
      ).not.toThrow();
    });

    it.each([
      ['string'],
      [1],
      [true],
      [{}],
      [[]],
      [null],
      [new Date('invalid-date')],
    ])('should throw error if value is %s', (value: any) => {
      expect(() => new DateAttribute('attribute-name', value)).toThrow(
        InvalidAttributeValueError,
      );
    });
  });

  describe('Custom validation schema', () => {
    describe.each([
      [
        'greater than 2021-01-01T00:00:00.000Z',
        z.date().min(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2021-01-02T00:00:00.000Z'),
        [
          [undefined],
          [null],
          [false],
          [1],
          [''],
          [new Date('2020-12-31T00:00:00.000Z')],
        ],
      ],
      [
        'less than 2021-01-01T00:00:00.000Z',
        z.date().max(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2020-12-31T00:00:00.000Z'),
        [
          [undefined],
          [null],
          [false],
          [1],
          [''],
          [new Date('2021-01-02T00:00:00.000Z')],
        ],
      ],
    ])(
      `Validate value is %s`,
      (
        _,
        validationSchema: z.ZodDate,
        validValue: Date,
        invalidValues: any[],
      ) => {
        it(`should not throw error if value is ${validValue}`, () => {
          expect(
            () =>
              new DateAttribute('attribute-name', validValue, {
                validationSchema,
              }),
          ).not.toThrow();
        });

        it.each(invalidValues)(`should throw error if value is %s`, () => {
          expect(
            (invalidValue: any) =>
              new DateAttribute('attribute-name', invalidValue, {
                validationSchema,
              }),
          ).toThrow(InvalidAttributeValueError);
        });
      },
    );
  });
});

describe('Setting value', () => {
  describe('Default validation schema', () => {
    it('should set a new value', () => {
      const dateAttribute = new DateAttribute(
        'attribute-name',
        new Date('2021-01-01T00:00:00.000Z'),
      );
      dateAttribute.setValue(new Date('2021-01-02T00:00:00.000Z'));

      expect(dateAttribute.value).toEqual(new Date('2021-01-02T00:00:00.000Z'));
    });

    it.each([
      [undefined],
      [null],
      [false],
      [1],
      [''],
      [new Date('invalid-date')],
    ])(`should throw error if value is %s`, (value: any) => {
      const dateAttribute = new DateAttribute(
        'attribute-name',
        new Date('2021-01-01T00:00:00.000Z'),
      );

      expect(() => dateAttribute.setValue(value)).toThrow(
        InvalidAttributeValueError,
      );
    });
  });

  describe('Custom validation schema', () => {
    describe.each([
      [
        'greater than 2021-01-01T00:00:00.000Z',
        z.date().min(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2021-01-02T00:00:00.000Z'),
        [
          [undefined],
          [null],
          [false],
          [1],
          [''],
          [new Date('2020-12-31T00:00:00.000Z')],
        ],
      ],
      [
        'less than 2021-01-01T00:00:00.000Z',
        z.date().max(new Date('2021-01-01T00:00:00.000Z')),
        new Date('2020-12-31T00:00:00.000Z'),
        [
          [undefined],
          [null],
          [false],
          [1],
          [''],
          [new Date('2021-01-02T00:00:00.000Z')],
        ],
      ],
    ])(
      `Validate value is %s`,
      (
        _,
        validationSchema: z.ZodDate,
        validValue: Date,
        invalidValues: any[],
      ) => {
        it(`should not throw error if value is ${validValue}`, () => {
          const dateAttribute = new DateAttribute(
            'attribute-name',
            new Date('2021-01-01T00:00:00.000Z'),
            { validationSchema },
          );
          dateAttribute.setValue(validValue);

          expect(dateAttribute.value).toEqual(validValue);
        });

        it.each(invalidValues)(
          `should throw error if value is %s`,
          (invalidValue: any) => {
            const dateAttribute = new DateAttribute(
              'attribute-name',
              new Date('2021-01-01T00:00:00.000Z'),
              { validationSchema },
            );

            expect(() => dateAttribute.setValue(invalidValue)).toThrow(
              InvalidAttributeValueError,
            );
          },
        );
      },
    );
  });
});
