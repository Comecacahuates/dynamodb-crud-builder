import { describe, it, expect } from '@jest/globals';
import { buildAttributeEqualsAttributeStatement } from '../../../../src/expressions/condition-expressions/statements/comparison-statements.js';

describe('Building attribute equals attribute statement', () => {
  it('should return equals statement', () => {
    const actualStatement = buildAttributeEqualsAttributeStatement(
      [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ],
      [
        { attributeName: 'f' },
        { attributeName: 'g' },
        { attributeName: 'h', index: 3 },
        { attributeName: 'i' },
        { attributeName: 'j', index: 4 },
      ],
    );

    expect(actualStatement).toBe('#a.#b.#c[1].#d.#e[2] = #f.#g.#h[3].#i.#j[4]');
  });
});
