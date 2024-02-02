import merge from '@stdlib/utils-merge';
import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { DocumentPathParsingError } from '../../errors/index.js';
import { mergeExpressionAttributeNames } from '../../expressions/index.js';
import { mergeExpressionAttributeValues } from '../../expressions/index.js';
import { UpdateAction } from '../updates/UpdateAction.js';

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
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public attributeNotExists(): Condition {
    const expressionString = `attribute_not_exists(${this.expressionString})`;

    return new Condition(
      expressionString,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public size(): Operand {
    const expressionString = `size(${this.expressionString})`;

    return new Operand(
      expressionString,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public type(type: Literal): Condition {
    const expressionString = `attribute_type(${
      this.expressionString
    }, ${type.getExpressionString()})`;

    return new Condition(
      expressionString,
      mergeExpressionAttributeNames([this, type]),
      mergeExpressionAttributeValues([this, type]),
    );
  }

  public beginsWith(prefix: Literal): Condition {
    const expressionString = `begins_with(${
      this.expressionString
    }, ${prefix.getExpressionString()})`;

    return new Condition(
      expressionString,
      mergeExpressionAttributeNames([this, prefix]),
      mergeExpressionAttributeValues([this, prefix]),
    );
  }

  public contains(operand: Operand): Condition {
    const expressionString = `contains(${
      this.expressionString
    }, ${operand.getExpressionString()})`;

    return new Condition(
      expressionString,
      mergeExpressionAttributeNames([this, operand]),
      mergeExpressionAttributeValues([this, operand]),
    );
  }

  public ifNotExists(operand: Operand): Operand {
    const expressionString = `if_not_exists(${
      this.expressionString
    }, ${operand.getExpressionString()})`;

    return new Operand(
      expressionString,
      mergeExpressionAttributeNames([this, operand]),
      mergeExpressionAttributeValues([this, operand]),
    );
  }

  public setValue(value: Operand): UpdateAction {
    return UpdateAction.setValue(this, value);
  }

  public setValueIfNotExists(value: Operand): UpdateAction {
    return UpdateAction.setValue(this, this.ifNotExists(value));
  }

  public increment(value: Operand): UpdateAction {
    return UpdateAction.increment(this, value);
  }

  public decrement(value: Operand): UpdateAction {
    return UpdateAction.decrement(this, value);
  }

  public appendItems(items: Operand): UpdateAction {
    return UpdateAction.appendItems(this, items);
  }

  public add(operand: Operand): UpdateAction {
    return UpdateAction.add(this, operand);
  }

  public remove(): UpdateAction {
    return UpdateAction.remove(this);
  }

  public delete(elements: Operand): UpdateAction {
    return UpdateAction.delete(this, elements);
  }
}
