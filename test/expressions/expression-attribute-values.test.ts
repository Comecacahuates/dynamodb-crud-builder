import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  mergeExpressionAttributeValues,
  buildExpressionAttributeValuePlaceholder,
  buildExpressionAttributeValue,
} from '../../src/expressions/expression-attribute-values.js';
import { type ExpressionAttributeValues } from '../../src/expressions/index.js';
import { type DocumentPath as OldDocumentPath } from '../../src/document-path/index.js';
import { DocumentPath } from '../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../src/expressions/operands/DocumentPathItem.js';
import { Literal } from '../../src/expressions/operands/Literal.js';
import { Condition } from '../../src/expressions/conditions/Condition.js';

describe('Merging expression attribute values', () => {
  describe('given document path a[0].b.c[1][2], a literal and a condition', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const literal = new Literal({ S: 'value' }, () => 'A');
    const condition = new Condition(
      'type(#z, :type)',
      { '#z': 'z' },
      { ':type': { S: 'N' } },
    );

    describe('when merging expression attribute values', () => {
      let mergedExpressionAttributeValues: ExpressionAttributeValues;

      beforeEach(() => {
        mergedExpressionAttributeValues = mergeExpressionAttributeValues([
          documentPath,
          literal,
          condition,
        ]);
      });

      it('should have all expression attribute values', () => {
        expect(mergedExpressionAttributeValues).toEqual({
          ':literalA': { S: 'value' },
          ':type': { S: 'N' },
        });
      });
    });
  });
});

describe('Building placeholder', () => {
  type TestCase = {
    testName: string;
    documentPath: OldDocumentPath;
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
    documentPath: OldDocumentPath;
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
