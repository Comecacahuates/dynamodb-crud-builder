import { describe, it, expect } from '@jest/globals';
import { NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { ExpressionAttribute } from '../../src/expressions/ExpressionAttribute.js';

describe('Attribute', () => {
  describe('given an attribute name and an attribute value', () => {
    const name = 'attributeName';
    const value: NativeAttributeValue = 'attributeValue';

    describe('when creating an attribute', () => {
      const attribute = new ExpressionAttribute(name, value);

      it('should have a name', () => {
        expect(attribute.getName()).toEqual('attributeName');
      });

      it('should have a value', () => {
        expect(attribute.getValue()).toEqual({ S: 'attributeValue' });
      });
    });
  });
});
