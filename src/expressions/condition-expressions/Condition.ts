import copy from '@stdlib/utils-copy';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../Expression.js';

export class Condition extends Expression {
  public constructor(
    expressionString: string,
    expressionAttributeNames: ExpressionAttributeNames = {},
    expressionAttributeValues: ExpressionAttributeValues = {},
  ) {
    super(
      expressionString,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public and(...otherConditions: Array<Condition>): Condition {
    const expressionString = [this, ...otherConditions]
      .map((condition) => condition.expressionString)
      .join(' AND ');

    return new Condition(
      `(${expressionString})`,
      this.mergeAttributeNames(...otherConditions),
      this.mergeAttributeValues(...otherConditions),
    );
  }

  public or(...otherConditions: Array<Condition>): Condition {
    const expressionString = [this, ...otherConditions]
      .map((condition) => condition.expressionString)
      .join(' OR ');

    return new Condition(
      `(${expressionString})`,
      this.mergeAttributeNames(...otherConditions),
      this.mergeAttributeValues(...otherConditions),
    );
  }

  public not(): Condition {
    const expressionString = `(NOT ${this.expressionString})`;

    return new Condition(
      expressionString,
      copy(this.attributeNames),
      copy(this.attributeValues),
    );
  }
}
