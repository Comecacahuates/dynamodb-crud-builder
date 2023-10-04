import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { Attribute } from './Attribute.js';
import {
  InvalidAttributeTypeError,
  UndefinedAttributeError,
} from './error/index.js';

export class StringAttribute extends Attribute<string> {
  public constructor(name: string, value: string) {
    super(name, value);
  }

  public override get dynamodbValue(): AttributeValue {
    return { S: this.value };
  }

  public parse(
    attributeName: string,
    dynamodbItem: Record<string, AttributeValue>,
  ) {
    this.internalValue = match(dynamodbItem)
      .with({ [attributeName]: { S: P.select(P.string) } }, (value) => value)
      .with({ [attributeName]: P.select() }, (dynamodbValue) => {
        throw new InvalidAttributeTypeError(
          attributeName,
          'S',
          'string',
          dynamodbValue,
        );
      })
      .otherwise(() => {
        throw new UndefinedAttributeError(attributeName, 'string');
      });
  }
}
