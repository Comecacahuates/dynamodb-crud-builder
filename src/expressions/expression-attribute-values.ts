import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import type { AttributePath } from '../types.js';

export function buildExpressionAttributeValuePlaceholder(
  attributePath: AttributePath,
  index?: number,
): string {
  if (index) {
    return `:${attributePath.join('')}${index}`;
  }

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
