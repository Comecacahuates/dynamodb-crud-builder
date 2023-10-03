import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { z } from 'zod';
import { Attribute } from './Attribute.js';
import { InvalidAttributeTypeError } from './error/index.js';

export class DateAttribute extends Attribute<Date> {
  public constructor(name: string, value: Date) {
    super(name, value);
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value.toISOString() };
  }

  public static parse(
    attributeName: string,
    dynamodbItem: Record<string, AttributeValue>,
  ): DateAttribute | undefined {
    const isValidDateString = (value: unknown): boolean => {
      const dateValidationSchema = z.string().datetime();
      const dateParsingResult = dateValidationSchema.safeParse(value);
      return dateParsingResult.success;
    };

    return match(dynamodbItem)
      .with(
        { [attributeName]: { S: P.select(P.when(isValidDateString)) } },
        (value) => new DateAttribute(attributeName, new Date(value!)),
      )
      .with({ [attributeName]: P.select() }, (dynamodbValue) => {
        throw new InvalidAttributeTypeError(
          attributeName,
          'S',
          'string',
          dynamodbValue,
        );
      })
      .otherwise(() => undefined);
  }
}
