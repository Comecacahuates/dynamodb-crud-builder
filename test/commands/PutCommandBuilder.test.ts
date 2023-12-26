import { describe, it, expect, beforeEach } from '@jest/globals';
import { PutCommandBuilder } from '../../src/commands/PutCommandBuilder.js';

describe('Build put command', () => {
  let putCommandBuilder: PutCommandBuilder;

  beforeEach(() => {
    putCommandBuilder = new PutCommandBuilder();
  });

  it('should build put command with single null attribute', () => {
    const putCommand = putCommandBuilder.putNull('attribute-name').build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { NULL: true },
    });
  });

  it('should build put command with single string attribute', () => {
    const putCommand = putCommandBuilder
      .putString('attribute-name', 'attribute-value')
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { S: 'attribute-value' },
    });
  });

  it('should build put command with single number attribute', () => {
    const putCommand = putCommandBuilder
      .putNumber('attribute-name', 123)
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { N: '123' },
    });
  });

  it('should build put command with single boolean attribute', () => {
    const putCommand = putCommandBuilder
      .putBoolean('attribute-name', true)
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { BOOL: true },
    });
  });

  it('should build put command with single binary', () => {
    const putCommand = putCommandBuilder
      .putBinary('attribute-name', new Uint8Array([1, 2, 3]))
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { B: new Uint8Array([1, 2, 3]) },
    });
  });

  it('should build put command with single string set attribute', () => {
    const putCommand = putCommandBuilder
      .putStringSet('attribute-name', new Set(['value1', 'value2']))
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { SS: ['value1', 'value2'] },
    });
  });

  it('should build put command with single number set attribute', () => {
    const putCommand = putCommandBuilder
      .putNumberSet('attribute-name', new Set([123, 456]))
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { NS: ['123', '456'] },
    });
  });

  it('should build put command with single binary set attribute', () => {
    const putCommand = putCommandBuilder
      .putBinarySet(
        'attribute-name',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
    });
  });

  it('should build put command with single list attribute', () => {
    const putCommand = putCommandBuilder
      .putList('attribute-name', ['value1', 'value2'])
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': { L: [{ S: 'value1' }, { S: 'value2' }] },
    });
  });

  it('should build put command with single object attribute', () => {
    const putCommand = putCommandBuilder
      .putObject('attribute-name', { key1: 'value1', key2: 'value2' })
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });

  it('should build put command with multiple attributes', () => {
    const putCommand = putCommandBuilder
      .putNull('attribute-name1')
      .putString('attribute-name2', 'attribute-value2')
      .putNumber('attribute-name3', 123)
      .putBoolean('attribute-name4', true)
      .putBinary('attribute-name5', new Uint8Array([1, 2, 3]))
      .putStringSet('attribute-name6', new Set(['value1', 'value2']))
      .putNumberSet('attribute-name7', new Set([123, 456]))
      .putBinarySet(
        'attribute-name8',
        new Set([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]),
      )
      .putList('attribute-name9', ['value1', 'value2'])
      .putObject('attribute-name10', { key1: 'value1', key2: 'value2' })
      .build();

    expect(putCommand).toHaveProperty('input.Item', {
      'attribute-name1': { NULL: true },
      'attribute-name2': { S: 'attribute-value2' },
      'attribute-name3': { N: '123' },
      'attribute-name4': { BOOL: true },
      'attribute-name5': { B: new Uint8Array([1, 2, 3]) },
      'attribute-name6': { SS: ['value1', 'value2'] },
      'attribute-name7': { NS: ['123', '456'] },
      'attribute-name8': {
        BS: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
      },
      'attribute-name9': { L: [{ S: 'value1' }, { S: 'value2' }] },
      'attribute-name10': {
        M: { key1: { S: 'value1' }, key2: { S: 'value2' } },
      },
    });
  });
});