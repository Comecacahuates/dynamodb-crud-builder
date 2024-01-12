import { describe, it, expect } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  buildExpressionAttributeValuePlaceholder,
  buildExpressionAttributeValue,
} from '../../src/expressions/expression-attribute-values.js';
import { type ExpressionAttributeValues } from '../../src/types.js';
import { type DocumentPath } from '../../src/document-path/index.js';

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
      documentPath: ['a', 'b', 'c'],
      attributeValue: { S: 'id' },
      expressionAttributeValues: { ':abc': { S: 'id' } },
    },
    {
      testName:
        'should return expression attribute value for document path with indexes',
      documentPath: ['a', 'b', 'c', 1, 'd', 'e', 2],
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
