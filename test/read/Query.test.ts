import { describe, it, expect } from '@jest/globals';
import { Query } from '../../src/read/Query.js';
import { DocumentPath } from '../../src/expressions/operands/index.js';
import { ProjectionExpression } from '../../src/expressions/projections/index.js';

describe('query', () => {
  describe('given a key condition, a table name, an index name, a filter expression, a start key and a limit', () => {
    const keyDocumentPath = DocumentPath.parse('id'),
      attribute0 = DocumentPath.parse('attr0');

    const keyCondition = keyDocumentPath.equalTo('key-value'),
      tableName = 'table-00',
      indexName = 'index-00',
      filterExpression = attribute0.equalTo(10),
      projectionExpression = new ProjectionExpression().addAttribute(
        attribute0,
      ),
      startKey = { id: 'id-00', name: 'name-01' },
      limit = 10;

    describe('when building query command', () => {
      const command = new Query(keyCondition)
        .fromTable(tableName)
        .byIndex(indexName)
        .filteringBy(filterExpression)
        .withProjection(projectionExpression)
        .startingAt(startKey)
        .limitTo(limit)
        .inDescendingOrder()
        .toCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe(tableName);
      });

      it('should have key condition expression', () => {
        expect(command.input.KeyConditionExpression).toMatch(
          /#id = :literal\w{10}/,
        );
      });

      it('should have index name', () => {
        expect(command.input.IndexName).toBe('index-00');
      });

      it('should have filter expression', () => {
        expect(command.input.FilterExpression).toMatch(
          /#attr0 = :literal\w{10}/,
        );
      });

      it('should have projection expression', () => {
        expect(command.input.ProjectionExpression).toBe('#attr0');
      });

      it('should have exclusive start key', () => {
        expect(command.input.ExclusiveStartKey).toEqual({
          id: { S: 'id-00' },
          name: { S: 'name-01' },
        });
      });

      it('should have limit', () => {
        expect(command.input.Limit).toBe(10);
      });

      it('should have scan index forward', () => {
        expect(command.input.ScanIndexForward).toBe(false);
      });

      it('should have expression attribute names', () => {
        expect(command.input.ExpressionAttributeNames).toEqual({
          '#id': 'id',
          '#attr0': 'attr0',
        });
      });

      it('should have expression attribute values', () => {
        const expressionAttributeValues =
          command.input.ExpressionAttributeValues!;
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(2);
        keys.forEach((eachKey) => {
          expect(eachKey).toMatch(/:literal\w{10}/);
        });

        expect(values).toHaveLength(2);
        expect(values[0]).toEqual({ S: 'key-value' });
        expect(values[1]).toEqual({ N: '10' });
      });
    });
  });
});
