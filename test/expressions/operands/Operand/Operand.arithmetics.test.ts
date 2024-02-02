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
        expect(sum.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 + :opB',
        );
      });

      it('should return a condition with attribute names of both operands', () => {
        expect(sum.getAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with attribute values of both operands', () => {
        expect(sum.getAttributeValues()).toEqual({
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
        expect(difference.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 - :opB',
        );
      });

      it('should return a condition with attribute names of both operands', () => {
        expect(difference.getAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with attribute values of both operands', () => {
        expect(difference.getAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });
  });
});
