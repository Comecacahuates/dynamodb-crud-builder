import { describe, it, expect } from '@jest/globals';
import {
  formatDocumentPathItem,
  formatDocumentPath,
} from '../../src/document-path/formatting.js';
import {
  type DocumentPathItem,
  type DocumentPath,
} from '../../src/document-path/index.js';

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

describe('Formatting document path', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    formattedDocumentPath: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should format document path with one item with no index',
      documentPath: [{ attributeName: 'attr0' }],
      formattedDocumentPath: 'attr0',
    },
    {
      testName: 'should format document path with five items with no index',
      documentPath: [
        { attributeName: 'attr0' },
        { attributeName: 'attr1', index: 0 },
        { attributeName: 'attr2' },
        { attributeName: 'attr3', index: 1 },
        { attributeName: 'attr4' },
      ],
      formattedDocumentPath: 'attr0.attr1[0].attr2.attr3[1].attr4',
    },
    {
      testName: 'should format document path with one item with index',
      documentPath: [{ attributeName: 'attr0', index: 0 }],
      formattedDocumentPath: 'attr0[0]',
    },
    {
      testName: 'should format document path with five items with index',
      documentPath: [
        { attributeName: 'attr0', index: 0 },
        { attributeName: 'attr1', index: 1 },
        { attributeName: 'attr2', index: 2 },
        { attributeName: 'attr3', index: 3 },
        { attributeName: 'attr4', index: 4 },
      ],
      formattedDocumentPath: 'attr0[0].attr1[1].attr2[2].attr3[3].attr4[4]',
    },
    {
      testName: 'should format document path with five items with mixed index',
      documentPath: [
        { attributeName: 'attr0' },
        { attributeName: 'attr1', index: 1 },
        { attributeName: 'attr2' },
        { attributeName: 'attr3', index: 3 },
        { attributeName: 'attr4', index: 4 },
      ],
      formattedDocumentPath: 'attr0.attr1[1].attr2.attr3[3].attr4[4]',
    },
  ];

  it.each(testCases)('$testName', ({ documentPath, formattedDocumentPath }) => {
    const actualFormattedDocumentPath = formatDocumentPath(documentPath);

    expect(actualFormattedDocumentPath).toEqual(formattedDocumentPath);
  });
});
