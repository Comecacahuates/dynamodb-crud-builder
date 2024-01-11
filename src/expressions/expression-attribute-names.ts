import type { DocumentPath } from '../types.js';

export function buildExpressionAttributeNamePlaceholder(
  attributePath: DocumentPath,
): string {
  return attributePath
    .map((attributePathItem) => {
      if (typeof attributePathItem === 'number') {
        return `[${attributePathItem}]`;
      }

      return `#${attributePathItem}`;
    })
    .join('.')
    .replace(/\.\[/g, '[');
}

export function buildExpressionAttributeNames(
  attributePath: DocumentPath,
): Record<string, string> {
  return attributePath.reduce((expressionAttributeNames, attributePathItem) => {
    if (typeof attributePathItem === 'number') {
      return expressionAttributeNames;
    }

    const attributePathPartPlaceholder = `#${attributePathItem}`;

    return {
      ...expressionAttributeNames,
      [attributePathPartPlaceholder]: attributePathItem,
    };
  }, {});
}
