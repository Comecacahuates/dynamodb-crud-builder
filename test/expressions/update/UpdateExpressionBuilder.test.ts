import { describe, test, expect, beforeEach } from '@jest/globals';
import { UpdateExpressionBuilder } from '../../../src/expressions/update/UpdateExpressionBuilder.js';

describe('Building update expression', () => {
  let updateExpressionBuilder: UpdateExpressionBuilder;

  beforeEach(() => {
    updateExpressionBuilder = new UpdateExpressionBuilder();
  });

  describe('Set', () => {
    describe('Assign value', () => {
      test('single statement to assign value', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'])
          .build();

        expect(updateExpression).toEqual('SET #attr0 = :attr0');
      });
    });
  });
});
