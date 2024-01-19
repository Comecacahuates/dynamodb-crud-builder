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

  private static mergeExpressionAttributeNames(operands: Array<Operand>) {
    return operands.reduce(
      (expressionAttributeNames, condition) => ({
        ...expressionAttributeNames,
        ...condition.expressionAttributeNames,
      }),
      {},
    );
  }

  private static mergeExpressionAttributeValues(operands: Array<Operand>) {
    return operands.reduce(
      (expressionAttributeValues, condition) => ({
        ...expressionAttributeValues,
        ...condition.expressionAttributeValues,
      }),
      {},
    );
  }

  public equalTo(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} = ${otherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public notEqualTo(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} <> ${otherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public lessThan(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} < ${otherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public lessThanOrEqualTo(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} <= ${otherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public greaterThan(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} > ${otherOperand.symbolicValue}`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public greaterThanOrEqualTo(otherOperand: Operand): Condition {
    const allOperands = [this, otherOperand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `${this.symbolicValue} >= ${otherOperand.symbolicValue}`,
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
