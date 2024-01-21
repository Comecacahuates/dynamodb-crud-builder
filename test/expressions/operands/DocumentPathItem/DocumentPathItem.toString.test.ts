import { describe, it, expect } from '@jest/globals';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('converting to string', () => {
  describe('given the document path item "attr0"', () => {
    const documentPathItem = DocumentPathItem.parse('attr0')!;

    describe('when converting to string', () => {
      const documentPathItemString = documentPathItem.toString();

      it('should return "attr0"', () => {
        expect(documentPathItemString).toBe('attr0');
      });
    });
  });

  describe('given the document path item "attr0[1][2]"', () => {
    const documentPathItem = DocumentPathItem.parse('attr0[1][2]')!;

    describe('when converting to string', () => {
      const documentPathItemString = documentPathItem.toString();

      it('should return "attr0[1][2]"', () => {
        expect(documentPathItemString).toBe('attr0[1][2]');
      });
    });
  });
});
