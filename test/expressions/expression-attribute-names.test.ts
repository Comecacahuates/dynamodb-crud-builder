import { describe, it, expect } from '@jest/globals';
import { buildExpressionAttributeNamePlaceholder } from '../../src/expressions/expression-attribute-names.js';
import { type DocumentPath as OldDocumentPath } from '../../src/document-path/index.js';

describe('Building placeholder', () => {
  type TestCase = {
    testName: string;
    documentPath: OldDocumentPath;
    placeholder: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should return placeholder if document path has no indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c' },
      ],
      placeholder: '#a.#b.#c',
    },
    {
      testName: 'should return placeholder if document path has indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ],
      placeholder: '#a.#b.#c[1].#d.#e[2]',
    },
  ];

  it.each(testCases)('$testName', ({ documentPath, placeholder }) => {
    const actualPlaceholder =
      buildExpressionAttributeNamePlaceholder(documentPath);

    expect(actualPlaceholder).toBe(placeholder);
  });
});
