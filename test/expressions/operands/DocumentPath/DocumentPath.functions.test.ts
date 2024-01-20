import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';
import { Condition } from '../../../../src/expressions/conditions/Condition.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('functions', () => {
  describe('given document path a[0].b.c[1][2]', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);

    describe('when checking if attribute exists', () => {
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.attributeExists();
      });

      it('should return a condition with symbolic value :opA > :opB', () => {
        expect(condition.symbolicValue).toBe(
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
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.attributeNotExists();
      });

      it('should return a condition with symbolic value :opA > :opB', () => {
        expect(condition.symbolicValue).toBe(
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
      let operand: Operand;

      beforeEach(() => {
        operand = documentPath.size();
      });

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

  describe('given document path a[0].b.c[1][2] and literal { S: "type" }', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const literal = new Literal({ S: 'type' }, () => 'Type');

    describe('when checking if attribute is of type', () => {
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.type(literal);
      });

      it('should return a condition with symbolic value "attribute_type(#a[0].#b.#c[1][2], :literalType)', () => {
        expect(condition.symbolicValue).toBe(
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

  describe('given document path a[0].b.c[1][2] and literal { S: "prefix" }', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const literal = new Literal({ S: 'prefix' }, () => 'Prefix');

    describe('when checking if attribute begins with', () => {
      let condition: Condition;

      beforeEach(() => {
        condition = documentPath.beginsWith(literal);
      });

      it('should return a condition with symbolic value "begins_with(#a[0].#b.#c[1][2], :literalPrefix)', () => {
        expect(condition.symbolicValue).toBe(
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
});
