import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import type { AttributePath } from '../types.js';

export function buildExpressionAttributeValuePlaceholder(
  attributePath: AttributePath,
): string {
  return `:${attributePath.join('')}`;
}

export function buildExpressionAttributeValue(
  attributePath: AttributePath,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildExpressionAttributeValuePlaceholder(attributePath);

  return {
    [placeholder]: attributeValue,
  };
}
