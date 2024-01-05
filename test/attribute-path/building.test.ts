import { describe, it, expect } from '@jest/globals';
import {
  getIndexFromAttributePathPart,
  buildFromString,
} from '../../src/attribute-path/building.js';

describe.only('Getting index from attribute path part', () => {
  it('should return null if no index', () => {
    const index = getIndexFromAttributePathPart('attr0');

    expect(index).toBeNull();
  });

  it('should return index if index', () => {
    const index = getIndexFromAttributePathPart('attr0[0]');

    expect(index).toEqual(0);
  });
});

describe('Building path from string', () => {
  it('should build simple path', () => {
    const path = buildFromString('attr0');

    expect(path).toEqual(['attr0']);
  });

  it('should build simple path with index', () => {
    const path = buildFromString('attr0[0]');

    expect(path).toEqual(['attr0', 0]);
  });
});
