import {
  type GetItemInput,
  type GetItemOutput,
  GetItemCommand,
  type DynamoDBClient,
  type TransactGetItem,
} from '@aws-sdk/client-dynamodb';
import { type NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';
import { AttributeNames } from '../expressions/attributes/index.js';
import {
  type Expression,
  type ProjectionExpression,
} from '../expressions/index.js';

export class GetItem {
  private getItemInput: GetItemInput;
  private attributeNames = new AttributeNames();

  public constructor(key: Record<string, NativeAttributeValue>) {
    this.getItemInput = {
      Key: marshall(key, { removeUndefinedValues: true }),
      TableName: undefined,
      ProjectionExpression: undefined,
      ExpressionAttributeNames: undefined,
    };
  }

  public fromTable(tableName: string): GetItem {
    this.getItemInput.TableName = tableName;
    return this;
  }

  public withProjection(projectionExpression: ProjectionExpression): GetItem {
    this.getItemInput.ProjectionExpression = projectionExpression.getString();

    this.mergeAttributeNames(projectionExpression);

    return this;
  }

  public asCommand(): GetItemCommand {
    return new GetItemCommand(this.getItemInput);
  }

  public asTransactGetItem(): TransactGetItem {
    return {
      Get: this.getItemInput,
    };
  }

  public async commit(dynamodbClient: DynamoDBClient): Promise<GetItemOutput> {
    return await dynamodbClient.send(this.asCommand());
  }

  private mergeAttributeNames(expression: Expression): void {
    this.attributeNames.merge(expression.getAttributeNames());
    this.getItemInput.ExpressionAttributeNames =
      this.attributeNames.toExpressionAttributeNames();
  }
}
