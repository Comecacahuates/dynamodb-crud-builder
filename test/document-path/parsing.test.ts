import { describe, it, expect } from '@jest/globals';
import {
  getIndexFromDocumentPathItemString,
  getAttributeName,
  buildDocumentPathFromString,
} from '../../src/document-path/parsing.js';

describe('Getting index from document path item string', () => {
  type TestCase = {
    testName: string;
    documentPathItemString: string;
    index: number | null;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should return null if there is no index',
      documentPathItemString: 'attr0',
      index: null,
    },
    {
      testName: 'should return index if there is index',
      documentPathItemString: 'attr0[0]',
      index: 0,
    },
  ];

  it.each(testCases)('$testName', ({ documentPathItemString, index }) => {
    const actualIndex = getIndexFromDocumentPathItemString(
      documentPathItemString,
    );

    expect(actualIndex).toEqual(index);
  });
});

describe('Getting attribute name from document path part', () => {
  it('should return attribute name if no index', () => {
    const name = getAttributeName('attr0');

    expect(name).toEqual('attr0');
  });

  it('should return attribute name if index', () => {
    const name = getAttributeName('attr0[0]');

    expect(name).toEqual('attr0');
  });
});

describe('Building path from string', () => {
  it('should build simple path', () => {
    const path = buildDocumentPathFromString('attr0');

    expect(path).toEqual(['attr0']);
  });

  it('should build simple path with index', () => {
    const path = buildDocumentPathFromString('attr0[0]');

    expect(path).toEqual(['attr0', 0]);
  });

  it('should build complex path', () => {
    const path = buildDocumentPathFromString('attr0.attr1.attr2');

    expect(path).toEqual(['attr0', 'attr1', 'attr2']);
  });

  it('should build complex path with index', () => {
    const path = buildDocumentPathFromString('attr0[0].attr1[1].attr2[2]');

    expect(path).toEqual(['attr0', 0, 'attr1', 1, 'attr2', 2]);
  });
});
