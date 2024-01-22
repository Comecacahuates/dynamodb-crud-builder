import { Condition } from '../conditions/Condition.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../types.js';
import { mergeExpressionAttributeNames } from '../expression-attribute-names.js';
import { mergeExpressionAttributeValues } from '../expression-attribute-values.js';

export class Operand {
  public constructor(
    public readonly symbolicValue: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames = {},
    public readonly expressionAttributeValues: ExpressionAttributeValues = {},
  ) {}

  public plus(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} + ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public minus(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} - ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public equalTo(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} = ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public notEqualTo(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} <> ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public lessThan(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} < ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public lessThanOrEqualTo(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} <= ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public greaterThan(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} > ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public greaterThanOrEqualTo(anotherOperand: Operand): Condition {
    const expression = `${this.symbolicValue} >= ${anotherOperand.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, anotherOperand]),
      mergeExpressionAttributeValues([this, anotherOperand]),
    );
  }

  public between(lowerBound: Operand, upperBound: Operand): Condition {
    const expression = `${this.symbolicValue} BETWEEN ${lowerBound.symbolicValue} AND ${upperBound.symbolicValue}`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, lowerBound, upperBound]),
      mergeExpressionAttributeValues([this, lowerBound, upperBound]),
    );
  }

  public in(...operands: Array<Operand>): Condition {
    const expression = `${this.symbolicValue} IN (${operands
      .map((operand) => operand.symbolicValue)
      .join(', ')})`;

    return new Condition(
      expression,
      mergeExpressionAttributeNames([this, ...operands]),
      mergeExpressionAttributeValues([this, ...operands]),
    );
  }
}
