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
});
