import { describe, it, expect } from '@jest/globals';
import { DeleteItem } from '../../src/write/DeleteItem.js';

describe('delete', () => {
  const deleteCommand = new DeleteItem({ id: 'id-00' })
    .fromTable('table-name')
    .toCommand();

  it('should build delete command with table name', () => {
    expect(deleteCommand).toHaveProperty('input.TableName', 'table-name');
  });

  it('should build delete command with key', () => {
    expect(deleteCommand).toHaveProperty('input.Key', { id: { S: 'id-00' } });
  });
});
