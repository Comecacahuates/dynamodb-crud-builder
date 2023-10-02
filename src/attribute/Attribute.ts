import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import { InvalidAttributeNameError } from './error/index.js';

export const AttributeNameSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9._-]+$/);

export abstract class Attribute<V = unknown> {
  private internalValue: V;

  public constructor(
    public readonly name: string,
    value: V,
  ) {
    const nameParsingResult = AttributeNameSchema.safeParse(name);
    if (!nameParsingResult.success) {
      throw new InvalidAttributeNameError(name);
    }

    this.name = name;

    this.internalValue = value;
  }

  public get value(): V {
    return this.internalValue;
  }

  public abstract get dynamoDbValue(): AttributeValue;

  public get namePlaceholder(): string {
    return `#${this.name}`;
  }

  public get valuePlaceholder(): string {
    return `:${this.name}`;
  }
}
