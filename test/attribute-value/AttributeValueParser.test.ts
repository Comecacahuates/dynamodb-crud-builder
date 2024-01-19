import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { AttributeValueParser } from '../../src/attribute-value/AttributeValueParser.js';

describe('parsing attribute values', () => {
  describe('given null attribute value', () => {
    const attributeValue: AttributeValue.NULLMember = { NULL: true };

    describe('when parsing null', () => {
      let parsed: null;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseNull(attributeValue);
      });

      it('should return null value', () => {
        expect(parsed).toBeNull();
      });
    });
  });

  describe('given string attribute value', () => {
    const attributeValue: AttributeValue.SMember = { S: 'value' };

    describe('when parsing string', () => {
      let parsed: string;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseString(attributeValue);
      });

      it('should return string value', () => {
        expect(parsed).toBe('value');
      });
    });
  });

  describe('given number attribute value', () => {
    const attributeValue: AttributeValue.NMember = { N: '1' };

    describe('when parsing number', () => {
      let parsed: number;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseNumber(attributeValue);
      });

      it('should return number value', () => {
        expect(parsed).toBe(1);
      });
    });
  });

  describe('given boolean attribute value', () => {
    const attributeValue: AttributeValue.BOOLMember = { BOOL: true };

    describe('when parsing boolean', () => {
      let parsed: boolean;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseBoolean(attributeValue);
      });

      it('should return boolean value', () => {
        expect(parsed).toBe(true);
      });
    });
  });

  describe('given binary attribute value', () => {
    const attributeValue: AttributeValue.BMember = {
      B: new Uint8Array([1, 2, 3]),
    };

    describe('when parsing binary', () => {
      let parsed: Uint8Array;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseBinary(attributeValue);
      });

      it('should return binary value', () => {
        expect(parsed).toEqual(new Uint8Array([1, 2, 3]));
      });
    });
  });

  describe('given string set attribute value', () => {
    const attributeValue: AttributeValue.SSMember = { SS: ['a', 'b', 'c'] };

    describe('when parsing string set', () => {
      let parsed: Set<string>;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseStringSet(attributeValue);
      });

      it('should return string set value', () => {
        expect(parsed).toEqual(new Set(['a', 'b', 'c']));
      });
    });
  });

  describe('given number set attribute value', () => {
    const attributeValue: AttributeValue.NSMember = { NS: ['1', '2', '3'] };

    describe('when parsing number set', () => {
      let parsed: Set<number>;

      beforeEach(() => {
        parsed = AttributeValueParser.instance.parseNumberSet(attributeValue);
      });

      it('should return number set value', () => {
        expect(parsed).toEqual(new Set([1, 2, 3]));
      });
    });
  });
});
