import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
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

export function buildAttributeEqualsLiteralStatement(
  documentPath: DocumentPath,
  documentPathForLiteral: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPathForLiteral);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeValuePlaceholder}`;
}
