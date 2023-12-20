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
