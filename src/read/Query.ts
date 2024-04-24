import {
  type QueryInput,
  type QueryOutput,
  QueryCommand,
  type DynamoDBClient,
  paginateQuery,
  type DynamoDBPaginationConfiguration,
} from '@aws-sdk/client-dynamodb';
import { type NativeAttributeValue, marshall } from '@aws-sdk/util-dynamodb';
import { type Paginator } from '@smithy/types';
import {
  AttributeNames,
  AttributeValues,
} from '../expressions/attributes/index.js';
import {
  type Expression,
  type ProjectionExpression,
} from '../expressions/index.js';

export class Query {
  private queryInput: QueryInput;
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();

  public constructor(keyConditionExpression: Expression) {
    this.queryInput = {
      KeyConditionExpression: keyConditionExpression.getString(),
      TableName: undefined,
      IndexName: undefined,
      FilterExpression: undefined,
      ProjectionExpression: undefined,
      ExclusiveStartKey: undefined,
      Limit: undefined,
      ScanIndexForward: undefined,
      ExpressionAttributeNames: undefined,
      ExpressionAttributeValues: undefined,
    };

    this.mergeAttributeNames(keyConditionExpression);
    this.mergeAttributeValues(keyConditionExpression);
  }

  public fromTable(tableName: string): Query {
    this.queryInput.TableName = tableName;
    return this;
  }

  public byIndex(indexName: string): Query {
    this.queryInput.IndexName = indexName;
    return this;
  }

  public filteringBy(filterExpression: Expression): Query {
    this.queryInput.FilterExpression = filterExpression.getString();

    this.mergeAttributeNames(filterExpression);
    this.mergeAttributeValues(filterExpression);

    return this;
  }

  public withProjection(projectionExpression: ProjectionExpression): Query {
    this.queryInput.ProjectionExpression = projectionExpression.getString();

    this.mergeAttributeNames(projectionExpression);
    this.mergeAttributeValues(projectionExpression);

    return this;
  }

  public startingAt(startKey: Record<string, NativeAttributeValue>): Query {
    this.queryInput.ExclusiveStartKey = marshall(startKey, {
      removeUndefinedValues: true,
    });
    return this;
  }

  public limitTo(limit: number): Query {
    this.queryInput.Limit = limit;
    return this;
  }

  public inDescendingOrder(): Query {
    this.queryInput.ScanIndexForward = false;
    return this;
  }

  public inAscendingOrder(): Query {
    this.queryInput.ScanIndexForward = true;
    return this;
  }

  public asCommand(): QueryCommand {
    return new QueryCommand(this.queryInput);
  }

  public getPaginator(
    configuration: DynamoDBPaginationConfiguration,
  ): Paginator<QueryOutput> {
    return paginateQuery(configuration, this.queryInput);
  }

  public async commit(dynamodbClient: DynamoDBClient): Promise<QueryOutput> {
    return await dynamodbClient.send(this.asCommand());
  }

  private mergeAttributeNames(expression: Expression): void {
    this.attributeNames.merge(expression.getAttributeNames());
    this.queryInput.ExpressionAttributeNames =
      this.attributeNames.toExpressionAttributeNames();
  }

  private mergeAttributeValues(expression: Expression): void {
    this.attributeValues.merge(expression.getAttributeValues());
    this.queryInput.ExpressionAttributeValues =
      this.attributeValues.toExpressionAttributeValues();
  }
}
