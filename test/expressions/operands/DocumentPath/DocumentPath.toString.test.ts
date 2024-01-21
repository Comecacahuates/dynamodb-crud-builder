import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';

describe('converting to string', () => {
  describe('given the document path "attr0"', () => {
    const documentPath = DocumentPath.parse('attr0');

    describe('when converting to string', () => {
      const documentPathString = documentPath.toString();

      it('should return "attr0"', () => {
        expect(documentPathString).toBe('attr0');
      });
    });
  });

  describe('given the document path "attr0[1][2]"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2]');

    describe('when converting to string', () => {
      const documentPathString = documentPath.toString();

      it('should return "attr0[1][2]"', () => {
        expect(documentPathString).toBe('attr0[1][2]');
      });
    });
  });

  describe('given the document path "attr0[1].attr1.attr2[2][3]"', () => {
    const documentPath = DocumentPath.parse('attr0[1].attr1.attr2[2][3]');

    describe('when converting to string', () => {
      const documentPathString = documentPath.toString();

      it('should return "attr0[1].attr1.attr2[2][3]"', () => {
        expect(documentPathString).toBe('attr0[1].attr1.attr2[2][3]');
      });
    });
  });
});
