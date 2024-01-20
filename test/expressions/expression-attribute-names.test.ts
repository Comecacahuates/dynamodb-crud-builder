import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  mergeExpressionAttributeNames,
  buildExpressionAttributeNamePlaceholder,
  buildExpressionAttributeNames,
} from '../../src/expressions/expression-attribute-names.js';
import { type ExpressionAttributeNames } from '../../src/expressions/index.js';
import { type DocumentPath as OldDocumentPath } from '../../src/document-path/index.js';
import { DocumentPath } from '../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../src/expressions/operands/DocumentPathItem.js';
import { Literal } from '../../src/expressions/operands/Literal.js';
import { Condition } from '../../src/expressions/conditions/Condition.js';

describe('Merging expression attribute names', () => {
  describe('given document path a[0].b.c[1][2], a literal and a condition', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const literal = new Literal({ S: 'value' }, () => 'A');
    const condition = new Condition('attribute_exists(#z)', {
      '#z': 'z',
    });

    describe('when merging expression attribute names', () => {
      let mergedExpressionAttributeNames: ExpressionAttributeNames;

      beforeEach(() => {
        mergedExpressionAttributeNames = mergeExpressionAttributeNames([
          documentPath,
          literal,
          condition,
        ]);
      });

      it('should have all expression attribute names', () => {
        expect(mergedExpressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#z': 'z',
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
    documentPath: OldDocumentPath;
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
