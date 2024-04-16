import { describe, it, expect } from '@jest/globals';
import { Literal } from '../../../src/expressions/operands/Literal.js';

describe('creating literal from value', () => {
  describe('given a value and the name "Name"', () => {
    const value = 'value';
    const name = 'Name';

    describe('when creating a literal', () => {
      const literal = Literal.fromValue(value, name);

      it('should have a expression string :literalName', () => {
        expect(literal.getString()).toBe(':literalName');
      });

      it('should have empty attribute names', () => {
        expect(literal.getAttributeNames()).toEqual({});
      });

      it('should have attribute values', () => {
        expect(literal.getAttributeValues()).toEqual({
          ':literalName': { S: 'value' },
        });
      });
    });
  });
});
