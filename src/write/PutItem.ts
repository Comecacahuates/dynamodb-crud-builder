import {
  type PutItemInput,
  type PutItemOutput,
  PutItemCommand,
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

export class PutItem {
  private putItemInput: PutItemInput;
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();

  public constructor(item: Record<string, NativeAttributeValue>) {
    this.putItemInput = {
      Item: marshall(item, { removeUndefinedValues: true }),
      TableName: undefined,
      ConditionExpression: undefined,
    };
  }

  public intoTable(tableName: string): PutItem {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public onlyIf(conditionExpression: ConditionExpression): PutItem {
    this.putItemInput.ConditionExpression = conditionExpression.getString();

    this.mergeAttributeNames(conditionExpression);
    this.mergeAttributeValues(conditionExpression);

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

  private mergeAttributeNames(expression: Expression): void {
    this.attributeNames.merge(expression.getAttributeNames());
    this.putItemInput.ExpressionAttributeNames =
      this.attributeNames.toExpressionAttributeNames();
  }

  private mergeAttributeValues(expression: Expression): void {
    this.attributeValues.merge(expression.getAttributeValues());
    this.putItemInput.ExpressionAttributeValues =
      this.attributeValues.toExpressionAttributeValues();
  }
}
