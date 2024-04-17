import { Condition } from '../conditions/Condition.js';
import { type Expression } from '../Expression.js';
import { type ExpressionAttributeNames } from '../ExpressionAttributeNames.js';
import { type ExpressionAttributeValues } from '../ExpressionAttributeValues.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type Operands = Operand[];

export class Operand implements Expression {
  public constructor(
    private expressionString: string,
    private attributeNames: AttributeNames = new AttributeNames(),
    private attributeValues: AttributeValues = new AttributeValues(),
  ) {}

  public getString(): string {
    return this.expressionString;
  }

  public getAttributeNames(): ExpressionAttributeNames {
    return this.attributeNames.getExpressionAttributeNames();
  }

  getAttributeValues(): ExpressionAttributeValues {
    return this.attributeValues.getExpressionAttributeValues();
  }

  public plus(anotherOperand: Operand): Operand {
    const expressionString = `${this.expressionString} + ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildOperand(expressionString, operands);
  }

  public minus(anotherOperand: Operand): Operand {
    const expressionString = `${this.expressionString} - ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildOperand(expressionString, operands);
  }

  public equalTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} = ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <> ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public lessThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} < ${anotherOperand.expressionString}`;
    const operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <= ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} > ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} >= ${anotherOperand.expressionString}`,
      operands = [this, anotherOperand];

    return this.buildCondition(expressionString, operands);
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const expressionString = `${this.expressionString} BETWEEN ${lowerBound.expressionString} AND ${upperBound.expressionString}`,
      operands = [this, lowerBound, upperBound];

    return this.buildCondition(expressionString, operands);
  }

  public in(list: Array<Operand>): Condition {
    const expressionString = `${this.expressionString} IN (${list
        .map((operand) => operand.expressionString)
        .join(', ')})`,
      operands = [this, ...list];

    return this.buildCondition(expressionString, operands);
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

  protected buildOperand(
    expressionString: string,
    operands: Operands,
  ): Operand {
    return new Operand(
      expressionString,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }

  protected buildCondition(
    expressionString: string,
    operands: Operands,
  ): Condition {
    return new Condition(
      expressionString,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }
}
