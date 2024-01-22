import { describe, it, expect } from '@jest/globals';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/updates/actions/UpdateAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';

describe('creating update action to remove attribute', () => {
  describe('given document path "a[0].b.c[1][2]"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');

    describe('when creating a remove action', () => {
      const removeAction = UpdateAction.remove(documentPath);

      it('should have the type "REMOVE"', () => {
        expect(removeAction.type).toBe(UpdateActionType.REMOVE);
      });

      it('should have the statement "#a[0].#b.#c[1][2]"', () => {
        expect(removeAction.statement).toBe('#a[0].#b.#c[1][2]');
      });

      it('should have the expression attribute names of the document path', () => {
        expect(removeAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have no expression attribute values', () => {
        expect(removeAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});
