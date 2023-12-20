import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute-value/index.js';

describe('Parsing null DynamoDB attribute value', () => {
  it('should return null value', () => {
    expect(Attribute.parseNull({ NULL: true })).toBe(null);
  });
});

describe('Parsing string DynamoDB attribute value', () => {
  it('should return string value', () => {
    expect(Attribute.parseString({ S: 'attribute-value' })).toBe(
      'attribute-value',
    );
  });
});

describe('Parsing number DynamoDB attribute value', () => {
  it('should return number value', () => {
    expect(Attribute.parseNumber({ N: '123' })).toBe(123);
  });
});

describe('Parsing boolean DynamoDB attribute value', () => {
  it('should return boolean value', () => {
    expect(Attribute.parseBoolean({ BOOL: true })).toBe(true);
  });
});

describe('Parsing binary DynamoDB attribute value', () => {
  it('should return binary value', () => {
    expect(Attribute.parseBinary({ B: new Uint8Array([1, 2, 3]) })).toEqual(
      new Uint8Array([1, 2, 3]),
    );
  });
});

describe('Parsing string set DynamoDB attribute value', () => {
  it('should return string set value', () => {
    expect(Attribute.parseStringSet({ SS: ['value1', 'value2'] })).toEqual(
      new Set(['value1', 'value2']),
    );
  });
});

describe('Parsing number set DynamoDB attribute value', () => {
  it('should return number set value', () => {
    expect(Attribute.parseNumberSet({ NS: ['123', '456'] })).toEqual(
      new Set([123, 456]),
    );
  });
});
