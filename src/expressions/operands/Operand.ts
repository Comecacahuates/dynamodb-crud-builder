import { Condition } from '../conditions/Condition.js';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../Expression.js';

export class Operand extends Expression {
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

  public plus(anotherOperand: Operand): Operand {
    const expressionString = `${this.expressionString} + ${anotherOperand.expressionString}`;

    return new Operand(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public minus(anotherOperand: Operand): Operand {
    const expressionString = `${this.expressionString} - ${anotherOperand.expressionString}`;

    return new Operand(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public equalTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} = ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <> ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public lessThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} < ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <= ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} > ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} >= ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(anotherOperand),
      this.mergeAttributeValues(anotherOperand),
    );
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const expressionString = `${this.expressionString} BETWEEN ${lowerBound.expressionString} AND ${upperBound.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(lowerBound, upperBound),
      this.mergeAttributeValues(lowerBound, upperBound),
    );
  }

  public in(...operands: Array<Operand>): Condition {
    const expressionString = `${this.expressionString} IN (${operands
      .map((operand) => operand.expressionString)
      .join(', ')})`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(...operands),
      this.mergeAttributeValues(...operands),
    );
  }
}
