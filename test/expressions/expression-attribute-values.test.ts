import { describe, it, expect } from '@jest/globals';
import { ExpressionAttributeValues } from '../../src/expressions/index.js';

describe('Building placeholder', () => {
  it('should build placeholder', () => {
    const placeholder = ExpressionAttributeValues.buildPlaceholder('id');

    expect(placeholder).toBe(':id');
  });
});
