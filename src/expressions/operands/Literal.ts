import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export class Literal {
  public static parseNull(attributeValue: AttributeValue.NULLMember): null {
    return null;
  }

  public static parseString(attributeValue: AttributeValue.SMember): string {
    return attributeValue.S;
  }
}
