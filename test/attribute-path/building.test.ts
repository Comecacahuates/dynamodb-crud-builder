import { describe, it, expect } from '@jest/globals';
import { buildFromString } from '../../src/attribute-path/building.js';

describe('Building path from string', () => {
  it('should build simple path', () => {
    const path = buildFromString('attr0');

    expect(path).toEqual(['attr0']);
  });
});
