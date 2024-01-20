import { describe, it, expect, beforeEach } from '@jest/globals';
import { RemoveAction } from '../../../../src/expressions/updates/actions/RemoveAction.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../../../src/expressions/types.js';

describe('creating remove action', () => {
  describe('given a statement, expression attribute names and expression attribute values', () => {
    const statement = '#a';
    const expressionAttributeNames: ExpressionAttributeNames = {
      '#a': 'a',
    };
    const expressionAttributeValues: ExpressionAttributeValues = {
      ':b': { S: 'b' },
    };

    describe('when creating a remove action', () => {
      let removeAction: RemoveAction;

      beforeEach(() => {
        removeAction = new RemoveAction(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(removeAction.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(removeAction.expressionAttributeNames).not.toBe(
          expressionAttributeNames,
        );
        expect(removeAction.expressionAttributeNames).toEqual(
          expressionAttributeNames,
        );
      });

      it('should have a copy of the expression attribute values', () => {
        expect(removeAction.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(removeAction.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
