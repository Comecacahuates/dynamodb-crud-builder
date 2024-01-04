import { describe, it, expect } from '@jest/globals';
import { Delete } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to delete item from set', () => {
  it('should return statement string', () => {
    const statement = Delete.buildStatementToDeleteItemFromSet(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c :abc');
  });
});
