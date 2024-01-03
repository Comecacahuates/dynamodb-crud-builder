import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  DynamoDBClient,
  PutItemCommand,
  DynamoDBServiceException,
} from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import clone from 'just-clone';
import { PutItemBuilder } from '../../src/commands/PutItemBuilder.js';
import { PutItemError } from '../../src/errors/index.js';

describe('Build transaction item', () => {
  let putItemInputBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemInputBuilder = new PutItemBuilder();
  });

  it('should build transaction item with single null attribute', () => {
    const transactionItem = putItemInputBuilder
      .putNull('attribute-name')
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { NULL: true },
    });
  });

  it('should build transaction item with single string attribute', () => {
    const transactionItem = putItemInputBuilder
      .putString('attribute-name', 'attribute-value')
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { S: 'attribute-value' },
    });
  });

  it('should build transaction item with single number attribute', () => {
    const transactionItem = putItemInputBuilder
      .putNumber('attribute-name', 123)
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { N: '123' },
    });
  });

  it('should build transaction item with single boolean attribute', () => {
    const transactionItem = putItemInputBuilder
      .putBoolean('attribute-name', true)
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { BOOL: true },
    });
  });

  it('should build transaction item with single binary', () => {
    const transactionItem = putItemInputBuilder
      .putBinary('attribute-name', new Uint8Array([1, 2, 3]))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { B: new Uint8Array([1, 2, 3]) },
    });
  });

  it('should build transaction item with single string set attribute', () => {
    const transactionItem = putItemInputBuilder
      .putStringSet('attribute-name', new Set(['value1', 'value2']))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { SS: ['value1', 'value2'] },
    });
  });

  it('should build transaction item with single number set attribute', () => {
    const transactionItem = putItemInputBuilder
      .putNumberSet('attribute-name', new Set([123, 456]))
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { NS: ['123', '456'] },
    });
  });

  it('should build transaction item with single binary set attribute', () => {
    const transactionItem = putItemInputBuilder
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
    const transactionItem = putItemInputBuilder
      .putList('attribute-name', ['value1', 'value2'])
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': { L: [{ S: 'value1' }, { S: 'value2' }] },
    });
  });

  it('should build transaction item with single object attribute', () => {
    const transactionItem = putItemInputBuilder
      .putObject('attribute-name', { key1: 'value1', key2: 'value2' })
      .buildTransactionItem();

    expect(transactionItem).toHaveProperty('Put.Item', {
      'attribute-name': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });

  it('should build transaction item with multiple attributes', () => {
    const transactionItem = putItemInputBuilder
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
      const transactionItem = putItemInputBuilder
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

  let putItemInputBuilder: PutItemBuilder;

  beforeEach(() => {
    putItemInputBuilder = new PutItemBuilder();

    finalConditions = clone(initialConditions);
  });

  it('should run put command', async () => {
    mockDynamodbClient.on(PutItemCommand).callsFake(() => {
      finalConditions.itemIsInTable = true;
    });

    await putItemInputBuilder
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
      putItemInputBuilder
        .putString('attribute-1', 'attribute-value')
        .putNumber('attribute-2', 123)
        .putBoolean('attribute-3', true)
        .putList('attribute-4', ['value1', 'value2'])
        .intoTable('table-name')
        .run(mockDynamodbClient as unknown as DynamoDBClient),
    ).rejects.toThrow(PutItemError);
  });
});
