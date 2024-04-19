import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/update/UpdateAction.js';
import { AttributeNames } from '../../../../src/expressions/attributes/index.js';

describe('update actions', () => {
  describe('given a document path', () => {
    const documentPath = new DocumentPath('a[0].b');

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

  describe('given a document path and an operand', () => {
    const documentPath = new DocumentPath('a[0].b'),
      operand = new Operand('#c', new AttributeNames().add('#c', 'c'));

    describe('when creating action to set value', () => {
      const updateAction = documentPath.set(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe('#a[0].#b = #c');
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });

    describe('when creating action to set value if it does not exist', () => {
      const updateAction = documentPath.setIfNotExists(operand);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toBe(
          '#a[0].#b = if_not_exists(#a[0].#b, #c)',
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
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
        expect(updateAction.getString()).toBe('#a[0].#b = #a[0].#b + #c');
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
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
        expect(updateAction.getString()).toBe('#a[0].#b = #a[0].#b - #c');
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
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
          '#a[0].#b = list_append(#a[0].#b, #c)',
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
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
        expect(updateAction.getString()).toBe('#a[0].#b #c');
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
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
        expect(updateAction.getString()).toBe('#a[0].#b #c');
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

      it('should have attribute values', () => {
        expect(
          updateAction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });

  describe('given a document path and a literal value', () => {
    const documentPath = new DocumentPath('a[0].b'),
      value = 10;

    describe('when creating action to set value', () => {
      const updateAction = documentPath.set(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(
          /#a\[0\]\.#b = :literal\w{10}/,
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to set value if it does not exist', () => {
      const updateAction = documentPath.setIfNotExists(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(
          /#a\[0\]\.#b = if_not_exists\(#a\[0\]\.#b, :literal\w{10}\)/,
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to increment', () => {
      const updateAction = documentPath.increment(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(
          /#a\[0\]\.#b = #a\[0\]\.#b \+ :literal\w{10}/,
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to decrement', () => {
      const updateAction = documentPath.decrement(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(
          /#a\[0\]\.#b = #a\[0\]\.#b \- :literal\w{10}/,
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to append', () => {
      const updateAction = documentPath.append(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have SET type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(
          /#a\[0\]\.#b = list_append\(#a\[0\]\.#b, :literal\w{10}\)/,
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to add', () => {
      const updateAction = documentPath.add(value);

      it('should return an update action', () => {
        expect(updateAction).toBeInstanceOf(UpdateAction);
      });

      it('should have ADD type', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.ADD);
      });

      it('should have expression string', () => {
        expect(updateAction.getString()).toMatch(/#a\[0\]\.#b :literal\w{10}/);
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
        const expressionAttributeValues = updateAction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });

    describe('when creating action to delete', () => {});
  });
});
