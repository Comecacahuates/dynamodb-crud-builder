import { describe, it, expect } from '@jest/globals';
import { Literal } from '../../../src/expressions/operands/Literal.js';

describe('creating from value', () => {
  describe('given a value and the name "Name"', () => {
    const value = 'value';
    const name = 'Name';

    describe('when creating a literal', () => {
      const literal = Literal.fromValue(value, name);

      it('should have a expression string :literalName', () => {
        expect(literal.getString()).toBe(':literalName');
      });

      it('should have empty attribute names', () => {
        expect(
          literal.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({});
      });

      it('should have attribute values', () => {
        expect(
          literal.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalName': { S: 'value' },
        });
      });
    });
  });
});

describe('creating from literal-like', () => {
  describe('given a literal string value and a name', () => {
    const value = 'value';
    const name = 'Value';

    describe('when creating a literal', () => {
      const literal = Literal.fromLiteralLike(value, name);

      it('should return a new literal object', () => {
        expect(literal).toBeInstanceOf(Literal);
      });

      it('should have a expression string :literalValue', () => {
        expect(literal.getString()).toBe(':literalValue');
      });

      it('should have attribute names', () => {
        expect(
          literal.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({});
      });

      it('should have attribute values', () => {
        expect(
          literal.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });
  });

  describe('given a literal object', () => {
    const literal = Literal.fromValue('value', 'Value');

    describe('when creating a literal', () => {
      const newLiteral = Literal.fromLiteralLike(literal);

      it('should return the same object', () => {
        expect(newLiteral).toBe(literal);
      });
    });
  });
});
