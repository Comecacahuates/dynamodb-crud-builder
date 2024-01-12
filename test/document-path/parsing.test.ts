import { describe, it, expect } from '@jest/globals';
import {
  getIndex,
  getAttributeName,
  parseDocumentPathItem,
  parseDocumentPath,
} from '../../src/document-path/parsing.js';
import {
  type DocumentPathItem,
  type DocumentPath,
} from '../../src/document-path/types.js';

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

describe('Parsing document path', () => {
  type TestCase = {
    testName: string;
    documentPathString: string;
    documentPath: DocumentPath;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should parse document path with one item with no index',
      documentPathString: 'attr0',
      documentPath: [{ attributeName: 'attr0' }],
    },
    {
      testName: 'should parse document path with two items with no index',
      documentPathString: 'attr0.attr1',
      documentPath: [{ attributeName: 'attr0' }, { attributeName: 'attr1' }],
    },
    {
      testName: 'should parse document path with five items with no index',
      documentPathString: 'attr0.attr1.attr2.attr3.attr4',
      documentPath: [
        { attributeName: 'attr0' },
        { attributeName: 'attr1' },
        { attributeName: 'attr2' },
        { attributeName: 'attr3' },
        { attributeName: 'attr4' },
      ],
    },
    {
      testName: 'should parse document path with one item with index',
      documentPathString: 'attr0[0]',
      documentPath: [{ attributeName: 'attr0', index: 0 }],
    },
    {
      testName: 'should parse document path with five items with index',
      documentPathString: 'attr0[0].attr1[1].attr2[2].attr3[3].attr4[4]',
      documentPath: [
        { attributeName: 'attr0', index: 0 },
        { attributeName: 'attr1', index: 1 },
        { attributeName: 'attr2', index: 2 },
        { attributeName: 'attr3', index: 3 },
        { attributeName: 'attr4', index: 4 },
      ],
    },
    {
      testName: 'should parse document path with five items with mixed index',
      documentPathString: 'attr0.attr1[1].attr2.attr3[3].attr4[4]',
      documentPath: [
        { attributeName: 'attr0' },
        { attributeName: 'attr1', index: 1 },
        { attributeName: 'attr2' },
        { attributeName: 'attr3', index: 3 },
        { attributeName: 'attr4', index: 4 },
      ],
    },
  ];

  it.each(testCases)('$testName', ({ documentPathString, documentPath }) => {
    const actualDocumentPath = parseDocumentPath(documentPathString);

    expect(actualDocumentPath).toEqual(documentPath);
  });
});
