import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { Condition } from '../conditions/Condition.js';
import { Literal } from './Literal.js';
import { type ExpressionAttributeNames } from '../../expressions/index.js';

export class DocumentPath extends Operand {
  public constructor(
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

  public static parse(documentPathString: string): DocumentPath | null {
    const documentPathItems = documentPathString
      .split('.')
      .map((documentPathItemString) =>
        DocumentPathItem.parse(documentPathItemString),
      );

    const invalidDocumentPathItems = documentPathItems.includes(null);
    if (invalidDocumentPathItems) {
      return null;
    }

    return new DocumentPath(documentPathItems as Array<DocumentPathItem>);
  }

  public override toString(): string {
    return this.documentPathItems.map((item) => item.toString()).join('.');
  }

  public attributeExists(): Condition {
    const allOperands = [this];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `attribute_exists(${this.symbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public attributeNotExists(): Condition {
    const allOperands = [this];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `attribute_not_exists(${this.symbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
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
    const allOperands = [this, type];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `attribute_type(${this.symbolicValue}, ${type.symbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public beginsWith(prefix: Literal): Condition {
    const allOperands = [this, prefix];

    const expressionAttributeNames =
      Operand.mergeExpressionAttributeNames(allOperands);

    const expressionAttributeValues =
      Operand.mergeExpressionAttributeValues(allOperands);

    return new Condition(
      `begins_with(${this.symbolicValue}, ${prefix.symbolicValue})`,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }
}
