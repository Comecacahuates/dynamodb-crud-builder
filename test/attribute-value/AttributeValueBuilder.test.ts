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

  describe('given a binary', () => {
    describe('when building binary attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildBinary(
          Uint8Array.from([1, 2, 3]),
        );
      });

      it('should return binary attribute value', () => {
        expect(built).toEqual({ B: Uint8Array.from([1, 2, 3]) });
      });
    });
  });

  describe('given a string set', () => {
    describe('when building string set attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildStringSet(
          new Set(['value']),
        );
      });

      it('should return string set attribute value', () => {
        expect(built).toEqual({ SS: ['value'] });
      });
    });
  });

  describe('given a number set', () => {
    describe('when building number set attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildNumberSet(
          new Set([1, 2, 3]),
        );
      });

      it('should return number set attribute value', () => {
        expect(built).toEqual({ NS: ['1', '2', '3'] });
      });
    });
  });

  describe('given a binary set', () => {
    describe('when building binary set attribute value', () => {
      let built: AttributeValue;

      beforeEach(() => {
        built = AttributeValueBuilder.instance.buildBinarySet(
          new Set([Uint8Array.from([1, 2, 3])]),
        );
      });

      it('should return binary set attribute value', () => {
        expect(built).toEqual({ BS: [Uint8Array.from([1, 2, 3])] });
      });
    });
  });
});
