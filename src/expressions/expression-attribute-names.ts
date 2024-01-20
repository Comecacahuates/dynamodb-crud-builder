import { type ExpressionAttributeNames } from './types.js';
import {
  type DocumentPath,
  formatDocumentPathItem,
} from '../document-path/index.js';

export function mergeExpressionAttributeNames(
  expressionAttributeNamesList: Array<ExpressionAttributeNames>,
): ExpressionAttributeNames {
  return expressionAttributeNamesList.reduce(
    (mergedExpressionAttributeNames, expressionAttributeNames) => ({
      ...mergedExpressionAttributeNames,
      ...expressionAttributeNames,
    }),
    {},
  );
}

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
