import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  buildAttributeExistsFunctionStatement,
  buildAttributeNotExistsFunctionStatement,
  buildAttributeTypeFunctionStatement,
  buildBeginsWithFunctionStatement,
  buildContainsFunctionStatement,
  buildSizeFunctionStatement,
} from '../../../../src/expressions/condition-expressions/statements/function-statements.js';

describe('function statements', () => {
  describe('given document path placeholder "#a[1].#b.#c[2]"', () => {
    const operand = '#a[1].#b.#c[2]';

    describe('when building `attribute exists` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildAttributeExistsFunctionStatement(operand);
      });

      it('should return "attribute_exists(#a[1].#b.#c[2])"', () => {
        expect(functionStatement).toBe('attribute_exists(#a[1].#b.#c[2])');
      });
    });

    describe('when building `attribute not exists` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildAttributeNotExistsFunctionStatement(operand);
      });

      it('should return "attribute_not_exists(#a[1].#b.#c[2])"', () => {
        expect(functionStatement).toBe('attribute_not_exists(#a[1].#b.#c[2])');
      });
    });

    describe('when building `size` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildSizeFunctionStatement(operand);
      });

      it('should return "size(#a[1].#b.#c[2])"', () => {
        expect(functionStatement).toBe('size(#a[1].#b.#c[2])');
      });
    });
  });

  describe('given document path placeholder "#a[1].#b.#c[2]" and operand ":operand"', () => {
    const documentPathPlaceholder = '#a[1].#b.#c[2]';
    const operand = ':operand';

    describe('when building `attribute type` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildAttributeTypeFunctionStatement(
          documentPathPlaceholder,
          operand,
        );
      });

      it('should return "attribute_type(#a[1].#b.#c[2], :operand)"', () => {
        expect(functionStatement).toBe(
          'attribute_type(#a[1].#b.#c[2], :operand)',
        );
      });
    });

    describe('when building `begins with` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildBeginsWithFunctionStatement(
          documentPathPlaceholder,
          operand,
        );
      });

      it('should return "begins_with(#a[1].#b.#c[2], :operand)"', () => {
        expect(functionStatement).toBe('begins_with(#a[1].#b.#c[2], :operand)');
      });
    });

    describe('when building `contains` function statement', () => {
      let functionStatement: string;

      beforeEach(() => {
        functionStatement = buildContainsFunctionStatement(
          documentPathPlaceholder,
          operand,
        );
      });

      it('should return "contains(#a[1].#b.#c[2], :operand)"', () => {
        expect(functionStatement).toBe('contains(#a[1].#b.#c[2], :operand)');
      });
    });
  });
});
