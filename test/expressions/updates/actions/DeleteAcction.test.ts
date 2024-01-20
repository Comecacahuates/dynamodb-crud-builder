import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteAction } from '../../../../src/expressions/updates/actions/DeleteAction.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../../../src/expressions/types.js';

describe('creating delete action', () => {
  describe('given a statement, expression attribute names and expression attribute values', () => {
    const statement = '#a :b';
    const expressionAttributeNames: ExpressionAttributeNames = {
      '#a': 'a',
    };
    const expressionAttributeValues: ExpressionAttributeValues = {
      ':b': { S: 'b' },
    };

    describe('when creating a delete action', () => {
      let deleteAction: DeleteAction;

      beforeEach(() => {
        deleteAction = new DeleteAction(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(deleteAction.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(deleteAction.expressionAttributeNames).not.toBe(
          expressionAttributeNames,
        );
        expect(deleteAction.expressionAttributeNames).toEqual(
          expressionAttributeNames,
        );
      });

      it('should have a copy of the expression attribute values', () => {
        expect(deleteAction.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(deleteAction.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
