import { describe, it, expect } from '@jest/globals';
import { Set } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to set value', () => {
  describe('Setting attribute value', () => {
    it('should return statement string', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 'c']);

      expect(statement).toBe('#a.#b.#c = :abc');
    });

    it('should return statement string preventing overwrite', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 'c'], {
        preventOverwriting: true,
      });

      expect(statement).toBe('#a.#b.#c = if_not_exists(#a.#b.#c, :abc)');
    });
  });

  describe('Setting value of list item', () => {
    it('should return statement string', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 'c'], 1);

      expect(statement).toBe('#a.#b.#c[1] = :abc1');
    });

    it('should return statement string preventing overwrite', () => {
      const statement = Set.buildStatementToSetValue(['a', 'b', 'c'], 1, {
        preventOverwriting: true,
      });

      expect(statement).toBe('#a.#b.#c[1] = if_not_exists(#a.#b.#c[1], :abc1)');
    });
  });
});

describe('Building statement to append item to list', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToAppendItemsToList(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = list_append(#a.#b.#c, :abc)');
  });
});

describe('Building statement to add number', () => {
  it('should return statement string for attribute value', () => {
    const statement = Set.buildStatementToAddNumber(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = #a.#b.#c + :abc');
  });

  it('should return statement string for list item', () => {
    const statement = Set.buildStatementToAddNumber(['a', 'b', 'c'], 1);

    expect(statement).toBe('#a.#b.#c[1] = #a.#b.#c[1] + :abc1');
  });
});

describe('Building statement to subtract number', () => {
  it('should return statement string for attribute value', () => {
    const statement = Set.buildStatementToSubtractNumber(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = #a.#b.#c - :abc');
  });


  it('should return statement string for list item', () => {
    const statement = Set.buildStatementToSubtractNumber(['a', 'b', 'c'], 1);

    expect(statement).toBe('#a.#b.#c[1] = #a.#b.#c[1] - :abc1');
  });
});
