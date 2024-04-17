import { describe, it, expect } from '@jest/globals';
import { Query } from '../../src/read/Query.js';
import { DocumentPath, Literal } from '../../src/expressions/operands/index.js';
import { ProjectionExpression } from '../../src/expressions/projections/index.js';

describe('query', () => {
  describe('given a key condition, a table name, an index name, a filter expression, a start key and a limit', () => {
    const keyDocumentPath = DocumentPath.parse('id'),
      keyValue = Literal.fromValue('key', 'Key'),
      attribute0 = DocumentPath.parse('attr0'),
      literal0 = Literal.fromValue(10, '10');

    const keyCondition = keyDocumentPath.equalTo(keyValue),
      tableName = 'table-00',
      indexName = 'index-00',
      filterExpression = attribute0.equalTo(literal0),
      projection = new ProjectionExpression().addAttribute(attribute0),
      startKey = { id: 'id-00', name: 'name-01' },
      limit = 10;

    describe('when building query command', () => {
      const command = new Query(keyCondition)
        .fromTable(tableName)
        .byIndex(indexName)
        .filteringBy(filterExpression)
        .withProjection(projection)
        .startingAt(startKey)
        .limitTo(limit)
        .inDescendingOrder()
        .toCommand();

      it('should have table name', () => {
        expect(command.input.TableName).toBe(tableName);
      });

      it('should have key condition expression', () => {
        expect(command.input.KeyConditionExpression).toBe('#id = :literalKey');
      });

      it('should have index name', () => {
        expect(command.input.IndexName).toBe('index-00');
      });

      it('should have filter expression', () => {
        expect(command.input.FilterExpression).toBe('#attr0 = :literal10');
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
        expect(command.input.ExpressionAttributeValues).toEqual({
          ':literalKey': { S: 'key' },
          ':literal10': { N: '10' },
        });
      });
    });
  });
});
