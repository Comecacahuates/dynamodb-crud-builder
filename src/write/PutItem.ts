import {
  type DynamoDBClient,
  type PutItemInput,
  PutItemCommand,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';

export class PutItem {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public constructor(item: Record<string, NativeAttributeValue>) {
    this.putItemInput.Item = marshall(item);
  }

  public intoTable(tableName: string): PutItem {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public toCommand(): PutItemCommand {
    return new PutItemCommand(this.putItemInput);
  }

  public toTransactionItem(): TransactWriteItem {
    return { Put: this.putItemInput };
  }

  public async commit(dynamodbClient: DynamoDBClient): Promise<void> {
    const putItemCommand = this.toCommand();
    await dynamodbClient.send(putItemCommand);
  }
}
