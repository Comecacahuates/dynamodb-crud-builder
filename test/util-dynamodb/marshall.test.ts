import { describe, it, expect } from '@jest/globals';
import { marshall } from '@aws-sdk/util-dynamodb';

describe('marshall', () => {
  describe('given an object with a null value', () => {
    const object = {
      nullValue: null,
    };

    describe('when marshalling', () => {
      it('should return { NULL: true }', () => {
        expect(marshall(object)).toEqual({
          nullValue: { NULL: true },
        });
      });
    });
  });

  describe('given an object with an undefined value', () => {
    const object = {
      undefinedValue: undefined,
    };

    describe('when marshalling with `removeUndefinedValues = true`', () => {
      it('should empty object', () => {
        expect(marshall(object, { removeUndefinedValues: true })).toEqual({});
      });
    });
  });
});
