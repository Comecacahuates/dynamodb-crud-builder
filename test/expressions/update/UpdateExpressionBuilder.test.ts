import { describe, test, expect, beforeEach } from '@jest/globals';
import { UpdateExpressionBuilder } from '../../../src/expressions/update/UpdateExpressionBuilder.js';

describe('Building update expression', () => {
  let updateExpressionBuilder: UpdateExpressionBuilder;

  beforeEach(() => {
    updateExpressionBuilder = new UpdateExpressionBuilder();
  });

  describe('Set', () => {
    describe('Setting attribute value', () => {
      test('single statement to set value', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'])
          .build();

        expect(updateExpression).toBe('SET #attr0 = :attr0');
      });

      test('multiple statements to set value', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'])
          .setValue(['attr1'])
          .setValue(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = :attr0, #attr1 = :attr1, #attr2 = :attr2',
        );
      });
    });

    describe('Setting value of list item', () => {
      test('single statement to set value', () => {
        const updateExpression = updateExpressionBuilder
          .setValueOfListItem(['attr0'], 1)
          .build();

        expect(updateExpression).toBe('SET #attr0[1] = :attr01');
      });

      test('multiple statements to set value', () => {
        const updateExpression = updateExpressionBuilder
          .setValueOfListItem(['attr0'], 1)
          .setValueOfListItem(['attr1'], 2)
          .setValueOfListItem(['attr2'], 3)
          .build();

        expect(updateExpression).toBe(
          'SET #attr0[1] = :attr01, #attr1[2] = :attr12, #attr2[3] = :attr23',
        );
      });
    });
  });
});
