import { type Expression } from '../Expression.js';
import { type ExpressionAttributeNames } from '../ExpressionAttributeNames.js';
import { type ExpressionAttributeValues } from '../ExpressionAttributeValues.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type Conditions = Condition[];

export class Condition implements Expression {
  public constructor(
    private stringExpression: string,
    private attributeNames: AttributeNames = new AttributeNames(),
    private attributeValues: AttributeValues = new AttributeValues(),
  ) {}

  public getString(): string {
    return this.stringExpression;
  }

  public getAttributeNames(): ExpressionAttributeNames {
    return this.attributeNames.getExpressionAttributeNames();
  }

  getAttributeValues(): ExpressionAttributeValues {
    return this.attributeValues.getExpressionAttributeValues();
  }

  public and(...otherConditions: Conditions): Condition {
    const conditions = [this, ...otherConditions];

    return new Condition(
      this.buildConjunctionStringExpression(conditions),
      this.mergeAttributeNames(conditions),
      this.mergeAttributeValues(conditions),
    );
  }

  public or(...otherConditions: Array<Condition>): Condition {
    const conditions = [this, ...otherConditions];

    return new Condition(
      this.buildDisjunctionStringExpression(conditions),
      this.mergeAttributeNames(conditions),
      this.mergeAttributeValues(conditions),
    );
  }

  public not(): Condition {
    return new Condition(
      this.buildNegationStringExpression(this),
      this.mergeAttributeNames([this]),
      this.mergeAttributeValues([this]),
    );
  }

  private buildConjunctionStringExpression(conditions: Conditions): string {
    const eachStringExpression = conditions.map((eachCondition) =>
      eachCondition.getString(),
    );
    const stringExpression = eachStringExpression.join(' AND ');

    return `(${stringExpression})`;
  }

  private buildDisjunctionStringExpression(conditions: Conditions): string {
    const eachStringExpression = conditions.map((eachCondition) =>
      eachCondition.getString(),
    );
    const stringExpression = eachStringExpression.join(' OR ');

    return `(${stringExpression})`;
  }

  private buildNegationStringExpression(condition: Condition): string {
    return `(NOT ${condition.getString()})`;
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
}
