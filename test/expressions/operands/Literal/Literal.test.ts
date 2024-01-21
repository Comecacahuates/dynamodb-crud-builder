import { describe, it, expect } from '@jest/globals';
import { type AttributeType } from '../../../../src/types.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating literal from value', () => {
  describe('given a value and the name "Name"', () => {
    const value: AttributeType = 'value';
    const name = 'Name';

    describe('when creating a literal', () => {
      const literal = Literal.fromValue(value, name);

      it('should have a symbolic value :literalName', () => {
        expect(literal.symbolicValue).toBe(':literalName');
      });

      it('should have empty expression attribute names', () => {
        expect(literal.expressionAttributeNames).toEqual({});
      });

      it('should have expression attribute values', () => {
        expect(literal.expressionAttributeValues).toEqual({
          [literal.symbolicValue]: { S: 'value' },
        });
      });
    });
  });
});
