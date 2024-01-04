import type { AttributePath } from '../types.js';

export function buildExpressionAttributeNamePlaceholder(
  attributePath: AttributePath,
  index?: number,
): string {
  const placeholder = attributePath
    .map((attributePathPart) => `#${attributePathPart}`)
    .join('.');

  if (index) {
    return `${placeholder}[${index}]`;
  } else {
    return placeholder;
  }
}

export function buildExpressionAttributeNames(
  attributePath: AttributePath,
): Record<string, string> {
  return attributePath.reduce((expressionAttributeNames, attributePathPart) => {
    const attributePathPartPlaceholder = `#${attributePathPart}`;

    return {
      ...expressionAttributeNames,
      [attributePathPartPlaceholder]: attributePathPart,
    };
  }, {});
}
