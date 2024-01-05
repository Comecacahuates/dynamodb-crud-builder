import { describe, it, expect } from '@jest/globals';
import {
  buildExpressionAttributeValuePlaceholder,
  buildExpressionAttributeValue,
} from '../../src/expressions/expression-attribute-values.js';

describe('Building placeholder', () => {
  it('should return placeholder', () => {
    const placeholder = buildExpressionAttributeValuePlaceholder([
      'a',
      'b',
      'c',
    ]);

    expect(placeholder).toBe(':abc');
  });

  it('should return placeholder with index', () => {
    const placeholder = buildExpressionAttributeValuePlaceholder([
      'a',
      'b',
      'c',
      1,
      'd',
      'e',
      2,
    ]);

    expect(placeholder).toBe(':abc1de2');
  });
});

describe('Building expression attribute value', () => {
  it('should return expression attribute value', () => {
    const fromAttributePathAndValue = buildExpressionAttributeValue(
      ['a', 'b', 'c'],
      { S: 'id' },
    );

    expect(fromAttributePathAndValue).toEqual({
      ':abc': { S: 'id' },
    });
  });

  it('should return expression attribute value with index', () => {
    const fromAttributePathAndValue = buildExpressionAttributeValue(
      ['a', 'b', 'c', 1, 'd', 'e', 2],
      { S: 'id' },
    );

    expect(fromAttributePathAndValue).toEqual({
      ':abc1de2': { S: 'id' },
    });
  });
});
