import { Condition } from '../conditions/Condition.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../types.js';

export class Operand {
  public constructor(
    public readonly symbolicValue: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames = {},
    public readonly expressionAttributeValues: ExpressionAttributeValues = {},
  ) {}

  protected static mergeExpressionAttributeNames(operands: Array<Operand>) {
    return operands.reduce(
      (expressionAttributeNames, condition) => ({
        ...expressionAttributeNames,
        ...condition.expressionAttributeNames,
      }),
      {},
    );
  }

  protected static mergeExpressionAttributeValues(operands: Array<Operand>) {
    return operands.reduce(
      (expressionAttributeValues, condition) => ({
        ...expressionAttributeValues,
        ...condition.expressionAttributeValues,
      }),
      {},
    );
  }

  public plus(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} + ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public equalTo(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} = ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} <> ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public lessThan(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} < ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} <= ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} > ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const allOperands = [this, anotherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} >= ${anotherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const allOperands = [this, lowerBound, upperBound];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} BETWEEN ${lowerBound.symbolicValue} AND ${upperBound.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public in(...operands: Array<Operand>): Condition {
    const allOperands = [this, ...operands];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    const symbolicValue = `${this.symbolicValue} IN (${operands
      .map((operand) => operand.symbolicValue)
      .join(', ')})`;

    return new Condition(
      symbolicValue,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }
}
