import { describe, it, expect } from '@jest/globals';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/updates/UpdateAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating update action to delete elements from set', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when creating a delete action', () => {
      const deleteAction = UpdateAction.delete(documentPath, literal);

      it('should have the type "DELETE"', () => {
        expect(deleteAction.getType()).toBe(UpdateActionType.DELETE);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] :literalNumber"', () => {
        expect(deleteAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] :literalNumber',
        );
      });

      it('should have the attribute names of document path and value', () => {
        expect(deleteAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of document path and value', () => {
        expect(deleteAction.getAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating a delete action', () => {
      const deleteAction = UpdateAction.delete(documentPathA, documentPathB);

      it('should have the type "DELETE"', () => {
        expect(deleteAction.getType()).toBe(UpdateActionType.DELETE);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] #d[0].#e.#f[1][3]"', () => {
        expect(deleteAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] #d[0].#e.#f[1][3]',
        );
      });

      it('should have the attribute names of document paths', () => {
        expect(deleteAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no attribute values', () => {
        expect(deleteAction.getAttributeValues()).toEqual({});
      });
    });
  });
});
