import { describe, it, expect } from '@jest/globals';
import { Delete } from '../../../../src/expressions/update/statements/index.js';

describe('Building delete statement', () => {
  it('should return statement string', () => {
    const statement = Delete.buildDeleteStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c :abc');
  });
});
