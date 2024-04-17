import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { DocumentPathParsingError } from '../../errors/index.js';
import { AttributeNames } from '../attributes/index.js';

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

    return this.buildCondition(expressionString, operands);
  }

  public notExists(): Condition {
    const expressionString = `attribute_not_exists(${this.getString()})`,
      operands = [this];

    return this.buildCondition(expressionString, operands);
  }

  public size(): Operand {
    const expressionString = `size(${this.getString()})`,
      operands = [this];

    return this.buildOperand(expressionString, operands);
  }

  public type(type: Literal): Condition {
    const expressionString = `attribute_type(${this.getString()}, ${type.getString()})`,
      operands = [this, type];

    return this.buildCondition(expressionString, operands);
  }

  public beginsWith(prefix: Literal): Condition {
    const expressionString = `begins_with(${this.getString()}, ${prefix.getString()})`,
      operands = [this, prefix];

    return this.buildCondition(expressionString, operands);
  }

  public contains(operand: Operand): Condition {
    const expressionString = `contains(${this.getString()}, ${operand.getString()})`,
      operands = [this, operand];

    return this.buildCondition(expressionString, operands);
  }

  public ifNotExists(operand: Operand): Operand {
    const expressionString = `if_not_exists(${this.getString()}, ${operand.getString()})`,
      operands = [this, operand];

    return this.buildOperand(expressionString, operands);
  }
}
