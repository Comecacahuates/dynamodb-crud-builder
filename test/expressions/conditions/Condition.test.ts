import { describe, it, expect, beforeEach } from '@jest/globals';
import { Condition } from '../../../src/expressions/conditions/Condition.js';

describe('and', () => {
  describe('given the conditions A and B', () => {
    const conditionA = new Condition('A');
    const conditionB = new Condition('B');

    describe('when building conjunction', () => {
      let conjunction: Condition;

      beforeEach(() => {
        conjunction = conditionA.and(conditionB);
      });

      it('should return new condition (A AND B)', () => {
        expect(conjunction).toEqual(new Condition('(A AND B)'));
      });
    });
  });

  describe('given the conditions A, B, C and D', () => {
    const conditionA = new Condition('A');
    const conditionB = new Condition('B');
    const conditionC = new Condition('C');
    const conditionD = new Condition('D');

    describe('when building conjunction', () => {
      let conjunction: Condition;

      beforeEach(() => {
        conjunction = conditionA.and(conditionB, conditionC, conditionD);
      });

      it('should return new condition (A AND B AND C AND D)', () => {
        expect(conjunction).toEqual(new Condition('(A AND B AND C AND D)'));
      });
    });
  });
});
