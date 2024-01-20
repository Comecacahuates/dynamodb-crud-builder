import { describe, it, expect, beforeEach } from '@jest/globals';
import { AddAction } from '../../../../src/expressions/updates/actions/AddAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('creating add action to add a value to attribute', () => {
  describe('given document path a[0].b.c[1][2] and value :value', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const operand = new Operand(':value', {}, { ':value': { N: '1' } });

    describe('when creating an add action', () => {
      let addAction: AddAction;

      beforeEach(() => {
        addAction = AddAction.addValueToAttribute(documentPath, operand);
      });

      it('should have the statement "#a[0].#b.#c[1][2] :value"', () => {
        expect(addAction.statement).toBe('#a[0].#b.#c[1][2] :value');
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
          ':value': { N: '1' },
        });
      });
    });
  });
});
