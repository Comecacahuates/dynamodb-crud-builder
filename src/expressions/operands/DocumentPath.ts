import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { type ExpressionAttributeNames } from '../../expressions/index.js';
import { DocumentPathParsingError } from '../../errors/index.js';

export class DocumentPath extends Operand {
  private constructor(
    public readonly documentPathItems: Array<DocumentPathItem>,
  ) {
    const symbolicValue = DocumentPath.buildSymbolicValue(documentPathItems);
    const expressionAttributeNames =
      DocumentPath.buildExpressionAttributeNames(documentPathItems);
    const expressionAttributeValues = undefined;

    super(symbolicValue, expressionAttributeNames, expressionAttributeValues);
  }

  private static buildSymbolicValue(
    documentPathItems: Array<DocumentPathItem>,
  ): string {
    return documentPathItems.map((item) => `#${item.toString()}`).join('.');
  }

  private static buildExpressionAttributeNames(
    documentPathItems: Array<DocumentPathItem>,
  ): ExpressionAttributeNames {
    return documentPathItems.reduce(
      (expressionAttributeNames, documentPathItem) => ({
        ...expressionAttributeNames,
        [`#${documentPathItem.attributeName}`]: documentPathItem.attributeName,
      }),
      {},
    );
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
    return this.documentPathItems.map((item) => item.toString()).join('.');
  }

  public attributeExists(): Condition {
    const conditionExpression = `attribute_exists(${this.symbolicValue})`;

    return new Condition(
      conditionExpression,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public attributeNotExists(): Condition {
    const conditionExpression = `attribute_not_exists(${this.symbolicValue})`;

    return new Condition(
      conditionExpression,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public size(): Operand {
    const symbolicValue = `size(${this.symbolicValue})`;

    return new Operand(
      symbolicValue,
      this.expressionAttributeNames,
      this.expressionAttributeValues,
    );
  }

  public type(type: Literal): Condition {
    const conditionExpression = `attribute_type(${this.symbolicValue}, ${type.symbolicValue})`;

    const allOperands = [this, type];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      conditionExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public beginsWith(prefix: Literal): Condition {
    const conditionExpression = `begins_with(${this.symbolicValue}, ${prefix.symbolicValue})`;

    const allOperands = [this, prefix];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      conditionExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public contains(operand: Operand): Condition {
    const conditionExpression = `contains(${this.symbolicValue}, ${operand.symbolicValue})`;

    const allOperands = [this, operand];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      conditionExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }
}
