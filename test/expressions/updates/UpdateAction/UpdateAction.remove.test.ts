import { describe, it, expect } from '@jest/globals';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/updates/UpdateAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';

describe('creating update action to remove attribute', () => {
  describe('given document path "a[0].b.c[1][2]"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');

    describe('when creating a remove action', () => {
      const removeAction = UpdateAction.createRemove(documentPath);

      it('should have the type "REMOVE"', () => {
        expect(removeAction.getType()).toBe(UpdateActionType.REMOVE);
      });

      it('should have the expression string "#a[0].#b.#c[1][2]"', () => {
        expect(removeAction.getExpressionString()).toBe('#a[0].#b.#c[1][2]');
      });

      it('should have the attribute names of the document path', () => {
        expect(removeAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have no attribute values', () => {
        expect(removeAction.getAttributeValues()).toEqual({});
      });
    });
  });
});
