import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildEqualsComparisonStatement,
  buildNotEqualsComparisonStatement,
  buildLessThanComparisonStatement,
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
      let notEqualsStatement: string;

      beforeEach(() => {
        notEqualsStatement = buildNotEqualsComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA <> :operandB"', () => {
        expect(notEqualsStatement).toBe(':operandA <> :operandB');
      });
    });
  });
});

describe('less than', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let lessThanStatement: string;

      beforeEach(() => {
        lessThanStatement = buildLessThanComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA < :operandB"', () => {
        expect(lessThanStatement).toBe(':operandA < :operandB');
      });
    });
  });
});
