import { describe, it, expect, beforeEach } from '@jest/globals';
import { buildAddStatement } from '../../../../src/expressions/update-expressions/statements/add-statements.js';

describe('building add statement', () => {
  describe('given document path a', () => {
    const documentPath = [{ attributeName: 'a' }];

    describe('when building an add statement', () => {
      let addStatement: string;

      beforeEach(() => {
        addStatement = buildAddStatement(documentPath);
      });

      it('should return "#a :a"', () => {
        expect(addStatement).toBe('#a :a');
      });
    });
  });

  describe('given document path a.b[1].c', () => {
    const documentPath = [
      { attributeName: 'a' },
      { attributeName: 'b', index: 1 },
      { attributeName: 'c' },
    ];

    describe('when building an add statement', () => {
      let addStatement: string;

      beforeEach(() => {
        addStatement = buildAddStatement(documentPath);
      });

      it('should return "#a.#b[1].#c :ab1c"', () => {
        expect(addStatement).toBe('#a.#b[1].#c :ab1c');
      });
    });
  });

  describe('given document path a.b[1].c.d[2].e[3]', () => {
    const documentPath = [
      { attributeName: 'a' },
      { attributeName: 'b', index: 1 },
      { attributeName: 'c' },
      { attributeName: 'd', index: 2 },
      { attributeName: 'e', index: 3 },
    ];

    describe('when building an add statement', () => {
      let addStatement: string;

      beforeEach(() => {
        addStatement = buildAddStatement(documentPath);
      });

      it('should return "#a.#b[1].#c.#d[2].#e[3] :ab1cd2e3"', () => {
        expect(addStatement).toBe('#a.#b[1].#c.#d[2].#e[3] :ab1cd2e3');
      });
    });
  });
});
