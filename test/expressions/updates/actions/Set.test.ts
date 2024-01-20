import { describe, it, expect, beforeEach } from '@jest/globals';
import { Set } from '../../../../src/expressions/updates/actions/Set.js';
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
      let set: Set;

      beforeEach(() => {
        set = new Set(
          statement,
          expressionAttributeNames,
          expressionAttributeValues,
        );
      });

      it('should have the statement', () => {
        expect(set.statement).toBe(statement);
      });

      it('should have a copy of the expression attribute names', () => {
        expect(set.expressionAttributeNames).not.toBe(expressionAttributeNames);
        expect(set.expressionAttributeNames).toEqual(expressionAttributeNames);
      });

      it('should have a copy of the expression attribute values', () => {
        expect(set.expressionAttributeValues).not.toBe(
          expressionAttributeValues,
        );
        expect(set.expressionAttributeValues).toEqual(
          expressionAttributeValues,
        );
      });
    });
  });
});
