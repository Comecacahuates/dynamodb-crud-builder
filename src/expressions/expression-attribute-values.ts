import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type DocumentPath, type ExpressionAttributeValues } from '../types.js';

export function buildExpressionAttributeValuePlaceholder(
  documentPath: DocumentPath,
): string {
  return `:${documentPath.join('')}`;
}

export function buildExpressionAttributeValue(
  documentPath: DocumentPath,
  attributeValue: AttributeValue,
): ExpressionAttributeValues {
  const placeholder = buildExpressionAttributeValuePlaceholder(documentPath);

  return {
    [placeholder]: attributeValue,
  };
}
