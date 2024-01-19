import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('creating document path', () => {
  describe('given the document path items a[0], b, c[1][2]', () => {
    const documentPathItems = [
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ];

    describe('when creating a document path', () => {
      let documentPath: DocumentPath;

      beforeEach(() => {
        documentPath = new DocumentPath(documentPathItems);
      });

      it('should have the symbolic value #a[0].#b.#c[1][2]', () => {
        expect(documentPath.symbolicValue).toBe('#a[0].#b.#c[1][2]');
      });

      it('should have expression attribute names', () => {
        expect(documentPath.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });
    });
  });
});
