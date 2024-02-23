import { describe, it, expect } from '@jest/globals';
import { buildExpressionAttributeValuePlaceholder } from '../../src/expressions/expression-attribute-values.js';
import { type DocumentPath as OldDocumentPath } from '../../src/document-path/index.js';

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
