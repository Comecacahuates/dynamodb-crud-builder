import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  buildStringAttributeValue,
  buildNumberAttributeValue,
  buildBooleanAttributeValue,
} from '../../src/attribute-value/building.js';

describe('Building string DynamoDB attribute value', () => {
  it('should build string attribute value', () => {
    const attributeValue: AttributeValue.SMember =
      buildStringAttributeValue('attribute-value');

    expect(attributeValue).toEqual({ S: 'attribute-value' });
  });
});

describe('Building number DynamoDB attribute value', () => {
  it('should build number attribute value', () => {
    const attributeValue: AttributeValue.NMember =
      buildNumberAttributeValue(123);

    expect(attributeValue).toEqual({ N: '123' });
  });
});

describe('Building boolean DynamoDB attribute value', () => {
  it('should build boolean attribute value', () => {
    const attributeValue: AttributeValue.BOOLMember =
      buildBooleanAttributeValue(true);

    expect(attributeValue).toEqual({ BOOL: true });
  });
});
