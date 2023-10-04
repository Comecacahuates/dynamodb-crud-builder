import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { InvalidAttributeTypeError } from './error/index.js';

// const AttributeNameSchema = z
//   .string()
//   .min(1)
//   .max(255)
//   .regex(/^[a-zA-Z0-9._-]+$/);

export abstract class Attribute {
  public static buildDynamodbValue(value: unknown): AttributeValue {
    return match<unknown, AttributeValue>(value)
      .with(P.string, (string) => ({ S: string }))

      .with(P.instanceOf(Date), (date) => ({ S: date.toISOString() }))

      .with(P.number, (number) => ({ N: number.toString() }))

      .with(P.boolean, (boolean) => ({ BOOL: boolean }))

      .with(null, () => ({ NULL: true }))

      .with(P.set(P.number), (numberSet) => ({
        NS: [...numberSet].map(String),
      }))

      .with(P.set(P.string), (stringSet) => ({
        SS: [...stringSet],
      }))

      .with(P.array(P.any), (list) => ({
        L: list.map((item) => this.buildDynamodbValue(item)),
      }))

      .with(undefined, () => {
        throw new InvalidAttributeTypeError(undefined);
      })

      .otherwise((object) => ({
        M: Object.fromEntries(
          Object.entries(object as object).map(([key, value]) => [
            key,
            this.buildDynamodbValue(value),
          ]),
        ),
      }));
  }
}
