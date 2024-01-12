import { type ExpressionAttributeNames } from '../types.js';
import {
  type DocumentPath,
  formatDocumentPathItem,
} from '../document-path/index.js';

export function buildExpressionAttributeNamePlaceholder(
  documentPath: DocumentPath,
): string {
  return documentPath
    .map((documentPathItem) => `#${formatDocumentPathItem(documentPathItem)}`)
    .join('.')
    .replace(/\.\[/g, '[');
}

export function buildExpressionAttributeNames(
  documentPath: DocumentPath,
): ExpressionAttributeNames {
  return documentPath.reduce((expressionAttributeNames, documentPathItem) => {
    if (typeof documentPathItem === 'number') {
      return expressionAttributeNames;
    }

    const documentPathPartPlaceholder = `#${documentPathItem}`;

    return {
      ...expressionAttributeNames,
      [documentPathPartPlaceholder]: documentPathItem,
    };
  }, {} as ExpressionAttributeNames);
}
