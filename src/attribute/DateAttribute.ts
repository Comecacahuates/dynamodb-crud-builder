import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import { Attribute } from './Attribute.js';

export class DateAttribute extends Attribute<Date> {
  private static readonly DEFAULT_VALIDATION_SCHEMA = z.date();

  public constructor(name: string, value: Date) {
    super(name, value, {
      validationSchema: DateAttribute.DEFAULT_VALIDATION_SCHEMA,
    });
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value.toISOString() };
  }
}
