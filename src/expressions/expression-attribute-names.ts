import { type ExpressionAttributeNames } from './types.js';
import {
  type DocumentPath,
  formatDocumentPathItem,
} from '../document-path/index.js';

export function buildExpressionAttributeNamePlaceholder(
  documentPath: DocumentPath,
): string {
  return documentPath
    .map((documentPathItem) => `#${formatDocumentPathItem(documentPathItem)}`)
    .join('.');
}

export function buildExpressionAttributeNames(
  documentPath: DocumentPath,
): ExpressionAttributeNames {
  return documentPath
    .map((documentPathItem) => documentPathItem.attributeName)
    .reduce(
      (expressionAttributeNames, attributeName) => ({
        ...expressionAttributeNames,
        [`#${attributeName}`]: attributeName,
      }),
      {} as ExpressionAttributeNames,
    );
}
