import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPathItem } from '../../src/document-path/DocumentPathItem.js';

describe('parsing', () => {
  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing', () => {
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
