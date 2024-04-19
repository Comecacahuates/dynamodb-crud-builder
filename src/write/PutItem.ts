import {
  type PutItemInput,
  type PutItemOutput,
  PutItemCommand,
  type TransactWriteItem,
  type WriteRequest,
  type DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';

export class PutItem {
  private putItemInput: PutItemInput;

  public constructor(item: Record<string, NativeAttributeValue>) {
    this.putItemInput = {
      Item: marshall(item),
      TableName: undefined,
    };
  }

  public intoTable(tableName: string): PutItem {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public asCommand(): PutItemCommand {
    return new PutItemCommand(this.putItemInput);
  }

  public asTransactWriteItem(): TransactWriteItem {
    return { Put: this.putItemInput };
  }

  public toBatchWriteRequestItem(): Record<string, WriteRequest> {
    const tableName = this.putItemInput.TableName!;
    const item = this.putItemInput.Item;
    return { [tableName]: { PutRequest: { Item: item } } };
  }

  public async commit(dynamodbClient: DynamoDBClient): Promise<PutItemOutput> {
    return await dynamodbClient.send(this.asCommand());
  }
}
