import type { AttributePath } from '../types.js';

export function buildExpressionAttributeNamePlaceholder(
  attributePath: AttributePath,
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
  attributePath: AttributePath,
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
