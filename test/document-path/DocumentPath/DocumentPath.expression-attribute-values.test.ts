import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../src/document-path/DocumentPath.js';
import { DocumentPathItem } from '../../../src/document-path/DocumentPathItem.js';

describe('expression attribute values placeholder', () => {
  describe('given the document path attr0', () => {
    const documentPath = new DocumentPath([new DocumentPathItem('attr0')]);

    describe('when getting expression attribute values placeholder', () => {
      let expressionAttributeValuesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeValuesPlaceholder =
          documentPath.getExpressionAttributeValuesPlaceholder();
      });

      it('should return ":attr0"', () => {
        expect(expressionAttributeValuesPlaceholder).toBe(':attr0');
      });
    });
  });

  describe('given the document path attr0[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1, 2]),
    ]);

    describe('when getting expression attribute values placeholder', () => {
      let expressionAttributeValuesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeValuesPlaceholder =
          documentPath.getExpressionAttributeValuesPlaceholder();
      });

      it('should return ":attr0[1][2]"', () => {
        expect(expressionAttributeValuesPlaceholder).toBe(':attr012');
      });
    });
  });

  describe('given the document path attr0[1].attr1.attr2[2][3]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1]),
      new DocumentPathItem('attr1'),
      new DocumentPathItem('attr2', [2, 3]),
    ]);

    describe('when getting expression attribute values placeholder', () => {
      let expressionAttributeValuesPlaceholder: string;

      beforeEach(() => {
        expressionAttributeValuesPlaceholder =
          documentPath.getExpressionAttributeValuesPlaceholder();
      });

      it('should return ":attr0[1].attr1.attr2[2][3]"', () => {
        expect(expressionAttributeValuesPlaceholder).toBe(
          ':attr01attr1attr223',
        );
      });
    });
  });
});
