import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  DynamoDBClient,
  DeleteItemCommand,
  DynamoDBServiceException,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import clone from 'just-clone';
import { DeleteItemBuilder } from '../../src/write/DeleteItemBuilder.js';
import { DeleteItemError } from '../../src/errors/index.js';

describe('Build delete item command', () => {
  let deleteItemBuilder: DeleteItemBuilder;
  let command: DeleteItemCommand;

  beforeEach(() => {
    deleteItemBuilder = new DeleteItemBuilder();

    command = deleteItemBuilder
      .withKey({ id: { S: 'test-id' } })
      .fromTable('table-name')
      .buildCommand();
  });

  it('should build delete command with table name', () => {
    expect(command).toHaveProperty('input.TableName', 'table-name');
  });

  it('should build delete command with key', () => {
    expect(command).toHaveProperty('input.Key', { id: { S: 'test-id' } });
  });
});

describe('Build transaction item', () => {
  let deleteItemBuilder: DeleteItemBuilder;
  let transactionItem: TransactWriteItem;

  beforeEach(() => {
    deleteItemBuilder = new DeleteItemBuilder();

    transactionItem = deleteItemBuilder
      .withKey({ id: { S: 'test-id' } })
      .fromTable('table-name')
      .buildTransactionItem();
  });

  it('should build transaction item with table name', () => {
    expect(transactionItem).toHaveProperty('Delete.TableName', 'table-name');
  });

  it('should build transaction item with key', () => {
    expect(transactionItem).toHaveProperty('Delete.Key', {
      id: { S: 'test-id' },
    });
  });
});

describe('Run', () => {
  const mockDynamoDBClient = mockClient(DynamoDBClient);

  const initialConditions = { itemIsDeletedFromTable: false };
  let finalConditions: typeof initialConditions;

  let deleteItemBuilder: DeleteItemBuilder;

  beforeEach(() => {
    deleteItemBuilder = new DeleteItemBuilder()
      .fromTable('table-name')
      .withKey({
        id: { S: 'test-id' },
      });

    finalConditions = clone(initialConditions);
  });

  it('should run delete command', async () => {
    mockDynamoDBClient.on(DeleteItemCommand).callsFake(() => {
      finalConditions.itemIsDeletedFromTable = true;
    });

    await deleteItemBuilder.run(
      mockDynamoDBClient as unknown as DynamoDBClient,
    );

    expect(finalConditions.itemIsDeletedFromTable).toBe(true);
  });

  it('should throw error on dynamodb service exception', async () => {
    mockDynamoDBClient.on(DeleteItemCommand).rejects(
      new DynamoDBServiceException({
        name: 'DynamoDBServiceException',
        $fault: 'client',
        $metadata: {},
      }),
    );

    await expect(
      deleteItemBuilder.run(mockDynamoDBClient as unknown as DynamoDBClient),
    ).rejects.toThrow(DeleteItemError);
  });
});
