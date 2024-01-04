import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import type { AttributePath } from '../../../types.js';

export function buildStatementToDelete(
  attributePath: AttributePath,
  index?: number,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath, index);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath, index);

  return `${expressionAttributeNamePlaceholder} ${expressionAttributeValuePlaceholder}`;
}
