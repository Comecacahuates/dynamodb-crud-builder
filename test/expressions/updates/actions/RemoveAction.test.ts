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
      let remove: RemoveAction;

      beforeEach(() => {
        remove = new RemoveAction(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(remove.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(remove.expressionAttributeNames).not.toBe(
          expressionAttributeNames,
        );
        expect(remove.expressionAttributeNames).toEqual(
          expressionAttributeNames,
        );
      });

      it('should have a copy of the expression attribute values', () => {
        expect(remove.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(remove.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
