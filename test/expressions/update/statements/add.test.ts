import { describe, it, expect } from '@jest/globals';
import { Add } from '../../../../src/expressions/update/statements/index.js';

describe('Building add  statement', () => {
  it('should return statement string', () => {
    const statement = Add.buildAddStatement(['a', 'b', 'c']);

    expect(statement).toBe('#a.#b.#c :abc');
  });
});
