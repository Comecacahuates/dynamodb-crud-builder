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
      `should throw error if name is not valid: %s`,
      (name) => {
        expect(() => new StringAttribute(name, 'a')).toThrow(
          InvalidAttributeNameError,
        );
      },
    );
  });
});

describe('Value validation', () => {
  describe('Default validation', () => {
    it('should throw error if value is not a string', () => {
      expect(() => new StringAttribute('attribute-name', 1 as any)).toThrow(
        InvalidAttributeValueError,
      );
    });

    it('should now throw error if value is a string', () => {
      expect(() => new StringAttribute('attribute-name', 'a')).not.toThrow();
    });
  });

  describe('Custom validation', () => {
    describe('Value does not pass validation', () => {
      it.each([
        ['is empty string', '', z.string().min(1)],
        ['is not an email', 'not-an-email', z.string().email()],
        ['is not a url', 'not-a-url', z.string().url()],
      ])(`should throw error if value %s`, (_, value, validationSchema) => {
        expect(
          () =>
            new StringAttribute('attribute-name', value, { validationSchema }),
        ).toThrow(InvalidAttributeValueError);
      });
    });

    describe('Value passes validation', () => {
      it.each([
        ['is not empty string', 'a', z.string().min(1)],
        ['is an email', 'email@email.com', z.string().email()],
        ['is a url', 'https://www.url.com', z.string().url()],
      ])(`should not throw error if value %s`, (_, value, validationSchema) => {
        expect(
          () =>
            new StringAttribute('attribute-name', value, { validationSchema }),
        ).not.toThrow();
      });
    });
  });
});
