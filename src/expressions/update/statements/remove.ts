import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type AttributePath } from '../../../types.js';

export function buildStatementToRemove(
  attributePath: AttributePath,
  index?: number,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath, index);

  return `${expressionAttributeNamePlaceholder}`;
}
