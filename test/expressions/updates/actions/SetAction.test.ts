import { describe, it, expect, beforeEach } from '@jest/globals';
import { SetAction } from '../../../../src/expressions/updates/actions/SetAction.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../../../src/expressions/types.js';

describe('creating set action', () => {
  describe('given a statement, expression attribute names and expression attribute values', () => {
    const statement = '#a = :b';
    const expressionAttributeNames: ExpressionAttributeNames = {
      '#a': 'a',
    };
    const expressionAttributeValues: ExpressionAttributeValues = {
      ':b': { S: 'b' },
    };

    describe('when creating a set action', () => {
      let setAction: SetAction;

      beforeEach(() => {
        setAction = new SetAction(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(setAction.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(setAction.expressionAttributeNames).not.toBe(
          expressionAttributeNames,
        );
        expect(setAction.expressionAttributeNames).toEqual(
          expressionAttributeNames,
        );
      });

      it('should have a copy of the expression attribute values', () => {
        expect(setAction.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(setAction.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
