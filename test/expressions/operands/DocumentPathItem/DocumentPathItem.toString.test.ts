import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('converting to string', () => {
  describe('given the document path item "attr0"', () => {
    const documentPathItem = new DocumentPathItem('attr0');

    describe('when converting to string', () => {
      let documentPathItemString: string;

      beforeEach(() => {
        documentPathItemString = documentPathItem.toString();
      });

      it('should return "attr0"', () => {
        expect(documentPathItemString).toBe('attr0');
      });
    });
  });

  describe('given the document path item "attr0[1][2]"', () => {
    const documentPathItem = new DocumentPathItem('attr0', [1, 2]);

    describe('when converting to string', () => {
      let documentPathItemString: string;

      beforeEach(() => {
        documentPathItemString = documentPathItem.toString();
      });

      it('should return "attr0[1][2]"', () => {
        expect(documentPathItemString).toBe('attr0[1][2]');
      });
    });
  });
});
