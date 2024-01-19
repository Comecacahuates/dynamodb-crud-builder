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
});
