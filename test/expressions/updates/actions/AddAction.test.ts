import { describe, it, expect } from '@jest/globals';
import { AddAction } from '../../../../src/expressions/updates/actions/AddAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating add action to add a value to attribute', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when creating an add action', () => {
      const addAction = AddAction.addValueToAttribute(documentPath, literal);

      it('should have the statement "#a[0].#b.#c[1][2] :literalNumber"', () => {
        expect(addAction.statement).toBe('#a[0].#b.#c[1][2] :literalNumber');
      });

      it('should have the expression attribute names of document path and value', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and value', () => {
        expect(addAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});
