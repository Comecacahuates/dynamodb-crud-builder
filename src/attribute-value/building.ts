import { AttributeValue } from '@aws-sdk/client-dynamodb';

export const NULL: AttributeValue.NULLMember = { NULL: true };

export function buildString(attributeValue: string): AttributeValue.SMember {
  return { S: attributeValue };
}

export function buildNumber(attributeValue: number): AttributeValue.NMember {
  return { N: String(attributeValue) };
}

export function buildBoolean(
  attributeValue: boolean,
): AttributeValue.BOOLMember {
  return { BOOL: attributeValue };
}

export function buildStringSet(
  attributeValue: Set<string>,
): AttributeValue.SSMember {
  return { SS: [...attributeValue] };
}

export function buildNumberSet(
  attributeValue: Set<number>,
): AttributeValue.NSMember {
  return { NS: [...attributeValue].map(String) };
}
