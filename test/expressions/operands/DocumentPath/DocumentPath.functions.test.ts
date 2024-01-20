import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';
import { Condition } from '../../../../src/expressions/conditions/Condition.js';

describe('functions', () => {
  describe('given document path a[0].b.c[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);

    describe('when checking if attribute exists', () => {
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.attributeExists();
      });

      it('should return a condition with symbolic value :opA > :opB', () => {
        expect(condition.symbolicValue).toBe(
          'attribute_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(condition.expressionAttributeValues).toEqual({});
      });
    });

    describe('when checking if attribute not exists', () => {
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.attributeNotExists();
      });

      it('should return a condition with symbolic value :opA > :opB', () => {
        expect(condition.symbolicValue).toBe(
          'attribute_not_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with expression attribute names of both operands', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with expression attribute values of both operands', () => {
        expect(condition.expressionAttributeValues).toEqual({});
      });
    });
  });
});
