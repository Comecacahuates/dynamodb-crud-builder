import { NativeAttributeValue, convertToAttr } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

export class ExpressionAttribute {
  private value: AttributeValue;

  public constructor(
    private readonly name: string,
    value: NativeAttributeValue,
  ) {
    this.value = convertToAttr(value);
  }

  public getName(): string {
    return this.name;
  }

  public getValue(): AttributeValue { 
    return this.value;
  }
}
