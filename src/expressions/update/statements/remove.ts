import * as ExpressionAttributeNames from '../../expression-attribute-names.js';

export function buildRemoveAttributeStatement(
  attributePath: Array<string>,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder}`;
}

export function buildRemoveItemFromListStatement(
  attributePath: Array<string>,
  index: number,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);

  const itemPathPlaceholder = `${attributePathPlaceholder}[${index}]`;

  return `${itemPathPlaceholder}`;
}
