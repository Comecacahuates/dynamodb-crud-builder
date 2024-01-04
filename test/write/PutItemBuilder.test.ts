import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  DynamoDBClient,
  PutItemCommand,
  DynamoDBServiceException,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import clone from 'just-clone';
import { PutItemBuilder } from '../../src/write/PutItemBuilder.js';
import { PutItemError } from '../../src/errors/index.js';

describe('Build put item command', () => {
  let putItemBuilder: PutItemBuilder;
  let command: PutItemCommand;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder();
    command = putItemBuilder
      .thisItem({
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
      })
      .intoTable('table-name')
      .buildCommand();
  });

  it('should build put command with table name', () => {
    expect(command).toHaveProperty('input.TableName', 'table-name');
  });

  it('should build put command with item', () => {
    expect(command).toHaveProperty('input.Item', {
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

describe('Build transaction item', () => {
  let putItemBuilder: PutItemBuilder;
  let transactionItem: TransactWriteItem;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder();
    transactionItem = putItemBuilder
      .thisItem({
        attr0: { NULL: true },
        attr1: { S: 'attribute-value2' },
        attr2: { N: '123' },
        attr3: { BOOL: true },
        attr4: { B: new Uint8Array([1, 2, 3]) },
        attr5: { SS: ['value1', 'value2'] },
        attr6: { NS: ['123', '456'] },
        attr7: { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
        attr8: { L: [{ S: 'value1' }, { S: 'value2' }] },
        attr9: { M: { key1: { S: 'value1' }, key2: { S: 'value2' } } },
      })
      .intoTable('table-name')
      .buildTransactionItem();
  });

  it('should build transaction item with table name', () => {
    expect(transactionItem).toHaveProperty('Put.TableName', 'table-name');
  });

  it('should build transation item with item', () => {
    expect(transactionItem).toHaveProperty('Put.Item', {
      attr0: { NULL: true },
      attr1: { S: 'attribute-value2' },
      attr2: { N: '123' },
      attr3: { BOOL: true },
      attr4: { B: new Uint8Array([1, 2, 3]) },
      attr5: { SS: ['value1', 'value2'] },
      attr6: { NS: ['123', '456'] },
      attr7: { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
      attr8: { L: [{ S: 'value1' }, { S: 'value2' }] },
      attr9: { M: { key1: { S: 'value1' }, key2: { S: 'value2' } } },
    });
  });
});

describe('Run', () => {
  const mockDynamodbClient = mockClient(DynamoDBClient);

  const initialConditions = { itemIsInTable: false };
  let finalConditions: typeof initialConditions;

  let putItemBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder()
      .thisItem({
        attr0: { NULL: true },
        attr1: { S: 'attribute-value2' },
        attr2: { N: '123' },
        attr3: { BOOL: true },
        attr4: { B: new Uint8Array([1, 2, 3]) },
        attr5: { SS: ['value1', 'value2'] },
        attr6: { NS: ['123', '456'] },
        attr7: { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
        attr8: { L: [{ S: 'value1' }, { S: 'value2' }] },
        attr9: { M: { key1: { S: 'value1' }, key2: { S: 'value2' } } },
      })
      .intoTable('table-name');

    finalConditions = clone(initialConditions);
  });

  it('should run put command', async () => {
    mockDynamodbClient.on(PutItemCommand).callsFake(() => {
      finalConditions.itemIsInTable = true;
    });

    await putItemBuilder.run(mockDynamodbClient as unknown as DynamoDBClient);
  });

  it('should throw error on dynamodb service exception', async () => {
    mockDynamodbClient.on(PutItemCommand).rejects(
      new DynamoDBServiceException({
        name: 'DynamoDBServiceException',
        $fault: 'client',
        $metadata: {},
      }),
    );

    await expect(
      putItemBuilder.run(mockDynamodbClient as unknown as DynamoDBClient),
    ).rejects.toThrow(PutItemError);
  });
});
