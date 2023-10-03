import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
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
    return match(dynamodbItem)
      .with(
        { [attributeName]: { S: P.select(P.string) } },
        (value) => new StringAttribute(attributeName, value),
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
