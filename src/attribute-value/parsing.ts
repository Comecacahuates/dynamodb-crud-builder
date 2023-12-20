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

export function parseStringSet(
  attributeValue: AttributeValue.SSMember,
): Set<string> {
  return new Set(attributeValue.SS);
}

export function parseNumberSet(
  attributeValue: AttributeValue.NSMember,
): Set<number> {
  return new Set(attributeValue.NS.map(Number));
}

export function parseBinarySet(
  attributeValue: AttributeValue.BSMember,
): Set<Uint8Array> {
  return new Set(attributeValue.BS);
}
