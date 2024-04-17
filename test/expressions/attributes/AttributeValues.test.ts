import { describe, it, expect } from '@jest/globals';
import { AttributeValues } from '../../../src/expressions/attributes/AttributeValues.js';

describe('attribute values', () => {
  describe('given an empty attribute values object', () => {
    const attributeValues = new AttributeValues();

    describe('when adding attribute values', () => {
      attributeValues
        .add(':val0', 'value-0')
        .add(':val1', 10)
        .add(':val2', true)
        .add(':val3', new Set(['10', '20']));

      it('should return expression attribute values', () => {
        expect(attributeValues.toExpressionAttributeValues()).toEqual({
          ':val0': { S: 'value-0' },
          ':val1': { N: '10' },
          ':val2': { BOOL: true },
          ':val3': { SS: ['10', '20'] },
        });
      });
    });
  });

  describe('given two attribute values objects', () => {
    const attributeValues0 = new AttributeValues()
      .add(':val0', 'value-0')
      .add(':val1', 10);
    const attributeValues1 = new AttributeValues()
      .add(':val2', true)
      .add(':val3', new Set(['10', '20']));

    describe('when merging', () => {
      const mergedAttributeValues = new AttributeValues()
        .merge(attributeValues0)
        .merge(attributeValues1);

      it('should return expression attribute values', () => {
        expect(mergedAttributeValues.toExpressionAttributeValues()).toEqual({
          ':val0': { S: 'value-0' },
          ':val1': { N: '10' },
          ':val2': { BOOL: true },
          ':val3': { SS: ['10', '20'] },
        });
      });
    });
  });
});
