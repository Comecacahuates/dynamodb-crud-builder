import { describe, it, expect } from '@jest/globals';
import { DeleteItem } from '../../src/write/DeleteItem.js';

describe('delete item', () => {
  describe('given a key and a table name', () => {
    const key = { id: 'id-00' },
      tableName = 'table-name';

    describe('when building delete item command', () => {
      const command = new DeleteItem(key).fromTable(tableName).asCommand();

      it('should have key', () => {
        expect(command.input.Key).toEqual({
          id: { S: 'id-00' },
        });
      });

      it('should have table name', () => {
        expect(command.input.TableName).toBe('table-name');
      });
    });
  });
});
