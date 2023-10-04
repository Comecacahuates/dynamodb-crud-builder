import { describe, it, expect, beforeAll, jest, afterAll } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { MockSchema } from '../__mocks__/MockSchema.js';
import { Attribute } from '../../src/attribute/index.js';

beforeAll(() => {
  jest.useFakeTimers({
    advanceTimers: true,
    now: new Date('2021-01-01T00:00:00.000Z'),
  });
});

afterAll(() => {
  jest.useRealTimers();
});

describe('Schema attributes', () => {
  it.each([
    ['attribute0', 'attribute-name-0', 'attribute-value-0'],
    ['attribute1', 'attribute-name-1', 'attribute-value-1'],
    ['pk', 'PK', 'PARTITION_KEY#attribute-value-0'],
    ['sk', 'SK', 'SORT_KEY#attribute-value-1'],
    ['gsi1pk', 'SK', 'SORT_KEY#attribute-value-1'],
    ['gsi1sk', 'PK', 'PARTITION_KEY#attribute-value-0'],
    ['gsi2pk', 'GSI2PK', 'SECONDARY_INDEX_2_PARTITION_KEY#attribute-value-1'],
    ['gsi2sk', 'GSI2SK', 'SECONDARY_INDEX_2_SORT_KEY#attribute-value-0'],
    ['entityName', '_et', 'MockSchema'],
    ['creationTime', '_ct', new Date('2021-01-01T00:00:00.000Z')],
    ['updateTime', '_ut', new Date('2021-01-01T00:00:00.000Z')],
  ])(`should have %s`, (mockSchemaKey, attributeName, attributeValue) => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');
    const attribute = schema[mockSchemaKey as keyof MockSchema] as Attribute;

    expect(attribute.name).toBe(attributeName);
    expect(attribute.value as Attribute).toEqual(attributeValue);
  });
});

describe('Parsing DynamoDB item', () => {
  const dynamodbItem: Record<string, AttributeValue> = {
    'attribute-name-0': { S: 'attribute-value-0' },
    'attribute-name-1': { S: 'attribute-value-1' },
    'PK': { S: 'PARTITION_KEY#attribute-value-0' },
    'SK': { S: 'SORT_KEY#attribute-value-1' },
    'GSI2PK': { S: 'SECONDARY_INDEX_2_PARTITION_KEY#attribute-value-1' },
    'GSI2SK': { S: 'SECONDARY_INDEX_2_SORT_KEY#attribute-value-0' },
    '_et': { S: 'MockSchema' },
    '_ct': { S: '2022-01-01T00:00:00.000Z' },
    '_ut': { S: '2023-01-01T00:00:00.000Z' },
  };

  it.each([
    ['attribute0', 'attribute-name-0', 'attribute-value-0'],
    ['attribute1', 'attribute-name-1', 'attribute-value-1'],
    ['pk', 'PK', 'PARTITION_KEY#attribute-value-0'],
    ['sk', 'SK', 'SORT_KEY#attribute-value-1'],
    ['gsi2pk', 'GSI2PK', 'SECONDARY_INDEX_2_PARTITION_KEY#attribute-value-1'],
    ['gsi2sk', 'GSI2SK', 'SECONDARY_INDEX_2_SORT_KEY#attribute-value-0'],
    ['entityName', '_et', 'MockSchema'],
    ['creationTime', '_ct', new Date('2022-01-01T00:00:00.000Z')],
    ['updateTime', '_ut', new Date('2023-01-01T00:00:00.000Z')],
  ])('should parse %s', (mockSchemaKey, attributeName, attributeValue) => {
    const schema = MockSchema.parse(dynamodbItem);
    const attribute = schema![mockSchemaKey as keyof MockSchema] as Attribute;

    expect(schema).toBeDefined();
    expect(attribute.name).toBe(attributeName);
    expect(attribute.value).toEqual(attributeValue);
  });

  it('should return undefined if entityName is not MockSchema', () => {
    const schema = MockSchema.parse({
      ...dynamodbItem,
      _et: { S: 'NotMockSchema' },
    });

    expect(schema).toBeUndefined();
  });
});
