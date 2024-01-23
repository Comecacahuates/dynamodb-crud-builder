import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';
import { UpdateActionType } from '../../../../src/expressions/updates/UpdateAction.js';

describe('set value', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue('string', 'String');

    describe('when getting `set value` update action', () => {
      const updateAction = documentPath.setValue(literal);

      it('should be a set action', () => {
        expect(updateAction.type).toBe(UpdateActionType.SET);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] = :literalString"', () => {
        expect(updateAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = :literalString',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(updateAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(updateAction.expressionAttributeValues).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });

    describe('when getting `set value if not exists` update action', () => {
      const updateAction = documentPath.setValueIfNotExists(literal);

      it('should be a set action', () => {
        expect(updateAction.type).toBe(UpdateActionType.SET);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] = if_not_exists(#attrA[0].#attrB.#attrC[1][2], :literalString)"', () => {
        expect(updateAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = if_not_exists(#attrA[0].#attrB.#attrC[1][2], :literalString)',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(updateAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(updateAction.expressionAttributeValues).toEqual({
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

    describe('when getting `increment` update action', () => {
      const updateAction = documentPath.increment(literal);

      it('should be a set action', () => {
        expect(updateAction.type).toBe(UpdateActionType.SET);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + :literalNumber"', () => {
        expect(updateAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + :literalNumber',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(updateAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(updateAction.expressionAttributeValues).toEqual({
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

    describe('when getting `decrement` update action', () => {
      const updateAction = documentPath.decrement(literal);

      it('should be a set action', () => {
        expect(updateAction.type).toBe(UpdateActionType.SET);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - :literalNumber"', () => {
        expect(updateAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - :literalNumber',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(updateAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(updateAction.expressionAttributeValues).toEqual({
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

    describe('when getting `append items` update action', () => {
      const addAction = documentPath.appendItems(literal);

      it('should be a set action', () => {
        expect(addAction.type).toBe(UpdateActionType.SET);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] = list_append(#attrA[0].#attrB.#attrC[1][2], :literalList)"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = list_append(#attrA[0].#attrB.#attrC[1][2], :literalList)',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
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

    describe('when getting `add` update action', () => {
      const addAction = documentPath.add(literal);

      it('should be an add action', () => {
        expect(addAction.type).toBe(UpdateActionType.ADD);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] :literalNumber"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] :literalNumber',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
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

    describe('when getting `remove` update action', () => {
      const removeAction = documentPath.remove();

      it('should be a remove action', () => {
        expect(removeAction.type).toBe(UpdateActionType.REMOVE);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2]"', () => {
        expect(removeAction.statement).toBe('#attrA[0].#attrB.#attrC[1][2]');
      });

      it('should have the expression attribute names of the document path', () => {
        expect(removeAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have no expression attribute values', () => {
        expect(removeAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});

describe('delete', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value {1, 2, 3} named "Set"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(new Set([1, 2, 3]), 'Set');

    describe('when getting `delete` update action', () => {
      const deleteAction = documentPath.delete(literal);

      it('should be a delete action', () => {
        expect(deleteAction.type).toBe(UpdateActionType.DELETE);
      });

      it('should have statement "#attrA[0].#attrB.#attrC[1][2] :literalSet"', () => {
        expect(deleteAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] :literalSet',
        );
      });

      it('should have the expression attribute names of the document path', () => {
        expect(deleteAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
        });
      });

      it('should have the expression attribute values of the literal', () => {
        expect(deleteAction.expressionAttributeValues).toEqual({
          ':literalSet': { NS: ['1', '2', '3'] },
        });
      });
    });
  });
});
