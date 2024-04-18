import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';
import { Condition } from '../../../../src/expressions/conditions/Condition.js';
import { Operand } from '../../../../src/expressions/operands/Operand.js';

describe('functions', () => {
  describe('given a document path and an operand', () => {
    const documentPath = DocumentPath.parse('a[0].b'),
      operand = Literal.fromValue('value', 'Value');

    describe('when building exists function expression', () => {
      const existsFunction = documentPath.exists();

      it('should return a condition', () => {
        expect(existsFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(existsFunction.getString()).toBe('attribute_exists(#a[0].#b)');
      });

      it('should have attribute names', () => {
        expect(
          existsFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          existsFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });

    describe('when building not exists function expression', () => {
      const notExistsFunction = documentPath.notExists();

      it('should return a condition', () => {
        expect(notExistsFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(notExistsFunction.getString()).toBe(
          'attribute_not_exists(#a[0].#b)',
        );
      });

      it('should have attribute names', () => {
        expect(
          notExistsFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          notExistsFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });

    describe('when building size function', () => {
      const sizeFunction = documentPath.size();

      it('should return an operand', () => {
        expect(sizeFunction).toBeInstanceOf(Operand);
      });

      it('should have expression string', () => {
        expect(sizeFunction.getString()).toBe('size(#a[0].#b)');
      });

      it('should have attribute names', () => {
        expect(
          sizeFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          sizeFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({});
      });
    });

    describe('when building type function', () => {
      const typeFunction = documentPath.type(operand);

      it('should return a condition', () => {
        expect(typeFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(typeFunction.getString()).toBe(
          'attribute_type(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          typeFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          typeFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when building begins with function', () => {
      const beginsWithFunction = documentPath.beginsWith(operand);

      it('should return a condition', () => {
        expect(beginsWithFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(beginsWithFunction.getString()).toBe(
          'begins_with(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          beginsWithFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          beginsWithFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when building contains function', () => {
      const containsFunction = documentPath.contains(operand);

      it('should return a condition', () => {
        expect(containsFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(containsFunction.getString()).toBe(
          'contains(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          containsFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          containsFunction.getAttributeValues().toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });

    describe('when building if not exists function', () => {
      const ifNotExistsFunction = documentPath.ifNotExists(operand);

      it('should return an operand', () => {
        expect(ifNotExistsFunction).toBeInstanceOf(Operand);
      });

      it('should have expression string', () => {
        expect(ifNotExistsFunction.getString()).toBe(
          'if_not_exists(#a[0].#b, :literalValue)',
        );
      });

      it('should have attribute names', () => {
        expect(
          ifNotExistsFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        expect(
          ifNotExistsFunction
            .getAttributeValues()
            .toExpressionAttributeValues(),
        ).toEqual({
          ':literalValue': { S: 'value' },
        });
      });
    });
  });

  describe('given a document path and a literal number value', () => {
    const documentPath = DocumentPath.parse('a[0].b'),
      value = 10;

    describe('when building contains function', () => {
      const containsFunction = documentPath.contains(value);

      it('should return a condition', () => {
        expect(containsFunction).toBeInstanceOf(Condition);
      });

      it('should have expression string', () => {
        expect(containsFunction.getString()).toMatch(
          'contains(#a[0].#b, :literal',
        );
      });

      it('should have attribute names', () => {
        expect(
          containsFunction.getAttributeNames().toExpressionAttributeNames(),
        ).toEqual({
          '#a': 'a',
          '#b': 'b',
        });
      });

      it('should have attribute values', () => {
        const expressionAttributeValues = containsFunction
          .getAttributeValues()
          .toExpressionAttributeValues();
        const keys = Object.keys(expressionAttributeValues);
        const values = Object.values(expressionAttributeValues);

        expect(keys).toHaveLength(1);
        expect(keys[0]).toMatch(':literal');
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual({ N: '10' });
      });
    });
  });
});
