import { describe, it, expect } from '@jest/globals';
import { DocumentPath } from '../../../../src/expressions/operands/DocumentPath.js';
import { Literal } from '../../../../src/expressions/operands/Literal.js';

describe('equal to', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `equal to`', () => {
      const condition = documentPathA.equalTo(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 = #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 = #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `equal to`', () => {
      const condition = documentPath.equalTo(literal);

      it('should have expression "#attr0[1][2].#attr1 = :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 = :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('not equal to', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `not equal to`', () => {
      const condition = documentPathA.notEqualTo(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 <> #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 <> #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `not equal to`', () => {
      const condition = documentPath.notEqualTo(literal);

      it('should have expression "#attr0[1][2].#attr1 <> :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 <> :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('less than', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `less than`', () => {
      const condition = documentPathA.lessThan(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 < #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 < #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `less than`', () => {
      const condition = documentPath.lessThan(literal);

      it('should have expression "#attr0[1][2].#attr1 < :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 < :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('less than or equal to', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `less than or equal to`', () => {
      const condition = documentPathA.lessThanOrEqualTo(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 <= #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 <= #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `less than or equal to`', () => {
      const condition = documentPath.lessThanOrEqualTo(literal);

      it('should have expression "#attr0[1][2].#attr1 <= :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 <= :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('greater than', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `greater than`', () => {
      const condition = documentPathA.greaterThan(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 > #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 > #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `greater than`', () => {
      const condition = documentPath.greaterThan(literal);

      it('should have expression "#attr0[1][2].#attr1 > :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 > :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('greater than or equal to', () => {
  describe('given document path A "attr0[1][2].attr1" and document path B "attr2[3][4].attr3"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');

    describe('when comparing `greater than or equal to`', () => {
      const condition = documentPathA.greaterThanOrEqualTo(documentPathB);

      it('should have expression "#attr0[1][2].#attr1 >= #attr2[3][4].#attr3"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 >= #attr2[3][4].#attr3',
        );
      });

      it('should have expression attribute names of both document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1" and literal string "string" named "String"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literal = Literal.fromValue('string', 'String');

    describe('when comparing `greater than or equal to`', () => {
      const condition = documentPath.greaterThanOrEqualTo(literal);

      it('should have expression "#attr0[1][2].#attr1 >= :literalString"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 >= :literalString',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of literal', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalString': { S: 'string' },
        });
      });
    });
  });
});

describe('between', () => {
  describe('given document path A "attr0[1][2].attr1", document path B "attr2[3][4].attr3" and document path C "attr4[5][6].attr5"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr2[3][4].attr3');
    const documentPathC = DocumentPath.parse('attr4[5][6].attr5');

    describe('when comparing `between`', () => {
      const condition = documentPathA.between(documentPathB, documentPathC);

      it('should have expression "#attr0[1][2].#attr1 BETWEEN #attr2[3][4].#attr3 AND #attr4[5][6].#attr5"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 BETWEEN #attr2[3][4].#attr3 AND #attr4[5][6].#attr5',
        );
      });

      it('should have expression attribute names of all document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr2': 'attr2',
          '#attr3': 'attr3',
          '#attr4': 'attr4',
          '#attr5': 'attr5',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1", literal string "stringA" named "LowerBound" and literal string "stringB" named "UpperBound"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const lowerBound = Literal.fromValue('stringA', 'LowerBound');
    const upperBound = Literal.fromValue('stringB', 'UpperBound');

    describe('when comparing `between`', () => {
      const condition = documentPath.between(lowerBound, upperBound);

      it('should have expression "#attr0[1][2].#attr1 BETWEEN :literalLowerBound AND :literalUpperBound"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 BETWEEN :literalLowerBound AND :literalUpperBound',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of both literals', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalLowerBound': { S: 'stringA' },
          ':literalUpperBound': { S: 'stringB' },
        });
      });
    });
  });
});

describe('in', () => {
  describe('given attribute path A "attr0[1][2].attr1", attribute path B "attr3[4][5].attr6" and attribute path C "attr7[8][9].attr10"', () => {
    const documentPathA = DocumentPath.parse('attr0[1][2].attr1');
    const documentPathB = DocumentPath.parse('attr3[4][5].attr6');
    const documentPathC = DocumentPath.parse('attr7[8][9].attr10');

    describe('when comparing `in`', () => {
      const condition = documentPathA.in(documentPathB, documentPathC);

      it('should have expression "#attr0[1][2].#attr1 IN (#attr3[4][5].#attr6, #attr7[8][9].#attr10)"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 IN (#attr3[4][5].#attr6, #attr7[8][9].#attr10)',
        );
      });

      it('should have expression attribute names of all document paths', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
          '#attr3': 'attr3',
          '#attr6': 'attr6',
          '#attr7': 'attr7',
          '#attr10': 'attr10',
        });
      });

      it('should have no expression attribute values', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({});
      });
    });
  });

  describe('given document path "attr0[1][2].attr1", literal string "stringA" named "StringA" and literal string "stringB" named "StringB"', () => {
    const documentPath = DocumentPath.parse('attr0[1][2].attr1');
    const literalA = Literal.fromValue('stringA', 'StringA');
    const literalB = Literal.fromValue('stringB', 'StringB');

    describe('when comparing `in`', () => {
      const condition = documentPath.in(literalA, literalB);

      it('should have expression "#attr0[1][2].#attr1 IN (:literalStringA, :literalStringB)"', () => {
        expect(condition.getExpressionString()).toBe(
          '#attr0[1][2].#attr1 IN (:literalStringA, :literalStringB)',
        );
      });

      it('should have expression attribute names of document path', () => {
        expect(condition.getExpressionAttributeNames()).toEqual({
          '#attr0': 'attr0',
          '#attr1': 'attr1',
        });
      });

      it('should have expression attribute values of both literals', () => {
        expect(condition.getExpressionAttributeValues()).toEqual({
          ':literalStringA': { S: 'stringA' },
          ':literalStringB': { S: 'stringB' },
        });
      });
    });
  });
});
