import { describe, it, expect } from '@jest/globals';
import { StringAttribute } from '../../src/attribute/StringAttribute.js';
import { InvalidAttributeNameError } from '../../src/attribute/error/index.js';

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
