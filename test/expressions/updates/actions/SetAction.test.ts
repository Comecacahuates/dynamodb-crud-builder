import { describe, it, expect, beforeEach } from '@jest/globals';
import { SetAction } from '../../../../src/expressions/updates/actions/SetAction.js';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('creating set action', () => {
  describe('given document path a[0].b.c[1][2] and operand :op', () => {
    const documentPath = new DocumentPath([
      new DocumentPathItem('a', [0]),
      new DocumentPathItem('b'),
      new DocumentPathItem('c', [1, 2]),
    ]);
    const operand = new Operand(':op', {}, { ':op': { S: 'value' } });

    describe('when creating a set action to assign', () => {
      let setAction: SetAction;

      beforeEach(() => {
        setAction = SetAction.assign(documentPath, operand);
      });

      it('should have the statement "#a[0].#b.#c[1][2] = :op"', () => {
        expect(setAction.statement).toBe('#a[0].#b.#c[1][2] = :op');
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
          ':op': { S: 'value' },
        });
      });
    });
  });
});
