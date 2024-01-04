import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type AttributePath } from '../../../types.js';

export function buildStatementToRemoveAttribute(
  attributePath: AttributePath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder}`;
}

export function buildStatementToRemoveItemFromList(
  attributePath: AttributePath,
  index: number,
): string {
  const expressionAttributeName =
    buildExpressionAttributeNamePlaceholder(attributePath);

  const itemPathPlaceholder = `${expressionAttributeName}[${index}]`;

  return `${itemPathPlaceholder}`;
}
