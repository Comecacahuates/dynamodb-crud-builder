import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type DocumentPath } from '../../../document-path/index.js';

export function buildStatementToRemove(documentPath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder}`;
}
