import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import type { DocumentPath } from '../../../types.js';

export function buildStatementToDelete(documentPath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder} ${expressionAttributeValuePlaceholder}`;
}
