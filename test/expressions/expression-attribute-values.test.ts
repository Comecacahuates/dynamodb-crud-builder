import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  mergeExpressionAttributeValues,
  buildExpressionAttributeValuePlaceholder,
  buildExpressionAttributeValue,
} from '../../src/expressions/expression-attribute-values.js';
import { type ExpressionAttributeValues } from '../../src/expressions/index.js';
import { type DocumentPath } from '../../src/document-path/index.js';

describe('Merging expression attribute values', () => {
  describe('given three sets of expression attribute values', () => {
    const expressionAttributeValuesA: ExpressionAttributeValues = {
      ':a': { S: 'a' },
      ':b': { S: 'b' },
    };
    const expressionAttributeValuesB: ExpressionAttributeValues = {
      ':b': { S: 'b' },
      ':c': { S: 'c' },
    };
    const expressionAttributeValuesC: ExpressionAttributeValues = {
      ':c': { S: 'c' },
      ':d': { S: 'd' },
    };

    describe('when merging expression attribute values', () => {
      let mergedExpressionAttributeValues: ExpressionAttributeValues;

      beforeEach(() => {
        mergedExpressionAttributeValues = mergeExpressionAttributeValues([
          expressionAttributeValuesA,
          expressionAttributeValuesB,
          expressionAttributeValuesC,
        ]);
      });

      it('should have all expression attribute values', () => {
        expect(mergedExpressionAttributeValues).toEqual({
          ':a': { S: 'a' },
          ':b': { S: 'b' },
          ':c': { S: 'c' },
          ':d': { S: 'd' },
        });
      });
    });
  });
});

describe('Building placeholder', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    placeholder: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should return placeholder for document path with no indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c' },
      ],
      placeholder: ':abc',
    },
    {
      testName: 'should return placeholder for document path with indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ],
      placeholder: ':abc1de2',
    },
  ];

  it.each(testCases)('$testName', ({ documentPath, placeholder }) => {
    const actualPlaceholder =
      buildExpressionAttributeValuePlaceholder(documentPath);

    expect(actualPlaceholder).toBe(placeholder);
  });
});

describe('Building expression attribute value', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    attributeValue: AttributeValue;
    expressionAttributeValues: ExpressionAttributeValues;
  };

  const testCases: Array<TestCase> = [
    {
      testName:
        'should return expression attribute value for document path with no indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c' },
      ],
      attributeValue: { S: 'id' },
      expressionAttributeValues: { ':abc': { S: 'id' } },
    },
    {
      testName:
        'should return expression attribute value for document path with indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ],
      attributeValue: { S: 'id' },
      expressionAttributeValues: { ':abc1de2': { S: 'id' } },
    },
  ];

  it.each(testCases)(
    '$testName',
    ({ documentPath, attributeValue, expressionAttributeValues }) => {
      const actualExpressionAttributeValues = buildExpressionAttributeValue(
        documentPath,
        attributeValue,
      );

      expect(actualExpressionAttributeValues).toEqual(
        expressionAttributeValues,
      );
    },
  );
});
