import { describe, it, expect, beforeEach } from '@jest/globals';
import { isOperandLiteral } from '../../src/expressions/operands.js';
import { type Operand } from '../../src/expressions/types.js';

describe('check if operand is literal', () => {
  describe('given operand is the name of a literal "literal"', () => {
    const operand: Operand = 'literal';

    describe('when checking if operand is literal', () => {
      let isLiteral: boolean;

      beforeEach(() => {
        isLiteral = isOperandLiteral(operand);
      });

      it('should return true', () => {
        expect(isLiteral).toBe(true);
      });
    });
  });

  describe('given operand is the document path a[1].b.c[2]', () => {
    const operand: Operand = [
      { attributeName: 'a', index: 1 },
      { attributeName: 'b' },
      { attributeName: 'c', index: 2 },
    ];

    describe('when checking if operand is literal', () => {
      let isLiteral: boolean;

      beforeEach(() => {
        isLiteral = isOperandLiteral(operand);
      });

      it('should return false', () => {
        expect(isLiteral).toBe(false);
      });
    });
  });
});
