import { describe, it, expect } from '@jest/globals';
import { UpdateAction } from '../../../../src/expressions/update-expressions/UpdateAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';
import { UpdateExpressionBuilder } from '../../../../src/expressions/update-expressions/UpdateExpressionBuilder.js';

describe('build update expression', () => {
  describe('given a `set` action', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1]');
    const literal = Literal.fromValue('value', 'String');
    const setValue = UpdateAction.setValue(documentPath, literal);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpressionBuilder()
        .addAction(setValue)
        .build();

      it('should have expression string `SET #a[0].#b.#c[1] = :literalString`', () => {
        expect(updateExpression.getExpressionString()).toBe(
          'SET #a[0].#b.#c[1] = :literalString',
        );
      });

      it('should have expression attribute names', () => {
        expect(updateExpression.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have expression attribute values', () => {
        expect(updateExpression.getAttributeValues()).toEqual({
          ':literalString': { S: 'value' },
        });
      });
    });
  });

  describe('given a `remove` action', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1]');
    const removeValue = UpdateAction.remove(documentPath);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpressionBuilder()
        .addAction(removeValue)
        .build();

      it('should have expression string `REMOVE #a[0].#b.#c[1]`', () => {
        expect(updateExpression.getExpressionString()).toBe(
          'REMOVE #a[0].#b.#c[1]',
        );
      });

      it('should have expression attribute names', () => {
        expect(updateExpression.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have expression attribute values', () => {
        expect(updateExpression.getAttributeValues()).toEqual({});
      });
    });
  });

  describe('given a `add` action', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1]');
    const literal = Literal.fromValue(1, 'Number');
    const addValue = UpdateAction.add(documentPath, literal);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpressionBuilder()
        .addAction(addValue)
        .build();

      it('should have expression string `ADD #a[0].#b.#c[1] :literalNumber`', () => {
        expect(updateExpression.getExpressionString()).toBe(
          'ADD #a[0].#b.#c[1] :literalNumber',
        );
      });

      it('should have expression attribute names', () => {
        expect(updateExpression.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have expression attribute values', () => {
        expect(updateExpression.getAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given a `delete` action', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1]');
    const literal = Literal.fromValue(new Set([1, 2, 3]), 'Set');
    const deleteSubset = UpdateAction.delete(documentPath, literal);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpressionBuilder()
        .addAction(deleteSubset)
        .build();

      it('should have expression string `DELETE #a[0].#b.#c[1] :literalSet`', () => {
        expect(updateExpression.getExpressionString()).toBe(
          'DELETE #a[0].#b.#c[1] :literalSet',
        );
      });

      it('should have expression attribute names', () => {
        expect(updateExpression.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have expression attribute values', () => {
        expect(updateExpression.getAttributeValues()).toEqual({
          ':literalSet': { NS: ['1', '2', '3'] },
        });
      });
    });
  });

  describe('given multiple update actions', () => {
    const documentPathA = DocumentPath.parse('a');
    const documentPathB = DocumentPath.parse('b');
    const documentPathC = DocumentPath.parse('c');
    const documentPathD = DocumentPath.parse('d');
    const documentPathE = DocumentPath.parse('e');
    const documentPathF = DocumentPath.parse('f');
    const documentPathG = DocumentPath.parse('g');
    const documentPathH = DocumentPath.parse('h');
    const literalString = Literal.fromValue('string', 'String');
    const literalNumber = Literal.fromValue(1, 'Number');
    const literalSet = Literal.fromValue(new Set([1, 2, 3]), 'Set');
    const setValue = UpdateAction.setValue(documentPathA, literalString);
    const increment = UpdateAction.increment(documentPathB, literalNumber);
    const remove1 = UpdateAction.remove(documentPathC);
    const remove2 = UpdateAction.remove(documentPathD);
    const addNumber = UpdateAction.add(documentPathE, literalNumber);
    const addElements = UpdateAction.add(documentPathF, literalSet);
    const deleteElements1 = UpdateAction.delete(documentPathG, literalSet);
    const deleteElements2 = UpdateAction.delete(documentPathH, literalSet);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpressionBuilder()
        .addAction(setValue)
        .addAction(increment)
        .addAction(remove1)
        .addAction(remove2)
        .addAction(addNumber)
        .addAction(addElements)
        .addAction(deleteElements1)
        .addAction(deleteElements2)
        .build();

      it('should have expression string with `set` statements', () => {
        expect(updateExpression.getExpressionString()).toContain(
          'SET #a = :literalString, #b = #b + :literalNumber',
        );
      });

      it('should have expression string with `remove` statements', () => {
        expect(updateExpression.getExpressionString()).toContain(
          'REMOVE #c, #d',
        );
      });

      it('should have expression string with `add` statements', () => {
        expect(updateExpression.getExpressionString()).toContain(
          'ADD #e :literalNumber, #f :literalSet',
        );
      });

      it('should have expression string with `delete` statements', () => {
        expect(updateExpression.getExpressionString()).toContain(
          'DELETE #g :literalSet, #h :literalSet',
        );
      });

      it('should have expression attribute names', () => {
        expect(updateExpression.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
          '#g': 'g',
          '#h': 'h',
        });
      });

      it('should have expression attribute values', () => {
        expect(updateExpression.getAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
          ':literalNumber': { N: '1' },
          ':literalSet': { NS: ['1', '2', '3'] },
        });
      });
    });
  });
});
