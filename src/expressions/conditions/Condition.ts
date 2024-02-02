import copy from '@stdlib/utils-copy';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../Expression.js';

export class Condition extends Expression {
  public constructor(
    expression: string,
    expressionAttributeNames: ExpressionAttributeNames = {},
    expressionAttributeValues: ExpressionAttributeValues = {},
  ) {
    super(expression, expressionAttributeNames, expressionAttributeValues);
  }

  public and(...otherConditions: Array<Condition>): Condition {
    const expressionString = [this, ...otherConditions]
      .map((condition) => condition.expressionString)
      .join(' AND ');

    return new Condition(
      `(${expressionString})`,
      this.mergeExpressionAttributeNames(...otherConditions),
      this.mergeExpressionAttributeValues(...otherConditions),
    );
  }

  public or(...otherConditions: Array<Condition>): Condition {
    const expressionString = [this, ...otherConditions]
      .map((condition) => condition.expressionString)
      .join(' OR ');

    return new Condition(
      `(${expressionString})`,
      this.mergeExpressionAttributeNames(...otherConditions),
      this.mergeExpressionAttributeValues(...otherConditions),
    );
  }

  public not(): Condition {
    return new Condition(
      `(NOT ${this.expressionString})`,
      copy(this.expressionAttributeNames),
      copy(this.expressionAttributeValues),
    );
  }
}
