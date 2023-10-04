import { describe, it, expect } from '@jest/globals';
import type { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Attribute } from '../../src/attribute/Attribute.js';

describe('Build DynamoDB value', () => {
  it.each([
    ['string', 'value-0', { S: 'value-0' }],
    [
      'date',
      new Date('2021-01-01T00:00:00.000Z'),
      { S: '2021-01-01T00:00:00.000Z' },
    ],
    ['number', 1, { N: '1' }],
    ['boolean', true, { BOOL: true }],
    ['null', null, { NULL: true }],
    ['number set', new Set<number>([1, 2, 3]), { NS: ['1', '2', '3'] }],
    ['string set', new Set<string>(['a', 'b', 'c']), { SS: ['a', 'b', 'c'] }],
    ['list', [1, 'a', true], { L: [{ N: '1' }, { S: 'a' }, { BOOL: true }] }],
    ['empty list', [], { L: [] }],
    [
      'object',
      { a: 1, b: { c: true }, d: [1, 2, 3] },
      {
        M: {
          a: { N: '1' },
          b: { M: { c: { BOOL: true } } },
          d: { L: [{ N: '1' }, { N: '2' }, { N: '3' }] },
        },
      },
    ],
  ])(
    `should DynamoDB value from %s`,
    (_, value: unknown, dynamodbValue: AttributeValue) => {
      expect(Attribute.buildDynamodbValue(value)).toEqual(dynamodbValue);
    },
  );
});