import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueBuilder } from '../../src/attribute-value/AttributeValueBuilder.js';
import { type AttributeType } from '../../src/types.js';

describe('building attribute values by type', () => {
  describe('given no data', () => {
    describe('when building null attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNull();
      });

      it('should return null attribute value', () => {
        expect(attributeValue).toEqual({ NULL: true });
      });
    });
  });

  describe('given a string', () => {
    describe('when building string attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildString('value');
      });

      it('should return string attribute value', () => {
        expect(attributeValue).toEqual({ S: 'value' });
      });
    });
  });

  describe('given a number', () => {
    describe('when building number attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNumber(1);
      });

      it('should return number attribute value', () => {
        expect(attributeValue).toEqual({ N: '1' });
      });
    });
  });

  describe('given a boolean', () => {
    describe('when building boolean attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBoolean(true);
      });

      it('should return boolean attribute value', () => {
        expect(attributeValue).toEqual({ BOOL: true });
      });
    });
  });

  describe('given a binary', () => {
    describe('when building binary attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBinary(
          Uint8Array.from([1, 2, 3]),
        );
      });

      it('should return binary attribute value', () => {
        expect(attributeValue).toEqual({ B: Uint8Array.from([1, 2, 3]) });
      });
    });
  });

  describe('given a string set', () => {
    describe('when building string set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildStringSet(
          new Set(['value']),
        );
      });

      it('should return string set attribute value', () => {
        expect(attributeValue).toEqual({ SS: ['value'] });
      });
    });
  });

  describe('given a number set', () => {
    describe('when building number set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildNumberSet(
          new Set([1, 2, 3]),
        );
      });

      it('should return number set attribute value', () => {
        expect(attributeValue).toEqual({ NS: ['1', '2', '3'] });
      });
    });
  });

  describe('given a binary set', () => {
    describe('when building binary set attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.buildBinarySet(
          new Set([Uint8Array.from([1, 2, 3])]),
        );
      });

      it('should return binary set attribute value', () => {
        expect(attributeValue).toEqual({ BS: [Uint8Array.from([1, 2, 3])] });
      });
    });
  });
});

describe('building attribute of any type', () => {
  describe('given a null value', () => {
    describe('when building attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.build(null);
      });

      it('should return null attribute value', () => {
        expect(attributeValue).toEqual({ NULL: true });
      });
    });
  });

  describe('given a string value', () => {
    describe('when building attribute value', () => {
      let attributeValue: AttributeValue;

      beforeEach(() => {
        attributeValue = AttributeValueBuilder.instance.build('value');
      });

      it('should return string attribute value', () => {
        expect(attributeValue).toEqual({ S: 'value' });
      });
    });
  });
});
