import { describe, it, expect } from '@jest/globals';
import { SetExpression } from '../../../../src/expressions/updates/SetExpression.js';
import { UpdateAction } from '../../../../src/expressions/updates/UpdateAction.js';
import {
  DocumentPath,
  Literal,
} from '../../../../src/expressions/operands/index.js';

describe('creating set expression', () => {
  describe('given one set action statements', () => {
    const setAction = UpdateAction.setValue(
      DocumentPath.parse('attr0[0].attr1'),
      Literal.fromValue(1, 'ValueA'),
    );

    describe('when creating a set expression', () => {
      const setExpression = SetExpression.createFromUpdateActions([setAction]);

      it('should have expression string "SET #attr0[0].#attr1 = :literalValueA"', () => {
        expect(setExpression.getExpressionString()).toBe(
          'SET #attr0[0].#attr1 = :literalValueA',
        );
      });

      it('should have attribute names', () => {
        expect(setExpression.getAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have attribute values', () => {
        expect(setExpression.getAttributeValues()).toEqual({
          ':literalValueA': { N: '1' },
        });
      });
    });
  });

  describe('given multiple set action statements', () => {
    const setActionA = UpdateAction.setValue(
      DocumentPath.parse('attr0[0].attr1'),
      Literal.fromValue(1, 'ValueA'),
    );
    const setActionB = UpdateAction.setValue(
      DocumentPath.parse('attr2.attr3'),
      Literal.fromValue(2, 'ValueB'),
    );
    const setActionC = UpdateAction.setValueIfNotExists(
      DocumentPath.parse('attr4.attr5'),
      Literal.fromValue(3, 'ValueC'),
    );

    describe('when creating a set expression', () => {
      const setExpression = SetExpression.createFromUpdateActions([
        setActionA,
        setActionB,
        setActionC,
      ]);

      it('should have expression string "SET #attr0[0].#attr1 = :literalValueA, #attr2.#attr3 = :literalValueB, #attr4.#attr5 = if_not_exists(#attr4.#attr5, :literalValueC)"', () => {
        expect(setExpression.getExpressionString()).toBe(
          'SET #attr0[0].#attr1 = :literalValueA, #attr2.#attr3 = :literalValueB, #attr4.#attr5 = if_not_exists(#attr4.#attr5, :literalValueC)',
        );
      });

      it('should have attribute names', () => {
        expect(setExpression.getAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
          '#attr4': 'attr4',
          '#attr5': 'attr5',
        });
      });

      it('should have attribute values', () => {
        expect(setExpression.getAttributeValues()).toEqual({
          ':literalValueA': { N: '1' },
          ':literalValueB': { N: '2' },
          ':literalValueC': { N: '3' },
        });
      });
    });
  });

  describe('given no set action statements', () => {
    describe('when creating a set expression', () => {
      const setExpression = SetExpression.createFromUpdateActions([]);

      it('should have expression string ""', () => {
        expect(setExpression.getExpressionString()).toBe('');
      });

      it('should have attribute names', () => {
        expect(setExpression.getAttributeNames()).toEqual({});
      });

      it('should have attribute values', () => {
        expect(setExpression.getAttributeValues()).toEqual({});
      });
    });
  });
});
