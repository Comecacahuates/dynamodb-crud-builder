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

describe('comparison statements', () => {
  describe('given operand ":operandA" and ":operandB"', () => {
    const operandA = ':operandA';
    const operandB = ':operandB';

    describe('when building `equal to` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildEqualToComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA = :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA = :operandB');
      });
    });

    describe('when building `not equal to` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildNotEqualToComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA <> :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA <> :operandB');
      });
    });

    describe('when building `less than` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildLessThanComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA < :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA < :operandB');
      });
    });

    describe('when building `less than or equal to` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildLessThanOrEqualToComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA <= :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA <= :operandB');
      });
    });

    describe('when building `greater than` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildGreaterThanComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA > :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA > :operandB');
      });
    });

    describe('when building `greater than or equal to` comparison statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildGreaterThanOrEqualToComparisonStatement(
          operandA,
          operandB,
        );
      });

      it('should return ":operandA >= :operandB"', () => {
        expect(comparisonStatement).toBe(':operandA >= :operandB');
      });
    });
  });

  describe('given operands ":operand", ":lowerBoundOperand" and ":upperBoundOperand"', () => {
    const operand = ':operand';
    const lowerBoundOperand = ':lowerBoundOperand';
    const upperBoundOperand = ':upperBoundOperand';

    describe('when building `between` statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildBetweenComparisonStatement(
          operand,
          lowerBoundOperand,
          upperBoundOperand,
        );
      });

      it('should return ":operand BETWEEN :lowerBoundOperand AND :upperBoundOperand"', () => {
        expect(comparisonStatement).toBe(
          ':operand BETWEEN :lowerBoundOperand AND :upperBoundOperand',
        );
      });
    });
  });

  describe('given operand ":operand" and list [":item0", ":item1", "item2]', () => {
    const operand = ':operand';
    const items = [':item0', ':item1', ':item2'];

    describe('when building `in` statement', () => {
      let comparisonStatement: string;

      beforeEach(() => {
        comparisonStatement = buildInComparisonStatement(operand, items);
      });

      it('should return ":operand IN (:item0, :item1, :item2)"', () => {
        expect(comparisonStatement).toBe(
          ':operand IN (:item0, :item1, :item2)',
        );
      });
    });
  });
});
