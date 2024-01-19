import { Operand } from './Operand.js';
import { DocumentPathItem } from './DocumentPathItem.js';
import { ExpressionAttributeNames } from '../../expressions/index.js';

export class DocumentPath extends Operand {
  public constructor(public readonly items: Array<DocumentPathItem>) {
    const symbolicValue = DocumentPath.buildSymbolicValue(items);
    const expressionAttributeNames =
      DocumentPath.buildExpressionAttributeNames(items);
    const expressionAttributeValues = undefined;

    super(symbolicValue, expressionAttributeNames, expressionAttributeValues);
  }

  private static buildSymbolicValue(items: Array<DocumentPathItem>): string {
    return items.map((item) => `#${item.toString()}`).join('.');
  }

  private static buildExpressionAttributeNames(
    items: Array<DocumentPathItem>,
  ): ExpressionAttributeNames {
    const expressionAttributeNames: ExpressionAttributeNames = {};

    for (const documentPathItem of items) {
      expressionAttributeNames[`#${documentPathItem.attributeName}`] =
        documentPathItem.attributeName;
    }

    return expressionAttributeNames;
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
    return this.items.map((item) => item.toString()).join('.');
  }

  public getExpressionAttributeNamesPlaceholder(): string {
    return this.items.map((item) => `#${item.toString()}`).join('.');
  }

  public getExpressionAttributeNames(): ExpressionAttributeNames {
    const expressionAttributeNames: ExpressionAttributeNames = {};

    for (const documentPathItem of this.items) {
      expressionAttributeNames[`#${documentPathItem.attributeName}`] =
        documentPathItem.attributeName;
    }

    return expressionAttributeNames;
  }
}
