import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathParsingError } from '../../../../src/expressions/operands/DocumentPathParsingError.js';

describe('parsing document path string', () => {
  describe('given the string "attr0"', () => {
    const documentPathString = 'attr0';

    describe('when parsing document path string', () => {
      const documentPath = new DocumentPath(documentPathString);

      it('should have expression string', () => {
        expect(documentPath.getString()).toBe('#attr0');
      });

      it('should have attribute names', () => {
        expect(
          documentPath.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#attr0': 'attr0',
        });
      });

      it('should have empty attribute values', () => {
        expect(
          documentPath.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathString = 'attr0[1][2]';

    describe('when parsing document path string', () => {
      const documentPath = new DocumentPath(documentPathString);

      it('should have expression string', () => {
        expect(documentPath.getString()).toBe('#attr0[1][2]');
      });

      it('should have attribute names', () => {
        expect(
          documentPath.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#attr0': 'attr0',
        });
      });

      it('should have empty attribute values', () => {
        expect(
          documentPath.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });

  describe('given the string "attr0[1].attr1.attr2[2][3]"', () => {
    const documentPathString = 'attr0[1].attr1.attr2[2][3]';

    describe('when parsing document path string', () => {
      const documentPath = new DocumentPath(documentPathString);

      it('should have expression string', () => {
        expect(documentPath.getString()).toBe('#attr0[1].#attr1.#attr2[2][3]');
      });

      it('should have attribute names', () => {
        expect(
          documentPath.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
        });
      });

      it('should have empty attribute values', () => {
        expect(
          documentPath.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });

  describe('given the string "attr0[ a-b].attr1[2].attr2[3]"', () => {
    const documentPathString = 'attr0[a].attr1[2].attr2[3]';

    describe('when parsing document path string', () => {
      it('should throw a DocumentPathParsingError', () => {
        expect(() => {
          new DocumentPath(documentPathString);
        }).toThrow(DocumentPathParsingError);
      });
    });
  });
});
