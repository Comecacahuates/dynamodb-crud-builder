import {
  type DeleteItemInput,
  type DeleteItemOutput,
  DeleteItemCommand,
  type TransactWriteItem,
  type WriteRequest,
  type DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';

export class DeleteItem {
  private deleteItemInput: DeleteItemInput;

  public constructor(key: Record<string, NativeAttributeValue>) {
    this.deleteItemInput = {
      Key: marshall(key),
      TableName: undefined,
    };
  }

  public fromTable(tableName: string): DeleteItem {
    this.deleteItemInput.TableName = tableName;
    return this;
  }

  public toCommand(): DeleteItemCommand {
    return new DeleteItemCommand(this.deleteItemInput);
  }

  public toTransactWriteItem(): TransactWriteItem {
    return { Delete: this.deleteItemInput };
  }

  public toBatchWriteRequestItem(): Record<string, WriteRequest> {
    const tableName = this.deleteItemInput.TableName!;
    const key = this.deleteItemInput.Key;
    return { [tableName]: { DeleteRequest: { Key: key } } };
  }

  public async commit(
    dynamodbClient: DynamoDBClient,
  ): Promise<DeleteItemOutput> {
    return await dynamodbClient.send(this.toCommand());
  }
}
