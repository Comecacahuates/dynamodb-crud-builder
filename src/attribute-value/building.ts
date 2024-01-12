import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { type AttributeType } from '../types.js';

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

export function buildBinary(
  attributeValue: Uint8Array,
): AttributeValue.BMember {
  return { B: attributeValue };
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

export function buildBinarySet(
  attributeValue: Set<Uint8Array>,
): AttributeValue.BSMember {
  return { BS: [...attributeValue] };
}

export function build(value: AttributeType): AttributeValue {
  return match(value)
    .with(null, () => NULL)

    .with(P.string, buildString)

    .with(P.number, buildNumber)

    .with(P.boolean, buildBoolean)

    .with(P.instanceOf(Uint8Array), buildBinary)

    .with(P.set(P.string), buildStringSet)

    .with(P.set(P.number), buildNumberSet)

    .with(P.set(P.instanceOf(Uint8Array)), buildBinarySet)

    .with(P.array(), (value: AttributeType[]) => ({
      L: value.map((item) => build(item)),
    }))

    .otherwise((value: { [key: string]: AttributeType }) => ({
      M: Object.entries(value).reduce(
        (attributeValue, [entryKey, entryValue]) => ({
          ...attributeValue,
          [entryKey]: build(entryValue),
        }),
        {},
      ),
    }));
}
