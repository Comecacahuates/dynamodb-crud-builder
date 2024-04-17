import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/update/UpdateAction.js';

describe('update actions', () => {
  describe('given a document path and an operand', () => {
    const documentPath = DocumentPath.parse('a[0].b');
    const operand = Literal.fromValue('value', 'Value');

    describe('when creating action to set value', () => {
      const updateAction = documentPath.setValue(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe('#a[0].#b = :literalValue');
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to set value if it does not exist', () => {
      const updateAction = documentPath.setValueIfNotExists(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b = if_not_exists(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to increment', () => {
      const updateAction = documentPath.increment(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b = #a[0].#b + :literalValue',
        );
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to decrement', () => {
      const updateAction = documentPath.decrement(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b = #a[0].#b - :literalValue',
        );
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to append', () => {
      const updateAction = documentPath.append(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b = list_append(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to add', () => {
      const updateAction = documentPath.add(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have ADD type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.ADD);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe('#a[0].#b :literalValue');
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to delete', () => {
      const updateAction = documentPath.delete(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have DELETE type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.DELETE);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe('#a[0].#b :literalValue');
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when creating action to remove', () => {
      const updateAction = documentPath.remove();

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have REMOVE type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.REMOVE);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe('#a[0].#b');
      });

      it('should have attribute names', () => {
        expect(
          updateAction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });
});
