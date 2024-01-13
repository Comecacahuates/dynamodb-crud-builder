import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type ExpressionAttributeValues } from './types.js';
import { type DocumentPath } from '../document-path/index.js';

export function buildExpressionAttributeValuePlaceholder(
  documentPath: DocumentPath,
): string {
  return `:${documentPath.map(Object.values).flat().join('')}`;
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
