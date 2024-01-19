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
}
