import { describe, it, expect } from '@jest/globals';
import { Set } from '../../../../src/expressions/update/statements/index.js';

describe('Building value with overwrite prevention', () => {
  it('should return statement string', () => {
    const statement = Set.buildValueWithOverwritePrevention('#a.#b.#c', ':abc');

    expect(statement).toBe('if_not_exists(#a.#b.#c, :abc)');
  });
});

describe('Building assign value statement', () => {
  it('should return statement string', () => {
    const statement = Set.buildAssignValueStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = :abc');
  });

  it('should return statement string preventing overwrite', () => {
    const statement = Set.buildAssignValueStatement(['a', 'b', 'c'], {
      preventOverwriting: true,
    });

    expect(statement).toBe('#a.#b.#c = if_not_exists(#a.#b.#c, :abc)');
  });
});

describe('Building assign item of list statement', () => {
  it('should return statement string', () => {
    const statement = Set.buildAssignItemOfListStatement(['a', 'b', 'c'], 1);

    expect(statement).toBe('#a.#b.#c[1] = :abc');
  });
});

describe('Building append item to list statement', () => {
  it('should return statement string', () => {
    const statement = Set.buildAppendItemToListStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = list_append(#a.#b.#c, :abc)');
  });
});

describe('Building add value statement', () => {
  it('should return statement string', () => {
    const statement = Set.buildAddValueStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = #a.#b.#c + :abc');
  });
});
