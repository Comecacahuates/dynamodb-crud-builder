import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type ConditionExpressions = ConditionExpression[];

export class ConditionExpression implements Expression {
  public constructor(
    private expressionString: string,
    private attributeNames: AttributeNames = new AttributeNames(),
    private attributeValues: AttributeValues = new AttributeValues(),
  ) {}

  public getString(): string {
    return this.expressionString;
  }

  public getAttributeNames(): AttributeNames {
    return this.attributeNames;
  }

  getAttributeValues(): AttributeValues {
    return this.attributeValues;
  }

  public and(...otherConditions: ConditionExpressions): ConditionExpression {
    const conditions = [this, ...otherConditions],
      eachStringExpression = conditions.map((eachCondition) =>
        eachCondition.getString(),
      ),
      expressionString = eachStringExpression.join(' AND ');

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  public or(
    ...otherConditions: Array<ConditionExpression>
  ): ConditionExpression {
    const conditions = [this, ...otherConditions],
      eachStringExpression = conditions.map((eachCondition) =>
        eachCondition.getString(),
      ),
      expressionString = eachStringExpression.join(' OR ');

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  public not(): ConditionExpression {
    const conditions = [this],
      expressionString = `NOT ${this.getString()}`;

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  private mergeAttributeNames(
    conditions: ConditionExpressions,
  ): AttributeNames {
    const allAttributeNames = conditions.map(
      (eachCondition) => eachCondition.attributeNames,
    );
    return AttributeNames.merge(allAttributeNames);
  }

  private mergeAttributeValues(
    conditions: ConditionExpressions,
  ): AttributeValues {
    const allAttributeValues = conditions.map(
      (eachCondition) => eachCondition.attributeValues,
    );
    return AttributeValues.merge(allAttributeValues);
  }

  protected buildCondition(
    expressionString: string,
    conditions: ConditionExpressions,
  ): ConditionExpression {
    return new ConditionExpression(
      expressionString,
      this.mergeAttributeNames(conditions),
      this.mergeAttributeValues(conditions),
    );
  }
}
