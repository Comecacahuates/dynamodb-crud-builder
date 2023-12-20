import { AttributeValue } from '@aws-sdk/client-dynamodb';

export function buildStringAttributeValue(
  attributeValue: string,
): AttributeValue.SMember {
  return { S: attributeValue };
}

export function buildNumberAttributeValue(
  attributeValue: number,
): AttributeValue.NMember {
  return { N: String(attributeValue) };
}
