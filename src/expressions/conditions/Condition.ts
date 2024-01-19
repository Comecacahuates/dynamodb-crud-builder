import { type ExpressionAttributeNames } from '../types.js';

export class Condition {
  public constructor(
    public readonly symbolicValue: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames = {},
  ) {}

  public and(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const conjunction = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' AND ');

    const expressionAttributeNames = allConditions.reduce(
      (expressionAttributeNames, condition) => ({
        ...expressionAttributeNames,
        ...condition.expressionAttributeNames,
      }),
      {},
    );

    return new Condition(`(${conjunction})`, expressionAttributeNames);
  }

  public or(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const disjunction = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' OR ');

    return new Condition(`(${disjunction})`);
  }

  public not(): Condition {
    return new Condition(`(NOT ${this.symbolicValue})`);
  }
}
