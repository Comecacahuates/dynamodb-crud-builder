import { describe, it, expect } from '@jest/globals';
import { Operand } from '../../../../src/expressions/operands/Operand.js';
import { Condition } from '../../../../src/expressions/conditions/Condition.js';

describe('comparisons', () => {
  describe('given operands opA and opB', () => {
    const opA = new Operand('opA');
    const opB = new Operand('opB');

    describe('when comparing equality', () => {
      const comparison = opA.equals(opB);

      it('should return a condition', () => {
        expect(comparison).toBeInstanceOf(Condition);
      });
    });
  });
});
