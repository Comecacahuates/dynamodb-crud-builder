import { describe, it, expect, beforeEach } from '@jest/globals';
import { DateAttribute } from '../../src/attribute/DateAttribute.js';
import {
  InvalidAttributeNameError,
  InvalidAttributeTypeError,
  UndefinedAttributeError,
} from '../../src/attribute/error/index.js';

describe('Creating date attribute', () => {
  let dateAttribute: DateAttribute;

  beforeEach(() => {
    dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );
  });

  it('should return name', () => {
    expect(dateAttribute.name).toBe('attribute-name');
  });

  it('should return value', () => {
    expect(dateAttribute.value).toEqual(new Date('2021-01-01T00:00:00.000Z'));
  });

  it('should return DynamoDB value', () => {
    expect(dateAttribute.dynamodbValue).toEqual({
      S: '2021-01-01T00:00:00.000Z',
    });
  });

  it('should return DynamoDB item', () => {
    expect(dateAttribute.dynamodbItem).toEqual({
      'attribute-name': { S: '2021-01-01T00:00:00.000Z' },
    });
  });

  it('should return attribute name placeholder', () => {
    expect(dateAttribute.namePlaceholder).toBe('#attribute-name');
  });

  it('should return attribute value placeholder', () => {
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
  let dateAttribute: DateAttribute;

  beforeEach(() => {
    dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );
  });

  it('should set a new value', () => {
    dateAttribute.setValue(new Date('2021-01-02T00:00:00.000Z'));

    expect(dateAttribute.value).toEqual(new Date('2021-01-02T00:00:00.000Z'));
  });
});

describe('Parsing DynamoDB value', () => {
  let dateAttribute: DateAttribute;

  beforeEach(() => {
    dateAttribute = new DateAttribute(
      'attribute-name',
      new Date('2021-01-01T00:00:00.000Z'),
    );
  });

  it('should parse value in DynamoDB item', () => {
    dateAttribute.parse({
      'attribute-name': { S: '2021-01-01T00:00:00.000Z' },
    });

    expect(dateAttribute.value).toEqual(new Date('2021-01-01T00:00:00.000Z'));
  });

  it('should throw error if value is not present in DynamoDB item', () => {
    expect(() => dateAttribute.parse({})).toThrow(UndefinedAttributeError);
  });

  it('should throw error if attribute descriptor is not S', () => {
    expect(() => dateAttribute.parse({ 'attribute-name': { N: '1' } })).toThrow(
      InvalidAttributeTypeError,
    );
  });

  it('should throw error if attribute value is not a valid date string', () => {
    expect(() =>
      dateAttribute.parse({ 'attribute-name': { S: 'invalid-date' } }),
    ).toThrow(InvalidAttributeTypeError);
  });
});
