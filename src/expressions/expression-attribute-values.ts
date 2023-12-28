import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export function buildPlaceholder(attributeName: string) {
  return `:${attributeName}`;
}

export function buildFromAttributeNameAndValue(
  attributeName: string,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildPlaceholder(attributeName);
  return {
    [placeholder]: attributeValue,
  };
}

export function buildFromAttributePathAndValue(
  attributePath: Array<string>,
  attributeValue: AttributeValue,
): Record<string, AttributeValue> {
  const placeholder = buildPlaceholder(attributePath.join(''));
  return {
    [placeholder]: attributeValue,
  };
}
