import { describe, it, expect } from '@jest/globals';
import { Operand } from '../../../src/expressions/operands/Operand.js';
import { ConditionExpression } from '../../../src/expressions/conditions/ConditionExpression.js';
import {
  AttributeNames,
  AttributeValues,
} from '../../../src/expressions/attributes/index.js';

describe('arithmetic expressions', () => {
  describe('given two operands', () => {
    const operandA = new Operand('#a', new AttributeNames().add('#a', 'a')),
      operandB = new Operand(
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

      it('should have attribute names', () => {
        expect(sum.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        expect(sum.getAttributeValues().toExpressionAttributeValues()).toEqual({
          ':b': { N: '10' },
        });
      });
    });

    describe('when building subtraction expression', () => {
      const subtraction = operandA.minus(operandB);

      it('should return a new operand', () => {
        expect(subtraction).toBeInstanceOf(Operand);
        expect(subtraction).not.toBe(operandA);
        expect(subtraction).not.toBe(operandB);
      });

      it('should have string expression', () => {
        expect(subtraction.getString()).toBe('#a - :b');
      });

      it('should have attribute names', () => {
        expect(
          subtraction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        expect(
          subtraction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':b': { N: '10' },
        });
      });
    });
  });

  describe('given an operand and a literal value', () => {
    const operand = new Operand('#a', new AttributeNames().add('#a', 'a')),
      value = 10;

    describe('when building sum expression', () => {
      const sum = operand.plus(value);

      it('should return a new operand', () => {
        expect(sum).toBeInstanceOf(Operand);
        expect(sum).not.toBe(operand);
      });

      it('should have string expression', () => {
        expect(sum.getString()).toMatch(/#a \+ :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(sum.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = sum
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building subtraction expression', () => {
      const subtraction = operand.minus(value);

      it('should return a new operand', () => {
        expect(subtraction).toBeInstanceOf(Operand);
        expect(subtraction).not.toBe(operand);
      });

      it('should have string expression', () => {
        expect(subtraction.getString()).toMatch(/#a - :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          subtraction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = subtraction
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });
  });
});

describe('condition expressions', () => {
  describe('given three operands', () => {
    const operandA = new Operand('#a', new AttributeNames().add('#a', 'a')),
      operandB = new Operand(
        ':b',
        undefined,
        new AttributeValues().add(':b', 10),
      ),
      operandC = new Operand(
        ':c',
        undefined,
        new AttributeValues().add(':c', 20),
      );

    describe('when building equality expression', () => {
      const equality = operandA.equalTo(operandB);

      it('should return a condition expression', () => {
        expect(equality).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(inequality).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(lessThan).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(lessThanOrEqualTo).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(greaterThan).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(greaterThanOrEqualTo).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(between).toBeInstanceOf(ConditionExpression);
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

      it('should return a condition expression', () => {
        expect(_in).toBeInstanceOf(ConditionExpression);
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

  describe('given an operand and two literal values', () => {
    const operand = new Operand('#a', new AttributeNames().add('#a', 'a')),
      valueA = 10,
      valueB = 20;

    describe('when building equality expression', () => {
      const equality = operand.equalTo(valueA);

      it('should return a condition expression', () => {
        expect(equality).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(equality.getString()).toMatch(/#a = :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          equality.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = equality
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building inequality expression', () => {
      const inequality = operand.notEqualTo(valueA);

      it('should return a condition expression', () => {
        expect(inequality).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(inequality.getString()).toMatch(/#a <> :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          inequality.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = inequality
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building less than expression', () => {
      const lessThan = operand.lessThan(valueA);

      it('should return a condition expression', () => {
        expect(lessThan).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(lessThan.getString()).toMatch(/#a < :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          lessThan.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = lessThan
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building less than or equal to expression', () => {
      const lessThanOrEqualTo = operand.lessThanOrEqualTo(valueA);

      it('should return a condition expression', () => {
        expect(lessThanOrEqualTo).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(lessThanOrEqualTo.getString()).toMatch(/#a <= :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          lessThanOrEqualTo.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = lessThanOrEqualTo
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building greater than expression', () => {
      const greaterThan = operand.greaterThan(valueA);

      it('should return a condition expression', () => {
        expect(greaterThan).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(greaterThan.getString()).toMatch(/#a > :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          greaterThan.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = greaterThan
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building greater than or equal to expression', () => {
      const greaterThanOrEqualTo = operand.greaterThanOrEqualTo(valueA);

      it('should return a condition expression', () => {
        expect(greaterThanOrEqualTo).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(greaterThanOrEqualTo.getString()).toMatch(
          /#a >= :literal\w{10}/,
        );
      });

      it('should have attribute names', () => {
        expect(
          greaterThanOrEqualTo.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = greaterThanOrEqualTo
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building between expression', () => {
      const between = operand.between(valueA, valueB);

      it('should return a condition expression', () => {
        expect(between).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(between.getString()).toMatch(
          /#a BETWEEN :literal\w{10} AND :literal\w{10}/,
        );
      });

      it('should have attribute names', () => {
        expect(
          between.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = between
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(2);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(keys[1]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(2);
        expect(values[0]).toEqual({ N: '10' });
        expect(values[1]).toEqual({ N: '20' });
      });
    });

    describe('when building in expression', () => {
      const _in = operand.in([valueA, valueB]);

      it('should return a condition expression', () => {
        expect(_in).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(_in.getString()).toMatch(
          /#a IN \(:literal\w{10}, :literal\w{10}\)/,
        );
      });

      it('should have attribute names', () => {
        expect(_in.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = _in
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(2);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(keys[1]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(2);
        expect(values[0]).toEqual({ N: '10' });
        expect(values[1]).toEqual({ N: '20' });
      });
    });
  });

  describe('given two operands and a literal value', () => {
    const operandA = new Operand('#a', new AttributeNames().add('#a', 'a')),
      operandB = new Operand('#b', new AttributeNames().add('#b', 'b')),
      value = 10;

    describe('when building between expression', () => {
      const between = operandA.between(operandB, value);

      it('should return a condition expression', () => {
        expect(between).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(between.getString()).toMatch(/#a BETWEEN #b AND :literal\w{10}/);
      });

      it('should have attribute names', () => {
        expect(
          between.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = between
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building in expression', () => {
      const _in = operandA.in([operandB, value]);

      it('should return a condition expression', () => {
        expect(_in).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(_in.getString()).toMatch(/#a IN \(#b, :literal\w{10}\)/);
      });

      it('should have attribute names', () => {
        expect(_in.getAttributeNames().toExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = _in
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when building contains expression', () => {
      const contains = operandA.contains(value);

      it('should return a condition expression', () => {
        expect(contains).toBeInstanceOf(ConditionExpression);
      });

      it('should have string expression', () => {
        expect(contains.getString()).toMatch(/contains\(#a, :literal\w{10}\)/);
      });

      it('should have attribute names', () => {
        expect(
          contains.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = contains
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys.length).toBe(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values.length).toBe(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });
  });
});
