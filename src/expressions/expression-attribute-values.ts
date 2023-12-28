import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export function buildPlaceholderFromAttributeName(attributeName: string) {
  return `:${attributeName}`;
}

export function buildPlaceholderFromAttributePath(
  attributePath: Array<string>,
): string {
  return buildPlaceholderFromAttributeName(attributePath.join(''));
}

export function buildFromAttributeNameAndValue(
  attributeName: string,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildPlaceholderFromAttributeName(attributeName);
  return {
    [placeholder]: attributeValue,
  };
}

export function buildFromAttributePathAndValue(
  attributePath: Array<string>,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildPlaceholderFromAttributeName(attributePath.join(''));
  return {
    [placeholder]: attributeValue,
  };
}
