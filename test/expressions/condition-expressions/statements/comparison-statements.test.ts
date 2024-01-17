import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildEqualToComparisonStatement,
  buildNotEqualToComparisonStatement,
  buildLessThanComparisonStatement,
  buildLessThanOrEqualToComparisonStatement,
  buildGreaterThanComparisonStatement,
  buildGreaterThanOrEqualToComparisonStatement,
  buildBetweenComparisonStatement,
  buildInComparisonStatement,
} from '../../../../src/expressions/condition-expressions/statements/comparison-statements.js';

describe('binary comparison statements', () => {
  describe('given operand A ":operandA" and operand B ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building `equal to` statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildEqualToComparisonStatement(operandA, operandB);
      });

      it('should return ":operandA = :operandB"', () => {
        expect(equalsStatement).toBe(':operandA = :operandB');
      });
    });

    describe('when building `not equal to` statement', () => {
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

    describe('when building `less than` statement', () => {
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

    describe('when building `less than or equal to` statement', () => {
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

    describe('when building `greater than` statement', () => {
      let greaterThanStatement: string;

      beforeEach(() => {
        greaterThanStatement = buildGreaterThanComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA > :operandB"', () => {
        expect(greaterThanStatement).toBe(':operandA > :operandB');
      });
    });

    describe('when building `greater than or equal to` statement', () => {
      let greaterThanOrEqualsStatement: string;

      beforeEach(() => {
        greaterThanOrEqualsStatement =
          buildGreaterThanOrEqualToComparisonStatement(operandA, operandB);
      });

      it('should return ":operandA >= :operandB"', () => {
        expect(greaterThanOrEqualsStatement).toBe(':operandA >= :operandB');
      });
    });
  });
});

describe('between', () => {
  describe('given operand ":operand", lower bound operand ":lowerBoundOperand", and upper bound operand ":upperBoundOperand"', () => {
    const operand = ':operand';
    const lowerBoundOperand = ':lowerBoundOperand';
    const upperBoundOperand = ':upperBoundOperand';

    describe('when building `between` statement', () => {
      let betweenStatement: string;

      beforeEach(() => {
        betweenStatement = buildBetweenComparisonStatement(
          operand,
          lowerBoundOperand,
          upperBoundOperand,
        );
      });

      it('should return ":operand BETWEEN :lowerBoundOperand AND :upperBoundOperand"', () => {
        expect(betweenStatement).toBe(
          ':operand BETWEEN :lowerBoundOperand AND :upperBoundOperand',
        );
      });
    });
  });
});

describe('in', () => {
  describe('given operand ":operand" and list [":item0", ":item1", "item2]', () => {
    const operand = ':operand';
    const items = [':item0', ':item1', ':item2'];

    describe('when building `in` statement', () => {
      let inStatement: string;

      beforeEach(() => {
        inStatement = buildInComparisonStatement(operand, items);
      });

      it('should return ":operand IN (:item0, :item1, :item2)"', () => {
        expect(inStatement).toBe(':operand IN (:item0, :item1, :item2)');
      });
    });
  });
});
