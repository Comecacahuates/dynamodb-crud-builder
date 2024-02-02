import { describe, it, expect } from '@jest/globals';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../src/expressions/Expression.js';

describe('creating expression', () => {
  describe('given an expression string, attribute names and attribute values', () => {
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

      it('should expose its attribute names', () => {
        expect(expression.getAttributeNames()).toEqual({
          '#a': 'attribute',
          '#b': 'value',
        });
      });

      it('should expose its attribute values', () => {
        expect(expression.getAttributeValues()).toEqual({
          ':c': { S: 'c-value' },
        });
      });
    });
  });
});

describe('merging attribute names', () => {
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

    describe('when merging their attribute names', () => {
      const mergedExpressionAttributeNames = expressionA.mergeAttributeNames(
        expressionB,
        expressionC,
      );

      it('should return the merged attribute names', () => {
        expect(mergedExpressionAttributeNames).toEqual({
          '#a': 'attribute',
          '#b': 'attribute',
          '#c': 'attribute',
        });
      });

      it('should return a new object', () => {
        expect(mergedExpressionAttributeNames).not.toBe(
          expressionA.getAttributeNames(),
        );
        expect(mergedExpressionAttributeNames).not.toBe(
          expressionB.getAttributeNames(),
        );
        expect(mergedExpressionAttributeNames).not.toBe(
          expressionC.getAttributeNames(),
        );
      });
    });
  });
});

describe('merging attribute values', () => {
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

    describe('when merging their attribute values', () => {
      const mergedExpressionAttributeValues = expressionA.mergeAttributeValues(
        expressionB,
        expressionC,
      );

      it('should return the merged attribute values', () => {
        expect(mergedExpressionAttributeValues).toEqual({
          ':a': { S: 'a-value' },
          ':b': { S: 'b-value' },
          ':c': { S: 'c-value' },
        });
      });

      it('should return a new object', () => {
        expect(mergedExpressionAttributeValues).not.toBe(
          expressionA.getAttributeValues(),
        );
        expect(mergedExpressionAttributeValues).not.toBe(
          expressionB.getAttributeValues(),
        );
        expect(mergedExpressionAttributeValues).not.toBe(
          expressionC.getAttributeValues(),
        );
      });
    });
  });
});
