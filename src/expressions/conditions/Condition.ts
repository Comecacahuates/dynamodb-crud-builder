import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../types.js';

export class Condition {
  public constructor(
    public readonly expression: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames = {},
    public readonly expressionAttributeValues: ExpressionAttributeValues = {},
  ) {}

  private static mergeExpressionAttributeNames(conditions: Array<Condition>) {
    return conditions.reduce(
      (expressionAttributeNames, condition) => ({
        ...expressionAttributeNames,
        ...condition.expressionAttributeNames,
      }),
      {},
    );
  }

  private static mergeExpressionAttributeValues(conditions: Array<Condition>) {
    return conditions.reduce(
      (expressionAttributeValues, condition) => ({
        ...expressionAttributeValues,
        ...condition.expressionAttributeValues,
      }),
      {},
    );
  }

  public and(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const conjunctionExpression = allConditions
      .map((condition) => condition.expression)
      .join(' AND ');

    const expressionAttributeNames =
      Condition.mergeExpressionAttributeNames(allConditions);

    const expressionAttributeValues =
      Condition.mergeExpressionAttributeValues(allConditions);

    return new Condition(
      `(${conjunctionExpression})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public or(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const disjunctionExpression = allConditions
      .map((condition) => condition.expression)
      .join(' OR ');

    const expressionAttributeNames =
      Condition.mergeExpressionAttributeNames(allConditions);

    const expressionAttributeValues =
      Condition.mergeExpressionAttributeValues(allConditions);

    return new Condition(
      `(${disjunctionExpression})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public not(): Condition {
    return new Condition(
      `(NOT ${this.expression})`,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }
}
