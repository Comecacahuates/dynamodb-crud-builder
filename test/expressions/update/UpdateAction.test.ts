import { describe, it, expect } from '@jest/globals';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../src/expressions/update/UpdateAction.js';
import {
  AttributeNames,
  AttributeValues,
} from '../../../src/expressions/attributes/index.js';

describe('update action', () => {
  describe('given an update action type, an expression string, attribute names and attribute values', () => {
    const type = UpdateActionType.SET,
      expressionString = '#a[0].#b.#c[1][2] = :literalNumber',
      attributeNames = new AttributeNames()
        .add('#a', 'a')
        .add('#b', 'b')
        .add('#c', 'c'),
      attributeValues = new AttributeValues().add(':literalNumber', 30);

    describe('when creating a `set value` action', () => {
      const updateAction = new UpdateAction(
        type,
        expressionString,
        attributeNames,
        attributeValues,
      );

      it('should have type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b.#c[1][2] = :literalNumber',
        );
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of the literal', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalNumber': { N: '30' },
        });
      });
    });
  });
});
