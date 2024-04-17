import { describe, it, expect } from '@jest/globals';
import { Condition } from '../../../src/expressions/conditions/Condition.js';
import {
  AttributeValues,
  AttributeNames,
} from '../../../src/expressions/attributes/index.js';

describe('logical operations', () => {
  describe('given three conditions', () => {
    const conditionA = new Condition(
      '#a = :aa',
      new AttributeNames().add('#a', 'a'),
      new AttributeValues().add(':aa', 1),
    );
    const conditionB = new Condition(
      '#b <> :bb',
      new AttributeNames().add('#b', 'b'),
      new AttributeValues().add(':bb', 2),
    );
    const conditionC = new Condition(
      '#c < :cc',
      new AttributeNames().add('#c', 'c'),
      new AttributeValues().add(':cc', 3),
    );

    describe('when building conjunction', () => {
      const conjunction = conditionA.and(conditionB, conditionC);

      it('should return a new condition', () => {
        expect(conjunction).not.toBe(conditionA);
        expect(conjunction).not.toBe(conditionB);
        expect(conjunction).not.toBe(conditionC);
      });

      it('should have string expression', () => {
        expect(conjunction.getString()).toBe(
          '(#a = :aa AND #b <> :bb AND #c < :cc)',
        );
      });

      it('should have attribute names of all conditions', () => {
        expect(
          conjunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have attribute values of all conditions', () => {
        expect(
          conjunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
          ':cc': { N: '3' },
        });
      });
    });

    describe('when building disjunction', () => {
      const disjunction = conditionA.or(conditionB, conditionC);

      it('should return a new condition', () => {
        expect(disjunction).not.toBe(conditionA);
        expect(disjunction).not.toBe(conditionB);
        expect(disjunction).not.toBe(conditionC);
      });

      it('should have string expression', () => {
        expect(disjunction.getString()).toBe(
          '(#a = :aa OR #b <> :bb OR #c < :cc)',
        );
      });

      it('should have attribute names of all conditions', () => {
        expect(
          disjunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have attribute values of all conditions', () => {
        expect(
          disjunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
          ':cc': { N: '3' },
        });
      });
    });

    describe('when building negation', () => {
      const negation = conditionA.not();

      it('should return a new condition', () => {
        expect(negation).not.toBe(conditionA);
      });

      it('should have string expression', () => {
        expect(negation.getString()).toBe('(NOT #a = :aa)');
      });

      it('should have attribute names of all conditions', () => {
        expect(
          negation.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({ '#a': 'a' });
      });

      it('should have attribute values of all conditions', () => {
        expect(
          negation.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({ ':aa': { N: '1' } });
      });
    });
  });
});
