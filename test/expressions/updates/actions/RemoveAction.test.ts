import { describe, it, expect, beforeEach } from '@jest/globals';
import { RemoveAction } from '../../../../src/expressions/updates/actions/RemoveAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('creating remove action to remove attribute', () => {
  describe('given document path a[0].b.c[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);

    describe('when creating a remove action', () => {
      let removeAction: RemoveAction;

      beforeEach(() => {
        removeAction = RemoveAction.removeAttribute(documentPath);
      });

      it('should have the statement "#a[0].#b.#c[1][2]"', () => {
        expect(removeAction.statement).toBe('#a[0].#b.#c[1][2]');
      });

      it('should have the expression attribute names of document path', () => {
        expect(removeAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path', () => {
        expect(removeAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});
