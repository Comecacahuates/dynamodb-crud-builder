import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('setting value', () => {
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

  describe('given document path A "attrA[0].attrB.attrC[1][2]" and document path B "attrD.attrE.attrF[3][4]"', () => {
    const documentPathA = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const documentPathB = DocumentPath.parse('attrD.attrE.attrF[3][4]');

    describe('when setting value', () => {
      const setAction = documentPathA.setValue(documentPathB);

      it('should return a set action with statement "#attrA[0].#attrB.#attrC[1][2] = #attrD.#attrE.#attrF[3][4]"', () => {
        expect(setAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrD.#attrE.#attrF[3][4]',
        );
      });

      it('should return a set action with the expression attribute names of both document paths', () => {
        expect(setAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
          '#attrD': 'attrD',
          '#attrE': 'attrE',
          '#attrF': 'attrF',
        });
      });

      it('should return a set action with no expression attribute values', () => {
        expect(setAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});

describe('adding a number', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when adding number', () => {
      const addAction = documentPath.addNumber(literal);

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

  describe('given document path A "attrA[0].attrB.attrC[1][2]" and document path B "attrD.attrE.attrF[3][4]"', () => {
    const documentPathA = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const documentPathB = DocumentPath.parse('attrD.attrE.attrF[3][4]');

    describe('when adding number', () => {
      const addAction = documentPathA.addNumber(documentPathB);

      it('should return an add action with statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + #attrD.#attrE.#attrF[3][4]"', () => {
        expect(addAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] + #attrD.#attrE.#attrF[3][4]',
        );
      });

      it('should return an add action with the expression attribute names of both document paths', () => {
        expect(addAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
          '#attrD': 'attrD',
          '#attrE': 'attrE',
          '#attrF': 'attrF',
        });
      });

      it('should return an add action with no expression attribute values', () => {
        expect(addAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});

describe('subtracting a number', () => {
  describe('given document path "attrA[0].attrB.attrC[1][2]" and literal value 1 named "Number"', () => {
    const documentPath = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const literal = Literal.fromValue(1, 'Number');

    describe('when subtracting number', () => {
      const subtractAction = documentPath.subtractNumber(literal);

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

  describe('given document path A "attrA[0].attrB.attrC[1][2]" and document path B "attrD.attrE.attrF[3][4]"', () => {
    const documentPathA = DocumentPath.parse('attrA[0].attrB.attrC[1][2]');
    const documentPathB = DocumentPath.parse('attrD.attrE.attrF[3][4]');

    describe('when subtracting number', () => {
      const subtractAction = documentPathA.subtractNumber(documentPathB);

      it('should return a subtract action with statement "#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - #attrD.#attrE.#attrF[3][4]"', () => {
        expect(subtractAction.statement).toBe(
          '#attrA[0].#attrB.#attrC[1][2] = #attrA[0].#attrB.#attrC[1][2] - #attrD.#attrE.#attrF[3][4]',
        );
      });

      it('should return a subtract action with the expression attribute names of both document paths', () => {
        expect(subtractAction.expressionAttributeNames).toEqual({
          '#attrA': 'attrA',
          '#attrB': 'attrB',
          '#attrC': 'attrC',
          '#attrD': 'attrD',
          '#attrE': 'attrE',
          '#attrF': 'attrF',
        });
      });

      it('should return a subtract action with no expression attribute values', () => {
        expect(subtractAction.expressionAttributeValues).toEqual({});
      });
    });
  });
});
