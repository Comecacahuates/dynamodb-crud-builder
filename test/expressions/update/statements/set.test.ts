import { describe, it, expect } from '@jest/globals';
import { Set } from '../../../../src/expressions/update/statements/index.js';

describe('Building statement to set value', () => {
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

describe('Building statement to set value of a list item', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToSetValueOfListItem(
      ['a', 'b', 'c'],
      1,
    );

    expect(statement).toBe('#a.#b.#c[1] = :abc');
  });

  it('should return statement string preventing overwrite', () => {
    const statement = Set.buildStatementToSetValueOfListItem(
      ['a', 'b', 'c'],
      1,
      {
        preventOverwriting: true,
      },
    );

    expect(statement).toBe('#a.#b.#c[1] = if_not_exists(#a.#b.#c[1], :abc)');
  });
});

describe('Building statement to append item to list', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToAppendItemToList(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = list_append(#a.#b.#c, :abc)');
  });
});

describe('Building statement to add number', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToAddNumber(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = #a.#b.#c + :abc');
  });
});

describe('Building statement to subtract number', () => {
  it('should return statement string', () => {
    const statement = Set.buildStatementToSubtractNumber(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = #a.#b.#c - :abc');
  });
});
