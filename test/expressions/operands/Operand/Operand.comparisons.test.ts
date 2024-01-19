import { describe, it, expect, beforeEach } from '@jest/globals';
import { Operand } from '../../../../src/expressions/operands/Operand.js';
import { Condition } from '../../../../src/expressions/conditions/Condition.js';

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
      let comparison: Condition;

      beforeEach(() => {
        comparison = opA.equalTo(opB);
      });

      it('should return a condition with symbolic value :opA = :opB', () => {
        expect(comparison.symbolicValue).toBe(
          '#opA.#attr0[1][2].#attr1 = :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing not equal to', () => {
      let comparison: Condition;

      beforeEach(() => {
        comparison = opA.notEqualTo(opB);
      });

      it('should return a condition with symbolic value :opA <> :opB', () => {
        expect(comparison.symbolicValue).toBe(
          '#opA.#attr0[1][2].#attr1 <> :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing less than', () => {
      let comparison: Condition;

      beforeEach(() => {
        comparison = opA.lessThan(opB);
      });

      it('should return a condition with symbolic value :opA < :opB', () => {
        expect(comparison.symbolicValue).toBe(
          '#opA.#attr0[1][2].#attr1 < :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });

    describe('when comparing less than or equal to', () => {
      let comparison: Condition;

      beforeEach(() => {
        comparison = opA.lessThanOrEqualTo(opB);
      });

      it('should return a condition with symbolic value :opA <= :opB', () => {
        expect(comparison.symbolicValue).toBe(
          '#opA.#attr0[1][2].#attr1 <= :opB',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(comparison.expressionAttributeNames).toEqual({
          '#opA': 'opA',
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(comparison.expressionAttributeValues).toEqual({
          ':opB': { N: '1' },
        });
      });
    });
  });
});
