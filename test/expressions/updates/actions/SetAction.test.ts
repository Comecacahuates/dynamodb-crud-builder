import { describe, it, expect } from '@jest/globals';
import { SetAction } from '../../../../src/expressions/updates/actions/SetAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating set action to assign value to attribute', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when creating a set action', () => {
      const setAction = SetAction.assignValueToAttribute(documentPath, literal);

      it('should have the statement "#a[0].#b.#c[1][2] = :literalNumber"', () => {
        expect(setAction.statement).toBe('#a[0].#b.#c[1][2] = :literalNumber');
      });

      it('should have the expression attribute names of the document path', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating a set action', () => {
      const setAction = SetAction.assignValueToAttribute(
        documentPathA,
        documentPathB,
      );

      it('should have the statement "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3]"', () => {
        expect(setAction.statement).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3]',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no expression attribute values', () => {
        expect(setAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});

describe('creating set action to assign sum of values to attribute', () => {
  describe('given document path A "a[0].b.c[1][2]", document path B "d[0].e.f[1][3]" and literal number 1 named "Number"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when creating a set action', () => {
      const setAction = SetAction.assignSumToAttribute(
        documentPathA,
        documentPathB,
        literal,
      );

      it('should have the statement "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] + :literalNumber"', () => {
        expect(setAction.statement).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] + :literalNumber',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have the expression attribute values of literal', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});

describe('creating set action to assign difference of values to attribute', () => {
  describe('given document path A "a[0].b.c[1][2]", document path B "d[0].e.f[1][3]" and literal number 1 named "Number"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when creating a set action', () => {
      const setAction = SetAction.assignDifferenceToAttribute(
        documentPathA,
        documentPathB,
        literal,
      );

      it('should have the statement "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] - :literalNumber"', () => {
        expect(setAction.statement).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] - :literalNumber',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have the expression attribute values of literal', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});
