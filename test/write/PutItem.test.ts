import { describe, it, expect } from '@jest/globals';
import { PutItem } from '../../src/write/PutItem.js';

describe('put item', () => {
  describe('given a dynamodb item and a table name', () => {
    const item = {
        attr0: null,
        attr1: 'test',
        attr2: 123,
        attr3: true,
        attr4: new Uint8Array([1, 2, 3]),
        attr5: new Set(['test', 'test2']),
        attr6: new Set([1, 2, 3]),
        attr7: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        attr8: ['value1', 'value2'],
        attr9: { key1: 'value1', key2: 'value2' },
      },
      tableName = 'table-name';

    describe('when building put item command', () => {
      const command = new PutItem(item).intoTable(tableName).toCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe(tableName);
      });

      it('should have item', () => {
        expect(command.input.Item).toEqual({
          attr0: { NULL: true },
          attr1: { S: 'test' },
          attr2: { N: '123' },
          attr3: { BOOL: true },
          attr4: { B: new Uint8Array([1, 2, 3]) },
          attr5: { SS: ['test', 'test2'] },
          attr6: { NS: ['1', '2', '3'] },
          attr7: { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
          attr8: { L: [{ S: 'value1' }, { S: 'value2' }] },
          attr9: { M: { key1: { S: 'value1' }, key2: { S: 'value2' } } },
        });
      });
    });
  });
});
