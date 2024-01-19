import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { type AttributeType } from '../types.js';

export class AttributeValueParser {
  private constructor() {}

  private static internalInstance: AttributeValueParser;

  public static get instance(): AttributeValueParser {
    this.internalInstance ??= new AttributeValueParser();
    return this.internalInstance;
  }

  public parseNull(attributeValue: AttributeValue.NULLMember): null {
    return null;
  }

  public parseString(attributeValue: AttributeValue.SMember): string {
    return attributeValue.S;
  }

  public parseNumber(attributeValue: AttributeValue.NMember): number {
    return Number(attributeValue.N);
  }

  public parseBoolean(attributeValue: AttributeValue.BOOLMember): boolean {
    return attributeValue.BOOL;
  }

  public parseBinary(attributeValue: AttributeValue.BMember): Uint8Array {
    return attributeValue.B;
  }

  public parseStringSet(attributeValue: AttributeValue.SSMember): Set<string> {
    return new Set(attributeValue.SS);
  }

  public parseNumberSet(attributeValue: AttributeValue.NSMember): Set<number> {
    return new Set(attributeValue.NS.map(Number));
  }

  public parseBinarySet(
    attributeValue: AttributeValue.BSMember,
  ): Set<Uint8Array> {
    return new Set(attributeValue.BS);
  }

  public parse(attributeValue: AttributeValue): AttributeType {
    return match(attributeValue)
      .with({ NULL: true }, AttributeValueParser.instance.parseNull)

      .with({ S: P.string }, AttributeValueParser.instance.parseString)

      .with({ N: P.string }, AttributeValueParser.instance.parseNumber)

      .with({ BOOL: P.boolean }, AttributeValueParser.instance.parseBoolean)

      .with(
        { B: P.instanceOf(Uint8Array) },
        AttributeValueParser.instance.parseBinary,
      )

      .with(
        { SS: P.array(P.string) },
        AttributeValueParser.instance.parseStringSet,
      )

      .with(
        { NS: P.array(P.string) },
        AttributeValueParser.instance.parseNumberSet,
      )

      .with(
        { BS: P.array(P.instanceOf(Uint8Array)) },
        AttributeValueParser.instance.parseBinarySet,
      )

      .with({ L: P.array() }, (attributeValue: AttributeValue.LMember) =>
        attributeValue.L.map(AttributeValueParser.instance.parse),
      )

      .with({ M: P.any }, (attributeValue: AttributeValue.MMember) =>
        Object.entries(attributeValue.M).reduce(
          (value, [entryKey, entryValue]) => ({
            ...value,
            [entryKey]: AttributeValueParser.instance.parse(entryValue),
          }),
          {},
        ),
      )

      .run();
  }
}
