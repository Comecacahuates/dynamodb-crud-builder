import { describe, it, expect } from '@jest/globals';
import { Remove } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to remove attribute', () => {
  describe('Removing attribute', () => {
    it('should return statement string', () => {
      const statement = Remove.buildStatementToRemove([
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ]);

      expect(statement).toBe('#a.#b.#c[1].#d.#e[2]');
    });
  });
});
