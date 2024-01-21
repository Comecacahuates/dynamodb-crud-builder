import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('functions', () => {
  describe('given document path "a[0].b.c[1][2]"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');

    describe('when checking if attribute exists', () => {
      const condition = documentPath.attributeExists();

      it('should return a condition with expression "attribute_exists(#a[0].#b.#c[1][2])"', () => {
        expect(condition.expression).toBe(
          'attribute_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with the same expression attribute names', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same expression attribute values', () => {
        expect(condition.expressionAttributeValues).toEqual({});
      });
    });

    describe('when checking if attribute not exists', () => {
      const condition = documentPath.attributeNotExists();

      it('should return a condition with expression "attribute_not_exists(#a[0].#b.#c[1][2])"', () => {
        expect(condition.expression).toBe(
          'attribute_not_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with the same expression attribute names', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same expression attribute values', () => {
        expect(condition.expressionAttributeValues).toEqual({});
      });
    });

    describe('when getting attribute size', () => {
      const operand = documentPath.size();

      it('should return an operand with symbolic value "size(#a[0].#b.#c[1][2])"', () => {
        expect(operand.symbolicValue).toBe('size(#a[0].#b.#c[1][2])');
      });

      it('should return an operand with the same expression attribute names', () => {
        expect(operand.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return an operand with the same expression attribute values', () => {
        expect(operand.expressionAttributeValues).toEqual({});
      });
    });
  });

  describe('given document path "a[0].b.c[1][2]" and literal string "type" named "Type"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue('type', 'Type');

    describe('when checking if attribute is of type', () => {
      const condition = documentPath.type(literal);

      it('should return a condition with expression "attribute_type(#a[0].#b.#c[1][2], :literalType)', () => {
        expect(condition.expression).toBe(
          'attribute_type(#a[0].#b.#c[1][2], :literalType)',
        );
      });

      it('should return a condition with the same expression attribute names', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same expression attribute values', () => {
        expect(condition.expressionAttributeValues).toEqual({
          ':literalType': { S: 'type' },
        });
      });
    });
  });

  describe('given document path "a[0].b.c[1][2]" and literal string "prefix" named "Prefix"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue('prefix', 'Prefix');

    describe('when checking if attribute begins with', () => {
      const condition = documentPath.beginsWith(literal);

      it('should return a condition with expression "begins_with(#a[0].#b.#c[1][2], :literalPrefix)"', () => {
        expect(condition.expression).toBe(
          'begins_with(#a[0].#b.#c[1][2], :literalPrefix)',
        );
      });

      it('should return a condition with the same expression attribute names', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same expression attribute values', () => {
        expect(condition.expressionAttributeValues).toEqual({
          ':literalPrefix': { S: 'prefix' },
        });
      });
    });
  });

  describe('given document path "a[0].b.c[1][2]" and literal string "value" named "Value"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue('value', 'Value');

    describe('when checking if attribute contains operand', () => {
      const condition = documentPath.contains(literal);

      it('should return a condition with expression "contains(#a[0].#b.#c[1][2], :literalValue)"', () => {
        expect(condition.expression).toBe(
          'contains(#a[0].#b.#c[1][2], :literalValue)',
        );
      });

      it('should return a condition with the same expression attribute names', () => {
        expect(condition.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });
    });
  });
});
