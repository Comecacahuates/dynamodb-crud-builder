import { describe, it, expect, beforeEach } from '@jest/globals';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('validating document path item string', () => {
  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when validating document path item string', () => {
      let isValid: boolean;

      beforeEach(() => {
        isValid = DocumentPathItem.isParsable(documentPathItemString);
      });

      it('should return true', () => {
        expect(isValid).toBe(true);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when validating document path item string', () => {
      let isValid: boolean;

      beforeEach(() => {
        isValid = DocumentPathItem.isParsable(documentPathItemString);
      });

      it('should return true', () => {
        expect(isValid).toBe(true);
      });
    });
  });

  describe('given the string "attr0[1][2a]"', () => {
    const documentPathItemString = 'attr0[1][2a]';

    describe('when validating document path item string', () => {
      let isValid: boolean;

      beforeEach(() => {
        isValid = DocumentPathItem.isParsable(documentPathItemString);
      });

      it('should return false', () => {
        expect(isValid).toBe(false);
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = ' - attr0 [1][2]';

    describe('when validating document path item string', () => {
      let isValid: boolean;

      beforeEach(() => {
        isValid = DocumentPathItem.isParsable(documentPathItemString);
      });

      it('should return false', () => {
        expect(isValid).toBe(false);
      });
    });
  });
});

describe('parsing attribute name', () => {
  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when parsing attribute name', () => {
      let attributeName: string | null;

      beforeEach(() => {
        attributeName = DocumentPathItem.parseAttributeName(
          documentPathItemString,
        );
      });

      it('should return "attr0"', () => {
        expect(attributeName).toBe('attr0');
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing attribute name', () => {
      let attributeName: string | null;

      beforeEach(() => {
        attributeName = DocumentPathItem.parseAttributeName(
          documentPathItemString,
        );
      });

      it('should return "attr0"', () => {
        expect(attributeName).toBe('attr0');
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = '0attr0';

    describe('when parsing attribute name', () => {
      let attributeName: string | null;

      beforeEach(() => {
        attributeName = DocumentPathItem.parseAttributeName(
          documentPathItemString,
        );
      });

      it('should return null', () => {
        expect(attributeName).toBeNull();
      });
    });
  });
});

describe('parsing indexes', () => {
  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when parsing indexes', () => {
      let indexes: Array<number> | null;

      beforeEach(() => {
        indexes = DocumentPathItem.parseIndexes(documentPathItemString);
      });

      it('should return an empty array', () => {
        expect(indexes).toEqual([]);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing indexes', () => {
      let indexes: Array<number> | null;

      beforeEach(() => {
        indexes = DocumentPathItem.parseIndexes(documentPathItemString);
      });

      it('should return [1, 2]', () => {
        expect(indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = ' - attr0 [1][2]';

    describe('when parsing indexes', () => {
      let indexes: Array<number>;

      beforeEach(() => {
        indexes = DocumentPathItem.parseIndexes(documentPathItemString);
      });

      it('should return [1, 2]', () => {
        expect(indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string "attr0 [1] [2a] - "', () => {
    const documentPathItemString = 'attr0 [1 [2a] - ';

    describe('when parsing indexes', () => {
      let indexes: Array<number> | null;

      beforeEach(() => {
        indexes = DocumentPathItem.parseIndexes(documentPathItemString);
      });

      it('should return empty array', () => {
        expect(indexes).toEqual([]);
      });
    });
  });
});

describe('parsing document path item', () => {
  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when parsing document path item', () => {
      let documentPathItem: DocumentPathItem | null;

      beforeEach(() => {
        documentPathItem = DocumentPathItem.parse(documentPathItemString);
      });

      it('should return a document path item with attribute name "attr0"', () => {
        expect(documentPathItem!.attributeName).toEqual('attr0');
      });

      it('should return a document path item with indexes []', () => {
        expect(documentPathItem!.indexes).toEqual([]);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing document path item', () => {
      let documentPathItem: DocumentPathItem | null;

      beforeEach(() => {
        documentPathItem = DocumentPathItem.parse(documentPathItemString);
      });

      it('should return a document path item with attribute name "attr0"', () => {
        expect(documentPathItem!.attributeName).toEqual('attr0');
      });

      it('should return a document path item with indexes [1, 2]', () => {
        expect(documentPathItem!.indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string "attr0 [1] [2a] - "', () => {
    const documentPathItemString = 'attr0 [1] [2a] - ';

    describe('when parsing document path item', () => {
      let documentPathItem: DocumentPathItem | null;

      beforeEach(() => {
        documentPathItem = DocumentPathItem.parse(documentPathItemString);
      });

      it('should return null', () => {
        expect(documentPathItem).toBeNull();
      });
    });
  });
});