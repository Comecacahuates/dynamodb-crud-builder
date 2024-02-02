import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('functions', () => {
  describe('given document path "a[0].b.c[1][2]"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');

    describe('when checking if attribute exists', () => {
      const condition = documentPath.attributeExists();

      it('should return a condition with expression "attribute_exists(#a[0].#b.#c[1][2])"', () => {
        expect(condition.getExpressionString()).toBe(
          'attribute_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with the same attribute names', () => {
        expect(condition.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same attribute values', () => {
        expect(condition.getAttributeValues()).toEqual({});
      });
    });

    describe('when checking if attribute not exists', () => {
      const condition = documentPath.attributeNotExists();

      it('should return a condition with expression "attribute_not_exists(#a[0].#b.#c[1][2])"', () => {
        expect(condition.getExpressionString()).toBe(
          'attribute_not_exists(#a[0].#b.#c[1][2])',
        );
      });

      it('should return a condition with the same attribute names', () => {
        expect(condition.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same attribute values', () => {
        expect(condition.getAttributeValues()).toEqual({});
      });
    });

    describe('when getting attribute size', () => {
      const operand = documentPath.size();

      it('should return an operand with symbolic value "size(#a[0].#b.#c[1][2])"', () => {
        expect(operand.getExpressionString()).toBe('size(#a[0].#b.#c[1][2])');
      });

      it('should return an operand with the same attribute names', () => {
        expect(operand.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return an operand with the same attribute values', () => {
        expect(operand.getAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "a[0].b.c[1][2]" and literal string "type" named "Type"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue('type', 'Type');

    describe('when checking if attribute is of type', () => {
      const condition = documentPath.type(literal);

      it('should return a condition with expression "attribute_type(#a[0].#b.#c[1][2], :literalType)', () => {
        expect(condition.getExpressionString()).toBe(
          'attribute_type(#a[0].#b.#c[1][2], :literalType)',
        );
      });

      it('should return a condition with the same attribute names', () => {
        expect(condition.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same attribute values', () => {
        expect(condition.getAttributeValues()).toEqual({
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
        expect(condition.getExpressionString()).toBe(
          'begins_with(#a[0].#b.#c[1][2], :literalPrefix)',
        );
      });

      it('should return a condition with the same attribute names', () => {
        expect(condition.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return a condition with the same attribute values', () => {
        expect(condition.getAttributeValues()).toEqual({
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
        expect(condition.getExpressionString()).toBe(
          'contains(#a[0].#b.#c[1][2], :literalValue)',
        );
      });

      it('should return a condition with the same attribute names', () => {
        expect(condition.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });
    });

    describe('when getting default value if attribute not exists', () => {
      const operand = documentPath.ifNotExists(literal);

      it('should return an operand with symbolic value "if_not_exists(#a[0].#b.#c[1][2], :literalValue)"', () => {
        expect(operand.getExpressionString()).toBe(
          'if_not_exists(#a[0].#b.#c[1][2], :literalValue)',
        );
      });

      it('should return an operand with the same attribute names', () => {
        expect(operand.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should return an operand with the same attribute values', () => {
        expect(operand.getAttributeValues()).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });
  });
});
