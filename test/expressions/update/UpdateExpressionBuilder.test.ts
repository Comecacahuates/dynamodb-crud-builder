import { describe, test, expect, beforeEach } from '@jest/globals';
import { UpdateExpressionBuilder } from '../../../src/expressions/update/UpdateExpressionBuilder.js';

describe('Building update expression', () => {
  let updateExpressionBuilder: UpdateExpressionBuilder;

  beforeEach(() => {
    updateExpressionBuilder = new UpdateExpressionBuilder();
  });

  describe('Set', () => {
    describe('Setting attribute value', () => {
      test('single statement to set value of attribute', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'])
          .build();

        expect(updateExpression).toBe('SET #attr0 = :attr0');
      });

      test('multiple statements to set value of attribute', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'])
          .setValue(['attr1'])
          .setValue(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = :attr0, #attr1 = :attr1, #attr2 = :attr2',
        );
      });

      test('single statement to set value preventing overwrite', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'], { preventOverwriting: true })
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = if_not_exists(#attr0, :attr0)',
        );
      });

      test('multiple statements to set value some preventing overwrite', () => {
        const updateExpression = updateExpressionBuilder
          .setValue(['attr0'], { preventOverwriting: true })
          .setValue(['attr1'], { preventOverwriting: true })
          .setValue(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = if_not_exists(#attr0, :attr0), #attr1 = if_not_exists(#attr1, :attr1), #attr2 = :attr2',
        );
      });
    });

    describe('Appending items to list', () => {
      test('single statement to append items to list', () => {
        const updateExpression = updateExpressionBuilder
          .appendItemsToList(['attr0'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = list_append(#attr0, :attr0)',
        );
      });

      test('multiple statements to append items to list', () => {
        const updateExpression = updateExpressionBuilder
          .appendItemsToList(['attr0'])
          .appendItemsToList(['attr1'])
          .appendItemsToList(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = list_append(#attr0, :attr0), #attr1 = list_append(#attr1, :attr1), #attr2 = list_append(#attr2, :attr2)',
        );
      });
    });

    describe('Adding number', () => {
      test('single statement to add number to attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .addNumber(['attr0'])
          .build();

        expect(updateExpression).toBe('SET #attr0 = #attr0 + :attr0');
      });

      test('multiple statements to add number to attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .addNumber(['attr0'])
          .addNumber(['attr1'])
          .addNumber(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = #attr0 + :attr0, #attr1 = #attr1 + :attr1, #attr2 = #attr2 + :attr2',
        );
      });
    });

    describe('Subtracting number', () => {
      test('single statement to subtract number from attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .subtractNumber(['attr0'])
          .build();

        expect(updateExpression).toBe('SET #attr0 = #attr0 - :attr0');
      });

      test('multiple statements to subtract number from attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .subtractNumber(['attr0'])
          .subtractNumber(['attr1'])
          .subtractNumber(['attr2'])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = #attr0 - :attr0, #attr1 = #attr1 - :attr1, #attr2 = #attr2 - :attr2',
        );
      });
    });
  });

  describe('Add', () => {
    describe('Adding elements to set', () => {
      test('single statement to add elements to set', () => {
        const updateExpression = updateExpressionBuilder
          .addElementsToSet(['attr0'])
          .build();

        expect(updateExpression).toBe('ADD #attr0 :attr0');
      });
    });
  });

  describe('Remove', () => {
    describe('Removing attributes from an item', () => {
      test('single statement to remove attribute from an item', () => {
        const updateExpression = updateExpressionBuilder
          .remove(['attr0', 'attr1'])
          .build();

        expect(updateExpression).toBe('REMOVE #attr0.#attr1');
      });

      test('multiple statements to remove attributes from an item', () => {
        const updateExpression = updateExpressionBuilder
          .remove(['attr0', 'attr1'])
          .remove(['attr2', 'attr3'])
          .remove(['attr4', 'attr5'])
          .build();

        expect(updateExpression).toBe(
          'REMOVE #attr0.#attr1, #attr2.#attr3, #attr4.#attr5',
        );
      });
    });
  });

  describe('Delete', () => {
    test('single statement to delete an element from a set', () => {
      const updateExpression = updateExpressionBuilder
        .delete(['attr0', 'attr1'])
        .build();

      expect(updateExpression).toBe('DELETE #attr0.#attr1 :attr0attr1');
    });

    test('multiple statements to delete an element from a set', () => {
      const updateExpression = updateExpressionBuilder
        .delete(['attr0', 'attr1'])
        .delete(['attr2', 'attr3'])
        .delete(['attr4', 'attr5'])
        .build();

      expect(updateExpression).toBe(
        'DELETE #attr0.#attr1 :attr0attr1, #attr2.#attr3 :attr2attr3, #attr4.#attr5 :attr4attr5',
      );
    });
  });
});
