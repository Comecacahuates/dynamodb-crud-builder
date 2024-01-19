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

      it('should return null', () => {
        expect(parsed).toBeNull();
      });
    });
  });
});
