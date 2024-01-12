import { describe, it, expect } from '@jest/globals';
import {
  type MappingSchema,
  buildReverseMappingSchema,
} from '../../src/mapping/index.js';

describe('Reverse item mapping', () => {
  it('should build reverse item mapping with single attribute', () => {
    const mappingSchema: MappingSchema = {
      attribute: { mapsTo: 'a' },
    };

    const expectedReverseMappingSchema: MappingSchema = {
      a: { mapsTo: 'attribute' },
    };
    const actualReverseMappingSchema = buildReverseMappingSchema(mappingSchema);

    expect(actualReverseMappingSchema).toEqual(expectedReverseMappingSchema);
  });

  it('should build reverse item mapping with nested attribute', () => {
    const mappingSchema: MappingSchema = {
      attribute: {
        mapsTo: 'a',
        nestedMappingSchema: {
          'nested-attribute': {
            mapsTo: 'nested-a',
          },
        },
      },
    };

    const expectedReverseMappingSchema: MappingSchema = {
      a: {
        mapsTo: 'attribute',
        nestedMappingSchema: {
          'nested-a': { mapsTo: 'nested-attribute' },
        },
      },
    };
    const actualReverseSchemaMapping = buildReverseMappingSchema(mappingSchema);

    expect(actualReverseSchemaMapping).toEqual(expectedReverseMappingSchema);
  });

  it('should build reverse item mapping with multiple attributes', () => {
    const mappingSchema: MappingSchema = {
      'attribute-1': { mapsTo: 'a1' },
      'attribute-2': { mapsTo: 'a2' },
      'attribute-3': { mapsTo: 'a3' },
    };

    const expectedReverseMappingSchema: MappingSchema = {
      a1: { mapsTo: 'attribute-1' },
      a2: { mapsTo: 'attribute-2' },
      a3: { mapsTo: 'attribute-3' },
    };
    const actualReverseMappingSchema = buildReverseMappingSchema(mappingSchema);

    expect(actualReverseMappingSchema).toEqual(expectedReverseMappingSchema);
  });

  it('should build reverse item mapping with nested attributes', () => {
    const mappingSchema: MappingSchema = {
      'attribute-1': {
        mapsTo: 'a1',
        nestedMappingSchema: {
          'nested-attribute-1': {
            mapsTo: 'nested-a1',
          },
        },
      },
      'attribute-2': {
        mapsTo: 'a2',
        nestedMappingSchema: {
          'nested-attribute-2': {
            mapsTo: 'nested-a2',
          },
        },
      },
    };

    const expectedReverseMappingSchema: MappingSchema = {
      a1: {
        mapsTo: 'attribute-1',
        nestedMappingSchema: {
          'nested-a1': { mapsTo: 'nested-attribute-1' },
        },
      },
      a2: {
        mapsTo: 'attribute-2',
        nestedMappingSchema: {
          'nested-a2': { mapsTo: 'nested-attribute-2' },
        },
      },
    };
    const actualReverseSchemaMapping = buildReverseMappingSchema(mappingSchema);

    expect(actualReverseSchemaMapping).toEqual(expectedReverseMappingSchema);
  });
});
