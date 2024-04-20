import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { type Expressions } from '../Expression.js';
import { Operand, type OperandLike } from './Operand.js';
import {
  DocumentPathItem,
  type DocumentPathItems,
} from './DocumentPathItem.js';
import { AttributeNames } from '../attributes/index.js';
import { ConditionExpression } from '../conditions/ConditionExpression.js';
import { UpdateAction, UpdateActionType } from '../update/UpdateAction.js';
import { DocumentPathParsingError } from './DocumentPathParsingError.js';
import { isNull, isUndefined } from '../../utils/assert.js';

export type DocumentPaths = DocumentPath[];

export class DocumentPath extends Operand {
  private items: DocumentPathItems = [];

  public constructor(documentPathString: string) {
    const items = documentPathString
      .split('.')
      .map((documentPathItemString) =>
        DocumentPathItem.parse(documentPathItemString),
      );

    if (!isUndefined(items.find(isNull))) {
      throw new DocumentPathParsingError(documentPathString);
    }

    const expressionString = items
      .map((eachItem) => `#${eachItem!.toString()}`)
      .join('.');

    const attributeNames = new AttributeNames();
    items.forEach((eachItem) =>
      attributeNames.add(
        `#${eachItem!.attributeName}`,
        eachItem!.attributeName,
      ),
    );

    super(expressionString, attributeNames);
    this.items = items as DocumentPathItems;
  }

  public override toString(): string {
    return this.items.map((item) => item.toString()).join('.');
  }

  public exists(): ConditionExpression {
    const expressionString = `attribute_exists(${this.getString()})`,
      involvedExpressions = [this];

    return super.buildCondition(expressionString, involvedExpressions);
  }

  public notExists(): ConditionExpression {
    const expressionString = `attribute_not_exists(${this.getString()})`,
      involvedExpressions = [this];

    return super.buildCondition(expressionString, involvedExpressions);
  }

  public size(): Operand {
    const expressionString = `size(${this.getString()})`,
      operandExpressions = [this];

    return super.buildOperand(expressionString, operandExpressions);
  }

  public type(type: NativeAttributeValue): ConditionExpression {
    const typeExpression = super.operandToExpression(type),
      expressionString = `attribute_type(${this.getString()}, ${typeExpression.getString()})`,
      involvedExpressions = [this, typeExpression];

    return super.buildCondition(expressionString, involvedExpressions);
  }

  public beginsWith(prefix: NativeAttributeValue): ConditionExpression {
    const prefixExpression = super.operandToExpression(prefix),
      expressionString = `begins_with(${this.getString()}, ${prefixExpression.getString()})`,
      involvedExpressions = [this, prefixExpression];

    return super.buildCondition(expressionString, involvedExpressions);
  }

  public ifNotExists(operand: OperandLike): Operand {
    const operandExpression = super.operandToExpression(operand),
      expressionString = `if_not_exists(${this.getString()}, ${operandExpression.getString()})`,
      involvedExpressions = [this, operandExpression];

    return super.buildOperand(expressionString, involvedExpressions);
  }

  public set(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} = ${valueExpression.getString()}`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      involvedExpressions,
    );
  }

  public setIfNotExists(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} = if_not_exists(${this.getString()}, ${valueExpression.getString()})`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      involvedExpressions,
    );
  }

  public increment(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} = ${this.getString()} + ${valueExpression.getString()}`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      involvedExpressions,
    );
  }

  public decrement(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} = ${this.getString()} - ${valueExpression.getString()}`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      involvedExpressions,
    );
  }

  public append(items: OperandLike): UpdateAction {
    const itemsExpression = super.operandToExpression(items),
      expressionString = `${this.getString()} = list_append(${this.getString()}, ${itemsExpression.getString()})`,
      involvedExpressions = [this, itemsExpression];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      involvedExpressions,
    );
  }

  public add(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} ${valueExpression.getString()}`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.ADD,
      expressionString,
      involvedExpressions,
    );
  }

  public delete(value: OperandLike): UpdateAction {
    const valueExpression = super.operandToExpression(value),
      expressionString = `${this.getString()} ${valueExpression.getString()}`,
      involvedExpressions = [this, valueExpression];

    return this.buildUpdateAction(
      UpdateActionType.DELETE,
      expressionString,
      involvedExpressions,
    );
  }

  public remove(): UpdateAction {
    const expressionString = this.getString(),
      involvedExpressions = [this];

    return this.buildUpdateAction(
      UpdateActionType.REMOVE,
      expressionString,
      involvedExpressions,
    );
  }

  private buildUpdateAction(
    type: UpdateActionType,
    expressionString: string,
    involvedExpressions: Expressions,
  ): UpdateAction {
    return new UpdateAction(
      type,
      expressionString,
      super.mergeAttributeNames(involvedExpressions),
      super.mergeAttributeValues(involvedExpressions),
    );
  }
}
