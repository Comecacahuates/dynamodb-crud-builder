import { describe, it, expect } from '@jest/globals';
import { buildAddStatement } from '../../../../src/expressions/update-expressions/statements/add-statements.js';

describe('building add statement', () => {
  describe('given document path a', () => {
    describe('when building an add statement', () => {
      it('should return "#a :a"', () => {
        const actualStatement = buildAddStatement([{ attributeName: 'a' }]);

        expect(actualStatement).toBe('#a :a');
      });
    });
  });

  describe('given document path a.b[1].c', () => {
    describe('when building an add statement', () => {
      it('should return "#a.#b[1].#c :ab1c"', () => {
        const actualStatement = buildAddStatement([
          { attributeName: 'a' },
          { attributeName: 'b', index: 1 },
          { attributeName: 'c' },
        ]);

        expect(actualStatement).toBe('#a.#b[1].#c :ab1c');
      });
    });
  });

  describe('given document path a.b[1].c.d[2].e[3]', () => {
    describe('when building an add statement', () => {
      it('should return "#a.#b[1].#c.#d[2].#e[3] :ab1cd2e3"', () => {
        const actualStatement = buildAddStatement([
          { attributeName: 'a' },
          { attributeName: 'b', index: 1 },
          { attributeName: 'c' },
          { attributeName: 'd', index: 2 },
          { attributeName: 'e', index: 3 },
        ]);

        expect(actualStatement).toBe('#a.#b[1].#c.#d[2].#e[3] :ab1cd2e3');
      });
    });
  });
});
