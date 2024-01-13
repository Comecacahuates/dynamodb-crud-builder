import { describe, it, expect } from '@jest/globals';
import {
  buildExpressionAttributeNamePlaceholder,
  buildExpressionAttributeNames,
} from '../../src/expressions/expression-attribute-names.js';
import { type ExpressionAttributeNames } from '../../src/expressions/index.js';
import { type DocumentPath } from '../../src/document-path/index.js';

describe('Building placeholder', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
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

describe('Building expression attribute name', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    expressionAttributeNames: ExpressionAttributeNames;
  };

  const testCases: Array<TestCase> = [
    {
      testName:
        'should return expression attribute names if document path has no indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c' },
      ],
      expressionAttributeNames: {
        '#a': 'a',
        '#b': 'b',
        '#c': 'c',
      },
    },
    {
      testName:
        'should return expression attribute names if document path has indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c', index: 1 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 2 },
      ],
      expressionAttributeNames: {
        '#a': 'a',
        '#b': 'b',
        '#c': 'c',
        '#d': 'd',
        '#e': 'e',
      },
    },
    {
      testName: 'should return empty object if document path is empty',
      documentPath: [],
      expressionAttributeNames: {},
    },
  ];

  it.each(testCases)(
    '$testName',
    ({ documentPath, expressionAttributeNames }) => {
      const actualExpressionAttributeNames =
        buildExpressionAttributeNames(documentPath);

      expect(actualExpressionAttributeNames).toEqual(expressionAttributeNames);
    },
  );
});
