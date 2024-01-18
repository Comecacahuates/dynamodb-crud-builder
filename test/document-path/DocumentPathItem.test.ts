import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPathItem } from '../../src/document-path/DocumentPathItem.js';

describe('parsing', () => {
  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing attribute name', () => {
      let attributeName: string | null;

      beforeEach(() => {
        attributeName = DocumentPathItem.parseAttributeName(
          documentPathItemString,
        );
      });

      it('should return "attr0"', () => {
        expect(attributeName).toEqual('attr0');
      });
    });

    describe('when parsing indexes', () => {
      let indexes: Array<number>;

      beforeEach(() => {
        indexes = DocumentPathItem.parseIndexes(documentPathItemString);
      });

      it('should return [1, 2]', () => {
        expect(indexes).toEqual([1, 2]);
      });
    });

    describe('when parsing document path item', () => {
      let documentPathItem: DocumentPathItem;

      beforeEach(() => {
        documentPathItem = DocumentPathItem.parse(documentPathItemString);
      });

      it('should return a document path item with attribute name "attr0"', () => {
        expect(documentPathItem.attributeName).toEqual('attr0');
      });

      it('should return a document path item with indexes [1, 2]', () => {
        expect(documentPathItem.indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = '0attr0';

    describe('when parsing', () => {
      let attributeName: string | null;

      beforeEach(() => {
        attributeName = DocumentPathItem.parseAttributeName(
          documentPathItemString,
        );
      });

      it('should return null', () => {
        expect(attributeName).toBeNull();
      });
    });
  });
});
