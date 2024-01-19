import { describe, it, expect, beforeEach } from '@jest/globals';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { DocumentPath } from '../../../src/document-path/DocumentPath.js';
import { DocumentPathItem } from '../../../src/document-path/DocumentPathItem.js';
import { ExpressionAttributeValues } from '../../../src/expressions/types.js';

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

describe('expression attribute values', () => {
  describe('given the document path attr0 and attribute value { "S": "value" }', () => {
    const documentPath = new DocumentPath([new DocumentPathItem('attr0')]);
    const attributeValue: AttributeValue = { S: 'value' };

    describe('when getting expression attribute values', () => {
      let expressionAttributeValues: ExpressionAttributeValues;

      beforeEach(() => {
        expressionAttributeValues =
          documentPath.getExpressionAttributeValues(attributeValue);
      });

      it('should return { ":attr0": { "S": "value" } }', () => {
        expect(expressionAttributeValues).toEqual({
          ':attr0': { S: 'value' },
        });
      });
    });
  });

  describe('given the document path attr0[1][2] and attribute value { "S": "value" }', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1, 2]),
    ]);
    const attributeValue: AttributeValue = { S: 'value' };

    describe('when getting expression attribute values', () => {
      let expressionAttributeValues: ExpressionAttributeValues;

      beforeEach(() => {
        expressionAttributeValues =
          documentPath.getExpressionAttributeValues(attributeValue);
      });

      it('should return { ":attr0[1][2]": { "S": "value" } }', () => {
        expect(expressionAttributeValues).toEqual({
          ':attr012': { S: 'value' },
        });
      });
    });
  });

  describe('given the document path attr0[1].attr1.attr2[2][3] and attribute value { "S": "value" }', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('attr0', [1]),
      new DocumentPathItem('attr1'),
      new DocumentPathItem('attr2', [2, 3]),
    ]);
    const attributeValue: AttributeValue = { S: 'value' };

    describe('when getting expression attribute values', () => {
      let expressionAttributeValues: ExpressionAttributeValues;

      beforeEach(() => {
        expressionAttributeValues =
          documentPath.getExpressionAttributeValues(attributeValue);
      });

      it('should return { ":attr0[1].attr1.attr2[2][3]": { "S": "value" } }', () => {
        expect(expressionAttributeValues).toEqual({
          ':attr01attr1attr223': { S: 'value' },
        });
      });
    });
  });
});
