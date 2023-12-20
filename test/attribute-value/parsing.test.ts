import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute-value/index.js';

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
