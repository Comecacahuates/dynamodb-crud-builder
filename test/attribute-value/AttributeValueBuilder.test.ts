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

  describe('given a number', () => {
    describe('when building number attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildNumber(1);
      });

      it('should return number attribute value', () => {
        expect(built).toEqual({ N: '1' });
      });
    });
  });

  describe('given a boolean', () => {
    describe('when building boolean attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildBoolean(true);
      });

      it('should return boolean attribute value', () => {
        expect(built).toEqual({ BOOL: true });
      });
    });
  });
});
