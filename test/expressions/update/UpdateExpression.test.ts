import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../src/expressions/operands/DocumentPath.js';
import { UpdateExpression } from '../../../src/expressions/update/UpdateExpression.js';

describe('build update expression', () => {
  describe('given multiple update actions', () => {
    const attributeA = new DocumentPath('a'),
      attributeB = new DocumentPath('b'),
      attributeC = new DocumentPath('c'),
      attributeD = new DocumentPath('d'),
      attributeE = new DocumentPath('e'),
      attributeF = new DocumentPath('f'),
      attributeG = new DocumentPath('g'),
      attributeH = new DocumentPath('h');

    describe('when building update expression', () => {
      const updateExpression = new UpdateExpression()
        .addAction(attributeA.set('string'))
        .addAction(attributeB.increment(1))
        .addAction(attributeC.remove())
        .addAction(attributeD.remove())
        .addAction(attributeE.add(10))
        .addAction(attributeF.add(new Set<number>([1, 2, 3])))
        .addAction(attributeG.delete(attributeA))
        .addAction(attributeH.delete(new Set<number>([1, 2, 3])));

      it('should have expression string with `set` statements', () => {
        expect(updateExpression.getString()).toMatch(
          /SET #a = :literal\w{10}, #b = #b \+ :literal\w{10}/,
        );
      });

      it('should have expression string with `remove` statements', () => {
        expect(updateExpression.getString()).toContain('REMOVE #c, #d');
      });

      it('should have expression string with `add` statements', () => {
        expect(updateExpression.getString()).toMatch(
          /ADD #e :literal\w{10}, #f :literal\w{10}/,
        );
      });

      it('should have expression string with `delete` statements', () => {
        expect(updateExpression.getString()).toMatch(
          /DELETE #g #a, #h :literal\w{10}/,
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

      it('should have attribute values', () => {
        const expressionAttributeValues = updateExpression
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(5);
        keys.forEach((eachKey) => {
          expect(eachKey).toMatch(/:literal\w{10}/);
        });

        expect(values).toHaveLength(5);
        expect(values[0]).toEqual({ S: 'string' });
        expect(values[1]).toEqual({ N: '1' });
        expect(values[2]).toEqual({ N: '10' });
        expect(values[3]).toEqual({ NS: ['1', '2', '3'] });
        expect(values[4]).toEqual({ NS: ['1', '2', '3'] });
      });
    });
  });
});
