import { describe, it, expect } from '@jest/globals';
import {
  getIndex,
  getAttributeName,
  buildAttributePathFromString,
} from '../../src/document-path/building.js';

describe('Getting index from attribute path part', () => {
  it('should return null if no index', () => {
    const index = getIndex('attr0');

    expect(index).toBeNull();
  });

  it('should return index if index', () => {
    const index = getIndex('attr0[0]');

    expect(index).toEqual(0);
  });
});

describe('Getting attribute name from attribute path part', () => {
  it('should return attribute name if no index', () => {
    const name = getAttributeName('attr0');

    expect(name).toEqual('attr0');
  });

  it('should return attribute name if index', () => {
    const name = getAttributeName('attr0[0]');

    expect(name).toEqual('attr0');
  });
});

describe('Building path from string', () => {
  it('should build simple path', () => {
    const path = buildAttributePathFromString('attr0');

    expect(path).toEqual(['attr0']);
  });

  it('should build simple path with index', () => {
    const path = buildAttributePathFromString('attr0[0]');

    expect(path).toEqual(['attr0', 0]);
  });

  it('should build complex path', () => {
    const path = buildAttributePathFromString('attr0.attr1.attr2');

    expect(path).toEqual(['attr0', 'attr1', 'attr2']);
  });

  it('should build complex path with index', () => {
    const path = buildAttributePathFromString('attr0[0].attr1[1].attr2[2]');

    expect(path).toEqual(['attr0', 0, 'attr1', 1, 'attr2', 2]);
  });
});
