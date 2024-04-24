import {
  type DeleteItemInput,
  type DeleteItemOutput,
  DeleteItemCommand,
  type TransactWriteItem,
  type WriteRequest,
  type DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';
import {
  AttributeNames,
  AttributeValues,
} from '../expressions/attributes/index.js';
import {
  type Expression,
  type ConditionExpression,
} from '../expressions/index.js';
export class DeleteItem {
  private deleteItemInput: DeleteItemInput;
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();

  public constructor(key: Record<string, NativeAttributeValue>) {
    this.deleteItemInput = {
      Key: marshall(key, { removeUndefinedValues: true }),
      TableName: undefined,
      ConditionExpression: undefined,
    };
  }

  public fromTable(tableName: string): DeleteItem {
    this.deleteItemInput.TableName = tableName;
    return this;
  }

  public onlyIf(conditionExpression: ConditionExpression): DeleteItem {
    this.deleteItemInput.ConditionExpression = conditionExpression.getString();

    this.mergeAttributeNames(conditionExpression);
    this.mergeAttributeValues(conditionExpression);

    return this;
  }

  public asCommand(): DeleteItemCommand {
    return new DeleteItemCommand(this.deleteItemInput);
  }

  public asTransactWriteItem(): TransactWriteItem {
    return { Delete: this.deleteItemInput };
  }

  public asBatchWriteRequestItem(): Record<string, WriteRequest> {
    const tableName = this.deleteItemInput.TableName!;
    const key = this.deleteItemInput.Key;
    return { [tableName]: { DeleteRequest: { Key: key } } };
  }

  public async commit(
    dynamodbClient: DynamoDBClient,
  ): Promise<DeleteItemOutput> {
    return await dynamodbClient.send(this.asCommand());
  }

  private mergeAttributeNames(expression: Expression): void {
    this.attributeNames.merge(expression.getAttributeNames());
    this.deleteItemInput.ExpressionAttributeNames =
      this.attributeNames.toExpressionAttributeNames();
  }

  private mergeAttributeValues(expression: Expression): void {
    this.attributeValues.merge(expression.getAttributeValues());
    this.deleteItemInput.ExpressionAttributeValues =
      this.attributeValues.toExpressionAttributeValues();
  }
}
