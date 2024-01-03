import { describe, it, expect, beforeEach } from '@jest/globals';
import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { ItemBuilder } from '../../src/item/index.js';
import { Item } from '../../src/types.js';

describe('Building item', () => {
  let itemBuilder: ItemBuilder;

  beforeEach(() => {
    itemBuilder = new ItemBuilder();
  });

  it('should build item with null attribute', () => {
    const item = itemBuilder.addNullAttribute('attr0').build();

    expect(item).toHaveProperty('attr0', { NULL: true });
  });
});
