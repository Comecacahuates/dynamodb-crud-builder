import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';
import { StringAttribute } from '../../src/attribute/StringAttribute.js';
import {
  InvalidAttributeNameError,
  InvalidAttributeValueError,
} from '../../src/attribute/error/index.js';

describe('Creating string attribute', () => {
  it('should return name', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.name).toBe('attribute-name');
  });

  it('should return value', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.value).toBe('attribute-value');
  });

  it('should return DynamoDB value', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.dynamoDbValue).toEqual({ S: 'attribute-value' });
  });

  it('should return attribute name placeholder', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.namePlaceholder).toBe('#attribute-name');
  });

  it('should return attribute value placeholder', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.valuePlaceholder).toBe(':attribute-name');
  });

  describe('Name validation', () => {
    it.each([['attribute-name-with-#'], ['attribute-name-with-:']])(
      `should throw error if name is %s`,
      (name: string) => {
        expect(() => new StringAttribute(name, 'a')).toThrow(
          InvalidAttributeNameError,
        );
      },
    );
  });
});

describe('Value validation', () => {
  describe('Default validation schema', () => {
    it('should now throw error if value is a string', () => {
      expect(() => new StringAttribute('attribute-name', 'a')).not.toThrow();
    });

    it.each([[undefined], [null], [false], [1]])(
      `should throw error if value is %s`,
      (value: any) => {
        expect(
          () => new StringAttribute('attribute-name', value as any),
        ).toThrow(InvalidAttributeValueError);
      },
    );
  });

  describe('Custom validation schema', () => {
    describe.each([
      [
        'non empty string',
        z.string().min(1),
        'a',
        [[undefined], [null], [false], [1], ['']],
      ],
      [
        'an email',
        z.string().email(),
        'email@email.com',
        [[undefined], [null], [false], [1], ['not-an-email']],
      ],
      [
        'a url',
        z.string().url(),
        'https://www.url.com',
        [[undefined], [null], [false], [1], ['not-a-url']],
      ],
    ])(
      `Validate value is %s`,
      (
        _,
        validationSchema: z.ZodString,
        validValue: string,
        invalidValues: any[],
      ) => {
        it(`should not throw error if value is ${validValue}`, () => {
          expect(() => {
            new StringAttribute('attribute-name', validValue, {
              validationSchema,
            });
          }).not.toThrow();
        });

        it.each(invalidValues)(
          `should throw error if value is %s`,
          (invalidValue) => {
            expect(() => {
              new StringAttribute('attribute-name', invalidValue, {
                validationSchema,
              });
            }).toThrow(InvalidAttributeValueError);
          },
        );
      },
    );
  });
});

describe('Setting value', () => {
  describe('Default validation schema', () => {
    it('should set a new value', () => {
      const stringAttribute = new StringAttribute(
        'attribute-name',
        'attribute-value',
      );
      stringAttribute.setValue('new-value');

      expect(stringAttribute.value).toBe('new-value');
    });

    it.each([[undefined], [null], [false], [1]])(
      `should throw error if value is %s`,
      (value: any) => {
        const stringAttribute = new StringAttribute(
          'attribute-name',
          'attribute-value',
        );

        expect(() => stringAttribute.setValue(value)).toThrow(
          InvalidAttributeValueError,
        );
      },
    );
  });

  describe('Custom validation schema', () => {
    describe.each([
      [
        'non empty string',
        z.string().min(1),
        'a',
        'b',
        [[undefined], [null], [false], [1], ['']],
      ],
      [
        'an email',
        z.string().email(),
        'email@email.com',
        'new-email@email.com',
        [[undefined], [null], [false], [1], ['not-an-email']],
      ],
      [
        'a url',
        z.string().url(),
        'https://www.url.com',
        'https://www.new.url.com',
        [[undefined], [null], [false], [1], ['not-a-url']],
      ],
    ])(
      `Validate value is %s`,
      (
        _,
        validationSchema: z.ZodString,
        originalValue: string,
        newValidValue: string,
        newInvalidValues: any[],
      ) => {
        it(`should not throw error if value is ${newValidValue}`, () => {
          const stringAttribute = new StringAttribute(
            'attribute-name',
            originalValue,
            { validationSchema },
          );

          expect(() => {
            stringAttribute.setValue(newValidValue);
          }).not.toThrow();
        });

        it.each(newInvalidValues)(
          `should throw error if value is %s`,
          (newInvalidValue: any) => {
            const stringAttribute = new StringAttribute(
              'attribute-name',
              originalValue,
              { validationSchema },
            );

            expect(() => {
              stringAttribute.setValue(newInvalidValue as any);
            }).toThrow(InvalidAttributeValueError);
          },
        );
      },
    );
  });
});
