import { describe, it, expect } from '@jest/globals';
import { ExpressionAttributeNames } from '../../src/expressions/index.js';

describe('Building placeholder', () => {
  it('should build placeholder', () => {
    const placeholder =
      ExpressionAttributeNames.buildPlaceholderFromAttributeName('id');

    expect(placeholder).toBe('#id');
  });
});

describe('Building from attribute name', () => {
  it('should return expression attribute name', () => {
    const fromAttributeName =
      ExpressionAttributeNames.buildFromAttributeName('id');

    expect(fromAttributeName).toEqual({ '#id': 'id' });
  });
});

describe('Building from attribute path', () => {
  it('should return expression attribute names from all parts of the path', () => {
    const fromAttributePath = ExpressionAttributeNames.buildFromAttributePath([
      'a',
      'b',
      'c',
    ]);

    expect(fromAttributePath).toEqual({
      '#a': 'a',
      '#b': 'b',
      '#c': 'c',
    });
  });

  it('should return empty object for empty path', () => {
    const fromAttributePath = ExpressionAttributeNames.buildFromAttributePath(
      [],
    );

    expect(fromAttributePath).toEqual({});
  });
});
