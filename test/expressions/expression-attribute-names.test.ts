import { describe, it, expect } from '@jest/globals';
import {
  buildExpressionAttributeNamePlaceholder,
  buildExpressionAttributeNames,
} from '../../src/expressions/expression-attribute-names.js';

describe('Building placeholder', () => {
  it('should return placeholder', () => {
    const placeholder = buildExpressionAttributeNamePlaceholder([
      'a',
      'b',
      'c',
    ]);

    expect(placeholder).toBe('#a.#b.#c');
  });

  it('should return placeholder with index', () => {
    const placeholder = buildExpressionAttributeNamePlaceholder(
      ['a', 'b', 'c'],
      1,
    );

    expect(placeholder).toBe('#a.#b.#c[1]');
  });
});

describe('Building expression attribute name', () => {
  it('should return expression attribute names from all parts of the path', () => {
    const fromAttributePath = buildExpressionAttributeNames(['a', 'b', 'c']);

    expect(fromAttributePath).toEqual({
      '#a': 'a',
      '#b': 'b',
      '#c': 'c',
    });
  });

  it('should return empty object for empty path', () => {
    const fromAttributePath = buildExpressionAttributeNames([]);

    expect(fromAttributePath).toEqual({});
  });
});
