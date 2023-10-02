import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Attribute } from './Attribute.js';

export class StringAttribute extends Attribute<string> {
  public constructor(name: string, value: string) {
    super(name, value);
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value };
  }
}
