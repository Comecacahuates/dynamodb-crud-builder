import { describe, it, expect } from '@jest/globals';
import { buildAddStatement } from '../../../../src/expressions/update-expressions/statements/add-statements.js';

describe('Building add statement', () => {
  it('should return add statement', () => {
    const actualStatement = buildAddStatement([
      { attributeName: 'a' },
      { attributeName: 'b' },
      { attributeName: 'c', index: 1 },
      { attributeName: 'd' },
      { attributeName: 'e', index: 2 },
    ]);

    expect(actualStatement).toBe('#a.#b.#c[1].#d.#e[2] :abc1de2');
  });
});
