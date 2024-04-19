import { describe, it, expect } from '@jest/globals';
import { Literal } from '../../../src/expressions/operands/Literal.js';

describe('creating from value', () => {
  describe('given a string value', () => {
    const value = 'value';

    describe('when creating a literal', () => {
      const literal = new Literal(value);

      it('should have a expression string', () => {
        expect(literal.getString()).toMatch(/:literal\w{10}/);
      });

      it('should have empty attribute names', () => {
        expect(
          literal.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({});
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = literal
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ S: 'value' });
      });
    });
  });

  describe('given a number value', () => {
    const value = 123;

    describe('when creating a literal', () => {
      const literal = new Literal(value);

      it('should have a expression string', () => {
        expect(literal.getString()).toMatch(/:literal\w{10}/);
      });

      it('should have empty attribute names', () => {
        expect(
          literal.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({});
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = literal
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '123' });
      });
    });
  });

  describe('given a boolean value', () => {
    const value = true;

    describe('when creating a literal', () => {
      const literal = new Literal(value);

      it('should have a expression string', () => {
        expect(literal.getString()).toMatch(/:literal\w{10}/);
      });

      it('should have empty attribute names', () => {
        expect(
          literal.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({});
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = literal
            .getAttributeValues()
            .toExpressionAttributeValues(),
          keys = Object.keys(expressionAttributeValues),
          values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(/:literal\w{10}/);
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ BOOL: true });
      });
    });
  });
});
