import { describe, it, expect } from '@jest/globals';
import * as Path from '../../src/path/index.js';

describe('Building path from string', () => {
  it('should build simple path', () => {
    const path = Path.buildFromString('attr0');

    expect(path).toEqual(['attr0']);
  });
});
