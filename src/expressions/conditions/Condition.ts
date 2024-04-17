import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type Conditions = Condition[];

export class Condition implements Expression {
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

  public and(...otherConditions: Conditions): Condition {
    const conditions = [this, ...otherConditions],
      eachStringExpression = conditions.map((eachCondition) =>
        eachCondition.getString(),
      ),
      expressionString = eachStringExpression.join(' AND ');

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  public or(...otherConditions: Array<Condition>): Condition {
    const conditions = [this, ...otherConditions],
      eachStringExpression = conditions.map((eachCondition) =>
        eachCondition.getString(),
      ),
      expressionString = eachStringExpression.join(' OR ');

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  public not(): Condition {
    const conditions = [this],
      expressionString = `NOT ${this.getString()}`;

    return this.buildCondition(`(${expressionString})`, conditions);
  }

  private mergeAttributeNames(conditions: Conditions): AttributeNames {
    const allAttributeNames = conditions.map(
      (eachCondition) => eachCondition.attributeNames,
    );
    return AttributeNames.merge(allAttributeNames);
  }

  private mergeAttributeValues(conditions: Conditions): AttributeValues {
    const allAttributeValues = conditions.map(
      (eachCondition) => eachCondition.attributeValues,
    );
    return AttributeValues.merge(allAttributeValues);
  }

  protected buildCondition(
    expressionString: string,
    conditions: Conditions,
  ): Condition {
    return new Condition(
      expressionString,
      this.mergeAttributeNames(conditions),
      this.mergeAttributeValues(conditions),
    );
  }
}
