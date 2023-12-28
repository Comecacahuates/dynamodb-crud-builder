import { describe, it, expect } from '@jest/globals';
import { ExpressionAttributeValues } from '../../src/expressions/index.js';

describe('Building placeholder', () => {
  it('should build placeholder', () => {
    const placeholder = ExpressionAttributeValues.buildPlaceholder('id');

    expect(placeholder).toBe(':id');
  });
});

describe('Building from attribute name and value', () => {
  it('should return expression attribute value', () => {
    const fromAttributeNameAndValue =
      ExpressionAttributeValues.buildFromAttributeNameAndValue('id', {
        S: 'id',
      });

    expect(fromAttributeNameAndValue).toEqual({
      ':id': { S: 'id' },
    });
  });
});

describe('Building from attribute path and value', () => {
  it('should return expression attribute value', () => {
    const fromAttributePathAndValue =
      ExpressionAttributeValues.buildFromAttributePathAndValue(
        ['a', 'b', 'c'],
        { S: 'id' },
      );

    expect(fromAttributePathAndValue).toEqual({
      ':abc': { S: 'id' },
    });
  });
});
