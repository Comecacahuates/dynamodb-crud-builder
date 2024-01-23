import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('set value', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue('string', 'String');

    describe('when setting value', () => {
      const setAction = documentPath.setValue(literal);

      it('should return a set action with statement "#attrA[0].#attrB.#attrC[1][2] = :literalString"', () => {
        expect(setAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = :literalString',
        );
      });

      it('should return a set action with the expression attribute names of the document path', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return a set action with the expression attribute values of the literal', () => {
        expect(setAction.expressionAttributeValues).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('increment', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when incrementing', () => {
      const addAction = documentPath.increment(literal);

      it('should return an add action with statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + :literalNumber"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + :literalNumber',
        );
      });

      it('should return an add action with the expression attribute names of the document path', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return an add action with the expression attribute values of the literal', () => {
        expect(addAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});

describe('decrement', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when decrementing', () => {
      const subtractAction = documentPath.decrement(literal);

      it('should return a subtract action with statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - :literalNumber"', () => {
        expect(subtractAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - :literalNumber',
        );
      });

      it('should return a subtract action with the expression attribute names of the document path', () => {
        expect(subtractAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return a subtract action with the expression attribute values of the literal', () => {
        expect(subtractAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});

describe('append items', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value [1, 2, 3] named "List"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue([1, 2, 3], 'List');

    describe('when appending items', () => {
      const addAction = documentPath.appendItems(literal);

      it('should return an add action with statement "#attrA[0].#attrB.#attrC[1][2] = list_append(#attrA[0].#attrB.#attrC[1][2], :literalList)"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = list_append(#attrA[0].#attrB.#attrC[1][2], :literalList)',
        );
      });

      it('should return an add action with the expression attribute names of the document path', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return an add action with the expression attribute values of the literal', () => {
        expect(addAction.expressionAttributeValues).toEqual({
          ':literalList': { L: [{ N: '1' }, { N: '2' }, { N: '3' }] },
        });
      });
    });
  });
});

describe('add', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when adding', () => {
      const addAction = documentPath.add(literal);

      it('should return an add action with statement "#attrA[0].#attrB.#attrC[1][2] :literalNumber"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] :literalNumber',
        );
      });

      it('should return an add action with the expression attribute names of the document path', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return an add action with the expression attribute values of the literal', () => {
        expect(addAction.expressionAttributeValues).toEqual({
          ':literalNumber': { N: '1' },
        });
      });
    });
  });
});

describe('remove', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');

    describe('when removing', () => {
      const removeAction = documentPath.remove();

      it('should return a remove action with statement "#attrA[0].#attrB.#attrC[1][2]"', () => {
        expect(removeAction.statement).toBe('#attrA[0].#attrB.#attrC[1][2]');
      });

      it('should return a remove action with the expression attribute names of the document path', () => {
        expect(removeAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return a remove action with no expression attribute values', () => {
        expect(removeAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});

describe('delete', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value {1, 2, 3} named "Set"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(new Set([1, 2, 3]), 'Set');

    describe('when deleting', () => {
      const deleteAction = documentPath.delete(literal);

      it('should return a delete action with statement "#attrA[0].#attrB.#attrC[1][2] :literalSet"', () => {
        expect(deleteAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] :literalSet',
        );
      });

      it('should return a delete action with the expression attribute names of the document path', () => {
        expect(deleteAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should return a delete action with the expression attribute values of the literal', () => {
        expect(deleteAction.expressionAttributeValues).toEqual({
          ':literalSet': { NS: ['1', '2', '3'] },
        });
      });
    });
  });
});
