import { describe, it, expect } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute/index.js';
import { type AttributeType } from '../../src/types.js';

describe('Building string DynamoDB attribute value', () => {
  it('should return string attribute value', () => {
    const attributeValue: AttributeValue.SMember =
      Attribute.buildString('attribute-value');

    expect(attributeValue).toEqual({ S: 'attribute-value' });
  });
});

describe('Building number DynamoDB attribute value', () => {
  it('should return number attribute value', () => {
    const attributeValue: AttributeValue.NMember = Attribute.buildNumber(123);

    expect(attributeValue).toEqual({ N: '123' });
  });
});

describe('Building boolean DynamoDB attribute value', () => {
  it('should return boolean attribute value', () => {
    const attributeValue: AttributeValue.BOOLMember =
      Attribute.buildBoolean(true);

    expect(attributeValue).toEqual({ BOOL: true });
  });
});

describe('Building binary DynamoDB attribute value', () => {
  it('should return binary attribute value', () => {
    const attributeValue: AttributeValue.BMember = Attribute.buildBinary(
      new Uint8Array([1, 2, 3]),
    );

    expect(attributeValue).toEqual({ B: new Uint8Array([1, 2, 3]) });
  });
});

describe('Building string set DynamoDB attribute value', () => {
  it('should return string set attribute value', () => {
    const attributeValue: AttributeValue.SSMember = Attribute.buildStringSet(
      new Set(['value1', 'value2']),
    );

    expect(attributeValue).toEqual({ SS: ['value1', 'value2'] });
  });
});

describe('Building number set DynamoDB attribute value', () => {
  it('should return number set attribute value', () => {
    const attributeValue: AttributeValue.NSMember = Attribute.buildNumberSet(
      new Set([123, 456]),
    );

    expect(attributeValue).toEqual({ NS: ['123', '456'] });
  });
});

describe('Build binary set DynamoDB attribute value', () => {
  it('should return binary set attribute value', () => {
    const attributeValue: AttributeValue.BSMember = Attribute.buildBinarySet(
      new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
    );

    expect(attributeValue).toEqual({
      BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
    });
  });
});

describe('Building any DynamoDB attribute value', () => {
  type TestCase = {
    testName: string;
    value: AttributeType;
    attributeValue: AttributeValue;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should build null attribute value',
      value: null,
      attributeValue: { NULL: true },
    },
    {
      testName: 'should build string attribute value',
      value: 'attribute-value',
      attributeValue: { S: 'attribute-value' },
    },
    {
      testName: 'should build number attribute value',
      value: 123,
      attributeValue: { N: '123' },
    },
    {
      testName: 'should build boolean attribute value',
      value: true,
      attributeValue: { BOOL: true },
    },
    {
      testName: 'should build binary attribute value',
      value: new Uint8Array([1, 2, 3]),
      attributeValue: { B: new Uint8Array([1, 2, 3]) },
    },
    {
      testName: 'should build string set attribute value',
      value: new Set(['value1', 'value2']),
      attributeValue: { SS: ['value1', 'value2'] },
    },
    {
      testName: 'should build number set attribute value',
      value: new Set([123, 456]),
      attributeValue: { NS: ['123', '456'] },
    },
    {
      testName: 'should build binary set attribute value',
      value: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      attributeValue: {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
    },
    {
      testName: 'should build list attribute value',
      value: ['value1', 'value2'],
      attributeValue: { L: [{ S: 'value1' }, { S: 'value2' }] },
    },
    {
      testName: 'should build object attribute value',
      value: { attr1: 'value1', attr2: 'value2' },
      attributeValue: {
        M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } },
      },
    },
    {
      testName: 'should build empty list attribute value',
      value: [],
      attributeValue: { L: [] },
    },
    {
      testName: 'should build list attribute value only with nulls',
      value: [null, null],
      attributeValue: { L: [{ NULL: true }, { NULL: true }] },
    },
    {
      testName: 'should build list attribute value only with strings',
      value: ['value1', 'value2'],
      attributeValue: { L: [{ S: 'value1' }, { S: 'value2' }] },
    },
    {
      testName: 'should build list attribute value only with numbers',
      value: [123, 456],
      attributeValue: { L: [{ N: '123' }, { N: '456' }] },
    },
    {
      testName: 'should build list attribute value only with booleans',
      value: [true, false],
      attributeValue: { L: [{ BOOL: true }, { BOOL: false }] },
    },
    {
      testName: 'should build list attribute value only with binaries',
      value: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      attributeValue: {
        L: [{ B: new Uint8Array([1, 2, 3]) }, { B: new Uint8Array([4, 5, 6]) }],
      },
    },
    {
      testName: 'should build list attribute value only with strings sets',
      value: [new Set(['value1', 'value2']), new Set(['value3', 'value4'])],
      attributeValue: {
        L: [{ SS: ['value1', 'value2'] }, { SS: ['value3', 'value4'] }],
      },
    },
    {
      testName: 'should build list attribute value only with number sets',
      value: [new Set([123, 456]), new Set([789, 101112])],
      attributeValue: {
        L: [{ NS: ['123', '456'] }, { NS: ['789', '101112'] }],
      },
    },
    {
      testName: 'should build list attribute value only with binary sets',
      value: [
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        new Set([new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])]),
      ],
      attributeValue: {
        L: [
          { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
          { BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])] },
        ],
      },
    },
    {
      testName: 'should build list attribute value only with lists',
      value: [
        ['value1', 'value2'],
        ['value3', 'value4'],
      ],
      attributeValue: {
        L: [
          { L: [{ S: 'value1' }, { S: 'value2' }] },
          { L: [{ S: 'value3' }, { S: 'value4' }] },
        ],
      },
    },
    {
      testName: 'should build list attribute value only with objects',
      value: [
        { attr1: 'value1', attr2: 'value2' },
        { attr3: 'value3', attr4: 'value4' },
      ],
      attributeValue: {
        L: [
          { M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } } },
          { M: { attr3: { S: 'value3' }, attr4: { S: 'value4' } } },
        ],
      },
    },
    {
      testName:
        'should build list attribute value with different types of items',
      value: [
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
    },
    {
      testName: 'should build empty object attribute value',
      value: {},
      attributeValue: { M: {} },
    },
    {
      testName: 'should build object attribute value only with nulls',
      value: { attr1: null, attr2: null },
      attributeValue: { M: { attr1: { NULL: true }, attr2: { NULL: true } } },
    },
    {
      testName: 'should build object attribute value only with strings',
      value: { attr1: 'value1', attr2: 'value2' },
      attributeValue: { M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } } },
    },
    {
      testName: 'should build object attribute value only with numbers',
      value: { attr1: 123, attr2: 456 },
      attributeValue: { M: { attr1: { N: '123' }, attr2: { N: '456' } } },
    },
    {
      testName: 'should build object attribute value only with booleans',
      value: { attr1: true, attr2: false },
      attributeValue: { M: { attr1: { BOOL: true }, attr2: { BOOL: false } } },
    },
    {
      testName: 'should build object attribute value only with binaries',
      value: {
        attr1: new Uint8Array([1, 2, 3]),
        attr2: new Uint8Array([4, 5, 6]),
      },
      attributeValue: {
        M: {
          attr1: { B: new Uint8Array([1, 2, 3]) },
          attr2: { B: new Uint8Array([4, 5, 6]) },
        },
      },
    },
    {
      testName: 'should build object attribute value only with strings sets',
      value: {
        attr1: new Set(['value1', 'value2']),
        attr2: new Set(['value3', 'value4']),
      },
      attributeValue: {
        M: {
          attr1: { SS: ['value1', 'value2'] },
          attr2: { SS: ['value3', 'value4'] },
        },
      },
    },
    {
      testName: 'should build object attribute value only with number sets',
      value: { attr1: new Set([123, 456]), attr2: new Set([789, 101112]) },
      attributeValue: {
        M: { attr1: { NS: ['123', '456'] }, attr2: { NS: ['789', '101112'] } },
      },
    },
    {
      testName: 'should build object attribute value only with binary sets',
      value: {
        attr1: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        attr2: new Set([
          new Uint8Array([7, 8, 9]),
          new Uint8Array([10, 11, 12]),
        ]),
      },
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
    },
    {
      testName: 'should build object attribute value only with lists',
      value: { attr1: ['value1', 'value2'], attr2: ['value3', 'value4'] },
      attributeValue: {
        M: {
          attr1: { L: [{ S: 'value1' }, { S: 'value2' }] },
          attr2: { L: [{ S: 'value3' }, { S: 'value4' }] },
        },
      },
    },
    {
      testName:
        'should build object attribute value with different types of attributes',
      value: {
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
    },
  ];

  it.each(testCases)('$testName', ({ value, attributeValue }) => {
    const result: AttributeValue = Attribute.build(value);

    expect(result).toEqual(attributeValue);
  });
});
