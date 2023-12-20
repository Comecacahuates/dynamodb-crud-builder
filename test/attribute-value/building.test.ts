import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  buildString,
  buildNumber,
  buildBoolean,
  buildBinary,
  buildStringSet,
  buildNumberSet,
  buildBinarySet,
} from '../../src/attribute-value/building.js';

describe('Building string DynamoDB attribute value', () => {
  it('should build string attribute value', () => {
    const attributeValue: AttributeValue.SMember =
      buildString('attribute-value');

    expect(attributeValue).toEqual({ S: 'attribute-value' });
  });
});

describe('Building number DynamoDB attribute value', () => {
  it('should build number attribute value', () => {
    const attributeValue: AttributeValue.NMember = buildNumber(123);

    expect(attributeValue).toEqual({ N: '123' });
  });
});

describe('Building boolean DynamoDB attribute value', () => {
  it('should build boolean attribute value', () => {
    const attributeValue: AttributeValue.BOOLMember = buildBoolean(true);

    expect(attributeValue).toEqual({ BOOL: true });
  });
});

describe('Building binary DynamoDB attribute value', () => {
  it('should build binary attribute value', () => {
    const attributeValue: AttributeValue.BMember = buildBinary(
      new Uint8Array([1, 2, 3]),
    );

    expect(attributeValue).toEqual({ B: new Uint8Array([1, 2, 3]) });
  });
});

describe('Building string set DynamoDB attribute value', () => {
  it('should build string set attribute value', () => {
    const attributeValue: AttributeValue.SSMember = buildStringSet(
      new Set(['value1', 'value2']),
    );

    expect(attributeValue).toEqual({ SS: ['value1', 'value2'] });
  });
});

describe('Building number set DynamoDB attribute value', () => {
  it('should build number set attribute value', () => {
    const attributeValue: AttributeValue.NSMember = buildNumberSet(
      new Set([123, 456]),
    );

    expect(attributeValue).toEqual({ NS: ['123', '456'] });
  });
});

describe('Build binary set DynamoDB attribute value', () => {
  it('should build binary set attribute value', () => {
    const attributeValue: AttributeValue.BSMember = buildBinarySet(
      new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
    );

    expect(attributeValue).toEqual({
      BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
    });
  });
});
