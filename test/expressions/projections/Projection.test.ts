import { describe, it, expect } from '@jest/globals';
import { Projection } from '../../../src/expressions/projections/Projection.js';
import { DocumentPath } from '../../../src/expressions/operands/DocumentPath.js';

describe('projection', () => {
  describe('given a list of document paths', () => {
    const documentPaths = [
      DocumentPath.parse('a.b'),
      DocumentPath.parse('c[2].d'),
      DocumentPath.parse('c.d[4].e'),
    ];

    describe('when building a projection', () => {
      const projection = new Projection()
        .add(documentPaths[0]!)
        .add(documentPaths[1]!)
        .add(documentPaths[2]!);

      it('should have expression string', () => {
        expect(projection.getString()).toBe('#a.#b, #c[2].#d, #c.#d[4].#e');
      });

      it('should have attribute names', () => {
        expect(
          projection.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
          '#e': 'e',
        });
      });

      it('should have attribute values', () => {
        expect(projection.getAttributeValues().toExpressionAttributeValues()).toEqual({});
      });
    });
  });
});
