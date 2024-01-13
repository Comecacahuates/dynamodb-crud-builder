import { describe, it, expect } from '@jest/globals';
import { Add } from '../../../../src/expressions/update-expressions/statements/index.js';
import { type DocumentPath } from '../../../../src/document-path/types.js';

describe('Building add statement', () => {
  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    statementString: string;
  };

  const testCases: Array<TestCase> = [
    {
      testName:
        'should return add statement string for simple document path with no index',
      documentPath: [{ attributeName: 'a' }],
      statementString: '#a :a',
    },
    {
      testName:
        'should return add statement string for simple document path with index',
      documentPath: [{ attributeName: 'a', index: 1 }],
      statementString: '#a[1] :a1',
    },
    {
      testName:
        'should return add statement string for complex document path with no indexes',
      documentPath: [
        { attributeName: 'a' },
        { attributeName: 'b' },
        { attributeName: 'c' },
        { attributeName: 'd' },
      ],
      statementString: '#a.#b.#c.#d :abcd',
    },
    {
      testName:
        'should return add statement string for complex document path with indexes',
      documentPath: [
        { attributeName: 'a', index: 1 },
        { attributeName: 'b', index: 2 },
        { attributeName: 'c', index: 3 },
        { attributeName: 'd', index: 4 },
      ],
      statementString: '#a[1].#b[2].#c[3].#d[4] :a1b2c3d4',
    },
    {
      testName:
        'should return add statement string for complex document path with mixed indexes',
      documentPath: [
        { attributeName: 'a', index: 1 },
        { attributeName: 'b' },
        { attributeName: 'c', index: 2 },
        { attributeName: 'd' },
        { attributeName: 'e', index: 3 },
      ],
      statementString: '#a[1].#b.#c[2].#d.#e[3] :a1bc2de3',
    },
  ];

  it.each(testCases)('$testName', ({ documentPath, statementString }) => {
    const actualStatementString = Add.buildAddStatement(documentPath);

    expect(actualStatementString).toBe(statementString);
  });
});
