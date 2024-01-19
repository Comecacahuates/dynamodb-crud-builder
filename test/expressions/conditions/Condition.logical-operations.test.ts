import { describe, it, expect, beforeEach } from '@jest/globals';
import { Condition } from '../../../src/expressions/conditions/Condition.js';

describe('conjunction', () => {
  describe('given the conditions A and B', () => {
    const conditionA = new Condition('A', { '#a': 'a' }, { ':aa': { N: '1' } });
    const conditionB = new Condition('B', { '#b': 'b' }, { ':bb': { N: '2' } });

    describe('when building conjunction', () => {
      let conjunction: Condition;

      beforeEach(() => {
        conjunction = conditionA.and(conditionB);
      });

      it('should return a new condition', () => {
        expect(conjunction).not.toBe(conditionA);
      });

      it('should return new condition with symbolic value (A AND B)', () => {
        expect(conjunction.symbolicValue).toBe('(A AND B)');
      });

      it('should return a new condition with expression attribute names of all conditions', () => {
        expect(conjunction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should return a new condition with expression attribute values of all conditions', () => {
        expect(conjunction.expressionAttributeValues).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
        });
      });
    });
  });

  describe('given the conditions A, B, C and D', () => {
    const conditionA = new Condition('A', { '#a': 'a' }, { ':aa': { N: '1' } });
    const conditionB = new Condition('B', { '#b': 'b' }, { ':bb': { N: '2' } });
    const conditionC = new Condition('C', { '#c': 'c' }, { ':cc': { N: '3' } });
    const conditionD = new Condition('D', { '#d': 'd' }, { ':dd': { N: '4' } });

    describe('when building conjunction', () => {
      let conjunction: Condition;

      beforeEach(() => {
        conjunction = conditionA.and(conditionB, conditionC, conditionD);
      });

      it('should return a new condition', () => {
        expect(conjunction).not.toBe(conditionA);
      });

      it('should return a new condition with symbolic value (A AND B AND C AND D)', () => {
        expect(conjunction.symbolicValue).toBe('(A AND B AND C AND D)');
      });

      it('should return a new with expression attribute names of all conditions', () => {
        expect(conjunction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
        });
      });

      it('should return a new with expression attribute values of all conditions', () => {
        expect(conjunction.expressionAttributeValues).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
          ':cc': { N: '3' },
          ':dd': { N: '4' },
        });
      });
    });
  });
});

describe('disjunction', () => {
  describe('given the conditions A and B', () => {
    const conditionA = new Condition('A', { '#a': 'a' }, { ':aa': { N: '1' } });
    const conditionB = new Condition('B', { '#b': 'b' }, { ':bb': { N: '2' } });

    describe('when building disjunction', () => {
      let disjunction: Condition;

      beforeEach(() => {
        disjunction = conditionA.or(conditionB);
      });

      it('should return a new condition', () => {
        expect(disjunction).not.toBe(conditionA);
      });

      it('should return a new condition with symbolic value (A OR B)', () => {
        expect(disjunction.symbolicValue).toBe('(A OR B)');
      });

      it('should return a new condition with expression attribute names of all conditions', () => {
        expect(disjunction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should return a new condition with expression attribute values of all conditions', () => {
        expect(disjunction.expressionAttributeValues).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
        });
      });
    });
  });

  describe('given the conditions A, B, C and D', () => {
    const conditionA = new Condition('A', { '#a': 'a' }, { ':aa': { N: '1' } });
    const conditionB = new Condition('B', { '#b': 'b' }, { ':bb': { N: '2' } });
    const conditionC = new Condition('C', { '#c': 'c' }, { ':cc': { N: '3' } });
    const conditionD = new Condition('D', { '#d': 'd' }, { ':dd': { N: '4' } });

    describe('when building disjunction', () => {
      let disjunction: Condition;

      beforeEach(() => {
        disjunction = conditionA.or(conditionB, conditionC, conditionD);
      });

      it('should return a new condition', () => {
        expect(disjunction).not.toBe(conditionA);
      });

      it('should return new condition with symbolic value (A OR B OR C OR D)', () => {
        expect(disjunction.symbolicValue).toBe('(A OR B OR C OR D)');
      });

      it('should return a new condition with expression attribute names of all conditions of all conditions', () => {
        expect(disjunction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
        });
      });

      it('should return a new condition with expression attribute values of all conditions of all conditions', () => {
        expect(disjunction.expressionAttributeValues).toEqual({
          ':aa': { N: '1' },
          ':bb': { N: '2' },
          ':cc': { N: '3' },
          ':dd': { N: '4' },
        });
      });
    });
  });
});

describe('negation', () => {
  describe('given the condition A', () => {
    const conditionA = new Condition('A', { '#a': 'a' }, { ':aa': { N: '1' } });

    describe('when building negation', () => {
      let negation: Condition;

      beforeEach(() => {
        negation = conditionA.not();
      });

      it('should return a new condition', () => {
        expect(negation).not.toBe(conditionA);
      });

      it('should return new condition with symbolic value (NOT A)', () => {
        expect(negation.symbolicValue).toBe('(NOT A)');
      });

      it('should return a new condition with expression attribute names of all conditions', () => {
        expect(negation.expressionAttributeNames).toEqual({
          '#a': 'a',
        });
      });

      it('should return a new condition with expression attribute values of all conditions', () => {
        expect(negation.expressionAttributeValues).toEqual({
          ':aa': { N: '1' },
        });
      });
    });
  });
});
