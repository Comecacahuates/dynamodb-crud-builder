import { describe, it, expect } from '@jest/globals';
import {
  UpdateAction,
  UpdateActionType,
} from '../../../../src/expressions/updates/UpdateAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('creating update action to set value', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const value = Literal.fromValue(1, 'Number');

    describe('when creating a set action', () => {
      const setAction = UpdateAction.setValue(documentPath, value);

      it('should have the type "SET"', () => {
        expect(setAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = :literalNumber"', () => {
        expect(setAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = :literalNumber',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(setAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(setAction.getExpressionAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating a set action', () => {
      const setAction = UpdateAction.setValue(documentPathA, documentPathB);

      it('should have the type "SET"', () => {
        expect(setAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3]"', () => {
        expect(setAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3]',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(setAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no expression attribute values', () => {
        expect(setAction.getExpressionAttributeValues()).toEqual({});
      });
    });
  });
});

describe('creating update action to increment value', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const value = Literal.fromValue(1, 'Number');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.increment(documentPath, value);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] + :literalNumber"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] + :literalNumber',
        );
      });

      it('should have the expression attribute names of document path and value', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and value', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.increment(documentPathA, documentPathB);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] + #d[0].#e.#f[1][3]"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] + #d[0].#e.#f[1][3]',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no expression attribute values', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({});
      });
    });
  });
});

describe('creating update action to decrement value', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const value = Literal.fromValue(1, 'Number');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.decrement(documentPath, value);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] - :literalNumber"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] - :literalNumber',
        );
      });

      it('should have the expression attribute names of document path and value', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and value', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.decrement(documentPathA, documentPathB);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] - #d[0].#e.#f[1][3]"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = #a[0].#b.#c[1][2] - #d[0].#e.#f[1][3]',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no expression attribute values', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({});
      });
    });
  });
});

describe('creating update action to append items', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const value = Literal.fromValue(1, 'Number');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.appendItems(documentPath, value);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], :literalNumber)"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], :literalNumber)',
        );
      });

      it('should have the expression attribute names of document path and value', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and value', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.appendItems(documentPathA, documentPathB);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], #d[0].#e.#f[1][3])"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], #d[0].#e.#f[1][3])',
        );
      });

      it('should have the expression attribute names of document paths', () => {
        expect(addAction.getExpressionAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no expression attribute values', () => {
        expect(addAction.getExpressionAttributeValues()).toEqual({});
      });
    });
  });
});
