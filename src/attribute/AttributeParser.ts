import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { AttributeType } from './types.js';
import { InvalidAttributeValueError } from './error/index.js';

export class AttributeParser {
  public static parse(attributeValue: AttributeValue): AttributeType {
    return match(attributeValue)
      .with(
        { S: P.string },
        (attributeValue: AttributeValue.SMember) => attributeValue.S,
      )

      .with({ N: P.string }, (attributeValue: AttributeValue.NMember) =>
        Number(attributeValue.N),
      )

      .with(
        { BOOL: P.boolean },
        (attributeValue: AttributeValue.BOOLMember) => attributeValue.BOOL,
      )

      .with({ NULL: true }, () => null)

      .with(
        { SS: P.array(P.string) },
        (attributeValue: AttributeValue.SSMember) => new Set(attributeValue.SS),
      )

      .with(
        { NS: P.array(P.string) },
        (attributeValue: AttributeValue.NSMember) =>
          new Set(attributeValue.NS.map(Number)),
      )

      .with(
        { L: P.array() },
        (attributeValue: AttributeValue.LMember): AttributeType[] =>
          attributeValue.L.map((item: AttributeValue) => this.parse(item)),
      )

      .with(
        { M: P.any },
        (attributeValue: AttributeValue.MMember): AttributeType => {
          const attribute: AttributeType = {};

          for (const [key, value] of Object.entries(attributeValue.M)) {
            attribute[key] = this.parse(value);
          }

          return attribute;
        },
      )

      .otherwise(() => {
        throw new InvalidAttributeValueError(attributeValue);
      });
  }
}
