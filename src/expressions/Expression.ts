import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import merge from '@stdlib/utils-merge';

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;

export class Expression {
  public constructor(
    private readonly expressionString: string,
    private readonly expressionAttributeNames: ExpressionAttributeNames = {},
    private readonly expressionAttributeValues: ExpressionAttributeValues = {},
  ) {}

  public getExpressionString(): string {
    return this.expressionString;
  }

  public getExpressionAttributeNames(): ExpressionAttributeNames {
    return this.expressionAttributeNames;
  }

  public getExpressionAttributeValues(): ExpressionAttributeValues {
    return this.expressionAttributeValues;
  }

  public mergeExpressionAttributeNames(
    ...otherExpressions: Array<Expression>
  ): ExpressionAttributeNames {
    const allExpressions = [this, ...otherExpressions];
    const allExpressionAttributeNames = allExpressions.map(
      (expression) => expression.expressionAttributeNames,
    );
    return merge({}, ...allExpressionAttributeNames);
  }
}
