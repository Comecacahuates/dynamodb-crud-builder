import {
  type DeleteItemInput,
  type DeleteItemOutput,
  type DynamoDBClient,
  DeleteItemCommand,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';

export class DeleteItem {
  private deleteItemInput: DeleteItemInput = {
    TableName: undefined,
    Key: {},
  };

  public constructor(key: Record<string, NativeAttributeValue>) {
    this.deleteItemInput.Key = marshall(key);
  }

  public fromTable(tableName: string): DeleteItem {
    this.deleteItemInput.TableName = tableName;
    return this;
  }

  public toCommand(): DeleteItemCommand {
    return new DeleteItemCommand(this.deleteItemInput);
  }

  public toTransactionItem(): TransactWriteItem {
    return { Delete: this.deleteItemInput };
  }

  public async commit(
    dynamodbClient: DynamoDBClient,
  ): Promise<DeleteItemOutput> {
    return await dynamodbClient.send(this.toCommand());
  }
}
