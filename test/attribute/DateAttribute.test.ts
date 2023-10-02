import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';
import { DateAttribute } from '../../src/attribute/DateAttribute.js';
import {
  InvalidAttributeNameError,
  InvalidAttributeValueError,
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
      `should throw error if name is not valid: %s`,
      (name) => {
        expect(
          () => new DateAttribute(name, new Date('2021-01-01T00:00:00.000Z')),
        ).toThrow(InvalidAttributeNameError);
      },
    );
  });
});
