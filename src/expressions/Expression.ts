import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import merge from '@stdlib/utils-merge';

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;

export class Expression {
  public constructor(
    protected readonly expressionString: string,
    protected readonly attributeNames: ExpressionAttributeNames = {},
    protected readonly attributeValues: ExpressionAttributeValues = {},
  ) {}

  public getExpressionString(): string {
    return this.expressionString;
  }

  public getAttributeNames(): ExpressionAttributeNames {
    return this.attributeNames;
  }

  public getAttributeValues(): ExpressionAttributeValues {
    return this.attributeValues;
  }

  public mergeAttributeNames(
    ...otherExpressions: Array<Expression>
  ): ExpressionAttributeNames {
    const allExpressions = [this, ...otherExpressions];
    const allExpressionAttributeNames = allExpressions.map(
      (expression) => expression.attributeNames,
    );
    return merge({}, ...allExpressionAttributeNames);
  }

  public mergeAttributeValues(
    ...otherExpressions: Array<Expression>
  ): ExpressionAttributeValues {
    const allExpressions = [this, ...otherExpressions];
    const allExpressionAttributeValues = allExpressions.map(
      (expression) => expression.attributeValues,
    );
    return merge({}, ...allExpressionAttributeValues);
  }
}
