import {
  type DeleteItemInput,
  type DynamoDBClient,
  DeleteItemCommand,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { type Item } from '../types.js';
import { DeleteItemError } from '../errors/index.js';

export class DeleteItemBuilder {
  private deleteItemInput: DeleteItemInput = {
    TableName: undefined,
    Key: {},
  };

  public buildCommand(): DeleteItemCommand {
    return new DeleteItemCommand(this.deleteItemInput);
  }

  public buildTransactionItem(): TransactWriteItem {
    return { Delete: this.deleteItemInput };
  }

  public async run(dynamodbClient: DynamoDBClient): Promise<void> {
    try {
      const deleteItemCommand = this.buildCommand();
      await dynamodbClient.send(deleteItemCommand);
    } catch (error: unknown) {
      throw new DeleteItemError(error);
    }
  }

  public fromTable(tableName: string): DeleteItemBuilder {
    this.deleteItemInput.TableName = tableName;
    return this;
  }

  public withKey(key: Item): DeleteItemBuilder {
    this.deleteItemInput.Key = key;
    return this;
  }
}
