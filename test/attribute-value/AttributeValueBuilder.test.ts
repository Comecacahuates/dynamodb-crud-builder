import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueBuilder } from '../../src/attribute-value/AttributeValueBuilder.js';
import { type AttributeType } from '../../src/types.js';

describe('building attribute values by type', () => {
  describe('given no data', () => {
    describe('when building null', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildNull();
      });

      it('should return null attribute value', () => {
        expect(built).toEqual({ NULL: true });
      });
    });
  });
});
