import { Condition } from '../conditions/Condition.js';
import { type Expression } from '../Expression.js';
import { type ExpressionAttributeNames } from '../ExpressionAttributeNames.js';
import { type ExpressionAttributeValues } from '../ExpressionAttributeValues.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type Operands = Operand[];

export class Operand implements Expression {
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

  public plus(anotherOperand: Operand): Operand {
    const stringExpression = `${this.stringExpression} + ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildOperand(stringExpression, operands);
  }

  public minus(anotherOperand: Operand): Operand {
    const stringExpression = `${this.stringExpression} - ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildOperand(stringExpression, operands);
  }

  public equalTo(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} = ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} <> ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public lessThan(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} < ${anotherOperand.stringExpression}`;
    const operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} <= ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} > ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const stringExpression = `${this.stringExpression} >= ${anotherOperand.stringExpression}`,
      operands = [this, anotherOperand];

    return this.buildCondition(stringExpression, operands);
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const stringExpression = `${this.stringExpression} BETWEEN ${lowerBound.stringExpression} AND ${upperBound.stringExpression}`,
      operands = [this, lowerBound, upperBound];

    return this.buildCondition(stringExpression, operands);
  }

  public in(list: Array<Operand>): Condition {
    const stringExpression = `${this.stringExpression} IN (${list
        .map((operand) => operand.stringExpression)
        .join(', ')})`,
      operands = [this, ...list];

    return this.buildCondition(stringExpression, operands);
  }

  private mergeAttributeNames(operands: Operands): AttributeNames {
    const allAttributeNames = operands.map(
      (eachOperand) => eachOperand.attributeNames,
    );
    return AttributeNames.merge(allAttributeNames);
  }

  private mergeAttributeValues(operands: Operands): AttributeValues {
    const allAttributeValues = operands.map(
      (eachOperand) => eachOperand.attributeValues,
    );
    return AttributeValues.merge(allAttributeValues);
  }

  private buildOperand(stringExpression: string, operands: Operands): Operand {
    return new Operand(
      stringExpression,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }

  private buildCondition(
    stringExpression: string,
    operands: Operands,
  ): Condition {
    return new Condition(
      stringExpression,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }
}
