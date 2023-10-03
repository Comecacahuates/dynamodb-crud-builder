import { describe, it, expect } from '@jest/globals';
import { DateAttribute } from '../../src/attribute/DateAttribute.js';
import {
  InvalidAttributeNameError,
  InvalidAttributeTypeError,
} from '../../src/attribute/error/index.js';

describe('Creating date attribute', () => {
  it('should return name', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.name).toBe('attribute-name');
  });

  it('should return value', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.value).toEqual(new Date('2021-01-01T00:00:00.000Z'));
  });

  it('should return DynamoDB value', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.dynamoDbValue).toEqual({
      S: '2021-01-01T00:00:00.000Z',
    });
  });

  it('should return attribute name placeholder', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.namePlaceholder).toBe('#attribute-name');
  });

  it('should return attribute value placeholder', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );

    expect(dateAttribute.valuePlaceholder).toBe(':attribute-name');
  });

  describe('Name validation', () => {
    it.each([['attribute-name-with-#'], ['attribute-name-with-:']])(
      `should throw error if name is %s`,
      (name: string) => {
        expect(
          () => new DateAttribute(name, new Date('2021-01-01T00:00:00.000Z')),
        ).toThrow(InvalidAttributeNameError);
      },
    );
  });
});

describe('Setting value', () => {
  it('should set a new value', () => {
    const dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );
    dateAttribute.setValue(new Date('2021-01-02T00:00:00.000Z'));

    expect(dateAttribute.value).toEqual(new Date('2021-01-02T00:00:00.000Z'));
  });
});

describe('Parsing DynamoDB value', () => {
  it('should parse value in DynamoDB item', () => {
    const dateAttribute = DateAttribute.parse('attribute-name', {
      'attribute-name': { S: '2021-01-01T00:00:00.000Z' },
    });

    expect(dateAttribute).toBeDefined();
    expect(dateAttribute!.value).toEqual(new Date('2021-01-01T00:00:00.000Z'));
  });

  it('should return undefined if value is not present in DynamoDB item', () => {
    const dateAttribute = DateAttribute.parse('attribute-name', {});

    expect(dateAttribute).toBeUndefined();
  });

  it('should throw error if attribute descriptor is not S', () => {
    expect(() =>
      DateAttribute.parse('attribute-name', { 'attribute-name': { N: '1' } }),
    ).toThrow(InvalidAttributeTypeError);
  });

  it('should throw error if attribute value is not a valid date string', () => {
    expect(() =>
      DateAttribute.parse('attribute-name', {
        'attribute-name': { S: 'invalid-date' },
      }),
    ).toThrow(InvalidAttributeTypeError);
  });
});
