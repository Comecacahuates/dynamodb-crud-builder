import { describe, it, expect } from '@jest/globals';
import { AttributeNames } from '../../../src/expressions/attributes/AttributeNames.js';

describe('attribute names', () => {
  describe('given an empty attribute names object', () => {
    const attributeNames = new AttributeNames();

    describe('when adding attribute names', () => {
      attributeNames
        .add('#attr0', 'attribute0')
        .add('#attr1', 'attribute1')
        .add('#attr2', 'attribute2');

      it('should return expression attribute names', () => {
        expect(attributeNames.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attribute0',
          '#attr1': 'attribute1',
          '#attr2': 'attribute2',
        });
      });
    });
  });

  describe('given two attribute names objects', () => {
    const attributeNames0 = new AttributeNames()
      .add('#attr0', 'attribute0')
      .add('#attr1', 'attribute1');
    const attributeNames1 = new AttributeNames()
      .add('#attr2', 'attribute2')
      .add('#attr3', 'attribute3');

    describe('when merging', () => {
      const mergedAttributeNames = new AttributeNames()
        .merge(attributeNames0)
        .merge(attributeNames1);

      it('should return expression attribute names', () => {
        expect(mergedAttributeNames.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attribute0',
          '#attr1': 'attribute1',
          '#attr2': 'attribute2',
          '#attr3': 'attribute3',
        });
      });
    });
  });
});
