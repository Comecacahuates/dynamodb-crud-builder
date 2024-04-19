import { describe, it, expect } from '@jest/globals';
import { UpdateItem } from '../../src/write/UpdateItem.js';
import { DocumentPath } from '../../src/expressions/operands/index.js';
import { UpdateExpression } from '../../src/expressions/update/index.js';

describe('update item', () => {
  describe('given a key, table name, an update expression and a condition expression', () => {
    const attributeA = new DocumentPath('a.b'),
      attributeB = new DocumentPath('c[0]'),
      attributeC = new DocumentPath('d.e[1]'),
      attributeD = new DocumentPath('f');

    const key = { id: 'id-00' },
      tableName = 'table-name',
      updateExpression = new UpdateExpression()
        .addAction(attributeA.increment(10))
        .addAction(attributeB.set('value-00'))
        .addAction(attributeC.add(new Set([20]))),
      conditionExpression = attributeA.exists().and(attributeD.equalTo(true));

    describe('when building update item command', () => {
      const command = new UpdateItem(key)
        .inTable(tableName)
        .applying(updateExpression)
        .onlyIf(conditionExpression)
        .asCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe('table-name');
      });

      it('should have key', () => {
        expect(command.input.Key).toEqual({
          id: { S: 'id-00' },
        });
      });

      it('should have update expression', () => {
        expect(command.input.UpdateExpression).toMatch(
          /SET #a\.#b = #a\.#b \+ :literal\w{10}, #c\[0\] = :literal\w{10}/,
        );
        expect(command.input.UpdateExpression).toMatch(
          /ADD #d\.#e\[1\] :literal\w{10}/,
        );
      });

      it('should have condition expression', () => {
        expect(command.input.ConditionExpression).toMatch(
          /\(attribute_exists\(#a\.#b\) AND #f = :literal\w{10}\)/,
        );
      });

      it('should have attribute names', () => {
        expect(command.input.ExpressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues =
          command.input.ExpressionAttributeValues!;
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(4);
        keys.forEach((eachKey) => {
          expect(eachKey).toMatch(/:literal\w{10}/);
        });

        expect(values).toHaveLength(4);
        expect(values[0]).toEqual({ N: '10' });
        expect(values[1]).toEqual({ S: 'value-00' });
        expect(values[2]).toEqual({ NS: ['20'] });
        expect(values[3]).toEqual({ BOOL: true });
      });
    });
  });
});
