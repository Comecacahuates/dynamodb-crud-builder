import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
  jest,
} from '@jest/globals';
import { AttributeValue, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { PutCommandBuilder } from '../../src/write/PutCommandBuilder.js';
import type { AttributeType } from '../../src/attribute/index.js';
import { MissingTableError } from '../../src/write/error/index.js';

beforeAll(() => {
  jest.useFakeTimers({
    advanceTimers: true,
    now: new Date('2021-01-01T00:00:00.000Z'),
  });
});

afterAll(() => {
  jest.useRealTimers();
});

describe('Build put command', () => {
  let putCommandBuilder: PutCommandBuilder;

  beforeEach(() => {
    putCommandBuilder = new PutCommandBuilder();
  });

  it.each([
    ['string', 'attribute-value', { S: 'attribute-value' }],
    ['number', 1, { N: '1' }],
    ['boolean', true, { BOOL: true }],
    ['null', null, { NULL: true }],
    [
      'date',
      new Date('2021-01-01T00:00:00.000Z'),
      { S: '2021-01-01T00:00:00.000Z' },
    ],
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
    `should put one %s attribute`,
    (
      _,
      attributeValue: AttributeType,
      dynamodbAttributeValue: AttributeValue,
    ) => {
      const putCommand: PutItemCommand = putCommandBuilder
        .put('attribute0', attributeValue)
        .intoTable('table-name')
        .later();

      expect(putCommand).toHaveProperty('input', {
        TableName: 'table-name',
        Item: {
          attribute0: dynamodbAttributeValue,
        },
      });
    },
  );

  it('should put multiple attributes', () => {
    const putCommand: PutItemCommand = putCommandBuilder
      .put('attribute0', 'attribute0-value')
      .put('attribute1', 1)
      .put('attribute2', true)
      .put('attribute3', new Date('2021-01-01T00:00:00.000Z'))
      .put('attribute4', new Set<number>([1, 2, 3]))
      .intoTable('table-name')
      .later();

    expect(putCommand).toHaveProperty('input', {
      TableName: 'table-name',
      Item: {
        attribute0: { S: 'attribute0-value' },
        attribute1: { N: '1' },
        attribute2: { BOOL: true },
        attribute3: { S: '2021-01-01T00:00:00.000Z' },
        attribute4: { NS: ['1', '2', '3'] },
      },
    });
  });

  it('should throw error if table name is not set', () => {
    expect(() =>
      putCommandBuilder.put('attribute0', 'attribute0-value').later(),
    ).toThrow(MissingTableError);
  });
});
