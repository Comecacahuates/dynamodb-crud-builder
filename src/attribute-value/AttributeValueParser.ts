import { type AttributeValue } from '@aws-sdk/client-dynamodb';

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
}
