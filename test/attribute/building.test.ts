import { describe, it, expect } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute/index.js';

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

describe('Build DynamoDB attribute value', () => {
  it('should return null attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(null);

    expect(attributeValue).toEqual({ NULL: true });
  });

  it('should return string attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build('attribute-value');

    expect(attributeValue).toEqual({ S: 'attribute-value' });
  });

  it('should return number attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(123);

    expect(attributeValue).toEqual({ N: '123' });
  });

  it('should return boolean attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(true);

    expect(attributeValue).toEqual({ BOOL: true });
  });

  it('should return binary attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(
      new Uint8Array([1, 2, 3]),
    );

    expect(attributeValue).toEqual({ B: new Uint8Array([1, 2, 3]) });
  });

  it('should return string set attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(
      new Set(['value1', 'value2']),
    );

    expect(attributeValue).toEqual({ SS: ['value1', 'value2'] });
  });

  it('should return number set attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(new Set([123, 456]));

    expect(attributeValue).toEqual({ NS: ['123', '456'] });
  });

  it('should return binary set attribute value', () => {
    const attributeValue: AttributeValue = Attribute.build(
      new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
    );

    expect(attributeValue).toEqual({
      BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
    });
  });

  describe('Building list DynamoDB attribute value', () => {
    it('should return empty list attribute value', () => {
      const attributeValue: AttributeValue = Attribute.build([]);

      expect(attributeValue).toEqual({ L: [] });
    });

    it('should return list attribute value only with nulls', () => {
      const attributeValue: AttributeValue = Attribute.build([null, null]);

      expect(attributeValue).toEqual({
        L: [{ NULL: true }, { NULL: true }],
      });
    });

    it('should return list attribute value only with strings', () => {
      const attributeValue: AttributeValue = Attribute.build([
        'value1',
        'value2',
      ]);

      expect(attributeValue).toEqual({
        L: [{ S: 'value1' }, { S: 'value2' }],
      });
    });

    it('should return list attribute value only with numbers', () => {
      const attributeValue: AttributeValue = Attribute.build([123, 456]);

      expect(attributeValue).toEqual({
        L: [{ N: '123' }, { N: '456' }],
      });
    });

    it('should return list attribute value only with booleans', () => {
      const attributeValue: AttributeValue = Attribute.build([true, false]);

      expect(attributeValue).toEqual({
        L: [{ BOOL: true }, { BOOL: false }],
      });
    });

    it('should return list attribute value only with binaries', () => {
      const attributeValue: AttributeValue = Attribute.build([
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
      ]);

      expect(attributeValue).toEqual({
        L: [{ B: new Uint8Array([1, 2, 3]) }, { B: new Uint8Array([4, 5, 6]) }],
      });
    });

    it('should return list attribute value only with strings sets', () => {
      const attributeValue: AttributeValue = Attribute.build([
        new Set(['value1', 'value2']),
        new Set(['value3', 'value4']),
      ]);

      expect(attributeValue).toEqual({
        L: [{ SS: ['value1', 'value2'] }, { SS: ['value3', 'value4'] }],
      });
    });

    it('should return list attribute value only with number sets', () => {
      const attributeValue: AttributeValue = Attribute.build([
        new Set([123, 456]),
        new Set([789, 101112]),
      ]);

      expect(attributeValue).toEqual({
        L: [{ NS: ['123', '456'] }, { NS: ['789', '101112'] }],
      });
    });

    it('should return list attribute value only with binary sets', () => {
      const attributeValue: AttributeValue = Attribute.build([
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        new Set([new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])]),
      ]);

      expect(attributeValue).toEqual({
        L: [
          {
            BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
          },
          {
            BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])],
          },
        ],
      });
    });

    it('should return list attribute value only with lists', () => {
      const attributeValue: AttributeValue = Attribute.build([
        ['value1', 'value2'],
        ['value3', 'value4'],
      ]);

      expect(attributeValue).toEqual({
        L: [
          { L: [{ S: 'value1' }, { S: 'value2' }] },
          { L: [{ S: 'value3' }, { S: 'value4' }] },
        ],
      });
    });

    it('should return list attribute value only with objects', () => {
      const attributeValue: AttributeValue = Attribute.build([
        { attr1: 'value1', attr2: 'value2' },
        { attr3: 'value3', attr4: 'value4' },
      ]);

      expect(attributeValue).toEqual({
        L: [
          { M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } } },
          { M: { attr3: { S: 'value3' }, attr4: { S: 'value4' } } },
        ],
      });
    });

    it('should return list attribute value with different types of items', () => {
      const attributeValue: AttributeValue = Attribute.build([
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
      ]);

      expect(attributeValue).toEqual({
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
      });
    });
  });

  describe('Building object DynamoDB attribute value', () => {
    it('should return empty object attribute value', () => {
      const attributeValue: AttributeValue = Attribute.build({});

      expect(attributeValue).toEqual({ M: {} });
    });

    it('should return object attribute value only with nulls', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: null,
        attr2: null,
      });

      expect(attributeValue).toEqual({
        M: { attr1: { NULL: true }, attr2: { NULL: true } },
      });
    });

    it('should return object attribute value only with strings', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: 'value1',
        attr2: 'value2',
      });

      expect(attributeValue).toEqual({
        M: { attr1: { S: 'value1' }, attr2: { S: 'value2' } },
      });
    });

    it('should return object attribute value only with numbers', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: 123,
        attr2: 456,
      });

      expect(attributeValue).toEqual({
        M: { attr1: { N: '123' }, attr2: { N: '456' } },
      });
    });

    it('should return object attribute value only with booleans', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: true,
        attr2: false,
      });

      expect(attributeValue).toEqual({
        M: { attr1: { BOOL: true }, attr2: { BOOL: false } },
      });
    });

    it('should return object attribute value only with binaries', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: new Uint8Array([1, 2, 3]),
        attr2: new Uint8Array([4, 5, 6]),
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { B: new Uint8Array([1, 2, 3]) },
          attr2: { B: new Uint8Array([4, 5, 6]) },
        },
      });
    });

    it('should return object attribute value only with strings sets', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: new Set(['value1', 'value2']),
        attr2: new Set(['value3', 'value4']),
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { SS: ['value1', 'value2'] },
          attr2: { SS: ['value3', 'value4'] },
        },
      });
    });

    it('should return object attribute value only with number sets', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: new Set([123, 456]),
        attr2: new Set([789, 101112]),
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { NS: ['123', '456'] },
          attr2: { NS: ['789', '101112'] },
        },
      });
    });

    it('should return object attribute value only with binary sets', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        attr2: new Set([
          new Uint8Array([7, 8, 9]),
          new Uint8Array([10, 11, 12]),
        ]),
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: {
            BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
          },
          attr2: {
            BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])],
          },
        },
      });
    });

    it('should return object attribute value only with lists', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: ['value1', 'value2'],
        attr2: ['value3', 'value4'],
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { L: [{ S: 'value1' }, { S: 'value2' }] },
          attr2: { L: [{ S: 'value3' }, { S: 'value4' }] },
        },
      });
    });

    it('should return object attribute value with different types of items', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: null,
        attr2: 'value1',
        attr3: 123,
        attr4: true,
        attr5: new Uint8Array([1, 2, 3]),
        attr6: new Set(['value2', 'value3']),
        attr7: ['value4', 'value5'],
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { NULL: true },
          attr2: { S: 'value1' },
          attr3: { N: '123' },
          attr4: { BOOL: true },
          attr5: { B: new Uint8Array([1, 2, 3]) },
          attr6: { SS: ['value2', 'value3'] },
          attr7: { L: [{ S: 'value4' }, { S: 'value5' }] },
        },
      });
    });

    it('should return object attribute value with nested objects', () => {
      const attributeValue: AttributeValue = Attribute.build({
        attr1: { attr2: { attr3: 'value1' } },
        attr4: { attr5: { attr6: 'value2' } },
      });

      expect(attributeValue).toEqual({
        M: {
          attr1: { M: { attr2: { M: { attr3: { S: 'value1' } } } } },
          attr4: { M: { attr5: { M: { attr6: { S: 'value2' } } } } },
        },
      });
    });
  });
});
