import { describe, it, expect } from '@jest/globals';
import { Delete } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to delete', () => {
  describe('Deleting from set attribute', () => {
    it('should return statement string', () => {
      const statement = Delete.buildStatementToDelete(['a', 'b', 'c']);

      expect(statement).toBe('#a.#b.#c :abc');
    });
  });

  describe('Deleting from set list item', () => {
    it('should return statement string', () => {
      const statement = Delete.buildStatementToDelete(['a', 'b', 'c'], 1);

      expect(statement).toBe('#a.#b.#c[1] :abc1');
    });
  });
});
