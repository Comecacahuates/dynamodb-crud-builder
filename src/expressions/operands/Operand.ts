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
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public minus(anotherOperand: Operand): Operand {
    const expressionString = `${this.expressionString} - ${anotherOperand.expressionString}`;

    return new Operand(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public equalTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} = ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <> ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public lessThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} < ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} <= ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} > ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const expressionString = `${this.expressionString} >= ${anotherOperand.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(anotherOperand),
      this.mergeExpressionAttributeValues(anotherOperand),
    );
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const expressionString = `${this.expressionString} BETWEEN ${lowerBound.expressionString} AND ${upperBound.expressionString}`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(lowerBound, upperBound),
      this.mergeExpressionAttributeValues(lowerBound, upperBound),
    );
  }

  public in(...operands: Array<Operand>): Condition {
    const expressionString = `${this.expressionString} IN (${operands
      .map((operand) => operand.expressionString)
      .join(', ')})`;

    return new Condition(
      expressionString,
      this.mergeExpressionAttributeNames(...operands),
      this.mergeExpressionAttributeValues(...operands),
    );
  }
}
