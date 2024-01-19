import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('converting to string', () => {
  describe('given the document path attr0', () => {
    const documentPath = new DocumentPath([new DocumentPathItem('attr0')]);

    describe('when converting to string', () => {
      let documentPathString: string;

      beforeEach(() => {
        documentPathString = documentPath.toString();
      });

      it('should return "attr0"', () => {
        expect(documentPathString).toBe('attr0');
      });
    });
  });

  describe('given the document path attr0[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1, 2]),
    ]);

    describe('when converting to string', () => {
      let documentPathString: string;

      beforeEach(() => {
        documentPathString = documentPath.toString();
      });

      it('should return "attr0[1][2]"', () => {
        expect(documentPathString).toBe('attr0[1][2]');
      });
    });
  });

  describe('given the document path attr0[1].attr1.attr2[2][3]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1]),
      new DocumentPathItem('attr1'),
      new DocumentPathItem('attr2', [2, 3]),
    ]);

    describe('when converting to string', () => {
      let documentPathString: string;

      beforeEach(() => {
        documentPathString = documentPath.toString();
      });

      it('should return "attr0[1].attr1.attr2[2][3]"', () => {
        expect(documentPathString).toBe('attr0[1].attr1.attr2[2][3]');
      });
    });
  });
});
