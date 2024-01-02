import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import { type AttributePath } from '../../../types.js';

export function buildRemoveAttributeStatement(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder}`;
}

export function buildRemoveItemFromListStatement(
  attributePath: AttributePath,
  index: number,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);

  const itemPathPlaceholder = `${attributePathPlaceholder}[${index}]`;

  return `${itemPathPlaceholder}`;
}
