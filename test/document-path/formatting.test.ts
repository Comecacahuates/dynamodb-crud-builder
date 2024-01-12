import { describe, it, expect } from '@jest/globals';
import { formatDocumentPathItem } from '../../src/document-path/formatting.js';
import { type DocumentPathItem } from '../../src/document-path/index.js';

describe('Formatting document path item', () => {
  type TestCase = {
    testName: string;
    documentPathItem: DocumentPathItem;
    formattedDocumentPathItem: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should format document path item with no index',
      documentPathItem: { attributeName: 'attr0' },
      formattedDocumentPathItem: 'attr0',
    },
    {
      testName: 'should format document path item with index',
      documentPathItem: { attributeName: 'attr0', index: 0 },
      formattedDocumentPathItem: 'attr0[0]',
    },
  ];

  it.each(testCases)(
    '$testName',
    ({ documentPathItem, formattedDocumentPathItem }) => {
      const actualFormattedDocumentPathItem =
        formatDocumentPathItem(documentPathItem);

      expect(actualFormattedDocumentPathItem).toEqual(
        formattedDocumentPathItem,
      );
    },
  );
});
