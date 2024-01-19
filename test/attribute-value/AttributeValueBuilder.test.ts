import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueBuilder } from '../../src/attribute-value/AttributeValueBuilder.js';
import { AttributeValueParser } from '../../src/attribute-value/AttributeValueParser.js';
import { type AttributeType } from '../../src/types.js';

describe('building attribute values by type', () => {
  describe('given no data', () => {
    describe('when building null attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNull();
      });

      it('should return a null attribute value', () => {
        expect(attributeValue).toEqual({ NULL: true });
      });
    });
  });

  describe('given a string', () => {
    describe('when building string attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildString('value');
      });

      it('should return a string attribute value', () => {
        expect(attributeValue).toEqual({ S: 'value' });
      });
    });
  });

  describe('given a number', () => {
    describe('when building number attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNumber(1);
      });

      it('should return a number attribute value', () => {
        expect(attributeValue).toEqual({ N: '1' });
      });
    });
  });

  describe('given a boolean', () => {
    describe('when building boolean attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBoolean(true);
      });

      it('should return a boolean attribute value', () => {
        expect(attributeValue).toEqual({ BOOL: true });
      });
    });
  });

  describe('given a binary', () => {
    describe('when building binary attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBinary(
          Uint8Array.from([1, 2, 3]),
        );
      });

      it('should return a binary attribute value', () => {
        expect(attributeValue).toEqual({ B: Uint8Array.from([1, 2, 3]) });
      });
    });
  });

  describe('given a string set', () => {
    describe('when building string set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildStringSet(
          new Set(['a', 'b', 'c']),
        );
      });

      it('should return a string set attribute value', () => {
        expect(attributeValue).toEqual({ SS: ['a', 'b', 'c'] });
      });
    });
  });

  describe('given a number set', () => {
    describe('when building number set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNumberSet(
          new Set([1, 2, 3]),
        );
      });

      it('should return a number set attribute value', () => {
        expect(attributeValue).toEqual({ NS: ['1', '2', '3'] });
      });
    });
  });

  describe('given a binary set', () => {
    describe('when building binary set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBinarySet(
          new Set([Uint8Array.from([1, 2, 3])]),
        );
      });

      it('should return a binary set attribute value', () => {
        expect(attributeValue).toEqual({ BS: [Uint8Array.from([1, 2, 3])] });
      });
    });
  });
});

describe('building attribute of any type', () => {
  type TestCase = {
    scenarioDescription: string;
    value: AttributeType;
    testName: string;
    attributeValue: AttributeValue;
  };

  const testCases: TestCase[] = [
    {
      scenarioDescription: 'given a null',
      value: null,
      testName: 'should return a null attribute value',
      attributeValue: { NULL: true },
    },
    {
      scenarioDescription: 'given a string',
      value: 'string',
      testName: 'should return a string attribute value',
      attributeValue: { S: 'string' },
    },
    {
      scenarioDescription: 'given a number',
      value: 1,
      testName: 'should return a number attribute value',
      attributeValue: { N: '1' },
    },
    {
      scenarioDescription: 'given a boolean',
      value: true,
      testName: 'should return a boolean attribute value',
      attributeValue: { BOOL: true },
    },
    {
      scenarioDescription: 'given a binary',
      value: Uint8Array.from([1, 2, 3]),
      testName: 'should return a binary attribute value',
      attributeValue: { B: Uint8Array.from([1, 2, 3]) },
    },
    {
      scenarioDescription: 'given a string set',
      value: new Set(['a', 'b', 'c']),
      testName: 'should return a string set attribute value',
      attributeValue: { SS: ['a', 'b', 'c'] },
    },
    {
      scenarioDescription: 'given a number set',
      value: new Set([1, 2, 3]),
      testName: 'should return a number set attribute value',
      attributeValue: { NS: ['1', '2', '3'] },
    },
    {
      scenarioDescription: 'given a binary set',
      value: new Set([Uint8Array.from([1, 2, 3])]),
      testName: 'should return a binary set attribute value',
      attributeValue: { BS: [Uint8Array.from([1, 2, 3])] },
    },
    {
      scenarioDescription: 'given a list',
      value: [
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
      testName: 'should return a list attribute value',
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
    },
    {
      scenarioDescription: 'given an empty list',
      value: [],
      testName: 'should return an empty list attribute value',
      attributeValue: { L: [] },
    },
    {
      scenarioDescription: 'given an object',
      value: {
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
      testName: 'should return a map attribute value',
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
    },
  ];

  describe.each(testCases)(
    '$scenarioDescription',
    ({ value, testName, attributeValue }) => {
      describe(testName, () => {
        let actualValue: AttributeValue;

        beforeEach(() => {
          actualValue = AttributeValueBuilder.instance.build(value);
        });

        it(testName, () => {
          expect(actualValue).toEqual(attributeValue);
        });
      });
    },
  );
});

describe('inverse', () => {
  type TestCase = {
    scenarioDescription: string;
    originalValue: AttributeType;
  };

  const testCases: TestCase[] = [
    {
      scenarioDescription: 'given a null',
      originalValue: null,
    },
    {
      scenarioDescription: 'given a string',
      originalValue: 'string',
    },
    {
      scenarioDescription: 'given a number',
      originalValue: 1,
    },
    {
      scenarioDescription: 'given a boolean',
      originalValue: true,
    },
    {
      scenarioDescription: 'given a binary',
      originalValue: Uint8Array.from([1, 2, 3]),
    },
    {
      scenarioDescription: 'given a string set',
      originalValue: new Set(['a', 'b', 'c']),
    },
    {
      scenarioDescription: 'given a number set',
      originalValue: new Set([1, 2, 3]),
    },
    {
      scenarioDescription: 'given a binary set',
      originalValue: new Set([Uint8Array.from([1, 2, 3])]),
    },
    {
      scenarioDescription: 'given a list',
      originalValue: [
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
      scenarioDescription: 'given an empty list',
      originalValue: [],
    },
    {
      scenarioDescription: 'given an object',
      originalValue: {
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

  describe.each(testCases)('$scenarioDescription', ({ originalValue }) => {
    describe('when building and parsing again', () => {
      let actualValue: AttributeType;

      beforeEach(() => {
        const attributeValue =
          AttributeValueBuilder.instance.build(originalValue);
        actualValue = AttributeValueParser.instance.parse(attributeValue);
      });

      it('should return the original value', () => {
        expect(actualValue).toEqual(originalValue);
      });
    });
  });
});
