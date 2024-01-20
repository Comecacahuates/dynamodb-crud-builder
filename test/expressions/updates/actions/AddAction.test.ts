import { describe, it, expect, beforeEach } from '@jest/globals';
import { AddAction } from '../../../../src/expressions/updates/actions/AddAction.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../../../src/expressions/types.js';

describe('creating remove action', () => {
  describe('given a statement, expression attribute names and expression attribute values', () => {
    const statement = '#a :b';
    const expressionAttributeNames: ExpressionAttributeNames = {
      '#a': 'a',
    };
    const expressionAttributeValues: ExpressionAttributeValues = {
      ':b': { S: 'b' },
    };

    describe('when creating a remove action', () => {
      let addAction: AddAction;

      beforeEach(() => {
        addAction = new AddAction(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(addAction.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(addAction.expressionAttributeNames).not.toBe(
          expressionAttributeNames,
        );
        expect(addAction.expressionAttributeNames).toEqual(
          expressionAttributeNames,
        );
      });

      it('should have a copy of the expression attribute values', () => {
        expect(addAction.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(addAction.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
