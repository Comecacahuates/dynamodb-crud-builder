import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type AttributePath } from '../../../types.js';

export function buildStatementToRemove(attributePath: AttributePath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder}`;
}
