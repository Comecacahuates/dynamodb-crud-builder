import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { AttributeType } from './types.js';

export function parseString(attributeValue: AttributeValue.SMember): string {
  return attributeValue.S;
}
