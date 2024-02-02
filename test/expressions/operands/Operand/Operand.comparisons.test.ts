import { describe, it, expect } from '@jest/globals';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('comparisons', () => {
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

    describe('when comparing equal to', () => {
      const comparison = opA.equalTo(opB);

      it('should return a condition with expression :opA = :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 = :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing not equal to', () => {
      const comparison = opA.notEqualTo(opB);

      it('should return a condition with expression :opA <> :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 <> :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing less than', () => {
      const comparison = opA.lessThan(opB);

      it('should return a condition with expression :opA < :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 < :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing less than or equal to', () => {
      const comparison = opA.lessThanOrEqualTo(opB);

      it('should return a condition with expression :opA <= :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 <= :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing greater than', () => {
      const comparison = opA.greaterThan(opB);

      it('should return a condition with expression :opA > :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 > :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing greater than or equal to', () => {
      const comparison = opA.greaterThanOrEqualTo(opB);

      it('should return a condition with expression :opA >= :opB', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 >= :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
        });
      });
    });
  });

  describe('given operands opA, opB and opC', () => {
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
    const opC = new Operand(':opC', {}, { ':opC': { N: '2' } });

    describe('when comparing between', () => {
      const comparison = opA.between(opB, opC);

      it('should return a condition with expression :opA BETWEEN :opB AND :opC', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 BETWEEN :opB AND :opC',
        );
      });

      it('should return a condition with expression attribute names of all operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of all operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
          ':opC': { N: '2' },
        });
      });
    });
  });

  describe('given operand opA and a list of operands', () => {
    const opA = new Operand(
      '#opA.#attr0[1][2].#attr1',
      {
        '#opA': 'opA',
        '#attr0': 'attr0',
        '#attr1': 'attr1',
      },
      {},
    );
    const operandsList = [
      new Operand(':opB', {}, { ':opB': { N: '1' } }),
      new Operand(':opC', {}, { ':opC': { N: '2' } }),
      new Operand(':opD', {}, { ':opD': { N: '3' } }),
    ];

    describe('when comparing in', () => {
      const comparison = opA.in(...operandsList);

      it('should return a condition with expression :opA IN (:opB, :opC, :opD)', () => {
        expect(comparison.getExpressionString()).toBe(
          '#opA.#attr0[1][2].#attr1 IN (:opB, :opC, :opD)',
        );
      });

      it('should return a condition with expression attribute names of all operands', () => {
        expect(comparison.getExpressionAttributeNames()).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of all operands', () => {
        expect(comparison.getExpressionAttributeValues()).toEqual({
          ':opB': { N: '1' },
          ':opC': { N: '2' },
          ':opD': { N: '3' },
        });
      });
    });
  });
});
