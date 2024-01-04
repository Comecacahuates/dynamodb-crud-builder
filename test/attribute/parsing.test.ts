import { describe, it, expect } from '@jest/globals';
import * as Attribute from '../../src/attribute/index.js';

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
  it('should parse null', () => {
    expect(Attribute.parse({ NULL: true })).toBe(null);
  });

  it('should parse string', () => {
    expect(Attribute.parse({ S: 'attribute-value' })).toBe('attribute-value');
  });

  it('should parse number', () => {
    expect(Attribute.parse({ N: '123' })).toBe(123);
  });

  it('should parse boolean', () => {
    expect(Attribute.parse({ BOOL: true })).toBe(true);
  });

  it('should parse binary', () => {
    expect(Attribute.parse({ B: new Uint8Array([1, 2, 3]) })).toEqual(
      new Uint8Array([1, 2, 3]),
    );
  });

  it('should parse string set', () => {
    expect(Attribute.parse({ SS: ['value1', 'value2'] })).toEqual(
      new Set(['value1', 'value2']),
    );
  });

  it('should parse number set', () => {
    expect(Attribute.parse({ NS: ['123', '456'] })).toEqual(
      new Set([123, 456]),
    );
  });

  it('should parse binary set', () => {
    expect(
      Attribute.parse({
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      }),
    ).toEqual(new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]));
  });

  describe('Parsing list DynamoDB attribute value', () => {
    it('should return empty list', () => {
      expect(Attribute.parse({ L: [] })).toEqual([]);
    });

    it('should return list with nulls only', () => {
      expect(
        Attribute.parse({
          L: [{ NULL: true }, { NULL: true }, { NULL: true }],
        }),
      ).toEqual([null, null, null]);
    });

    it('should return list with strings only', () => {
      expect(
        Attribute.parse({
          L: [{ S: 'value1' }, { S: 'value2' }, { S: 'value3' }],
        }),
      ).toEqual(['value1', 'value2', 'value3']);
    });

    it('should return list with numbers only', () => {
      expect(
        Attribute.parse({
          L: [{ N: '123' }, { N: '456' }, { N: '789' }],
        }),
      ).toEqual([123, 456, 789]);
    });

    it('should return list with booleans only', () => {
      expect(
        Attribute.parse({
          L: [{ BOOL: true }, { BOOL: false }, { BOOL: true }],
        }),
      ).toEqual([true, false, true]);
    });

    it('should return list with binaries only', () => {
      expect(
        Attribute.parse({
          L: [
            { B: new Uint8Array([1, 2, 3]) },
            { B: new Uint8Array([4, 5, 6]) },
            { B: new Uint8Array([7, 8, 9]) },
          ],
        }),
      ).toEqual([
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
        new Uint8Array([7, 8, 9]),
      ]);
    });

    it('should return list with string sets only', () => {
      expect(
        Attribute.parse({
          L: [
            { SS: ['value1', 'value2'] },
            { SS: ['value3', 'value4'] },
            { SS: ['value5', 'value6'] },
          ],
        }),
      ).toEqual([
        new Set(['value1', 'value2']),
        new Set(['value3', 'value4']),
        new Set(['value5', 'value6']),
      ]);
    });

    it('should return list with number sets only', () => {
      expect(
        Attribute.parse({
          L: [
            { NS: ['123', '456'] },
            { NS: ['789', '012'] },
            { NS: ['345', '678'] },
          ],
        }),
      ).toEqual([new Set([123, 456]), new Set([789, 12]), new Set([345, 678])]);
    });

    it('should return list with binary sets only', () => {
      expect(
        Attribute.parse({
          L: [
            {
              BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
            },
            {
              BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])],
            },
            {
              BS: [new Uint8Array([13, 14, 15]), new Uint8Array([16, 17, 18])],
            },
          ],
        }),
      ).toEqual([
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        new Set([new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])]),
        new Set([new Uint8Array([13, 14, 15]), new Uint8Array([16, 17, 18])]),
      ]);
    });

    it('should return list with lists only', () => {
      expect(
        Attribute.parse({
          L: [
            { L: [{ S: 'value1' }, { S: 'value2' }] },
            { L: [{ S: 'value3' }, { S: 'value4' }] },
            { L: [{ S: 'value5' }, { S: 'value6' }] },
          ],
        }),
      ).toEqual([
        ['value1', 'value2'],
        ['value3', 'value4'],
        ['value5', 'value6'],
      ]);
    });

    it('should return list with objects only', () => {
      expect(
        Attribute.parse({
          L: [
            {
              M: {
                attr1: { S: 'value1' },
                attr2: { S: 'value2' },
                attr3: { S: 'value3' },
              },
            },
            {
              M: {
                attr1: { S: 'value4' },
                attr2: { S: 'value5' },
                attr3: { S: 'value6' },
              },
            },
            {
              M: {
                attr1: { S: 'value7' },
                attr2: { S: 'value8' },
                attr3: { S: 'value9' },
              },
            },
          ],
        }),
      ).toEqual([
        { attr1: 'value1', attr2: 'value2', attr3: 'value3' },
        { attr1: 'value4', attr2: 'value5', attr3: 'value6' },
        { attr1: 'value7', attr2: 'value8', attr3: 'value9' },
      ]);
    });

    it('should return list with different types', () => {
      expect(
        Attribute.parse({
          L: [
            { S: 'value1' },
            { N: '123' },
            { BOOL: true },
            { NULL: true },
            { SS: ['value2', 'value3'] },
            { NS: ['456', '789'] },
            { BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])] },
            { L: [{ S: 'value4' }, { S: 'value5' }] },
            {
              M: {
                attr1: { S: 'value6' },
                attr2: { S: 'value7' },
                attr3: { S: 'value8' },
              },
            },
          ],
        }),
      ).toEqual([
        'value1',
        123,
        true,
        null,
        new Set(['value2', 'value3']),
        new Set([456, 789]),
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        ['value4', 'value5'],
        { attr1: 'value6', attr2: 'value7', attr3: 'value8' },
      ]);
    });
  });

  describe('Parsing object DynamoDB attribute value', () => {
    it('should return empty object', () => {
      expect(Attribute.parse({ M: {} })).toEqual({});
    });

    it('should return object with nulls only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { NULL: true },
            attr2: { NULL: true },
            attr3: { NULL: true },
          },
        }),
      ).toEqual({ attr1: null, attr2: null, attr3: null });
    });

    it('should return object with strings only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { S: 'value1' },
            attr2: { S: 'value2' },
            attr3: { S: 'value3' },
          },
        }),
      ).toEqual({ attr1: 'value1', attr2: 'value2', attr3: 'value3' });
    });

    it('should return object with numbers only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { N: '123' },
            attr2: { N: '456' },
            attr3: { N: '789' },
          },
        }),
      ).toEqual({ attr1: 123, attr2: 456, attr3: 789 });
    });

    it('should return object with booleans only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { BOOL: true },
            attr2: { BOOL: false },
            attr3: { BOOL: true },
          },
        }),
      ).toEqual({ attr1: true, attr2: false, attr3: true });
    });

    it('should return object with binaries only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { B: new Uint8Array([1, 2, 3]) },
            attr2: { B: new Uint8Array([4, 5, 6]) },
            attr3: { B: new Uint8Array([7, 8, 9]) },
          },
        }),
      ).toEqual({
        attr1: new Uint8Array([1, 2, 3]),
        attr2: new Uint8Array([4, 5, 6]),
        attr3: new Uint8Array([7, 8, 9]),
      });
    });

    it('should return object with string sets only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { SS: ['value1', 'value2'] },
            attr2: { SS: ['value3', 'value4'] },
            attr3: { SS: ['value5', 'value6'] },
          },
        }),
      ).toEqual({
        attr1: new Set(['value1', 'value2']),
        attr2: new Set(['value3', 'value4']),
        attr3: new Set(['value5', 'value6']),
      });
    });

    it('should return object with number sets only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { NS: ['123', '456'] },
            attr2: { NS: ['789', '012'] },
            attr3: { NS: ['345', '678'] },
          },
        }),
      ).toEqual({
        attr1: new Set([123, 456]),
        attr2: new Set([789, 12]),
        attr3: new Set([345, 678]),
      });
    });

    it('should return object with binary sets only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: {
              BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
            },
            attr2: {
              BS: [new Uint8Array([7, 8, 9]), new Uint8Array([10, 11, 12])],
            },
            attr3: {
              BS: [new Uint8Array([13, 14, 15]), new Uint8Array([16, 17, 18])],
            },
          },
        }),
      ).toEqual({
        attr1: new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
        attr2: new Set([
          new Uint8Array([7, 8, 9]),
          new Uint8Array([10, 11, 12]),
        ]),
        attr3: new Set([
          new Uint8Array([13, 14, 15]),
          new Uint8Array([16, 17, 18]),
        ]),
      });
    });

    it('should return object with lists only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: { L: [{ S: 'value1' }, { S: 'value2' }] },
            attr2: { L: [{ S: 'value3' }, { S: 'value4' }] },
            attr3: { L: [{ S: 'value5' }, { S: 'value6' }] },
          },
        }),
      ).toEqual({
        attr1: ['value1', 'value2'],
        attr2: ['value3', 'value4'],
        attr3: ['value5', 'value6'],
      });
    });

    it('should return object with objects only', () => {
      expect(
        Attribute.parse({
          M: {
            attr1: {
              M: {
                attr1: { S: 'value1' },
                attr2: { S: 'value2' },
                attr3: { S: 'value3' },
              },
            },
            attr2: {
              M: {
                attr1: { S: 'value4' },
                attr2: { S: 'value5' },
                attr3: { S: 'value6' },
              },
            },
            attr3: {
              M: {
                attr1: { S: 'value7' },
                attr2: { S: 'value8' },
                attr3: { S: 'value9' },
              },
            },
          },
        }),
      ).toEqual({
        attr1: { attr1: 'value1', attr2: 'value2', attr3: 'value3' },
        attr2: { attr1: 'value4', attr2: 'value5', attr3: 'value6' },
        attr3: { attr1: 'value7', attr2: 'value8', attr3: 'value9' },
      });
    });
  });
});
