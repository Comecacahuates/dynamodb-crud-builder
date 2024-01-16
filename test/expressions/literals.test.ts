import { describe, it, expect, beforeEach } from '@jest/globals';
import { buildLiteralPlaceholder } from '../../src/expressions/literals.js';

describe('literal placeholder', () => {
  describe('given the name "literal" of a literal value', () => {
    const literalValueName = 'literal';

    describe('when building the placeholder', () => {
      let placeholder: string;

      beforeEach(() => {
        placeholder = buildLiteralPlaceholder(literalValueName);
      });

      it('should return ":literal"', () => {
        expect(placeholder).toBe(':literal');
      });
    });
  });
});
