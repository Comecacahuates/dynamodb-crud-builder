import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { z } from 'zod';
import {
  InvalidAttributeTypeError,
  InvalidDynamodbAttributeTypeError,
} from './error/index.js';

// const AttributeNameSchema = z
//   .string()
//   .min(1)
//   .max(255)
//   .regex(/^[a-zA-Z0-9._-]+$/);

export type ScalarAttributeType = string | number | boolean | null | Date;
export type AttributeType =
  | ScalarAttributeType
  | Set<string>
  | Set<number>
  | AttributeType[]
  | { [key: string]: AttributeType };

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

  public static parseDynamodbValue(value: AttributeValue): AttributeType {
    const isValidDate = (value: unknown) => {
      const dateParsingSchema = z.string().datetime();
      const parsingResult = dateParsingSchema.safeParse(value);
      return parsingResult.success;
    };

    const isValidNumber = (value: unknown) => {
      const numberParsingSchema = z.number({ coerce: true });
      const parsingResult = numberParsingSchema.safeParse(value);
      return parsingResult.success;
    };

    return match<AttributeValue, AttributeType>(value)
      .with({ S: P.select(P.when(isValidDate)) }, (string) => new Date(string!))

      .with({ S: P.select(P.string) }, (string) => string!)

      .with({ N: P.select(P.when(isValidNumber)) }, (number) => Number(number))

      .with({ BOOL: P.select(P.boolean) }, (boolean) => boolean)

      .with({ NULL: true }, () => null)

      .with(
        { NS: P.select(P.array(P.when(isValidNumber))) },
        (stringNumbers) => new Set<number>(stringNumbers.map(Number)),
      )

      .with({ SS: P.select(P.array(P.string)) }, (strings) => new Set(strings))

      .with({ L: P.select(P.array(P.any)) }, (list) =>
        list.map((item) => this.parseDynamodbValue(item)),
      )

      .with({ M: P.select() }, (object) =>
        Object.fromEntries(
          Object.entries(object!).map(([key, value]) => [
            key,
            this.parseDynamodbValue(value),
          ]),
        ),
      )

      .otherwise((dynamodbValue) => {
        throw new InvalidDynamodbAttributeTypeError(dynamodbValue);
      });
  }
}
