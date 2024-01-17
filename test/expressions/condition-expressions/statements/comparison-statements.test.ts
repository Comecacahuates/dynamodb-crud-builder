import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildEqualsComparisonStatement,
  buildNotEqualsComparisonStatement,
} from '../../../../src/expressions/condition-expressions/statements/comparison-statements.js';

describe('equals', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildEqualsComparisonStatement(operandA, operandB);
      });

      it('should return ":operandA = :operandB"', () => {
        expect(equalsStatement).toBe(':operandA = :operandB');
      });
    });
  });
});

describe('not equals', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildNotEqualsComparisonStatement(operandA, operandB);
      });

      it('should return ":operandA <> :operandB"', () => {
        expect(equalsStatement).toBe(':operandA <> :operandB');
      });
    });
  });
});
