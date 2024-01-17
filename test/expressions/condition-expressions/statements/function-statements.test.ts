import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildAttributeExistsStatement,
  buildAttributeNotExistsStatement,
  buildAttributeIsOfTypeStatement,
} from '../../../../src/expressions/condition-expressions/statements/function-statements.js';

describe('function statements', () => {
  describe('given document path placeholder "#a[1].#b.#c[2]" and attribute type placeholder ":attributeType"', () => {
    const operand = '#a[1].#b.#c[2]';
    const attributeType = ':attributeType';

    describe('when building `attribute exists` statement', () => {
      let attributeExistsStatement: string;

      beforeEach(() => {
        attributeExistsStatement = buildAttributeExistsStatement(operand);
      });

      it('should return "attribute_exists(#a[1].#b.#c[2])"', () => {
        expect(attributeExistsStatement).toBe(
          'attribute_exists(#a[1].#b.#c[2])',
        );
      });
    });

    describe('when building `attribute not exists` statement', () => {
      let attributeNotExistsStatement: string;

      beforeEach(() => {
        attributeNotExistsStatement = buildAttributeNotExistsStatement(operand);
      });

      it('should return "attribute_not_exists(#a[1].#b.#c[2])"', () => {
        expect(attributeNotExistsStatement).toBe(
          'attribute_not_exists(#a[1].#b.#c[2])',
        );
      });
    });

    describe('when building `attribute is of type` statement', () => {
      let attributeIsOfTypeStatement: string;

      beforeEach(() => {
        attributeIsOfTypeStatement = buildAttributeIsOfTypeStatement(
          operand,
          attributeType,
        );
      });

      it('should return "attribute_type(#a[1].#b.#c[2], :attributeType)"', () => {
        expect(attributeIsOfTypeStatement).toBe(
          'attribute_type(#a[1].#b.#c[2], :attributeType)',
        );
      });
    });
  });
});
