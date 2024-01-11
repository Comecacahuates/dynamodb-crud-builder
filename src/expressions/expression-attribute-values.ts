import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import type { DocumentPath } from '../types.js';

export function buildExpressionAttributeValuePlaceholder(
  attributePath: DocumentPath,
): string {
  return `:${attributePath.join('')}`;
}

export function buildExpressionAttributeValue(
  attributePath: DocumentPath,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildExpressionAttributeValuePlaceholder(attributePath);

  return {
    [placeholder]: attributeValue,
  };
}
