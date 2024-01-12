import {
  type DynamoDBClient,
  type PutItemInput,
  PutItemCommand,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { PutItemError } from '../errors/index.js';
import { type Item } from '../item/index.js';

export class PutItemBuilder {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public buildCommand(): PutItemCommand {
    return new PutItemCommand(this.putItemInput);
  }

  public buildTransactionItem(): TransactWriteItem {
    return { Put: this.putItemInput };
  }

  public async run(dynamodbClient: DynamoDBClient): Promise<void> {
    try {
      const putItemCommand = this.buildCommand();
      await dynamodbClient.send(putItemCommand);
    } catch (error: unknown) {
      throw new PutItemError(error);
    }
  }

  public intoTable(tableName: string): PutItemBuilder {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public thisItem(item: Item): PutItemBuilder {
    this.putItemInput.Item = item;
    return this;
  }
}
