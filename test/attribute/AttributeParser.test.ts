import { describe, it, expect } from '@jest/globals';
import { AttributeParser } from '../../src/attribute/AttributeParser.js';
import { InvalidAttributeValueError } from '../../src/attribute/error/InvalidAttributeValueError.js';

describe('Parse attributes', () => {
  it('should parse string value', () => {
    expect(AttributeParser.parse({ S: 'attribute-value' })).toBe(
      'attribute-value',
    );
  });

  it('should parse number value', () => {
    expect(AttributeParser.parse({ N: '123' })).toBe(123);
  });

  it('should parse boolean value', () => {
    expect(AttributeParser.parse({ BOOL: true })).toBe(true);
  });

  it('should parse null value', () => {
    expect(AttributeParser.parse({ NULL: true })).toBe(null);
  });

  it('should parse string set value', () => {
    expect(AttributeParser.parse({ SS: ['value1', 'value2'] })).toEqual(
      new Set(['value1', 'value2']),
    );
  });

  it('should parse number set value', () => {
    expect(AttributeParser.parse({ NS: ['123', '456'] })).toEqual(
      new Set([123, 456]),
    );
  });

  it('should parse empty string set value', () => {
    expect(AttributeParser.parse({ SS: [] })).toEqual(new Set());
  });

  it('should parse empty number set value', () => {
    expect(AttributeParser.parse({ NS: [] })).toEqual(new Set());
  });

  it('should parse list value', () => {
    expect(
      AttributeParser.parse({
        L: [{ S: 'value1' }, { S: 'value2' }, { BOOL: true }],
      }),
    ).toEqual(['value1', 'value2', true]);
  });

  it('should parse empty list value', () => {
    expect(AttributeParser.parse({ L: [] })).toEqual([]);
  });

  it('should parse object value', () => {
    expect(
      AttributeParser.parse({
        M: {
          attr1: { S: 'value1' },
          attr2: { S: 'value2' },
          attr3: { NULL: true },
          attr4: { L: [{ S: 'value3' }, { S: 'value4' }] },
        },
      }),
    ).toEqual({
      attr1: 'value1',
      attr2: 'value2',
      attr3: null,
      attr4: ['value3', 'value4'],
    });
  });

  it('should parse empty object value', () => {
    expect(AttributeParser.parse({ M: {} })).toEqual({});
  });

  it('should throw error if value is not valid', () => {
    expect(() => AttributeParser.parse({ S: ['object', ''] } as any)).toThrow(
      InvalidAttributeValueError,
    );
  });
});
