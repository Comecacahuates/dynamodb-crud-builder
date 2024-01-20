import { describe, it, expect, beforeEach } from '@jest/globals';
import { SetAction } from '../../../../src/expressions/updates/actions/SetAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('creating set action to assign value to attribute', () => {
  describe('given document path a[0].b.c[1][2] and value :value', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const operand = new Operand(':value', {}, { ':value': { N: '1' } });

    describe('when creating a set action to assign', () => {
      let setAction: SetAction;

      beforeEach(() => {
        setAction = SetAction.assignValueToAttribute(documentPath, operand);
      });

      it('should have the statement "#a[0].#b.#c[1][2] = :value"', () => {
        expect(setAction.statement).toBe('#a[0].#b.#c[1][2] = :value');
      });

      it('should have the expression attribute names of document path and operand', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
        });
      });

      it('should have the expression attribute values of document path and operand', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':value': { N: '1' },
        });
      });
    });
  });
});

describe('creating set action to assign sum of values to attribute', () => {
  describe('given document paths a[0].b.c[1][2] and d[0].e.f[1][3] and operand :op', () => {
    const documentPath1 = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const documentPath2 = new DocumentPath([
      new DocumentPathItem('d', [0]),
      new DocumentPathItem('e'),
      new DocumentPathItem('f', [1, 3]),
    ]);
    const operand = new Operand(':op', {}, { ':op': { N: '1' } });

    describe('when creating a set action to assign', () => {
      let setAction: SetAction;

      beforeEach(() => {
        setAction = SetAction.assignSumToAttribute(
          documentPath1,
          documentPath2,
          operand,
        );
      });

      it('should have the statement "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] + :op"', () => {
        expect(setAction.statement).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] + :op',
        );
      });

      it('should have the expression attribute names of document path and operand', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have the expression attribute values of document path and operand', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':op': { N: '1' },
        });
      });
    });
  });
});

describe('creating set action to assign difference of values to attribute', () => {
  describe('given document paths a[0].b.c[1][2] and d[0].e.f[1][3] and operand :op', () => {
    const documentPath1 = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const documentPath2 = new DocumentPath([
      new DocumentPathItem('d', [0]),
      new DocumentPathItem('e'),
      new DocumentPathItem('f', [1, 3]),
    ]);
    const operand = new Operand(':op', {}, { ':op': { N: '1' } });

    describe('when creating a set action to assign', () => {
      let setAction: SetAction;

      beforeEach(() => {
        setAction = SetAction.assignDifferenceToAttribute(
          documentPath1,
          documentPath2,
          operand,
        );
      });

      it('should have the statement "#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] - :op"', () => {
        expect(setAction.statement).toBe(
          '#a[0].#b.#c[1][2] = #d[0].#e.#f[1][3] - :op',
        );
      });

      it('should have the expression attribute names of document path and operand', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
        });
      });

      it('should have the expression attribute values of document path and operand', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':op': { N: '1' },
        });
      });
    });
  });
});
