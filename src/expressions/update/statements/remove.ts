import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type DocumentPath } from '../../../types.js';

export function buildStatementToRemove(attributePath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder}`;
}
