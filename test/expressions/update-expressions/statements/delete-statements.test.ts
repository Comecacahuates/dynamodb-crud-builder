import { describe, it, expect } from '@jest/globals';
import { Delete } from '../../../../src/expressions/update-expressions/statements/index.js';

describe('Building statement to delete', () => {
  describe('Deleting from set attribute', () => {
    it('should return statement string', () => {
      const statement = Delete.buildStatementToDelete([
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ]);

      expect(statement).toBe('#a.#b.#c[1].#d.#e[2] :abc1de2');
    });
  });
});
