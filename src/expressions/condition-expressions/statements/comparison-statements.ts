import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { type DocumentPath } from '../../../document-path/index.js';

export function buildAttributeEqualsAttributeStatement(
  documentPathA: DocumentPath,
  documentPathB: DocumentPath,
): string {
  const expressionAttributeNamePlaceholderA =
    buildExpressionAttributeNamePlaceholder(documentPathA);

  const expressionAttributeNamePlaceholderB =
    buildExpressionAttributeNamePlaceholder(documentPathB);

  return `${expressionAttributeNamePlaceholderA} = ${expressionAttributeNamePlaceholderB}`;
}
