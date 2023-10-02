import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z, ZodString } from 'zod';
import { Attribute } from './Attribute.js';
import type { AttributeOptions } from './Attribute.js';

export interface StringAttributeOptions
  extends Omit<AttributeOptions, 'validationSchema'> {
  readonly validationSchema?: ZodString;
}

export class StringAttribute extends Attribute<string> {
  private static readonly DEFAULT_VALIDATION_SCHEMA = z.string();

  public constructor(
    name: string,
    value: string,
    options?: StringAttributeOptions,
  ) {
    super(name, value, {
      validationSchema: StringAttribute.DEFAULT_VALIDATION_SCHEMA,
      ...options,
    });
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value };
  }
}
