import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueBuilder } from '../../src/attribute-value/AttributeValueBuilder.js';
import { type AttributeType } from '../../src/types.js';

describe('building attribute values by type', () => {
  describe('given no data', () => {
    describe('when building null attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildNull();
      });

      it('should return null attribute value', () => {
        expect(built).toEqual({ NULL: true });
      });
    });
  });

  describe('given a string', () => {
    describe('when building string attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildString('value');
      });

      it('should return string attribute value', () => {
        expect(built).toEqual({ S: 'value' });
      });
    });
  });
});
