import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import { InvalidAttributeNameError } from './error/index.js';

export const AttributeNameSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9._-]+$/);

export class StringAttribute {
  public constructor(
    public readonly name: string,
    public readonly value: string,
  ) {
    const nameParsingResult = AttributeNameSchema.safeParse(name);
    if (!nameParsingResult.success) {
      throw new InvalidAttributeNameError(name);
    }

    this.name = name;
  }

  public get dynamoDbValue(): AttributeValue {
    return { S: this.value };
  }

  public get namePlaceholder(): string {
    return `#${this.name}`;
  }

  public get valuePlaceholder(): string {
    return `:${this.name}`;
  }
}
