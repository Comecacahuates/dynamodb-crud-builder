import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueParser } from '../../src/attribute-value/AttributeValueParser.js';
import { AttributeValueBuilder } from '../../src/attribute-value/AttributeValueBuilder.js';
import { type AttributeType } from '../../src/types.js';
import { InvalidAttributeValueError } from '../../src/errors/index.js';

describe('parsing attribute values by type', () => {
  describe('given null attribute value', () => {
    const attributeValue: AttributeValue.NULLMember = { NULL: true };

    describe('when parsing null', () => {
      let parsedValue: null;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseNull(attributeValue);
      });

      it('should return null', () => {
        expect(parsedValue).toBeNull();
      });
    });
  });

  describe('given string attribute value', () => {
    const attributeValue: AttributeValue.SMember = { S: 'string' };

    describe('when parsing string', () => {
      let parsedValue: string;

      beforeEach(() => {
        parsedValue = AttributeValueParser.instance.parseString(attributeValue);
      });

      it('should return a string', () => {
        expect(parsedValue).toBe('string');
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

      it('should return a number', () => {
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

      it('should return a boolean', () => {
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

      it('should return a binary', () => {
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

      it('should return a string set', () => {
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

      it('should return a number set', () => {
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

      it('should return a binary set', () => {
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
    scenarioDescription: string;
    attributeValue: AttributeValue;
    testName: string;
    parsedValue: AttributeType;
  };

  const testCases: TestCase[] = [
    {
      scenarioDescription: 'given a null attribute value',
      attributeValue: { NULL: true },
      testName: 'should return null',
      parsedValue: null,
    },
    {
      scenarioDescription: 'given a string attribute value',
      attributeValue: { S: 'string' },
      testName: 'should return a string',
      parsedValue: 'string',
    },
    {
      scenarioDescription: 'given a number attribute value',
      attributeValue: { N: '1' },
      testName: 'should return a number',
      parsedValue: 1,
    },
    {
      scenarioDescription: 'given a boolean attribute value',
      attributeValue: { BOOL: true },
      testName: 'should return a boolean',
      parsedValue: true,
    },
    {
      scenarioDescription: 'given a binary attribute value',
      attributeValue: { B: new Uint8Array([1, 2, 3]) },
      testName: 'should return a binary',
      parsedValue: new Uint8Array([1, 2, 3]),
    },
    {
      scenarioDescription: 'given a string set attribute value',
      attributeValue: { SS: ['a', 'b', 'c'] },
      testName: 'should return a string set',
      parsedValue: new Set(['a', 'b', 'c']),
    },
    {
      scenarioDescription: 'given a number set attribute value',
      attributeValue: { NS: ['1', '2', '3'] },
      testName: 'should return a number set',
      parsedValue: new Set([1, 2, 3]),
    },
    {
      scenarioDescription: 'given a binary set attribute value',
      attributeValue: {
        BS: [
          new Uint8Array([1, 2, 3]),
          new Uint8Array([4, 5, 6]),
          new Uint8Array([7, 8, 9]),
        ],
      },
      testName: 'should return a binary set',
      parsedValue: new Set([
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
        new Uint8Array([7, 8, 9]),
      ]),
    },
    {
      scenarioDescription: 'given a list attribute value',
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
      testName: 'should return a list',
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
      scenarioDescription: 'given an empty list attribute value',
      attributeValue: { L: [] },
      testName: 'should return an empty list',
      parsedValue: [],
    },
    {
      scenarioDescription: 'given a map attribute value',
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
      testName: 'should return an object',
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
    '$scenarioDescription',
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

  describe('given an invalid attribute value', () => {
    const attributeValue = {
      invalid: true,
    } as unknown as AttributeValue;

    describe('when parsing', () => {
      it('should throw an InvalidAttributeValueError', () => {
        expect(() =>
          AttributeValueParser.instance.parse(attributeValue),
        ).toThrow(InvalidAttributeValueError);
      });
    });
  });
});

describe('inverse', () => {
  type TestCase = {
    scenarioDescription: string;
    originalAttributeValue: AttributeValue;
  };

  const testCases: TestCase[] = [
    {
      scenarioDescription: 'given a null attribute value',
      originalAttributeValue: { NULL: true },
    },
    {
      scenarioDescription: 'given a string attribute value',
      originalAttributeValue: { S: 'string' },
    },
    {
      scenarioDescription: 'given a number attribute value',
      originalAttributeValue: { N: '1' },
    },
    {
      scenarioDescription: 'given a boolean attribute value',
      originalAttributeValue: { BOOL: true },
    },
    {
      scenarioDescription: 'given a binary attribute value',
      originalAttributeValue: { B: new Uint8Array([1, 2, 3]) },
    },
    {
      scenarioDescription: 'given a string set attribute value',
      originalAttributeValue: { SS: ['a', 'b', 'c'] },
    },
    {
      scenarioDescription: 'given a number set attribute value',
      originalAttributeValue: { NS: ['1', '2', '3'] },
    },
    {
      scenarioDescription: 'given a binary set attribute value',
      originalAttributeValue: {
        BS: [
          new Uint8Array([1, 2, 3]),
          new Uint8Array([4, 5, 6]),
          new Uint8Array([7, 8, 9]),
        ],
      },
    },
    {
      scenarioDescription: 'given a list attribute value',
      originalAttributeValue: {
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
    },
    {
      scenarioDescription: 'given an empty list attribute value',
      originalAttributeValue: { L: [] },
    },
    {
      scenarioDescription: 'given a map attribute value',
      originalAttributeValue: {
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
    },
  ];

  describe.each(testCases)(
    '$scenarioDescription',
    ({ originalAttributeValue }) => {
      describe('when parsing and building again', () => {
        let actualAttributeValue: AttributeValue;

        beforeEach(() => {
          const parsedValue = AttributeValueParser.instance.parse(
            originalAttributeValue,
          );
          actualAttributeValue =
            AttributeValueBuilder.instance.build(parsedValue);
        });

        it('should return the original attribute value', () => {
          expect(actualAttributeValue).toEqual(originalAttributeValue);
        });
      });
    },
  );
});
