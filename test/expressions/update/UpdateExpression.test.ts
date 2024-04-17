import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../src/expressions/operands/Literal.js';
import { UpdateExpression } from '../../../src/expressions/update/UpdateExpression.js';

describe('build update expression', () => {
  describe('given multiple update actions', () => {
    const documentPathA = DocumentPath.parse('a');
    const documentPathB = DocumentPath.parse('b');
    const documentPathC = DocumentPath.parse('c');
    const documentPathD = DocumentPath.parse('d');
    const documentPathE = DocumentPath.parse('e');
    const documentPathF = DocumentPath.parse('f');
    const documentPathG = DocumentPath.parse('g');
    const documentPathH = DocumentPath.parse('h');
    const literalString = Literal.fromValue('string', 'String');
    const literalNumber = Literal.fromValue(1, 'Number');
    const literalSet = Literal.fromValue(new Set([1, 2, 3]), 'Set');
    const setValue = documentPathA.setValue(literalString);
    const increment = documentPathB.increment(literalNumber);
    const remove1 = documentPathC.remove();
    const remove2 = documentPathD.remove();
    const addNumber = documentPathE.add(literalNumber);
    const addElements = documentPathF.add(literalSet);
    const deleteElements1 = documentPathG.delete(literalSet);
    const deleteElements2 = documentPathH.delete(literalSet);

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpression()
        .addAction(setValue)
        .addAction(increment)
        .addAction(remove1)
        .addAction(remove2)
        .addAction(addNumber)
        .addAction(addElements)
        .addAction(deleteElements1)
        .addAction(deleteElements2);

      it('should have expression string with `set` statements', () => {
        expect(updateExpression.getString()).toContain(
          'SET #a = :literalString, #b = #b + :literalNumber',
        );
      });

      it('should have expression string with `remove` statements', () => {
        expect(updateExpression.getString()).toContain('REMOVE #c, #d');
      });

      it('should have expression string with `add` statements', () => {
        expect(updateExpression.getString()).toContain(
          'ADD #e :literalNumber, #f :literalSet',
        );
      });

      it('should have expression string with `delete` statements', () => {
        expect(updateExpression.getString()).toContain(
          'DELETE #g :literalSet, #h :literalSet',
        );
      });

      it('should have expression attribute names', () => {
        expect(
          updateExpression.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
          '#f': 'f',
          '#g': 'g',
          '#h': 'h',
        });
      });

      it('should have expression attribute values', () => {
        expect(
          updateExpression.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalString': { S: 'string' },
          ':literalNumber': { N: '1' },
          ':literalSet': { NS: ['1', '2', '3'] },
        });
      });
    });
  });
});
