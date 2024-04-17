import { describe, it, expect } from '@jest/globals';
import { UpdateItem } from '../../src/write/UpdateItem.js';
import { DocumentPath, Literal } from '../../src/expressions/operands/index.js';
import { UpdateExpression } from '../../src/expressions/update/index.js';

describe('update item', () => {
  describe('given a key, table name, an update expression and a condition', () => {
    const documentPath0 = DocumentPath.parse('a.b'),
      documentPath1 = DocumentPath.parse('c[0]'),
      documentPath2 = DocumentPath.parse('d.e[1]'),
      documentPath3 = DocumentPath.parse('f'),
      literal0 = Literal.fromValue(10, '0'),
      literal1 = Literal.fromValue('value-00', '1'),
      literal2 = Literal.fromValue(new Set([20]), '2'),
      literal3 = Literal.fromValue(true, '3');

    const key = { id: 'id-00' },
      tableName = 'table-name',
      updateExpression = new UpdateExpression()
        .addAction(documentPath0.increment(literal0))
        .addAction(documentPath1.setValue(literal1))
        .addAction(documentPath2.add(literal2)),
      condition = documentPath0.exists().and(documentPath3.equalTo(literal3));

    describe('when building update item command', () => {
      const command = new UpdateItem(key)
        .inTable(tableName)
        .withUpdateExpression(updateExpression)
        .withCondition(condition)
        .toCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe('table-name');
      });

      it('should have update expression', () => {
        expect(command.input.UpdateExpression).toContain(
          'SET #a.#b = #a.#b + :literal0, #c[0] = :literal1',
        );
        expect(command.input.UpdateExpression).toContain(
          'ADD #d.#e[1] :literal2',
        );
      });

      it('should have condition expression', () => {
        expect(command.input.ConditionExpression).toBe(
          '(attribute_exists(#a.#b) AND #f = :literal3)',
        );
      });

      it('should have expression attribute names', () => {
        expect(command.input.ExpressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have expression attribute values', () => {
        expect(command.input.ExpressionAttributeValues).toEqual({
          ':literal0': { N: '10' },
          ':literal1': { S: 'value-00' },
          ':literal2': { NS: ['20'] },
          ':literal3': { BOOL: true },
        });
      });
    });
  });
});
