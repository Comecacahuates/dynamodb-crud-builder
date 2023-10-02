import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z, ZodString } from 'zod';
import { Attribute } from './Attribute.js';

export class StringAttribute extends Attribute<string> {
  public constructor(
    name: string,
    value: string,
    options?: { validationSchema?: ZodString },
  ) {
    const defaultValidationSchema = z.string();

    super(name, value, {
      validationSchema: defaultValidationSchema,
      ...options,
    });
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value };
  }
}
