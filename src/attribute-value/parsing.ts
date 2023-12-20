import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { AttributeType } from './types.js';

export function parseNull(attributeValue: AttributeValue.NULLMember): null {
  return null;
}

export function parseString(attributeValue: AttributeValue.SMember): string {
  return attributeValue.S;
}

export function parseNumber(attributeValue: AttributeValue.NMember): number {
  return Number(attributeValue.N);
}

export function parseBoolean(
  attributeValue: AttributeValue.BOOLMember,
): boolean {
  return attributeValue.BOOL;
}

export function parseBinary(
  attributeValue: AttributeValue.BMember,
): Uint8Array {
  return attributeValue.B;
}
