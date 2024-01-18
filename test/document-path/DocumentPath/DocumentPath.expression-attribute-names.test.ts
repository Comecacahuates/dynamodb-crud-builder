import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../src/document-path/DocumentPath.js';
import { DocumentPathItem } from '../../../src/document-path/DocumentPathItem.js';

describe('expression attribute names placeholder', () => {
  describe('given the document path attr0', () => {
    const documentPath = new DocumentPath([new DocumentPathItem('attr0')]);

    describe('when getting expression attribute names placeholder', () => {
      let expressionAttributeNamesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeNamesPlaceholder =
          documentPath.expressionAttributeNamesPlaceholder;
      });

      it('should return "#attr0"', () => {
        expect(expressionAttributeNamesPlaceholder).toBe('#attr0');
      });
    });
  });

  describe('given the document path attr0[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1, 2]),
    ]);

    describe('when getting expression attribute names placeholder', () => {
      let expressionAttributeNamesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeNamesPlaceholder =
          documentPath.expressionAttributeNamesPlaceholder;
      });

      it('should return "#attr0[1][2]"', () => {
        expect(expressionAttributeNamesPlaceholder).toBe('#attr0[1][2]');
      });
    });
  });

  describe('given the document path attr0[1].attr1.attr2[2][3]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1]),
      new DocumentPathItem('attr1'),
      new DocumentPathItem('attr2', [2, 3]),
    ]);

    describe('when getting expression attribute names placeholder', () => {
      let expressionAttributeNamesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeNamesPlaceholder =
          documentPath.expressionAttributeNamesPlaceholder;
      });

      it('should return "#attr0[1].#attr1.#attr2[2][3]"', () => {
        expect(expressionAttributeNamesPlaceholder).toBe(
          '#attr0[1].#attr1.#attr2[2][3]',
        );
      });
    });
  });
});
