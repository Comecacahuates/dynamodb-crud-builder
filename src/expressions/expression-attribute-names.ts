import { type DocumentPath, type ExpressionAttributeNames } from '../types.js';

export function buildExpressionAttributeNamePlaceholder(
  documentPath: DocumentPath,
): string {
  return documentPath
    .map((documentPathItem) => {
      if (typeof documentPathItem === 'number') {
        return `[${documentPathItem}]`;
      }

      return `#${documentPathItem}`;
    })
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
