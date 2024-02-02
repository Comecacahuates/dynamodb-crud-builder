import { describe, it, test, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathParsingError } from '../../../../src/errors/index.js';

describe('parsing document path string', () => {
  describe('given the string "attr0"', () => {
    const documentPathString = 'attr0';

    describe('when parsing document path string', () => {
      const documentPath = DocumentPath.parse(documentPathString)!;

      it('should return a document path with one item', () => {
        expect(documentPath.items).toHaveLength(1);
      });

      test('document path item 0 should be attr0', () => {
        expect(documentPath.items[0]!.attributeName).toBe('attr0');
        expect(documentPath.items[0]!.indexes).toHaveLength(0);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathString = 'attr0[1][2]';

    describe('when parsing document path string', () => {
      const documentPath = DocumentPath.parse(documentPathString)!;

      it('should return a document path with one item', () => {
        expect(documentPath.items).toHaveLength(1);
      });

      test('document path item 0 should be attr0[1][2]', () => {
        expect(documentPath.items[0]!.attributeName).toBe('attr0');
        expect(documentPath.items[0]!.indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string "attr0[1].attr1.attr2[2][3]"', () => {
    const documentPathString = 'attr0[1].attr1.attr2[2][3]';

    describe('when parsing document path string', () => {
      const documentPath = DocumentPath.parse(documentPathString)!;

      it('should return a document path with three items', () => {
        expect(documentPath.items).toHaveLength(3);
      });

      test('document path item 0 should be attr0[1]', () => {
        expect(documentPath.items[0]!.attributeName).toBe('attr0');
        expect(documentPath.items[0]!.indexes).toEqual([1]);
      });

      test('document path item 1 should be attr1', () => {
        expect(documentPath.items[1]!.attributeName).toBe('attr1');
        expect(documentPath.items[1]!.indexes).toEqual([]);
      });

      test('document path item 2 should be attr2[2][3]', () => {
        expect(documentPath.items[2]!.attributeName).toBe('attr2');
        expect(documentPath.items[2]!.indexes).toEqual([2, 3]);
      });
    });
  });

  describe('given the string "attr0[a].attr1[2].attr2[3]"', () => {
    const documentPathString = 'attr0[a].attr1[2].attr2[3]';

    describe('when parsing document path string', () => {
      it('should throw a DocumentPathParsingError', () => {
        expect(() => {
          DocumentPath.parse(documentPathString);
        }).toThrow(DocumentPathParsingError);
      });
    });
  });
});
