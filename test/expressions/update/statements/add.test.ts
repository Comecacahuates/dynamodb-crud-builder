import { describe, it, expect } from '@jest/globals';
import { Add } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to add', () => {
  it('should return statement string', () => {
    const statement = Add.buildStatementToAdd([
      { attributeName: 'a' },
      { attributeName: 'b' },
      { attributeName: 'c', index: 1 },
      { attributeName: 'd' },
      { attributeName: 'e', index: 2 },
    ]);

    expect(statement).toBe('#a.#b.#c[1].#d.#e[2] :abc1de2');
  });
});
