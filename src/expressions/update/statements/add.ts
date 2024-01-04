import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import { type AttributePath } from '../../../types.js';

export function buildStatementToAdd(attributePath: AttributePath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder} ${expressionAttributeValuePlaceholder}`;
}
