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

    describe('when creating a `set value` action', () => {
      const updateAction = UpdateAction.setValue(documentPath, value);

      it('should have the type "SET"', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = :literalNumber"', () => {
        expect(updateAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = :literalNumber',
        );
      });

      it('should have the attribute names of the document path', () => {
        expect(updateAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of the literal', () => {
        expect(updateAction.getAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });

    describe('when creating a `set value if not exists` action', () => {
      const updateAction = UpdateAction.setValueIfNotExists(
        documentPath,
        value,
      );

      it('should have the type "SET"', () => {
        expect(updateAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = if_not_exists(#a[0].#b.#c[1][2], :literalNumber)"', () => {
        expect(updateAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = if_not_exists(#a[0].#b.#c[1][2], :literalNumber)',
        );
      });

      it('should have the attribute names of the document path', () => {
        expect(updateAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of the literal', () => {
        expect(updateAction.getAttributeValues()).toEqual({
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

      it('should have the attribute names of document paths', () => {
        expect(setAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no attribute values', () => {
        expect(setAction.getAttributeValues()).toEqual({});
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

      it('should have the attribute names of document path and value', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of document path and value', () => {
        expect(addAction.getAttributeValues()).toEqual({
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

      it('should have the attribute names of document paths', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no attribute values', () => {
        expect(addAction.getAttributeValues()).toEqual({});
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

      it('should have the attribute names of document path and value', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of document path and value', () => {
        expect(addAction.getAttributeValues()).toEqual({
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

      it('should have the attribute names of document paths', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no attribute values', () => {
        expect(addAction.getAttributeValues()).toEqual({});
      });
    });
  });
});

describe('creating update action to append items', () => {
  describe('given document path "a[0].b.c[1][2]" and literal number 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('a[0].b.c[1][2]');
    const value = Literal.fromValue(1, 'Number');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.createAppendItems(documentPath, value);

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], :literalNumber)"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], :literalNumber)',
        );
      });

      it('should have the attribute names of document path and value', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the attribute values of document path and value', () => {
        expect(addAction.getAttributeValues()).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });

  describe('given document path A "a[0].b.c[1][2]" and document path B "d[0].e.f[1][3]"', () => {
    const documentPathA = DocumentPath.parse('a[0].b.c[1][2]');
    const documentPathB = DocumentPath.parse('d[0].e.f[1][3]');

    describe('when creating an set action', () => {
      const addAction = UpdateAction.createAppendItems(
        documentPathA,
        documentPathB,
      );

      it('should have the type "SET"', () => {
        expect(addAction.getType()).toBe(UpdateActionType.SET);
      });

      it('should have the expression string "#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], #d[0].#e.#f[1][3])"', () => {
        expect(addAction.getExpressionString()).toBe(
          '#a[0].#b.#c[1][2] = list_append(#a[0].#b.#c[1][2], #d[0].#e.#f[1][3])',
        );
      });

      it('should have the attribute names of document paths', () => {
        expect(addAction.getAttributeNames()).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have no attribute values', () => {
        expect(addAction.getAttributeValues()).toEqual({});
      });
    });
  });
});
