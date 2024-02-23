import merge from '@stdlib/utils-merge';
import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { DocumentPathParsingError } from '../../errors/index.js';

export class DocumentPath extends Operand {
  private constructor(public readonly items: Array<DocumentPathItem>) {
    const expressionString = items
      .map((item) => `#${item.toString()}`)
      .join('.');

    const expressionAttributeNames = merge(
      {},
      ...items.map((item) => ({
        [`#${item.attributeName}`]: item.attributeName,
      })),
    );

    super(expressionString, expressionAttributeNames);
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

  public attributeExists(): Condition {
    const expressionString = `attribute_exists(${this.expressionString})`;

    return new Condition(
      expressionString,
      this.attributeNames,
      this.attributeValues,
    );
  }

  public attributeNotExists(): Condition {
    const expressionString = `attribute_not_exists(${this.expressionString})`;

    return new Condition(
      expressionString,
      this.attributeNames,
      this.attributeValues,
    );
  }

  public size(): Operand {
    const expressionString = `size(${this.expressionString})`;

    return new Operand(
      expressionString,
      this.attributeNames,
      this.attributeValues,
    );
  }

  public type(type: Literal): Condition {
    const expressionString = `attribute_type(${
      this.expressionString
    }, ${type.getExpressionString()})`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(type),
      this.mergeAttributeValues(type),
    );
  }

  public beginsWith(prefix: Literal): Condition {
    const expressionString = `begins_with(${
      this.expressionString
    }, ${prefix.getExpressionString()})`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(prefix),
      this.mergeAttributeValues(prefix),
    );
  }

  public contains(operand: Operand): Condition {
    const expressionString = `contains(${
      this.expressionString
    }, ${operand.getExpressionString()})`;

    return new Condition(
      expressionString,
      this.mergeAttributeNames(operand),
      this.mergeAttributeValues(operand),
    );
  }

  public ifNotExists(operand: Operand): Operand {
    const expressionString = `if_not_exists(${
      this.expressionString
    }, ${operand.getExpressionString()})`;

    return new Operand(
      expressionString,
      this.mergeAttributeNames(operand),
      this.mergeAttributeValues(operand),
    );
  }
}
