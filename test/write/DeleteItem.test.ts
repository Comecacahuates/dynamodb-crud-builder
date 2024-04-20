import { describe, it, expect } from '@jest/globals';
import { DeleteItem } from '../../src/write/DeleteItem.js';
import { DocumentPath } from '../../src/expressions/operands/index.js';

describe('delete item', () => {
  describe('given a key and a table name', () => {
    const key = { id: 'id-00' },
      tableName = 'table-name',
      attr0 = new DocumentPath('attr0'),
      conditionExpression = attr0.notExists();

    describe('when building delete item command', () => {
      const command = new DeleteItem(key)
        .fromTable(tableName)
        .onlyIf(conditionExpression)
        .asCommand();

      it('should have key', () => {
        expect(command.input.Key).toEqual({
          id: { S: 'id-00' },
        });
      });

      it('should have table name', () => {
        expect(command.input.TableName).toBe('table-name');
      });

      it('should have condition expression', () => {
        expect(command.input.ConditionExpression).toBe(
          'attribute_not_exists(#attr0)',
        );
      });
    });
  });
});
