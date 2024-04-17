import { describe, it, expect } from '@jest/globals';
import { Operand } from '../../../src/expressions/operands/Operand.js';
import { Condition } from '../../../src/expressions/conditions/Condition.js';
import {
  AttributeNames,
  AttributeValues,
} from '../../../src/expressions/attributes/index.js';

describe('arithmetic expressions', () => {
  describe('given two operands', () => {
    const operandA = new Operand('#a', new AttributeNames().add('#a', 'a'));
    const operandB = new Operand(
      ':b',
      undefined,
      new AttributeValues().add(':b', 10),
    );

    describe('when building sum expression', () => {
      const sum = operandA.plus(operandB);

      it('should return a new operand', () => {
        expect(sum).toBeInstanceOf(Operand);
        expect(sum).not.toBe(operandA);
        expect(sum).not.toBe(operandB);
      });

      it('should have string expression', () => {
        expect(sum.getString()).toBe('#a + :b');
      });

      it('should have attribute names of both operands', () => {
        expect(sum.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(sum.getAttributeValues().toExpressionAttributeValues()).toEqual({
          ':b': { N: '10' },
        });
      });
    });

    describe('when building subtraction expression', () => {
      const sub = operandA.minus(operandB);

      it('should return a new operand', () => {
        expect(sub).toBeInstanceOf(Operand);
        expect(sub).not.toBe(operandA);
        expect(sub).not.toBe(operandB);
      });

      it('should have string expression', () => {
        expect(sub.getString()).toBe('#a - :b');
      });

      it('should have attribute names of both operands', () => {
        expect(sub.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(sub.getAttributeValues().toExpressionAttributeValues()).toEqual({
          ':b': { N: '10' },
        });
      });
    });
  });
});

describe('comparisson expressions', () => {
  describe('given three operands', () => {
    const operandA = new Operand('#a', new AttributeNames().add('#a', 'a'));
    const operandB = new Operand(
      ':b',
      undefined,
      new AttributeValues().add(':b', 10),
    );
    const operandC = new Operand(
      ':c',
      undefined,
      new AttributeValues().add(':c', 20),
    );

    describe('when building equality expression', () => {
      const equality = operandA.equalTo(operandB);

      it('should return a condition', () => {
        expect(equality).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(equality.getString()).toBe('#a = :b');
      });

      it('should have attribute names of both operands', () => {
        expect(
          equality.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          equality.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':b': { N: '10' },
        });
      });
    });

    describe('when building inequality expression', () => {
      const inequality = operandA.notEqualTo(operandC);

      it('should return a condition', () => {
        expect(inequality).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(inequality.getString()).toBe('#a <> :c');
      });

      it('should have attribute names of both operands', () => {
        expect(
          inequality.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          inequality.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':c': { N: '20' },
        });
      });
    });

    describe('when building less than expression', () => {
      const lessThan = operandA.lessThan(operandC);

      it('should return a condition', () => {
        expect(lessThan).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(lessThan.getString()).toBe('#a < :c');
      });

      it('should have attribute names of both operands', () => {
        expect(
          lessThan.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          lessThan.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':c': { N: '20' },
        });
      });
    });

    describe('when building less than or equal to expression', () => {
      const lessThanOrEqualTo = operandA.lessThanOrEqualTo(operandC);

      it('should return a condition', () => {
        expect(lessThanOrEqualTo).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(lessThanOrEqualTo.getString()).toBe('#a <= :c');
      });

      it('should have attribute names of both operands', () => {
        expect(
          lessThanOrEqualTo.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          lessThanOrEqualTo.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':c': { N: '20' },
        });
      });
    });

    describe('when building greater than expression', () => {
      const greaterThan = operandA.greaterThan(operandC);

      it('should return a condition', () => {
        expect(greaterThan).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(greaterThan.getString()).toBe('#a > :c');
      });

      it('should have attribute names of both operands', () => {
        expect(
          greaterThan.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          greaterThan.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':c': { N: '20' },
        });
      });
    });

    describe('when building greater than or equal to expression', () => {
      const greaterThanOrEqualTo = operandA.greaterThanOrEqualTo(operandC);

      it('should return a condition', () => {
        expect(greaterThanOrEqualTo).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(greaterThanOrEqualTo.getString()).toBe('#a >= :c');
      });

      it('should have attribute names of both operands', () => {
        expect(
          greaterThanOrEqualTo.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of both operands', () => {
        expect(
          greaterThanOrEqualTo
            .getAttributeValues()
            .toExpressionAttributeValues(),
        ).toEqual({
          ':c': { N: '20' },
        });
      });
    });

    describe('when building between expression', () => {
      const between = operandA.between(operandB, operandC);

      it('should return a condition', () => {
        expect(between).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(between.getString()).toBe('#a BETWEEN :b AND :c');
      });

      it('should have attribute names of all operands', () => {
        expect(
          between.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of all operands', () => {
        expect(
          between.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':b': { N: '10' },
          ':c': { N: '20' },
        });
      });
    });

    describe('when building in expression', () => {
      const _in = operandA.in([operandB, operandC]);

      it('should return a condition', () => {
        expect(_in).toBeInstanceOf(Condition);
      });

      it('should have string expression', () => {
        expect(_in.getString()).toBe('#a IN (:b, :c)');
      });

      it('should have attribute names of both operands', () => {
        expect(_in.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values of all operands', () => {
        expect(_in.getAttributeValues().toExpressionAttributeValues()).toEqual({
          ':b': { N: '10' },
          ':c': { N: '20' },
        });
      });
    });
  });
});
