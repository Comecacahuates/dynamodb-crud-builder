import { describe, it, expect } from '@jest/globals';
import { Remove } from '../../../../src/expressions/update/statements/index.js';

describe('Building remove attribute statement', () => {
  it('should return statement string', () => {
    const statement = Remove.buildRemoveAttributeStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c');
  });
});

describe('Building remove item from list statement', () => {
  it('should return statement string', () => {
    const statement = Remove.buildRemoveItemFromListStatement(
      ['a', 'b', 'c'],
      1,
    );

    expect(statement).toBe('#a.#b.#c[1]');
  });
});
