import { Operand, type Operands } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { AttributeNames } from '../attributes/index.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { UpdateAction, UpdateActionType } from '../update/UpdateAction.js';
import { DocumentPathParsingError } from './DocumentPathParsingError.js';

export type DocumentPaths = DocumentPath[];

export class DocumentPath extends Operand {
  private constructor(public readonly items: Array<DocumentPathItem>) {
    const expressionString = items
      .map((item) => `#${item.toString()}`)
      .join('.');

    const attributeNames = new AttributeNames();
    items.forEach((eachItem) =>
      attributeNames.add(`#${eachItem.attributeName}`, eachItem.attributeName),
    );

    super(expressionString, attributeNames);
  }

  public static parse(documentPathString: string): DocumentPath {
    const documentPathItems = documentPathString
      .split('.')
      .map((documentPathItemString) =>
        DocumentPathItem.parse(documentPathItemString),
      );

    const invalidDocumentPathItems = documentPathItems.includes(null);
    if (invalidDocumentPathItems) {
      throw new DocumentPathParsingError(documentPathString);
    }

    return new DocumentPath(documentPathItems as Array<DocumentPathItem>);
  }

  public override toString(): string {
    return this.items.map((item) => item.toString()).join('.');
  }

  public exists(): Condition {
    const expressionString = `attribute_exists(${this.getString()})`,
      operands = [this];

    return super.buildCondition(expressionString, operands);
  }

  public notExists(): Condition {
    const expressionString = `attribute_not_exists(${this.getString()})`,
      operands = [this];

    return super.buildCondition(expressionString, operands);
  }

  public size(): Operand {
    const expressionString = `size(${this.getString()})`,
      operands = [this];

    return super.buildOperand(expressionString, operands);
  }

  public type(type: Literal): Condition {
    const expressionString = `attribute_type(${this.getString()}, ${type.getString()})`,
      operands = [this, type];

    return super.buildCondition(expressionString, operands);
  }

  public beginsWith(prefix: Literal): Condition {
    const expressionString = `begins_with(${this.getString()}, ${prefix.getString()})`,
      operands = [this, prefix];

    return super.buildCondition(expressionString, operands);
  }

  public contains(operand: Operand): Condition {
    const expressionString = `contains(${this.getString()}, ${operand.getString()})`,
      operands = [this, operand];

    return super.buildCondition(expressionString, operands);
  }

  public ifNotExists(operand: Operand): Operand {
    const expressionString = `if_not_exists(${this.getString()}, ${operand.getString()})`,
      operands = [this, operand];

    return super.buildOperand(expressionString, operands);
  }

  public setValue(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} = ${value.getString()}`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      operands,
    );
  }

  public setValueIfNotExists(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} = if_not_exists(${this.getString()}, ${value.getString()})`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      operands,
    );
  }

  public increment(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} = ${this.getString()} + ${value.getString()}`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      operands,
    );
  }

  public decrement(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} = ${this.getString()} - ${value.getString()}`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      operands,
    );
  }

  public append(items: Operand): UpdateAction {
    const expressionString = `${this.getString()} = list_append(${this.getString()}, ${items.getString()})`,
      operands = [this, items];

    return this.buildUpdateAction(
      UpdateActionType.SET,
      expressionString,
      operands,
    );
  }

  public add(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} ${value.getString()}`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.ADD,
      expressionString,
      operands,
    );
  }

  public delete(value: Operand): UpdateAction {
    const expressionString = `${this.getString()} ${value.getString()}`,
      operands = [this, value];

    return this.buildUpdateAction(
      UpdateActionType.DELETE,
      expressionString,
      operands,
    );
  }

  public remove(): UpdateAction {
    const expressionString = this.getString(),
      operands = [this];

    return this.buildUpdateAction(
      UpdateActionType.REMOVE,
      expressionString,
      operands,
    );
  }

  protected buildUpdateAction(
    type: UpdateActionType,
    expressionString: string,
    operands: Operands,
  ): UpdateAction {
    return new UpdateAction(
      type,
      expressionString,
      super.mergeAttributeNames(operands),
      super.mergeAttributeValues(operands),
    );
  }
}
