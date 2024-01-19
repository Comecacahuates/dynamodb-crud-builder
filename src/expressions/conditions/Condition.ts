import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../types.js';

export class Condition {
  public constructor(
    public readonly symbolicValue: string,
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
    const conjunctionSymbolicValue = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' AND ');

    const expressionAttributeNames =
      Condition.mergeExpressionAttributeNames(allConditions);

    const expressionAttributeValues =
      Condition.mergeExpressionAttributeValues(allConditions);

    return new Condition(
      `(${conjunctionSymbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public or(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const disjunctionSymbolicValue = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' OR ');

    const expressionAttributeNames =
      Condition.mergeExpressionAttributeNames(allConditions);

    const expressionAttributeValues =
      Condition.mergeExpressionAttributeValues(allConditions);

    return new Condition(
      `(${disjunctionSymbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public not(): Condition {
    return new Condition(
      `(NOT ${this.symbolicValue})`,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }
}
