import { describe, it, expect } from '@jest/globals';
import { PutItem } from '../../src/write/PutItem.js';

describe('Build put item command', () => {
  const putCommand = new PutItem({
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
  })
    .intoTable('table-name')
    .toCommand();

  it('should build put command with table name', () => {
    expect(putCommand).toHaveProperty('input.TableName', 'table-name');
  });

  it('should build put command with item', () => {
    expect(putCommand).toHaveProperty('input.Item', {
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
