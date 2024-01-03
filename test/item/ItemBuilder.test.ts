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

  it('should build item with number attribute', () => {
    const item = itemBuilder.addNumberAttribute('attr2', 123).build();

    expect(item).toEqual({
      attr2: { N: '123' },
    });
  });

  it('should build item with boolean attribute', () => {
    const item = itemBuilder.addBooleanAttribute('attr3', true).build();

    expect(item).toEqual({
      attr3: { BOOL: true },
    });
  });

  it('should build item with single binary attribute', () => {
    const item = itemBuilder
      .addBinaryAttribute('attr4', new Uint8Array([1, 2, 3]))
      .build();

    expect(item).toEqual({
      attr4: { B: new Uint8Array([1, 2, 3]) },
    });
  });

  it('should build item with single string set attribute', () => {
    const item = itemBuilder
      .addStringSetAttribute('attr5', new Set(['test', 'test2']))
      .build();

    expect(item).toEqual({
      attr5: { SS: ['test', 'test2'] },
    });
  });

  it('should build item with single number set attribute', () => {
    const item = itemBuilder
      .addNumberSetAttribute('attr6', new Set([1, 2, 3]))
      .build();

    expect(item).toEqual({
      attr6: { NS: ['1', '2', '3'] },
    });
  });

  it('should build item with single binary set attribute', () => {
    const item = itemBuilder
      .addBinarySetAttribute(
        'attr7',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .build();

    expect(item).toEqual({
      attr7: {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
    });
  });

  it('should build item with single list attribute', () => {
    const item = itemBuilder
      .addListAttribute('attr8', ['value1', 'value2'])
      .build();

    expect(item).toEqual({
      attr8: {
        L: [{ S: 'value1' }, { S: 'value2' }],
      },
    });
  });
});
