import { describe, it, expect } from '@jest/globals';
import { ExpressionAttributeNames } from '../../src/expressions/index.js';

describe('Building placeholder', () => {
  it('should build placeholder', () => {
    const placeholder = ExpressionAttributeNames.buildPlaceholder('id');

    expect(placeholder).toBe('#id');
  });
});
