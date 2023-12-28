import { describe, it, expect } from '@jest/globals';
import { Set } from '../../../../src/expressions/update/statements/index.js';

describe('Building assign value statement', () => {
  it('should return statement string with simple attribute path', () => {
    const statement = Set.buildAssignValueStatement(['id']);

    expect(statement).toBe('#id = :id');
  });

  it('should return statement string with nested attribute path', () => {
    const statement = Set.buildAssignValueStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c = :abc');
  });
});

describe('Building assign item of list statement', () => {
  it('should return statement string with simple attribute path', () => {
    const statement = Set.buildAssignItemOfList(['id'], 0);

    expect(statement).toBe('#id[0] = :id');
  });

  it('should return statement string with nested attribute path', () => {
    const statement = Set.buildAssignItemOfList(['a', 'b', 'c'], 1);

    expect(statement).toBe('#a.#b.#c[1] = :abc');
  });
});
