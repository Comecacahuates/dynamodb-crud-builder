import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { z } from 'zod';
import { Attribute } from './Attribute.js';
import {
  InvalidAttributeTypeError,
  UndefinedAttributeError,
} from './error/index.js';

export class DateAttribute extends Attribute<Date> {
  public constructor(name: string, value: Date) {
    super(name, value);
  }

  public override get dynamodbValue(): AttributeValue {
    return { S: this.value.toISOString() };
  }

  public override parse(dynamodbItem: Record<string, AttributeValue>) {
    const isValidDateString = (value: unknown): boolean => {
      const dateValidationSchema = z.string().datetime();
      const dateParsingResult = dateValidationSchema.safeParse(value);
      return dateParsingResult.success;
    };

    this.internalValue = match(dynamodbItem)
      .with(
        { [this.name]: { S: P.select(P.when(isValidDateString)) } },
        (value) => new Date(value!),
      )
      .with({ [this.name]: P.select() }, (dynamodbValue) => {
        throw new InvalidAttributeTypeError(
          this.name,
          'S',
          'string',
          dynamodbValue,
        );
      })
      .otherwise(() => {
        throw new UndefinedAttributeError(this.name, 'string');
      });
  }
}
