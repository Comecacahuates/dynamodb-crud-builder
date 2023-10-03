import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Attribute } from './Attribute.js';

export class DateAttribute extends Attribute<Date> {
  public constructor(name: string, value: Date) {
    super(name, value);
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value.toISOString() };
  }
}
