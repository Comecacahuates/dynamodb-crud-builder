import { describe, it, expect, beforeEach } from '@jest/globals';
import { StringAttribute } from '../../src/attribute/StringAttribute.js';
import {
  InvalidAttributeNameError,
  UndefinedAttributeError,
  InvalidAttributeTypeError,
} from '../../src/attribute/error/index.js';

describe('Creating string attribute', () => {
  let stringAttribute: StringAttribute;

  beforeEach(() => {
    stringAttribute = new StringAttribute('attribute-name', 'attribute-value');
  });

  it('should return name', () => {
    expect(stringAttribute.name).toBe('attribute-name');
  });

  it('should return value', () => {
    expect(stringAttribute.value).toBe('attribute-value');
  });

  it('should return DynamoDB value', () => {
    expect(stringAttribute.dynamodbValue).toEqual({ S: 'attribute-value' });
  });

  it('should return DynamoDB item', () => {
    expect(stringAttribute.dynamodbItem).toEqual({
      'attribute-name': { S: 'attribute-value' },
    });
  });

  it('should return attribute name placeholder', () => {
    expect(stringAttribute.namePlaceholder).toBe('#attribute-name');
  });

  it('should return attribute value placeholder', () => {
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
  let stringAttribute: StringAttribute;

  beforeEach(() => {
    stringAttribute = new StringAttribute('attribute-name', 'attribute-value');
  });

  it('should set a new value', () => {
    stringAttribute.setValue('new-value');

    expect(stringAttribute.value).toBe('new-value');
  });
});

describe('Parsing DynamoDB value', () => {
  let stringAttribute: StringAttribute;

  beforeEach(() => {
    stringAttribute = new StringAttribute('attribute-name', 'attribute-value');
  });

  it('should parse value in DynamoDB item', () => {
    stringAttribute.parse({ 'attribute-name': { S: 'attribute-value' } });

    expect(stringAttribute.value).toBe('attribute-value');
  });

  it('should throw error if value is not present in DynamoDB item', () => {
    expect(() => stringAttribute.parse({})).toThrow(UndefinedAttributeError);
  });

  it('should throw error if attribute descriptor is not S', () => {
    expect(() =>
      stringAttribute.parse({ 'attribute-name': { N: '1' } }),
    ).toThrow(InvalidAttributeTypeError);
  });

  it('should throw error if dynamodb attribute value is not string', () => {
    expect(() =>
      stringAttribute.parse({ 'attribute-name': { S: 1 } } as any),
    ).toThrow(InvalidAttributeTypeError);
  });
});
