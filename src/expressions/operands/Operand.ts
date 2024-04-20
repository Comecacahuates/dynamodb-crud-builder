import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { type Expression, type Expressions } from '../Expression.js';
import { Literal } from './Literal.js';
import { ConditionExpression } from '../conditions/ConditionExpression.js';
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
      involvedExpressions = [this, operandExpression];

    return this.buildOperand(expressionString, involvedExpressions);
  }

  public minus(operand: OperandLike): Operand {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} - ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildOperand(expressionString, involvedExpressions);
  }

  public equalTo(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} = ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public notEqualTo(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} <> ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public lessThan(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} < ${operandExpression.getString()}`;
    const operandExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, operandExpressions);
  }

  public lessThanOrEqualTo(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} <= ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public greaterThan(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} > ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public greaterThanOrEqualTo(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `${this.getString()} >= ${operandExpression.getString()}`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public between(
    lowerBound: OperandLike,
    upperBound: OperandLike,
  ): ConditionExpression {
    const lowerBoundExpression = this.operandToExpression(lowerBound),
      upperBoundExpression = this.operandToExpression(upperBound),
      expressionString = `${this.getString()} BETWEEN ${lowerBoundExpression.getString()} AND ${upperBoundExpression.getString()}`,
      involvedExpressions = [this, lowerBoundExpression, upperBoundExpression];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public in(list: OperandLike[]): ConditionExpression {
    const operandExpressionList = list.map((operand) =>
        this.operandToExpression(operand),
      ),
      expressionString = `${this.getString()} IN (${operandExpressionList
        .map((eachOperandExpression) => eachOperandExpression.getString())
        .join(', ')})`,
      involvedExpressions = [this, ...operandExpressionList];

    return this.buildCondition(expressionString, involvedExpressions);
  }

  public contains(operand: OperandLike): ConditionExpression {
    const operandExpression = this.operandToExpression(operand),
      expressionString = `contains(${this.getString()}, ${operandExpression.getString()})`,
      involvedExpressions = [this, operandExpression];

    return this.buildCondition(expressionString, involvedExpressions);
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
    involvedExpressions: Expressions,
  ): Operand {
    return new Operand(
      expressionString,
      this.mergeAttributeNames(involvedExpressions),
      this.mergeAttributeValues(involvedExpressions),
    );
  }

  protected buildCondition(
    expressionString: string,
    involvedExpressions: Expressions,
  ): ConditionExpression {
    return new ConditionExpression(
      expressionString,
      this.mergeAttributeNames(involvedExpressions),
      this.mergeAttributeValues(involvedExpressions),
    );
  }

  protected operandToExpression(operand: OperandLike): Expression {
    if (operand instanceof Operand) {
      return operand;
    }

    return new Literal(operand);
  }
}
