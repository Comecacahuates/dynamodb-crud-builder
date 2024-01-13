import { describe, it, test, expect, beforeEach } from '@jest/globals';
import { UpdateExpressionBuilder } from '../../../src/expressions/update-expressions/UpdateExpressionBuilder.js';

describe('Building update expression', () => {
  let updateExpressionBuilder: UpdateExpressionBuilder;

  beforeEach(() => {
    updateExpressionBuilder = new UpdateExpressionBuilder();
  });

  describe('Set', () => {
    describe('Setting attribute value', () => {
      test('single statement to set value of attribute', () => {
        const updateExpression = updateExpressionBuilder
          .setValue([{ attributeName: 'attr0' }])
          .build();

        expect(updateExpression).toBe('SET #attr0 = :attr0');
      });

      test('multiple statements to set value of attribute', () => {
        const updateExpression = updateExpressionBuilder
          .setValue([{ attributeName: 'attr0' }])
          .setValue([{ attributeName: 'attr1' }])
          .setValue([{ attributeName: 'attr2' }])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = :attr0, #attr1 = :attr1, #attr2 = :attr2',
        );
      });

      test('single statement to set value preventing overwrite', () => {
        const updateExpression = updateExpressionBuilder
          .setValue([{ attributeName: 'attr0' }], { preventOverwriting: true })
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = if_not_exists(#attr0, :attr0)',
        );
      });

      test('multiple statements to set value some preventing overwrite', () => {
        const updateExpression = updateExpressionBuilder
          .setValue([{ attributeName: 'attr0' }], { preventOverwriting: true })
          .setValue([{ attributeName: 'attr1' }], { preventOverwriting: true })
          .setValue([{ attributeName: 'attr2' }])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = if_not_exists(#attr0, :attr0), #attr1 = if_not_exists(#attr1, :attr1), #attr2 = :attr2',
        );
      });
    });

    describe('Appending items to list', () => {
      test('single statement to append items to list', () => {
        const updateExpression = updateExpressionBuilder
          .appendItemsToList([{ attributeName: 'attr0' }])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = list_append(#attr0, :attr0)',
        );
      });

      test('multiple statements to append items to list', () => {
        const updateExpression = updateExpressionBuilder
          .appendItemsToList([{ attributeName: 'attr0' }])
          .appendItemsToList([{ attributeName: 'attr1' }])
          .appendItemsToList([{ attributeName: 'attr2' }])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = list_append(#attr0, :attr0), #attr1 = list_append(#attr1, :attr1), #attr2 = list_append(#attr2, :attr2)',
        );
      });
    });

    describe('Adding number', () => {
      test('single statement to add number to attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .addNumber([{ attributeName: 'attr0' }])
          .build();

        expect(updateExpression).toBe('SET #attr0 = #attr0 + :attr0');
      });

      test('multiple statements to add number to attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .addNumber([{ attributeName: 'attr0' }])
          .addNumber([{ attributeName: 'attr1' }])
          .addNumber([{ attributeName: 'attr2' }])
          .build();

        expect(updateExpression).toBe(
          'SET #attr0 = #attr0 + :attr0, #attr1 = #attr1 + :attr1, #attr2 = #attr2 + :attr2',
        );
      });
    });

    describe('Subtracting number', () => {
      test('single statement to subtract number from attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .subtractNumber([{ attributeName: 'attr0' }])
          .build();

        expect(updateExpression).toBe('SET #attr0 = #attr0 - :attr0');
      });

      test('multiple statements to subtract number from attribute value', () => {
        const updateExpression = updateExpressionBuilder
          .subtractNumber([{ attributeName: 'attr0' }])
          .subtractNumber([{ attributeName: 'attr1' }])
          .subtractNumber([{ attributeName: 'attr2' }])
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
          .addElementsToSet([{ attributeName: 'attr0' }])
          .build();

        expect(updateExpression).toBe('ADD #attr0 :attr0');
      });
    });
  });

  describe('Remove', () => {
    describe('Removing attributes from an item', () => {
      test('single statement to remove attribute from an item', () => {
        const updateExpression = updateExpressionBuilder
          .remove([{ attributeName: 'attr0' }, { attributeName: 'attr1' }])
          .build();

        expect(updateExpression).toBe('REMOVE #attr0.#attr1');
      });

      test('multiple statements to remove attributes from an item', () => {
        const updateExpression = updateExpressionBuilder
          .remove([{ attributeName: 'attr0' }, { attributeName: 'attr1' }])
          .remove([{ attributeName: 'attr2' }, { attributeName: 'attr3' }])
          .remove([{ attributeName: 'attr4' }, { attributeName: 'attr5' }])
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
        .delete([{ attributeName: 'attr0' }, { attributeName: 'attr1' }])
        .build();

      expect(updateExpression).toBe('DELETE #attr0.#attr1 :attr0attr1');
    });

    test('multiple statements to delete an element from a set', () => {
      const updateExpression = updateExpressionBuilder
        .delete([{ attributeName: 'attr0' }, { attributeName: 'attr1' }])
        .delete([{ attributeName: 'attr2' }, { attributeName: 'attr3' }])
        .delete([{ attributeName: 'attr4' }, { attributeName: 'attr5' }])
        .build();

      expect(updateExpression).toBe(
        'DELETE #attr0.#attr1 :attr0attr1, #attr2.#attr3 :attr2attr3, #attr4.#attr5 :attr4attr5',
      );
    });
  });

  describe('Multiple statements', () => {
    it('should return update expression with multiple statements', () => {
      const updateExpression = updateExpressionBuilder
        .setValue([
          { attributeName: 'attr0', index: 1 },
          { attributeName: 'a' },
        ])
        .appendItemsToList([
          { attributeName: 'attr1', index: 2 },
          { attributeName: 'b' },
        ])
        .addNumber([
          { attributeName: 'attr2', index: 3 },
          { attributeName: 'c' },
        ])
        .subtractNumber([
          { attributeName: 'attr3', index: 4 },
          { attributeName: 'd' },
        ])
        .addElementsToSet([
          { attributeName: 'attr4', index: 5 },
          { attributeName: 'e' },
        ])
        .remove([{ attributeName: 'attr5' }, { attributeName: 'f' }])
        .delete([{ attributeName: 'attr6' }, { attributeName: 'g' }])
        .build();

      expect(updateExpression).toBe(
        'SET #attr0[1].#a = :attr01a, #attr1[2].#b = list_append(#attr1[2].#b, :attr12b), #attr2[3].#c = #attr2[3].#c + :attr23c, #attr3[4].#d = #attr3[4].#d - :attr34d ADD #attr4[5].#e :attr45e REMOVE #attr5.#f DELETE #attr6.#g :attr6g',
      );
    });
  });
});
