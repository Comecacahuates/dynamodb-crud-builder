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
    const placeholder = buildExpressionAttributeValuePlaceholder(
      ['a', 'b', 'c'],
      1,
    );

    expect(placeholder).toBe(':abc1');
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
});
