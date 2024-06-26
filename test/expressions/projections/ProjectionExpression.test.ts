import { describe, it, expect } from '@jest/globals';
import { ProjectionExpression } from '../../../src/expressions/projections/ProjectionExpression.js';
import { DocumentPath } from '../../../src/expressions/operands/DocumentPath.js';

describe('projection', () => {
  describe('given a list of document paths', () => {
    const documentPaths = [
      new DocumentPath('a.b'),
      new DocumentPath('c[2].d'),
      new DocumentPath('c.d[4].e'),
    ];

    describe('when building a projection', () => {
      const projectionExpression = new ProjectionExpression()
        .addAttributes(documentPaths[0]!, documentPaths[1]!)
        .addAttribute(documentPaths[2]!);

      it('should have expression string', () => {
        expect(projectionExpression.getString()).toBe(
          '#a.#b, #c[2].#d, #c.#d[4].#e',
        );
      });

      it('should have attribute names', () => {
        expect(
          projectionExpression.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
        });
      });

      it('should have attribute values', () => {
        expect(
          projectionExpression
            .getAttributeValues()
            .toExpressionAttributeValues(),
        ).toEqual({});
      });
    });
  });
});
