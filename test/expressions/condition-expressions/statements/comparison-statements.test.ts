import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildEqualToComparisonStatement,
  buildNotEqualToComparisonStatement,
  buildLessThanComparisonStatement,
  buildLessThanOrEqualToComparisonStatement,
} from '../../../../src/expressions/condition-expressions/statements/comparison-statements.js';

describe('equal to', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildEqualToComparisonStatement(operandA, operandB);
      });

      it('should return ":operandA = :operandB"', () => {
        expect(equalsStatement).toBe(':operandA = :operandB');
      });
    });
  });
});

describe('not equal to', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let notEqualsStatement: string;

      beforeEach(() => {
        notEqualsStatement = buildNotEqualToComparisonStatement(
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

describe('less than or equal to', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building the equals statement', () => {
      let lessThanOrEqualsStatement: string;

      beforeEach(() => {
        lessThanOrEqualsStatement = buildLessThanOrEqualToComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA <= :operandB"', () => {
        expect(lessThanOrEqualsStatement).toBe(':operandA <= :operandB');
      });
    });
  });
});
