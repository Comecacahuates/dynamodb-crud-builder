import { describe, it, expect, beforeEach } from '@jest/globals';
import { ItemBuilder } from '../../src/item/index.js';

describe('Building item', () => {
  let itemBuilder: ItemBuilder;

  beforeEach(() => {
    itemBuilder = new ItemBuilder();
  });

  it('should build item with null attribute', () => {
    const item = itemBuilder.addNullAttribute('attr0').build();

    expect(item).toEqual({
      attr0: { NULL: true },
    });
  });

  it('should build item with string attribute', () => {
    const item = itemBuilder.addStringAttribute('attr1', 'test').build();

    expect(item).toEqual({
      attr1: { S: 'test' },
    });
  });
});
