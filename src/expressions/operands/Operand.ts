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

  public equals(otherOperand: Operand): Condition {
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
}
