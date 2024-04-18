import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { type Expression, type Expressions } from '../Expression.js';
import { Literal } from './Literal.js';
import { Condition } from '../conditions/Condition.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export type Operands = Operand[];
export type OperandLike = Operand | NativeAttributeValue;

export class Operand implements Expression {
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

  public getAttributeValues(): AttributeValues {
    return this.attributeValues;
  }

  public plus(operand: OperandLike): Operand {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} + ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildOperand(expressionString, operands);
  }

  public minus(operand: OperandLike): Operand {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} - ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildOperand(expressionString, operands);
  }

  public equalTo(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} = ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public notEqualTo(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} <> ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public lessThan(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} < ${operandExpression.getString()}`;
    const operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public lessThanOrEqualTo(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} <= ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public greaterThan(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} > ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public greaterThanOrEqualTo(operand: OperandLike): Condition {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} >= ${operandExpression.getString()}`,
      operands = [this, operandExpression];

    return this.buildCondition(expressionString, operands);
  }

  public between(lowerBound: OperandLike, upperBound: OperandLike): Condition {
    const lowerBoundExpression = this.operandToExpression(lowerBound),
      upperBoundExpression = this.operandToExpression(upperBound),
      expressionString = `${this.getString()} BETWEEN ${lowerBoundExpression.getString()} AND ${upperBoundExpression.getString()}`,
      operands = [this, lowerBoundExpression, upperBoundExpression];

    return this.buildCondition(expressionString, operands);
  }

  public in(list: OperandLike[]): Condition {
    const operandExpressionList = list.map((operand) =>
        this.operandToExpression(operand),
      ),
      expressionString = `${this.getString()} IN (${operandExpressionList
        .map((eachOperandExpression) => eachOperandExpression.getString())
        .join(', ')})`,
      operands = [this, ...operandExpressionList];

    return this.buildCondition(expressionString, operands);
  }

  protected mergeAttributeNames(expressions: Expressions): AttributeNames {
    const allAttributeNames = expressions.map((eachExpression) =>
      eachExpression.getAttributeNames(),
    );
    return AttributeNames.merge(allAttributeNames);
  }

  protected mergeAttributeValues(expressions: Expressions): AttributeValues {
    const allAttributeValues = expressions.map((eachOperand) =>
      eachOperand.getAttributeValues(),
    );
    return AttributeValues.merge(allAttributeValues);
  }

  protected buildOperand(
    expressionString: string,
    operands: Expressions,
  ): Operand {
    return new Operand(
      expressionString,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }

  protected buildCondition(
    expressionString: string,
    operands: Expressions,
  ): Condition {
    return new Condition(
      expressionString,
      this.mergeAttributeNames(operands),
      this.mergeAttributeValues(operands),
    );
  }

  protected operandToExpression(
    operand: Operand | NativeAttributeValue,
  ): Expression {
    if (operand instanceof Operand) {
      return operand;
    }

    return new Literal(operand);
  }
}
