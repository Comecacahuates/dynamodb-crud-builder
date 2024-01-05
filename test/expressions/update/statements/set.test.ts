import { describe, it, expect } from '@jest/globals';
import { Set } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to set value', () => {
  describe('Setting attribute value', () => {
    it('should return statement string', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 1, 'c', 2]);

      expect(statement).toBe('#a.#b[1].#c[2] = :ab1c2');
    });

    it('should return statement string preventing overwrite', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 1, 'c', 2], {
        preventOverwriting: true,
      });

      expect(statement).toBe(
        '#a.#b[1].#c[2] = if_not_exists(#a.#b[1].#c[2], :ab1c2)',
      );
    });
  });
});

describe('Building statement to append item to list', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToAppendItemsToList(['a', 1, 'b', 2]);

    expect(statement).toBe('#a[1].#b[2] = list_append(#a[1].#b[2], :a1b2)');
  });
});

describe('Building statement to add number', () => {
  it('should return statement string for attribute value', () => {
    const statement = Set.buildStatementToAddNumber(['a', 1, 'b', 2]);

    expect(statement).toBe('#a[1].#b[2] = #a[1].#b[2] + :a1b2');
  });
});

describe('Building statement to subtract number', () => {
  it('should return statement string for attribute value', () => {
    const statement = Set.buildStatementToSubtractNumber(['a', 1, 'b', 2]);

    expect(statement).toBe('#a[1].#b[2] = #a[1].#b[2] - :a1b2');
  });
});
