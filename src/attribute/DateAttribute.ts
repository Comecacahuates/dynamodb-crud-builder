import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import { Attribute } from './Attribute.js';
import type { AttributeOptions } from './Attribute.js';

export interface DateAttributeOptions extends AttributeOptions<z.ZodDate> {}

export class DateAttribute extends Attribute<Date> {
  private static readonly DEFAULT_VALIDATION_SCHEMA = z.date();

  public constructor(
    name: string,
    value: Date,
    options?: DateAttributeOptions,
  ) {
    super(name, value, {
      validationSchema: DateAttribute.DEFAULT_VALIDATION_SCHEMA,
      ...options,
    });
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value.toISOString() };
  }
}
