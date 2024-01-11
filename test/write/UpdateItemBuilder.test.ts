import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  DynamoDBClient,
  UpdateItemCommand,
  DynamoDBServiceException,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import clone from 'just-clone';
import { UpdateItemBuilder } from '../../src/write/UpdateItemBuilder.js';
import { UpdateItemError } from '../../src/errors/index.js';

describe('Build update item command', () => {
  let updateItemBuilder: UpdateItemBuilder;
  let command: UpdateItemCommand;

  beforeEach(() => {
    updateItemBuilder = new UpdateItemBuilder();

    command = updateItemBuilder
      .withKey({ id: { S: 'test-id' } })
      .inTable('table-name')
      .setValue('attr0[1].a', 'new-value', { preventOverwriting: true })
      .appendItemsToList('attr1', ['a', 'b'])
      .addNumber('attr2.c[2]', 2)
      .subtractNumber('attr3', 3)
      .addElementsToSet('attr4', new Set(['a', 'b']))
      .removeAttribute('attr5')
      .deleteElementsFromSet('attr6', new Set(['a', 'b']))
      .buildCommand();
  });

  it('should build update command with table name', () => {
    expect(command).toHaveProperty('input.TableName', 'table-name');
  });

  it('should build update command with key', () => {
    expect(command).toHaveProperty('input.Key', { id: { S: 'test-id' } });
  });

  it('should have update expression', () => {
    expect(command).toHaveProperty(
      'input.UpdateExpression',
      'SET #attr0[1].#a = if_not_exists(#attr0[1].#a, :attr01a), #attr1 = list_append(#attr1, :attr1), #attr2.#c[2] = #attr2.#c[2] + :attr2c2, #attr3 = #attr3 - :attr3 ADD #attr4 :attr4 REMOVE #attr5 DELETE #attr6 :attr6',
    );
  });

  it('should have expression attribute names', () => {
    expect(command).toHaveProperty('input.ExpressionAttributeNames', {
      '#attr0': 'attr0',
      '#attr1': 'attr1',
      '#attr2': 'attr2',
      '#a': 'a',
      '#c': 'c',
      '#attr3': 'attr3',
      '#attr4': 'attr4',
      '#attr5': 'attr5',
      '#attr6': 'attr6',
    });
  });

  it('should have expression attribute values', () => {
    expect(command).toHaveProperty('input.ExpressionAttributeValues', {
      ':attr01a': { S: 'new-value' },
      ':attr1': { L: [{ S: 'a' }, { S: 'b' }] },
      ':attr2c2': { N: '2' },
      ':attr3': { N: '3' },
      ':attr4': { SS: ['a', 'b'] },
      ':attr6': { SS: ['a', 'b'] },
    });
  });
});

describe('Build transaction item', () => {
  let updateItemBuilder: UpdateItemBuilder;
  let transactionItem: TransactWriteItem;

  beforeEach(() => {
    updateItemBuilder = new UpdateItemBuilder();

    transactionItem = updateItemBuilder
      .withKey({ id: { S: 'test-id' } })
      .inTable('table-name')
      .setValue('attr0[1].a', 'new-value', { preventOverwriting: true })
      .appendItemsToList('attr1', ['a', 'b'])
      .addNumber('attr2.c[2]', 2)
      .subtractNumber('attr3', 3)
      .addElementsToSet('attr4', new Set(['a', 'b']))
      .removeAttribute('attr5')
      .deleteElementsFromSet('attr6', new Set(['a', 'b']))
      .buildTransactionItem();
  });

  it('should build transaction item with table name', () => {
    expect(transactionItem).toHaveProperty('Update.TableName', 'table-name');
  });

  it('should build transaction item with key', () => {
    expect(transactionItem).toHaveProperty(
      'Update.Key',
      expect.objectContaining({ id: { S: 'test-id' } }),
    );
  });

  it('should have update expression', () => {
    expect(transactionItem).toHaveProperty(
      'Update.UpdateExpression',
      'SET #attr0[1].#a = if_not_exists(#attr0[1].#a, :attr01a), #attr1 = list_append(#attr1, :attr1), #attr2.#c[2] = #attr2.#c[2] + :attr2c2, #attr3 = #attr3 - :attr3 ADD #attr4 :attr4 REMOVE #attr5 DELETE #attr6 :attr6',
    );
  });

  it('should have expression attribute names', () => {
    expect(transactionItem).toHaveProperty('Update.ExpressionAttributeNames', {
      '#attr0': 'attr0',
      '#attr1': 'attr1',
      '#attr2': 'attr2',
      '#a': 'a',
      '#c': 'c',
      '#attr3': 'attr3',
      '#attr4': 'attr4',
      '#attr5': 'attr5',
      '#attr6': 'attr6',
    });
  });

  it('should have expression attribute values', () => {
    expect(transactionItem).toHaveProperty('Update.ExpressionAttributeValues', {
      ':attr01a': { S: 'new-value' },
      ':attr1': { L: [{ S: 'a' }, { S: 'b' }] },
      ':attr2c2': { N: '2' },
      ':attr3': { N: '3' },
      ':attr4': { SS: ['a', 'b'] },
      ':attr6': { SS: ['a', 'b'] },
    });
  });
});

describe('Run', () => {
  const mockDynamodbClient = mockClient(DynamoDBClient);

  const initialConditions = { itemWasUpdated: false };
  let finalConditions: typeof initialConditions;

  let updateItemBuilder: UpdateItemBuilder;

  beforeEach(() => {
    updateItemBuilder = new UpdateItemBuilder()
      .withKey({ id: { S: 'test-id' } })
      .inTable('table-name')
      .setValue('attr0[1].a', 'new-value', { preventOverwriting: true })
      .appendItemsToList('attr1', ['a', 'b'])
      .addNumber('attr2.c[2]', 2)
      .subtractNumber('attr3', 3)
      .addElementsToSet('attr4', new Set(['a', 'b']))
      .removeAttribute('attr5')
      .deleteElementsFromSet('attr6', new Set(['a', 'b']));

    finalConditions = clone(initialConditions);
  });

  it('should run update command', async () => {
    mockDynamodbClient.on(UpdateItemCommand).callsFake(() => {
      finalConditions.itemWasUpdated = true;
    });

    await updateItemBuilder.run(
      mockDynamodbClient as unknown as DynamoDBClient,
    );

    expect(finalConditions.itemWasUpdated).toBe(true);
  });

  it('should throw error on dynamodb service exception', async () => {
    mockDynamodbClient.on(UpdateItemCommand).rejects(
      new DynamoDBServiceException({
        name: 'DynamoDBServiceException',
        $fault: 'client',
        $metadata: {},
      }),
    );

    await expect(
      updateItemBuilder.run(mockDynamodbClient as unknown as DynamoDBClient),
    ).rejects.toThrow(UpdateItemError);
  });
});
