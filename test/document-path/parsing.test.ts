import { describe, it, expect } from '@jest/globals';
import {
  getIndex,
  getAttributeName,
  parseDocumentPathItem,
} from '../../src/document-path/parsing.js';
import { type DocumentPathItem } from '../../src/document-path/types.js';

describe('Getting index from document path item string', () => {
  type TestCase = {
    testName: string;
    documentPathItemString: string;
    index: number | undefined;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should return null if there is no index',
      documentPathItemString: 'attr0',
      index: undefined,
    },
    {
      testName: 'should return index if there is index',
      documentPathItemString: 'attr0[0]',
      index: 0,
    },
  ];

  it.each(testCases)('$testName', ({ documentPathItemString, index }) => {
    const actualIndex = getIndex(documentPathItemString);

    expect(actualIndex).toEqual(index);
  });
});

describe('Getting attribute name from document path part', () => {
  type TestCase = {
    testName: string;
    documentPathItemString: string;
    attributeName: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should return attribute name if there is no index',
      documentPathItemString: 'attr0',
      attributeName: 'attr0',
    },
    {
      testName: 'should return attribute name if there is index',
      documentPathItemString: 'attr0[0]',
      attributeName: 'attr0',
    },
  ];

  it.each(testCases)(
    '$testName',
    ({ documentPathItemString, attributeName }) => {
      const actualAttributeName = getAttributeName(documentPathItemString);

      expect(actualAttributeName).toEqual(attributeName);
    },
  );
});

describe('Parsing document path item', () => {
  type TestCase = {
    testName: string;
    documentPathItemString: string;
    documentPathItem: DocumentPathItem;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should parse document path item with no index',
      documentPathItemString: 'attr0',
      documentPathItem: { attributeName: 'attr0' },
    },
    {
      testName: 'should parse document path item with index',
      documentPathItemString: 'attr0[0]',
      documentPathItem: { attributeName: 'attr0', index: 0 },
    },
  ];

  it.each(testCases)(
    '$testName',
    ({ documentPathItemString, documentPathItem }) => {
      const actualDocumentPathItem = parseDocumentPathItem(
        documentPathItemString,
      );

      expect(actualDocumentPathItem).toEqual(documentPathItem);
    },
  );
});
