import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import uniform from '@stdlib/random/base/uniform';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating literal', () => {
  describe('given an attribute value and a prng', () => {
    const attributeValue: AttributeValue = { N: '1' };
    const prng = uniform.factory({ seed: 10 });

    describe('when creating a literal', () => {
      let literal: Literal;

      beforeEach(() => {
        literal = new Literal(attributeValue, prng);
      });

      describe('each time', () => {
        const tenTimes = Array(10).fill(null);

        it.each(tenTimes)(
          'should have a random symbolic value matching the regex ^:[a-zA-Z]w*$',
          () => {
            expect(literal.symbolicValue).toMatch(/^:[a-zA-Z]\w*$/);
          },
        );
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
