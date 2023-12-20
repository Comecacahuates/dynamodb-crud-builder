import { AttributeValue } from '@aws-sdk/client-dynamodb';

export function buildStringAttributeValue(
  attributeValue: string,
): AttributeValue.SMember {
  return { S: attributeValue };
}
