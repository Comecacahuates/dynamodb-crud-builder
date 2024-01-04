import { describe, it, expect } from '@jest/globals';
import { Remove } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to remove attribute', () => {
  it('should return statement string', () => {
    const statement = Remove.buildStatementToRemoveAttribute(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c');
  });
});

describe('Building statement to remove item from list', () => {
  it('should return statement string', () => {
    const statement = Remove.buildStatementToRemoveItemFromList(
      ['a', 'b', 'c'],
      1,
    );

    expect(statement).toBe('#a.#b.#c[1]');
  });
});
