import { describe, it, expect } from '@jest/globals';
import { isEmptyArray, isNull, isString } from '../../src/utils/assert.js';

describe('assert array is empty', () => {
  describe('given an empty array', () => {
    const emptyArray: Array<any> = [];

    describe('when checking if it is an empty array', () => {
      it('should return true', () => {
        expect(isEmptyArray(emptyArray)).toBe(true);
      });
    });
  });

  describe('given a non-empty array', () => {
    const nonEmptyArray: Array<any> = [1, 2, 3];

    describe('when checking if it is an empty array', () => {
      it('should return false', () => {
        expect(isEmptyArray(nonEmptyArray)).toBe(false);
      });
    });
  });
});

describe('assert null', () => {
  describe('given a null value', () => {
    const nullValue = null;

    describe('when checking if it is null', () => {
      it('should return true', () => {
        expect(isNull(nullValue)).toBe(true);
      });
    });
  });

  describe('given a non-null value', () => {
    const nonNullValue = 'non-null';

    describe('when checking if it is null', () => {
      it('should return false', () => {
        expect(isNull(nonNullValue)).toBe(false);
      });
    });
  });
});

describe('assert string', () => {
  describe('given a string value', () => {
    const stringValue = 'string';

    describe('when checking if it is a string', () => {
      it('should return true', () => {
        expect(isString(stringValue)).toBe(true);
      });
    });
  });

  describe('given a non-string value', () => {
    const nonStringValue = 1;

    describe('when checking if it is a string', () => {
      it('should return false', () => {
        expect(isString(nonStringValue)).toBe(false);
      });
    });
  });
});
