import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating literal', () => {
  describe('given an attribute value and a function to generate random strings', () => {
    const attributeValue: AttributeValue = { N: '1' };
    const mockRandomStringGenerator = jest.fn(() => 'randomString');

    describe('when creating a literal', () => {
      let literal: Literal;

      beforeEach(() => {
        literal = new Literal(attributeValue, mockRandomStringGenerator);
      });

      it('should have a random symbolic value matching the regex ^:literal\\w+$', () => {
        expect(literal.symbolicValue).toMatch(/^:literal\w+$/);
      });

      it('should have empty expression attribute names', () => {
        expect(literal.expressionAttributeNames).toEqual({});
      });

      it('should have expression attribute values', () => {
        expect(literal.expressionAttributeValues).toEqual({
          [literal.symbolicValue]: attributeValue,
        });
      });
    });
  });
});
