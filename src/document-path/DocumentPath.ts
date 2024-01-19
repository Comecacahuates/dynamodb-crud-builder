import { DocumentPathItem } from './DocumentPathItem.js';
import { ExpressionAttributeNames } from '../expressions/index.js';

export class DocumentPath {
  public constructor(public readonly items: Array<DocumentPathItem>) {}

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

  public toString(): string {
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

  public getExpressionAttributeValuesPlaceholder(): string {
    return `:${this.items
      .map((item) => {
        const { attributeName, indexes } = item;
        return `${attributeName}${indexes.join('')}`;
      })
      .join('')}`;
  }
}
