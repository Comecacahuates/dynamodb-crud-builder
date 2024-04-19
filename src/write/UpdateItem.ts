import {
  type UpdateItemInput,
  type UpdateItemOutput,
  UpdateItemCommand,
  type Update,
  type TransactWriteItem,
  type DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { type NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';
import {
  AttributeNames,
  AttributeValues,
} from '../expressions/attributes/index.js';
import {
  type Expression,
  type UpdateExpression,
  type ConditionExpression,
} from '../expressions/index.js';

export class UpdateItem {
  private updateItemInput: UpdateItemInput;
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();

  public constructor(key: Record<string, NativeAttributeValue>) {
    this.updateItemInput = {
      Key: marshall(key),
      TableName: undefined,
      UpdateExpression: undefined,
      ConditionExpression: undefined,
      ExpressionAttributeNames: undefined,
      ExpressionAttributeValues: undefined,
    };
  }

  public inTable(tableName: string): UpdateItem {
    this.updateItemInput.TableName = tableName;
    return this;
  }

  public applying(updateExpression: UpdateExpression): UpdateItem {
    this.updateItemInput.UpdateExpression = updateExpression.getString();

    this.mergeAttributeNames(updateExpression);
    this.mergeAttributeValues(updateExpression);

    return this;
  }

  public onlyIf(conditionExpression: ConditionExpression): UpdateItem {
    this.updateItemInput.ConditionExpression = conditionExpression.getString();

    this.mergeAttributeNames(conditionExpression);
    this.mergeAttributeValues(conditionExpression);

    return this;
  }

  public toCommand(): UpdateItemCommand {
    return new UpdateItemCommand(this.updateItemInput);
  }

  public toTransactWriteItem(): TransactWriteItem {
    return {
      Update: this.updateItemInput as Update,
    };
  }

  public async commit(
    dynamodbClient: DynamoDBClient,
  ): Promise<UpdateItemOutput> {
    return await dynamodbClient.send(this.toCommand());
  }

  private mergeAttributeNames(expression: Expression): void {
    this.attributeNames.merge(expression.getAttributeNames());
    this.updateItemInput.ExpressionAttributeNames =
      this.attributeNames.toExpressionAttributeNames();
  }

  private mergeAttributeValues(expression: Expression): void {
    this.attributeValues.merge(expression.getAttributeValues());
    this.updateItemInput.ExpressionAttributeValues =
      this.attributeValues.toExpressionAttributeValues();
  }
}
