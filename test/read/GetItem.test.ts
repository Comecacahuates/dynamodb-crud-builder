import { describe, it, expect } from '@jest/globals';
import { GetItem } from '../../src/read/GetItem.js';
import { ProjectionExpression } from '../../src/expressions/projections/index.js';
import { DocumentPath } from '../../src/expressions/operands/index.js';

describe('get item', () => {
  describe('given a key, table name and a projection expression', () => {
    const documentPath0 = DocumentPath.parse('a.b'),
      documentPath1 = DocumentPath.parse('c.d');

    const key = { id: 'id-00' },
      tableName = 'tableName',
      projectionExpression = new ProjectionExpression()
        .addAttribute(documentPath0)
        .addAttribute(documentPath1);

    describe('when building get item command', () => {
      const command = new GetItem(key)
        .fromTable(tableName)
        .withProjectionExpression(projectionExpression)
        .toCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe(tableName);
      });

      it('should have key', () => {
        expect(command.input.Key).toEqual({
          id: { S: 'id-00' },
        });
      });

      it('should have projection expression', () => {
        expect(command.input.ProjectionExpression).toBe('#a.#b, #c.#d');
      });

      it('should have expression attribute names', () => {
        expect(command.input.ExpressionAttributeNames).toEqual({
          '#a': 'a',
          '#b': 'b',
          '#c': 'c',
          '#d': 'd',
        });
      });
    });
  });
});
