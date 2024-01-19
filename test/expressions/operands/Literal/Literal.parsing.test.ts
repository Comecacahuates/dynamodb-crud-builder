import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('parsing', () => {
  describe('given null attribute value', () => {
    const attributeValue: AttributeValue.NULLMember = { NULL: true };

    describe('when parsing null', () => {
      let parsed: null;

      beforeEach(() => {
        parsed = Literal.parseNull(attributeValue);
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
        parsed = Literal.parseString(attributeValue);
      });

      it('should return string value', () => {
        expect(parsed).toBe('value');
      });
    });
  });
});
