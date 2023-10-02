import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import {
  InvalidAttributeNameError,
  InvalidAttributeValueError,
} from './error/index.js';

export const AttributeNameSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9._-]+$/);

export interface AttributeOptions {
  validationSchema: z.ZodType;
}

export abstract class Attribute<V = unknown> {
  private internalValue: V;
  private validationSchema: z.ZodType;

  public constructor(
    public readonly name: string,
    value: V,
    options: AttributeOptions,
  ) {
    this.validationSchema = options.validationSchema;

    const nameParsingResult = AttributeNameSchema.safeParse(name);
    if (!nameParsingResult.success) {
      throw new InvalidAttributeNameError(name);
    }

    this.name = name;

    this.internalValue = this.parseValue(value);
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

  protected parseValue(value: unknown): V {
    const parsingResult = this.validationSchema.safeParse(value);
    if (!parsingResult.success) {
      throw new InvalidAttributeValueError(this.name, parsingResult.error);
    }

    return parsingResult.data;
  }
}
