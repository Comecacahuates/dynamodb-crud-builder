import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueParser } from '../../src/attribute-value/AttributeValueParser.js';
import { type AttributeType } from '../../src/types.js';

describe('parsing attribute values by type', () => {
  describe('given null attribute value', () => {
    const attributeValue: AttributeValue.NULLMember = { NULL: true };

    describe('when parsing null', () => {
      let parsedValue: null;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseNull(attributeValue);
      });

      it('should return null value', () => {
        expect(parsedValue).toBeNull();
      });
    });
  });

  describe('given string attribute value', () => {
    const attributeValue: AttributeValue.SMember = { S: 'value' };

    describe('when parsing string', () => {
      let parsedValue: string;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseString(attributeValue);
      });

      it('should return string value', () => {
        expect(parsedValue).toBe('value');
      });
    });
  });

  describe('given number attribute value', () => {
    const attributeValue: AttributeValue.NMember = { N: '1' };

    describe('when parsing number', () => {
      let parsedValue: number;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseNumber(attributeValue);
      });

      it('should return number value', () => {
        expect(parsedValue).toBe(1);
      });
    });
  });

  describe('given boolean attribute value', () => {
    const attributeValue: AttributeValue.BOOLMember = { BOOL: true };

    describe('when parsing boolean', () => {
      let parsedValue: boolean;

      beforeEach(() => {
        parsedValue =
          AttributeValueParser.instance.parseBoolean(attributeValue);
      });

      it('should return boolean value', () => {
        expect(parsedValue).toBe(true);
      });
    });
  });

  describe('given binary attribute value', () => {
    const attributeValue: AttributeValue.BMember = {
      B: new Uint8Array([1, 2, 3]),
    };

    describe('when parsing binary', () => {
      let parsedValue: Uint8Array;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseBinary(attributeValue);
      });

      it('should return binary value', () => {
        expect(parsedValue).toEqual(new Uint8Array([1, 2, 3]));
      });
    });
  });

  describe('given string set attribute value', () => {
    const attributeValue: AttributeValue.SSMember = { SS: ['a', 'b', 'c'] };

    describe('when parsing string set', () => {
      let parsedValue: Set<string>;

      beforeEach(() => {
        parsedValue =
          AttributeValueParser.instance.parseStringSet(attributeValue);
      });

      it('should return string set value', () => {
        expect(parsedValue).toEqual(new Set(['a', 'b', 'c']));
      });
    });
  });

  describe('given number set attribute value', () => {
    const attributeValue: AttributeValue.NSMember = { NS: ['1', '2', '3'] };

    describe('when parsing number set', () => {
      let parsedValue: Set<number>;

      beforeEach(() => {
        parsedValue =
          AttributeValueParser.instance.parseNumberSet(attributeValue);
      });

      it('should return number set value', () => {
        expect(parsedValue).toEqual(new Set([1, 2, 3]));
      });
    });
  });

  describe('given binary set attribute value', () => {
    const attributeValue: AttributeValue.BSMember = {
      BS: [
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
        new Uint8Array([7, 8, 9]),
      ],
    };

    describe('when parsing binary set', () => {
      let parsedValue: Set<Uint8Array>;

      beforeEach(() => {
        parsedValue =
          AttributeValueParser.instance.parseBinarySet(attributeValue);
      });

      it('should return binary set value', () => {
        expect(parsedValue).toEqual(
          new Set([
            new Uint8Array([1, 2, 3]),
            new Uint8Array([4, 5, 6]),
            new Uint8Array([7, 8, 9]),
          ]),
        );
      });
    });
  });
});

describe('parsing attribute values of any type', () => {
  type TestCase = {
    scenarioName: string;
    attributeValue: AttributeValue;
    testName: string;
    parsedValue: AttributeType;
  };

  const testCases: TestCase[] = [
    {
      scenarioName: 'given a null attribute value',
      attributeValue: { NULL: true },
      testName: 'should return null value',
      parsedValue: null,
    },
    {
      scenarioName: 'given a string attribute value',
      attributeValue: { S: 'value' },
      testName: 'should return string value',
      parsedValue: 'value',
    },
    {
      scenarioName: 'given a number attribute value',
      attributeValue: { N: '1' },
      testName: 'should return number value',
      parsedValue: 1,
    },
    {
      scenarioName: 'given a boolean attribute value',
      attributeValue: { BOOL: true },
      testName: 'should return boolean value',
      parsedValue: true,
    },
    {
      scenarioName: 'given a binary attribute value',
      attributeValue: { B: new Uint8Array([1, 2, 3]) },
      testName: 'should return binary value',
      parsedValue: new Uint8Array([1, 2, 3]),
    },
    {
      scenarioName: 'given a string set attribute value',
      attributeValue: { SS: ['a', 'b', 'c'] },
      testName: 'should return string set value',
      parsedValue: new Set(['a', 'b', 'c']),
    },
    {
      scenarioName: 'given a number set attribute value',
      attributeValue: { NS: ['1', '2', '3'] },
      testName: 'should return number set value',
      parsedValue: new Set([1, 2, 3]),
    },
    {
      scenarioName: 'given a binary set attribute value',
      attributeValue: {
        BS: [
          new Uint8Array([1, 2, 3]),
          new Uint8Array([4, 5, 6]),
          new Uint8Array([7, 8, 9]),
        ],
      },
      testName: 'should return binary set value',
      parsedValue: new Set([
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
        new Uint8Array([7, 8, 9]),
      ]),
    },
    {
      scenarioName: 'given a list attribute value',
      attributeValue: {
        L: [
          { S: 'a' },
          { N: '1' },
          { BOOL: true },
          { B: new Uint8Array([1, 2, 3]) },
          { SS: ['a', 'b', 'c'] },
          { NS: ['1', '2', '3'] },
          {
            BS: [
              new Uint8Array([1, 2, 3]),
              new Uint8Array([4, 5, 6]),
              new Uint8Array([7, 8, 9]),
            ],
          },
        ],
      },
      testName: 'should return list value',
      parsedValue: [
        'a',
        1,
        true,
        new Uint8Array([1, 2, 3]),
        new Set(['a', 'b', 'c']),
        new Set([1, 2, 3]),
        new Set([
          new Uint8Array([1, 2, 3]),
          new Uint8Array([4, 5, 6]),
          new Uint8Array([7, 8, 9]),
        ]),
      ],
    },
    {
      scenarioName: 'given an empty list attribute value',
      attributeValue: { L: [] },
      testName: 'should return empty list value',
      parsedValue: [],
    },
    {
      scenarioName: 'given a map attribute value',
      attributeValue: {
        M: {
          string: { S: 'a' },
          number: { N: '1' },
          boolean: { BOOL: true },
          binary: { B: new Uint8Array([1, 2, 3]) },
          stringSet: { SS: ['a', 'b', 'c'] },
          numberSet: { NS: ['1', '2', '3'] },
          binarySet: {
            BS: [
              new Uint8Array([1, 2, 3]),
              new Uint8Array([4, 5, 6]),
              new Uint8Array([7, 8, 9]),
            ],
          },
        },
      },
      testName: 'should return map value',
      parsedValue: {
        string: 'a',
        number: 1,
        boolean: true,
        binary: new Uint8Array([1, 2, 3]),
        stringSet: new Set(['a', 'b', 'c']),
        numberSet: new Set([1, 2, 3]),
        binarySet: new Set([
          new Uint8Array([1, 2, 3]),
          new Uint8Array([4, 5, 6]),
          new Uint8Array([7, 8, 9]),
        ]),
      },
    },
  ];

  describe.each(testCases)(
    '$scenarioName',
    ({ attributeValue, testName, parsedValue }) => {
      describe('when parsing', () => {
        let actualParsedValue: AttributeType;

        beforeEach(() => {
          actualParsedValue =
            AttributeValueParser.instance.parse(attributeValue);
        });

        it(testName, () => {
          expect(actualParsedValue).toEqual(parsedValue);
        });
      });
    },
  );
});
