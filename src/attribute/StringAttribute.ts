import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { z } from 'zod';
import typeOf from 'just-typeof';
import { Attribute } from './Attribute.js';
import { InvalidAttributeTypeError } from './error/index.js';

export class StringAttribute extends Attribute<string> {
  public constructor(name: string, value: string) {
    super(name, value);
  }

  public override get dynamoDbValue(): AttributeValue {
    return { S: this.value };
  }

  public static parse(
    attributeName: string,
    dynamodbItem: Record<string, AttributeValue>,
  ): StringAttribute | undefined {
    if (!(attributeName in dynamodbItem)) return undefined;

    const parsingSchema = z.object({
      [attributeName]: z.object({ S: z.string() }),
    });

    const parsingResult = parsingSchema.safeParse(dynamodbItem);
    if (!parsingResult.success) {
      throw new InvalidAttributeTypeError(
        attributeName,
        'S',
        'string',
        Object.keys(dynamodbItem[attributeName]!)[0]!,
        typeOf(dynamodbItem[attributeName]),
      );
    }

    const value = parsingResult.data[attributeName]!.S;
    return new StringAttribute(attributeName, value);
  }
}
