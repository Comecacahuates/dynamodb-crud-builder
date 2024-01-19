import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { type AttributeType } from '../types.js';

export class AttributeValueBuilder {
  private constructor() {}

  private static internalInstance: AttributeValueBuilder;

  public static get instance(): AttributeValueBuilder {
    this.internalInstance ??= new AttributeValueBuilder();
    return this.internalInstance;
  }

  public buildNull(): AttributeValue {
    return { NULL: true };
  }

  public buildString(attributeValue: string): AttributeValue.SMember {
    return { S: attributeValue };
  }

  public buildNumber(attributeValue: number): AttributeValue.NMember {
    return { N: String(attributeValue) };
  }

  public buildBoolean(attributeValue: boolean): AttributeValue.BOOLMember {
    return { BOOL: attributeValue };
  }

  public buildBinary(attributeValue: Uint8Array): AttributeValue.BMember {
    return { B: attributeValue };
  }

  public buildStringSet(attributeValue: Set<string>): AttributeValue.SSMember {
    return { SS: [...attributeValue] };
  }

  public buildNumberSet(attributeValue: Set<number>): AttributeValue.NSMember {
    return { NS: [...attributeValue].map(String) };
  }

  public buildBinarySet(
    attributeValue: Set<Uint8Array>,
  ): AttributeValue.BSMember {
    return { BS: [...attributeValue] };
  }

  public build(value: AttributeType): AttributeValue {
    return match(value)
      .with(null, () => this.buildNull())

      .with(P.string, this.buildString)

      .with(P.number, this.buildNumber)

      .with(P.boolean, this.buildBoolean)

      .with(P.instanceOf(Uint8Array), this.buildBinary)

      .with(P.set(P.string), this.buildStringSet)

      .with(P.set(P.number), this.buildNumberSet)

      .with(P.set(P.instanceOf(Uint8Array)), this.buildBinarySet)

      .with(P.array(), (value: AttributeType[]) => ({
        L: value.map((item) => this.build(item)),
      }))

      .otherwise((value: { [key: string]: AttributeType }) => ({
        M: Object.entries(value).reduce(
          (attributeValue, [entryKey, entryValue]) => ({
            ...attributeValue,
            [entryKey]: this.build(entryValue),
          }),
          {},
        ),
      }));
  }
}
