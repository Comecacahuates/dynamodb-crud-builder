import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { MockSchema } from '../__mocks__/MockSchema.js';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

beforeAll(() => {
  jest.useFakeTimers({
    advanceTimers: true,
    now: new Date('2021-01-01T00:00:00.000Z'),
  });
});

afterAll(() => {
  jest.useRealTimers();
});

describe('Attributes', () => {
  let schema: MockSchema;

  beforeAll(() => {
    schema = new MockSchema('attribute0-value', 'attribute1-value');
  });

  it.each([
    ['attribute0', 'attribute0-value'],
    ['attribute1', 'attribute1-value'],
    ['creationTime', new Date('2021-01-01T00:00:00.000Z')],
    ['updateTime', new Date('2021-01-01T00:00:00.000Z')],
    ['entityName', 'MockSchema'],
    ['pk', 'PARTITION_KEY#attribute0-value'],
    ['sk', 'SORT_KEY#attribute1-value'],
    ['gsi1pk', 'SORT_KEY#attribute1-value'],
    ['gsi1sk', 'PARTITION_KEY#attribute0-value'],
    ['gsi2pk', 'GSI2_PARTITION_KEY#attribute1-value'],
    ['gsi2sk', 'GIS2_SORT_KEY#attribute0-value'],
  ])(`should have %s`, (attributeName, attributeValue) => {
    expect(schema).toHaveProperty(attributeName, attributeValue);
  });
});

describe('Put command', () => {
  let schema: MockSchema;

  beforeAll(() => {
    schema = new MockSchema('attribute0-value', 'attribute1-value');
  });

  it.each([
    ['_et', { S: 'MockSchema' }],
    ['_ct', { S: '2021-01-01T00:00:00.000Z' }],
    ['_ut', { S: '2021-01-01T00:00:00.000Z' }],
    ['PK', { S: 'PARTITION_KEY#attribute0-value' }],
    ['SK', { S: 'SORT_KEY#attribute1-value' }],
    ['GSI2PK', { S: 'GSI2_PARTITION_KEY#attribute1-value' }],
    ['GSI2SK', { S: 'GIS2_SORT_KEY#attribute0-value' }],
    ['attr0', { S: 'attribute0-value' }],
    ['attr1', { S: 'attribute1-value' }],
  ])(
    `should put %s attribute`,
    (attributeName: string, dynamodbAttributeValue: AttributeValue) => {
      const putCommand = schema.put().intoTable('table-name').later();
      expect(putCommand).toHaveProperty(
        ['input', 'Item', attributeName],
        dynamodbAttributeValue,
      );
    },
  );
});
