import { describe, it, expect } from '@jest/globals';
import { DeleteAction } from '../../../../src/expressions/updates/actions/DeleteAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating delete action to delete elements from set', () => {
  describe('given document path "a[0].b.c[1][2]" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue('string', 'String');

    describe('when creating a delete action', () => {
      const deleteAction = DeleteAction.deleteElementsFromSet(
        documentPath,
        literal,
      );

      it('should have the statement "#a[0].#b.#c[1][2] :literalString"', () => {
        expect(deleteAction.statement).toBe('#a[0].#b.#c[1][2] :literalString');
      });

      it('should have the expression attribute names of document path and value', () => {
        expect(deleteAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and value', () => {
        expect(deleteAction.expressionAttributeValues).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});
