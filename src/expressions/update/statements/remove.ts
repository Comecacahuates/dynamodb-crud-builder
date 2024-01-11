import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type DocumentPath } from '../../../types.js';

export function buildStatementToRemove(documentPath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder}`;
}
