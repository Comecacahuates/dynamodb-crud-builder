import { describe, it, expect, beforeEach } from '@jest/globals';
import { buildAttributeExistsStatement } from '../../../../src/expressions/condition-expressions/statements/function-statements.js';

describe('function statements', () => {
  describe('given operand ":operand" and attribute type "S"', () => {
    const operand = ':operand';
    const attributeType = 'S';

    describe('when building `attribute exists` statement', () => {
      let attributeExistsStatement: string;

      beforeEach(() => {
        attributeExistsStatement = buildAttributeExistsStatement(operand);
      });

      it('should return "attribute_exists(:operand)"', () => {
        expect(attributeExistsStatement).toBe('attribute_exists(:operand)');
      });
    });
  });
});
