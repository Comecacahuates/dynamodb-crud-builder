import { describe, it, expect } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute/index.js';
import { type AttributeType } from '../../src/types.js';

describe('Parsing null DynamoDB attribute value', () => {
  it('should return null', () => {
    expect(Attribute.parseNull({ NULL: true })).toBe(null);
  });
});

describe('Parsing string DynamoDB attribute value', () => {
  it('should return string', () => {
    expect(Attribute.parseString({ S: 'attribute-value' })).toBe(
      'attribute-value',
    );
  });
});

describe('Parsing number DynamoDB attribute value', () => {
  it('should return number', () => {
    expect(Attribute.parseNumber({ N: '123' })).toBe(123);
  });
});

describe('Parsing boolean DynamoDB attribute value', () => {
  it('should return boolean', () => {
    expect(Attribute.parseBoolean({ BOOL: true })).toBe(true);
  });
});

describe('Parsing binary DynamoDB attribute value', () => {
  it('should return binary', () => {
    expect(Attribute.parseBinary({ B: new Uint8Array([1, 2, 3]) })).toEqual(
      new Uint8Array([1, 2, 3]),
    );
  });
});

describe('Parsing string set DynamoDB attribute value', () => {
  it('should return string set', () => {
    expect(Attribute.parseStringSet({ SS: ['value1', 'value2'] })).toEqual(
      new Set(['value1', 'value2']),
    );
  });
});

describe('Parsing number set DynamoDB attribute value', () => {
  it('should return number set', () => {
    expect(Attribute.parseNumberSet({ NS: ['123', '456'] })).toEqual(
      new Set([123, 456]),
    );
  });
});

describe('Parsing binary set DynamoDB attribute value', () => {
  it('should return binary set', () => {
    expect(
      Attribute.parseBinarySet({
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      }),
    ).toEqual(new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]));
  });
});

describe('Parsing DynamoDB attribute value', () => {
  type TestCase = {
    testName: string;
    attributeValue: AttributeValue;
    parsedValue: AttributeType;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should parse null attribute value',
      attributeValue: { NULL: true },
      parsedValue: null,
    },
    {
      testName: 'should parse string attribute value',
      attributeValue: { S: 'attribute-value' },
      parsedValue: 'attribute-value',
    },
    {
      testName: 'should parse number attribute value',
      attributeValue: { N: '123' },
      parsedValue: 123,
    },
    {
      testName: 'should parse boolean attribute value',
      attributeValue: { BOOL: true },
      parsedValue: true,
    },
    {
      testName: 'should parse binary attribute value',
      attributeValue: { B: new Uint8Array([1, 2, 3]) },
      parsedValue: new Uint8Array([1, 2, 3]),
    },
    {
      testName: 'should parse string set attribute value',
      attributeValue: { SS: ['value1', 'value2'] },
      parsedValue: new Set(['value1', 'value2']),
    },
    {
      testName: 'should parse number set attribute value',
      attributeValue: { NS: ['123', '456'] },
      parsedValue: new Set([123, 456]),
    },
    {
      testName: 'should parse binary set attribute value',
      attributeValue: {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
      parsedValue: new Set([
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
      ]),
    },
    {
      testName: 'should parse empty list attribute value',
      attributeValue: { L: [] },
      parsedValue: [],
    },
    {
      testName: 'should parse list of nulls only attribute value',
      attributeValue: { L: [{ NULL: true }, { NULL: true }] },
      parsedValue: [null, null],
    },
    {
      testName: 'should parse list of strings only attribute value',
      attributeValue: {
        L: [{ S: 'value1' }, { S: 'value2' }],
      },
      parsedValue: ['value1', 'value2'],
    },
    {
      testName: 'should parse list of numbers only attribute value',
      attributeValue: { L: [{ N: '123' }, { N: '456' }] },
      parsedValue: [123, 456],
    },
    {
      testName: 'should parse list of booleans only attribute value',
      attributeValue: { L: [{ BOOL: true }, { BOOL: false }] },
      parsedValue: [true, false],
    },
    {
      testName: 'should parse list of binaries only attribute value',
      attributeValue: {
        L: [{ B: new Uint8Array([1, 2, 3]) }, { B: new Uint8Array([4, 5, 6]) }],
      },
      parsedValue: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
    },
    {
      testName: 'should parse list of string sets only attribute value',
      attributeValue: {
        L: [{ SS: ['value1', 'value2'] }, { SS: ['value3', 'value4'] }],
      },
      parsedValue: [
        new Set(['value1', 'value2']),
        new Set(['value3', 'value4']),
      ],
    },
    {
      testName: 'should parse list of number sets only attribute value',
      attributeValue: {
        L: [{ NS: ['123', '456'] }, { NS: ['789', '012'] }],
      },
      parsedValue: [new Set([123, 456]), new Set([789, 12])],
    },
    {
      testName: 'should parse list of binary sets only attribute value',
      attributeValue: {
        L: [
          { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
          { BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])] },
        ],
      },
      parsedValue: [
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        new Set([new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])]),
      ],
    },
    {
      testName: 'should parse list of lists only attribute value',
      attributeValue: {
        L: [
          { L: [{ S: 'value1' }, { S: 'value2' }] },
          { L: [{ S: 'value3' }, { S: 'value4' }] },
        ],
      },
      parsedValue: [
        ['value1', 'value2'],
        ['value3', 'value4'],
      ],
    },
    {
      testName: 'should parse list of objects only attribute value',
      attributeValue: {
        L: [
          { M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } } },
          { M: { attr1: { S: 'value3' }, attr2: { S: 'value4' } } },
        ],
      },
      parsedValue: [
        { attr1: 'value1', attr2: 'value2' },
        { attr1: 'value3', attr2: 'value4' },
      ],
    },
    {
      testName: 'should parse list of different types attribute value',
      attributeValue: {
        L: [
          { NULL: true },
          { S: 'value1' },
          { N: '123' },
          { BOOL: true },
          { B: new Uint8Array([1, 2, 3]) },
          { SS: ['value2', 'value3'] },
          { L: [{ S: 'value4' }, { S: 'value5' }] },
          {
            M: {
              attr1: { NULL: true },
              attr2: { S: 'value6' },
              attr3: { N: '456' },
              attr4: { BOOL: true },
              attr5: { B: new Uint8Array([4, 5, 6]) },
              attr6: { SS: ['value7', 'value8'] },
              attr7: { L: [{ S: 'value9' }, { S: 'value10' }] },
            },
          },
        ],
      },
      parsedValue: [
        null,
        'value1',
        123,
        true,
        new Uint8Array([1, 2, 3]),
        new Set(['value2', 'value3']),
        ['value4', 'value5'],
        {
          attr1: null,
          attr2: 'value6',
          attr3: 456,
          attr4: true,
          attr5: new Uint8Array([4, 5, 6]),
          attr6: new Set(['value7', 'value8']),
          attr7: ['value9', 'value10'],
        },
      ],
    },
    {
      testName: 'should parse empty object attribute value',
      attributeValue: { M: {} },
      parsedValue: {},
    },
    {
      testName: 'should parse object of nulls only attribute value',
      attributeValue: { M: { attr1: { NULL: true }, attr2: { NULL: true } } },
      parsedValue: { attr1: null, attr2: null },
    },
    {
      testName: 'should parse object of strings only attribute value',
      attributeValue: { M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } } },
      parsedValue: { attr1: 'value1', attr2: 'value2' },
    },
    {
      testName: 'should parse object of numbers only attribute value',
      attributeValue: { M: { attr1: { N: '123' }, attr2: { N: '456' } } },
      parsedValue: { attr1: 123, attr2: 456 },
    },
    {
      testName: 'should parse object of booleans only attribute value',
      attributeValue: { M: { attr1: { BOOL: true }, attr2: { BOOL: false } } },
      parsedValue: { attr1: true, attr2: false },
    },
    {
      testName: 'should parse object of binaries only attribute value',
      attributeValue: {
        M: {
          attr1: { B: new Uint8Array([1, 2, 3]) },
          attr2: { B: new Uint8Array([4, 5, 6]) },
        },
      },
      parsedValue: {
        attr1: new Uint8Array([1, 2, 3]),
        attr2: new Uint8Array([4, 5, 6]),
      },
    },
    {
      testName: 'should parse object of string sets only attribute value',
      attributeValue: {
        M: {
          attr1: { SS: ['value1', 'value2'] },
          attr2: { SS: ['value3', 'value4'] },
        },
      },
      parsedValue: {
        attr1: new Set(['value1', 'value2']),
        attr2: new Set(['value3', 'value4']),
      },
    },
    {
      testName: 'should parse object of number sets only attribute value',
      attributeValue: {
        M: { attr1: { NS: ['123', '456'] }, attr2: { NS: ['789', '012'] } },
      },
      parsedValue: { attr1: new Set([123, 456]), attr2: new Set([789, 12]) },
    },
    {
      testName: 'should parse object of binary sets only attribute value',
      attributeValue: {
        M: {
          attr1: {
            BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
          },
          attr2: {
            BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])],
          },
        },
      },
      parsedValue: {
        attr1: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        attr2: new Set([
          new Uint8Array([7, 8, 9]),
          new Uint8Array([10, 11, 12]),
        ]),
      },
    },
    {
      testName: 'should parse object of lists only attribute value',
      attributeValue: {
        M: {
          attr1: { L: [{ S: 'value1' }, { S: 'value2' }] },
          attr2: { L: [{ S: 'value3' }, { S: 'value4' }] },
        },
      },
      parsedValue: { attr1: ['value1', 'value2'], attr2: ['value3', 'value4'] },
    },
    {
      testName: 'should parse object with different types attribute value',
      attributeValue: {
        M: {
          attr1: { NULL: true },
          attr2: { S: 'value1' },
          attr3: { N: '123' },
          attr4: { BOOL: true },
          attr5: { B: new Uint8Array([1, 2, 3]) },
          attr6: { SS: ['value2', 'value3'] },
          attr7: { L: [{ S: 'value4' }, { S: 'value5' }] },
          attr8: {
            M: {
              attr9: { NULL: true },
              attr10: { S: 'value6' },
              attr11: { N: '456' },
              attr12: { BOOL: true },
              attr13: { B: new Uint8Array([4, 5, 6]) },
              attr14: { SS: ['value7', 'value8'] },
              attr15: { L: [{ S: 'value9' }, { S: 'value10' }] },
            },
          },
        },
      },
      parsedValue: {
        attr1: null,
        attr2: 'value1',
        attr3: 123,
        attr4: true,
        attr5: new Uint8Array([1, 2, 3]),
        attr6: new Set(['value2', 'value3']),
        attr7: ['value4', 'value5'],
        attr8: {
          attr9: null,
          attr10: 'value6',
          attr11: 456,
          attr12: true,
          attr13: new Uint8Array([4, 5, 6]),
          attr14: new Set(['value7', 'value8']),
          attr15: ['value9', 'value10'],
        },
      },
    },
  ];

  it.each(testCases)('$testName', (testCase) => {
    const actualParsedValue = Attribute.parse(testCase.attributeValue);

    expect(actualParsedValue).toEqual(testCase.parsedValue);
  });
});
