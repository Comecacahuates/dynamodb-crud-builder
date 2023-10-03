import { describe, it, expect, beforeAll, jest, afterAll } from '@jest/globals';
import { MockSchema } from '../__mocks__/MockSchema.js';

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
  it('should have attribute0', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.attribute0.name).toBe('attribute-name-0');
    expect(schema.attribute0.value).toBe('attribute-value-0');
  });

  it('should have attribute1', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.attribute1.name).toBe('attribute-name-1');
    expect(schema.attribute1.value).toBe('attribute-value-1');
  });

  it('should have primary index partition key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.pk.name).toBe('PK');
    expect(schema.pk.value).toBe('PARTITION_KEY#attribute-value-0');
  });

  it('should have primary index sort key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.sk.name).toBe('SK');
    expect(schema.sk.value).toBe('SORT_KEY#attribute-value-1');
  });

  it('should have secondary index 1 partition key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.gsi1pk.name).toBe('SK');
    expect(schema.gsi1pk.value).toBe('SORT_KEY#attribute-value-1');
  });

  it('should have secondary index 1 sort key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.gsi1sk.name).toBe('PK');
    expect(schema.gsi1sk.value).toBe('PARTITION_KEY#attribute-value-0');
  });

  it('should have secondary index 2 partition key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.gsi2pk.name).toBe('GSI2PK');
    expect(schema.gsi2pk.value).toBe(
      'SECONDARY_INDEX_2_PARTITION_KEY#attribute-value-1',
    );
  });

  it('should have secondary index 2 sort key', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.gsi2sk.name).toBe('GSI2SK');
    expect(schema.gsi2sk.value).toBe(
      'SECONDARY_INDEX_2_SORT_KEY#attribute-value-0',
    );
  });

  it('should have entity name', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.entityName.name).toBe('_et');
    expect(schema.entityName.value).toBe('MockSchema');
  });

  it('should have creation time', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.creationTime.name).toBe('_ct');
    expect(schema.creationTime.value).toBeInstanceOf(Date);
  });

  it('should have update time', () => {
    const schema = new MockSchema('attribute-value-0', 'attribute-value-1');

    expect(schema.updateTime.name).toBe('_ut');
    expect(schema.updateTime.value).toBeInstanceOf(Date);
  });
});
