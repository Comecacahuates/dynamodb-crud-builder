import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  DynamoDBClient,
  PutItemCommand,
  DynamoDBServiceException,
} from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import clone from 'just-clone';
import { PutItemBuilder } from '../../src/write/index.js';
import { PutItemError } from '../../src/errors/index.js';

describe('Build put item command', () => {
  let putItemBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder();
  });

  it('should build put command with table name', () => {
    const tableName = 'test-table';
    const command = putItemBuilder.intoTable(tableName).buildCommand();

    expect(command).toHaveProperty('input.TableName', tableName);
  });

  it('should build put command with single null attribute', () => {
    const command = putItemBuilder
      .putNull('attribute-name')
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { NULL: true },
    });
  });

  it('should build put command with single string attribute', () => {
    const command = putItemBuilder
      .putString('attribute-name', 'attribute-value')
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { S: 'attribute-value' },
    });
  });

  it('should build put command with single number attribute', () => {
    const command = putItemBuilder
      .putNumber('attribute-name', 123)
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { N: '123' },
    });
  });

  it('should build put command with single boolean attribute', () => {
    const command = putItemBuilder
      .putBoolean('attribute-name', true)
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { BOOL: true },
    });
  });

  it('should build put command with single binary', () => {
    const command = putItemBuilder
      .putBinary('attribute-name', new Uint8Array([1, 2, 3]))
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { B: new Uint8Array([1, 2, 3]) },
    });
  });

  it('should build put command with single string set attribute', () => {
    const command = putItemBuilder
      .putStringSet('attribute-name', new Set(['value1', 'value2']))
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { SS: ['value1', 'value2'] },
    });
  });

  it('should build put command with single number set attribute', () => {
    const command = putItemBuilder
      .putNumberSet('attribute-name', new Set([123, 456]))
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { NS: ['123', '456'] },
    });
  });

  it('should build put command with single binary set attribute', () => {
    const command = putItemBuilder
      .putBinarySet(
        'attribute-name',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
    });
  });

  it('should build put command with single list attribute', () => {
    const command = putItemBuilder
      .putList('attribute-name', ['value1', 'value2'])
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': { L: [{ S: 'value1' }, { S: 'value2' }] },
    });
  });

  it('should build put command with single object attribute', () => {
    const command = putItemBuilder
      .putObject('attribute-name', { key1: 'value1', key2: 'value2' })
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });

  it('should build put command with multiple attributes', () => {
    const command = putItemBuilder
      .putNull('attribute-name1')
      .putString('attribute-name2', 'attribute-value2')
      .putNumber('attribute-name3', 123)
      .putBoolean('attribute-name4', true)
      .putBinary('attribute-name5', new Uint8Array([1, 2, 3]))
      .putStringSet('attribute-name6', new Set(['value1', 'value2']))
      .putNumberSet('attribute-name7', new Set([123, 456]))
      .putBinarySet(
        'attribute-name8',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .putList('attribute-name9', ['value1', 'value2'])
      .putObject('attribute-name10', { key1: 'value1', key2: 'value2' })
      .intoTable('table-name')
      .buildCommand();

    expect(command).toHaveProperty('input.Item', {
      'attribute-name1': { NULL: true },
      'attribute-name2': { S: 'attribute-value2' },
      'attribute-name3': { N: '123' },
      'attribute-name4': { BOOL: true },
      'attribute-name5': { B: new Uint8Array([1, 2, 3]) },
      'attribute-name6': { SS: ['value1', 'value2'] },
      'attribute-name7': { NS: ['123', '456'] },
      'attribute-name8': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
      'attribute-name9': { L: [{ S: 'value1' }, { S: 'value2' }] },
      'attribute-name10': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });
});

describe('Build transaction item', () => {
  let putItemBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder();
  });

  it('should build transaction item with table name', () => {
    const transactionItem = putItemBuilder
      .putNull('attribute-name')
      .intoTable('table-name')
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.TableName', 'table-name');
  });

  it('should build transaction item with single null attribute', () => {
    const transactionItem = putItemBuilder
      .putNull('attribute-name')
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { NULL: true },
    });
  });

  it('should build transaction item with single string attribute', () => {
    const transactionItem = putItemBuilder
      .putString('attribute-name', 'attribute-value')
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { S: 'attribute-value' },
    });
  });

  it('should build transaction item with single number attribute', () => {
    const transactionItem = putItemBuilder
      .putNumber('attribute-name', 123)
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { N: '123' },
    });
  });

  it('should build transaction item with single boolean attribute', () => {
    const transactionItem = putItemBuilder
      .putBoolean('attribute-name', true)
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { BOOL: true },
    });
  });

  it('should build transaction item with single binary', () => {
    const transactionItem = putItemBuilder
      .putBinary('attribute-name', new Uint8Array([1, 2, 3]))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { B: new Uint8Array([1, 2, 3]) },
    });
  });

  it('should build transaction item with single string set attribute', () => {
    const transactionItem = putItemBuilder
      .putStringSet('attribute-name', new Set(['value1', 'value2']))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { SS: ['value1', 'value2'] },
    });
  });

  it('should build transaction item with single number set attribute', () => {
    const transactionItem = putItemBuilder
      .putNumberSet('attribute-name', new Set([123, 456]))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { NS: ['123', '456'] },
    });
  });

  it('should build transaction item with single binary set attribute', () => {
    const transactionItem = putItemBuilder
      .putBinarySet(
        'attribute-name',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
    });
  });

  it('should build transaction item with single list attribute', () => {
    const transactionItem = putItemBuilder
      .putList('attribute-name', ['value1', 'value2'])
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { L: [{ S: 'value1' }, { S: 'value2' }] },
    });
  });

  it('should build transaction item with single object attribute', () => {
    const transactionItem = putItemBuilder
      .putObject('attribute-name', { key1: 'value1', key2: 'value2' })
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });

  it('should build transaction item with multiple attributes', () => {
    const transactionItem = putItemBuilder
      .putNull('attribute-name1')
      .putString('attribute-name2', 'attribute-value2')
      .putNumber('attribute-name3', 123)
      .putBoolean('attribute-name4', true)
      .putBinary('attribute-name5', new Uint8Array([1, 2, 3]))
      .putStringSet('attribute-name6', new Set(['value1', 'value2']))
      .putNumberSet('attribute-name7', new Set([123, 456]))
      .putBinarySet(
        'attribute-name8',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .putList('attribute-name9', ['value1', 'value2'])
      .putObject('attribute-name10', { key1: 'value1', key2: 'value2' })
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name1': { NULL: true },
      'attribute-name2': { S: 'attribute-value2' },
      'attribute-name3': { N: '123' },
      'attribute-name4': { BOOL: true },
      'attribute-name5': { B: new Uint8Array([1, 2, 3]) },
      'attribute-name6': { SS: ['value1', 'value2'] },
      'attribute-name7': { NS: ['123', '456'] },
      'attribute-name8': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
      'attribute-name9': { L: [{ S: 'value1' }, { S: 'value2' }] },
      'attribute-name10': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });

  describe('Table name', () => {
    it('should build transaction item with table name', () => {
      const transactionItem = putItemBuilder
        .putNull('attribute-name')
        .intoTable('table-name')
        .buildTransactionItem();

      expect(transactionItem).toHaveProperty('Put.TableName', 'table-name');
    });
  });
});

describe('Run', () => {
  const mockDynamodbClient = mockClient(DynamoDBClient);

  const initialConditions = { itemIsInTable: false };
  let finalConditions: typeof initialConditions;

  let putItemBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemBuilder = new PutItemBuilder();

    finalConditions = clone(initialConditions);
  });

  it('should run put command', async () => {
    mockDynamodbClient.on(PutItemCommand).callsFake(() => {
      finalConditions.itemIsInTable = true;
    });

    await putItemBuilder
      .putString('attribute-1', 'attribute-value')
      .putNumber('attribute-2', 123)
      .putBoolean('attribute-3', true)
      .putList('attribute-4', ['value1', 'value2'])
      .intoTable('table-name')
      .run(mockDynamodbClient as unknown as DynamoDBClient);
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
      putItemBuilder
        .putString('attribute-1', 'attribute-value')
        .putNumber('attribute-2', 123)
        .putBoolean('attribute-3', true)
        .putList('attribute-4', ['value1', 'value2'])
        .intoTable('table-name')
        .run(mockDynamodbClient as unknown as DynamoDBClient),
    ).rejects.toThrow(PutItemError);
  });
});
