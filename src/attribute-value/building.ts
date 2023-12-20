import { AttributeValue } from '@aws-sdk/client-dynamodb';

export const NULL_ATTRIBUTE_VALUE: AttributeValue.NULLMember = { NULL: true };

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

export function buildBooleanAttributeValue(
  attributeValue: boolean,
): AttributeValue.BOOLMember {
  return { BOOL: attributeValue };
}

export function buildStringSetAttributeValue(
  attributeValue: Set<string>,
): AttributeValue.SSMember {
  return { SS: [...attributeValue] };
}
