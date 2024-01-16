import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildAttributeEqualsAttributeStatement,
  buildAttributeEqualsLiteralStatement,
  buildAttributeNotEqualsAttributeStatement,
} from '../../../../src/expressions/condition-expressions/statements/comparison-statements.js';

describe('attribute equals attribute', () => {
  describe('given document path a.b[1].c.d[2].e[3] and document path f.g[4].h.i[5].j[6]', () => {
    const documentPathA = [
      { attributeName: 'a' },
      { attributeName: 'b', index: 1 },
      { attributeName: 'c' },
      { attributeName: 'd', index: 2 },
      { attributeName: 'e', index: 3 },
    ];
    const documentPathB = [
      { attributeName: 'f' },
      { attributeName: 'g', index: 4 },
      { attributeName: 'h' },
      { attributeName: 'i', index: 5 },
      { attributeName: 'j', index: 6 },
    ];

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildAttributeEqualsAttributeStatement(
          documentPathA,
          documentPathB,
        );
      });

      it('should return "#a.#b[1].#c.#d[2].#e[3] = #f.#g[4].#h.#i[5].#j[6]"', () => {
        expect(equalsStatement).toBe(
          '#a.#b[1].#c.#d[2].#e[3] = #f.#g[4].#h.#i[5].#j[6]',
        );
      });
    });
  });
});

describe('attribute equals literal', () => {
  describe('given document path a.b[1].c.d[2].e[3] and literal value 1 with document path DocumentPathForLiteral', () => {
    const documentPath = [
      { attributeName: 'a' },
      { attributeName: 'b', index: 1 },
      { attributeName: 'c' },
      { attributeName: 'd', index: 2 },
      { attributeName: 'e', index: 3 },
    ];
    const documentPathForLiteral = [
      { attributeName: 'DocumentPathForLiteral' },
    ];

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildAttributeEqualsLiteralStatement(
          documentPath,
          documentPathForLiteral,
        );
      });

      it('should return "#a.#b[1].#c.#d[2].#e[3] = :DocumentPathForLiteral"', () => {
        expect(equalsStatement).toBe(
          '#a.#b[1].#c.#d[2].#e[3] = :DocumentPathForLiteral',
        );
      });
    });
  });
});

describe('attribute not equals attribute', () => {
  describe('given document path a.b[1].c.d[2].e[3] and document path f.g[4].h.i[5].j[6]', () => {
    const documentPathA = [
      { attributeName: 'a' },
      { attributeName: 'b', index: 1 },
      { attributeName: 'c' },
      { attributeName: 'd', index: 2 },
      { attributeName: 'e', index: 3 },
    ];
    const documentPathB = [
      { attributeName: 'f' },
      { attributeName: 'g', index: 4 },
      { attributeName: 'h' },
      { attributeName: 'i', index: 5 },
      { attributeName: 'j', index: 6 },
    ];

    describe('when building the equals statement', () => {
      let equalsStatement: string;

      beforeEach(() => {
        equalsStatement = buildAttributeNotEqualsAttributeStatement(
          documentPathA,
          documentPathB,
        );
      });

      it('should return "#a.#b[1].#c.#d[2].#e[3] <> #f.#g[4].#h.#i[5].#j[6]"', () => {
        expect(equalsStatement).toBe(
          '#a.#b[1].#c.#d[2].#e[3] <> #f.#g[4].#h.#i[5].#j[6]',
        );
      });
    });
  });
});
