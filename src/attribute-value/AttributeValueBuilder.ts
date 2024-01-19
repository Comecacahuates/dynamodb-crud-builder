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
}
