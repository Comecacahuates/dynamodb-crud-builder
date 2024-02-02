import { describe, it, expect } from '@jest/globals';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../src/expressions/Expression.js';

describe('creating expression', () => {
  describe('given an expression string, expression attribute names and expression attribute values', () => {
    const expressionString = '#a.#b = :c';
    const expressionAttributeNames: ExpressionAttributeNames = {
      '#a': 'attribute',
      '#b': 'value',
    };
    const expressionAttributeValues: ExpressionAttributeValues = {
      ':c': { S: 'c-value' },
    };

    describe('when creating the expression', () => {
      const expression = new Expression(
        expressionString,
        expressionAttributeNames,
        expressionAttributeValues,
      );

      it('should expose its expression string', () => {
        expect(expression.getExpressionString()).toBe('#a.#b = :c');
      });

      it('should expose its expression attribute names', () => {
        expect(expression.getExpressionAttributeNames()).toEqual({
          '#a': 'attribute',
          '#b': 'value',
        });
      });

      it('should expose its expression attribute values', () => {
        expect(expression.getExpressionAttributeValues()).toEqual({
          ':c': { S: 'c-value' },
        });
      });
    });
  });
});

describe('merging expression attribute names', () => {
  describe('given three expressions', () => {
    const expressionA = new Expression(
      '#a = :a',
      { '#a': 'attribute' },
      { ':a': { S: 'a-value' } },
    );
    const expressionB = new Expression(
      '#b = :b',
      { '#b': 'attribute' },
      { ':b': { S: 'b-value' } },
    );
    const expressionC = new Expression(
      '#c = :c',
      { '#c': 'attribute' },
      { ':c': { S: 'c-value' } },
    );

    describe('when merging their expression attribute names', () => {
      const mergedExpressionAttributeNames =
        expressionA.mergeExpressionAttributeNames(expressionB, expressionC);

      it('should return the merged expression attribute names', () => {
        expect(mergedExpressionAttributeNames).toEqual({
          '#a': 'attribute',
          '#b': 'attribute',
          '#c': 'attribute',
        });
      });
    });
  });
});
