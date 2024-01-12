import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { type AttributeType } from '../types.js';
import { InvalidAttributeValueError } from '../errors/index.js';

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

export function parse(attributeValue: AttributeValue): AttributeType {
  return match(attributeValue)
    .with({ NULL: true }, parseNull)

    .with({ S: P.string }, parseString)

    .with({ N: P.string }, parseNumber)

    .with({ BOOL: P.boolean }, parseBoolean)

    .with({ B: P.instanceOf(Uint8Array) }, parseBinary)

    .with({ SS: P.array(P.string) }, parseStringSet)

    .with({ NS: P.array(P.string) }, parseNumberSet)

    .with({ BS: P.array(P.instanceOf(Uint8Array)) }, parseBinarySet)

    .with({ L: P.array() }, (attributeValue: AttributeValue.LMember) =>
      attributeValue.L.map(parse),
    )

    .with({ M: P.any }, (attributeValue: AttributeValue.MMember) =>
      Object.entries(attributeValue.M).reduce(
        (value, [entryKey, entryValue]) => ({
          ...value,
          [entryKey]: parse(entryValue),
        }),
        {},
      ),
    )

    .otherwise(() => {
      throw new InvalidAttributeValueError(attributeValue);
    });
}
