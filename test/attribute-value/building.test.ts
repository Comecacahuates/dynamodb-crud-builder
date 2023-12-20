import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { buildStringAttributeValue } from '../../src/attribute-value/building.js';

describe('Building string DynamoDB attribute value', () => {
  it('should build string attribute value', () => {
    const attributeValue: AttributeValue.SMember =
      buildStringAttributeValue('attribute-value');

    expect(attributeValue).toEqual({ S: 'attribute-value' });
  });
});
