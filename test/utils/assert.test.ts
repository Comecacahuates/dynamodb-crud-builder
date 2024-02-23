import { describe, it, expect } from '@jest/globals';
import { isEmptyArray } from '../../src/utils/assert.js';

describe('assert array is empty', () => {
  describe('given an empty array', () => {
    const emptyArray: Array<any> = [];

    describe('when checking if it is an empty array', () => {
      const isEmpty = isEmptyArray(emptyArray);

      it('should return true', () => {
        expect(isEmpty).toBe(true);
      });
    });
  });

  describe('given a non-empty array', () => {
    const nonEmptyArray: Array<any> = [1, 2, 3];

    describe('when checking if it is an empty array', () => {
      const isEmpty = isEmptyArray(nonEmptyArray);

      it('should return false', () => {
        expect(isEmpty).toBe(false);
      });
    });
  });
});
