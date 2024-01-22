import { describe, it, expect } from '@jest/globals';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('sum', () => {
  describe('given operands opA and opB', () => {
    const opA = new Operand(
      '#opA.#attr0[1][2].#attr1',
      {
        '#opA': 'opA',
        '#attr0': 'attr0',
        '#attr1': 'attr1',
      },
      {},
    );
    const opB = new Operand(':opB', {}, { ':opB': { N: '1' } });

    describe('when summing', () => {
      const sum = opA.plus(opB);

      it('should return a condition with expression :opA + :opB', () => {
        expect(sum.symbolicValue).toBe('#opA.#attr0[1][2].#attr1 + :opB');
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(sum.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(sum.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });
  });
});

describe('difference', () => {
  describe('given operands opA and opB', () => {
    const opA = new Operand(
      '#opA.#attr0[1][2].#attr1',
      {
        '#opA': 'opA',
        '#attr0': 'attr0',
        '#attr1': 'attr1',
      },
      {},
    );
    const opB = new Operand(':opB', {}, { ':opB': { N: '1' } });

    describe('when subtracting', () => {
      const difference = opA.minus(opB);

      it('should return a condition with expression :opA - :opB', () => {
        expect(difference.symbolicValue).toBe(
          '#opA.#attr0[1][2].#attr1 - :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(difference.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(difference.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });
  });
});
