import { describe, it, expect } from '@jest/globals';
import { DocumentPathItem } from '../../../../src/expressions/operands/DocumentPathItem.js';

describe('checking if document path item string is parsable', () => {
  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when checking if it is parsable', () => {
      const isValid = DocumentPathItem.isParsable(documentPathItemString);

      it('should return true', () => {
        expect(isValid).toBe(true);
      });
    });
  });

  describe('given the string "_et"', () => {
    const documentPathItemString = '_et';

    describe('when checking if it is parsable', () => {
      const isValid = DocumentPathItem.isParsable(documentPathItemString);

      it('should return false', () => {
        expect(isValid).toBe(true);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when checking if it is parsable', () => {
      const isValid = DocumentPathItem.isParsable(documentPathItemString);

      it('should return true', () => {
        expect(isValid).toBe(true);
      });
    });
  });

  describe('given the string "attr0[1][2a]"', () => {
    const documentPathItemString = 'attr0[1][2a]';

    describe('when checking if it is parsable', () => {
      const isValid = DocumentPathItem.isParsable(documentPathItemString);

      it('should return false', () => {
        expect(isValid).toBe(false);
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = ' - attr0 [1][2]';

    describe('when checking if it is parsable', () => {
      const isValid = DocumentPathItem.isParsable(documentPathItemString);

      it('should return false', () => {
        expect(isValid).toBe(false);
      });
    });
  });
});

describe('parsing attribute name', () => {
  describe('given the string "a"', () => {
    const documentPathItemString = 'a';

    describe('when parsing attribute name', () => {
      const attributeName = DocumentPathItem.parseAttributeName(
        documentPathItemString,
      );

      it('should return "a"', () => {
        expect(attributeName).toBe('a');
      });
    });
  });

  describe('given the string "_et"', () => {
    const documentPathItemString = '_et';

    describe('when parsing attribute name', () => {
      const attributeName = DocumentPathItem.parseAttributeName(
        documentPathItemString,
      );

      it('should return "_et"', () => {
        expect(attributeName).toBe('_et');
      });
    });
  });

  describe('given the string "attr0"', () => {
    const documentPathItemString = 'attr0';

    describe('when parsing attribute name', () => {
      const attributeName = DocumentPathItem.parseAttributeName(
        documentPathItemString,
      );

      it('should return "attr0"', () => {
        expect(attributeName).toBe('attr0');
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing attribute name', () => {
      const attributeName = DocumentPathItem.parseAttributeName(
        documentPathItemString,
      );

      it('should return "attr0"', () => {
        expect(attributeName).toBe('attr0');
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = '0attr0';

    describe('when parsing attribute name', () => {
      const attributeName = DocumentPathItem.parseAttributeName(
        documentPathItemString,
      );

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
      const indexes = DocumentPathItem.parseIndexes(documentPathItemString);

      it('should return an empty array', () => {
        expect(indexes).toEqual([]);
      });
    });
  });

  describe('given the string "attr0[1][2]"', () => {
    const documentPathItemString = 'attr0[1][2]';

    describe('when parsing indexes', () => {
      const indexes = DocumentPathItem.parseIndexes(documentPathItemString);

      it('should return [1, 2]', () => {
        expect(indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string " - attr0 [1][2]"', () => {
    const documentPathItemString = ' - attr0 [1][2]';

    describe('when parsing indexes', () => {
      const indexes = DocumentPathItem.parseIndexes(documentPathItemString);

      it('should return [1, 2]', () => {
        expect(indexes).toEqual([1, 2]);
      });
    });
  });

  describe('given the string "attr0 [1] [2a] - "', () => {
    const documentPathItemString = 'attr0 [1 [2a] - ';

    describe('when parsing indexes', () => {
      const indexes = DocumentPathItem.parseIndexes(documentPathItemString);

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
      const documentPathItem = DocumentPathItem.parse(documentPathItemString);

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
      const documentPathItem = DocumentPathItem.parse(documentPathItemString);

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
      const documentPathItem = DocumentPathItem.parse(documentPathItemString);

      it('should return null', () => {
        expect(documentPathItem).toBeNull();
      });
    });
  });
});
