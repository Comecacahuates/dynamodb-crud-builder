import { describe, it, expect } from '@jest/globals';
import { StringAttribute } from '../../src/attribute/StringAttribute.js';
import {
  InvalidAttributeNameError,
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
  it('should parse value', () => {
    const stringAttribute = StringAttribute.parse('attribute-name', {
      'attribute-name': { S: 'attribute-value' },
    });

    expect(stringAttribute).toBeDefined();
    expect(stringAttribute!.value).toBe('attribute-value');
  });

  it('should return undefined if value is not present', () => {
    const stringAttribute = StringAttribute.parse('attribute-name', {});

    expect(stringAttribute).toBeUndefined();
  });

  it('should throw error if attribute descriptor is not S', () => {
    expect(() =>
      StringAttribute.parse('attribute-name', { 'attribute-name': { N: '1' } }),
    ).toThrow(InvalidAttributeTypeError);
  });

  it('should throw error if dynamodb attribute value is not string', () => {
    expect(() =>
      StringAttribute.parse('attribute-name', {
        'attribute-name': { S: 1 },
      } as any),
    ).toThrow(InvalidAttributeTypeError);
  });
});
