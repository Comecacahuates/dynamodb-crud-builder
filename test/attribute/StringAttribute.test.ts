import { describe, it, expect } from '@jest/globals';
import { StringAttribute } from '../../src/attribute/StringAttribute.js';
import {
  InvalidAttributeNameError,
  UndefinedAttributeError,
  InvalidAttributeTypeError,
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

    expect(stringAttribute.dynamodbValue).toEqual({ S: 'attribute-value' });
  });

  it('should return DynamoDB item', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(stringAttribute.dynamodbItem).toEqual({
      'attribute-name': { S: 'attribute-value' },
    });
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

describe('Setting value', () => {
  it('should set a new value', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );
    stringAttribute.setValue('new-value');

    expect(stringAttribute.value).toBe('new-value');
  });
});

describe('Parsing DynamoDB value', () => {
  it('should parse value in DynamoDB item', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );
    stringAttribute.parse('attribute-name', {
      'attribute-name': { S: 'attribute-value' },
    });

    expect(stringAttribute.value).toBe('attribute-value');
  });

  it('should throw error if value is not present in DynamoDB item', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );
    expect(() => stringAttribute.parse('attribute-name', {})).toThrow(
      UndefinedAttributeError,
    );
  });

  it('should throw error if attribute descriptor is not S', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(() =>
      stringAttribute.parse('attribute-name', { 'attribute-name': { N: '1' } }),
    ).toThrow(InvalidAttributeTypeError);
  });

  it('should throw error if dynamodb attribute value is not string', () => {
    const stringAttribute = new StringAttribute(
      'attribute-name',
      'attribute-value',
    );

    expect(() =>
      stringAttribute.parse('attribute-name', {
        'attribute-name': { S: 1 },
      } as any),
    ).toThrow(InvalidAttributeTypeError);
  });
});
