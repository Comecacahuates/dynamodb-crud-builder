import { describe, it, expect } from '@jest/globals';
import {
  mapDocumentPath,
  type MappingSchema,
} from '../../src/mapping/index.js';
import { PathMappingError } from '../../src/errors/index.js';

describe('Attribute path mapping', () => {
  const mappingSchema: MappingSchema = {
    attribute1: {
      mapsTo: 'a1',
    },
    attribute2: {
      mapsTo: 'a2',
      nestedMappingSchema: {
        'nested-attribute2': {
          mapsTo: 'nested-a2',
        },
      },
    },
    attribute3: {
      mapsTo: 'a3',
      nestedMappingSchema: {
        'nested-attribute3': {
          mapsTo: 'nested-a3',
          nestedMappingSchema: {
            'nested-nested-attribute3': {
              mapsTo: 'nested-nested-a3',
            },
          },
        },
      },
    },
  };

  it.each([
    {
      testName: 'should map simple path',
      documentPathToMap: ['attribute1'],
      mappedDocumentPath: ['a1'],
    },
    {
      testName: 'should map document path with one level nesting',
      documentPathToMap: ['attribute2', 'nested-attribute2'],
      mappedDocumentPath: ['a2', 'nested-a2'],
    },
    {
      testName: 'should map document path with two level nesting',
      documentPathToMap: [
        'attribute3',
        'nested-attribute3',
        'nested-nested-attribute3',
      ],
      mappedDocumentPath: ['a3', 'nested-a3', 'nested-nested-a3'],
    },
  ])('$testName', ({ documentPathToMap, mappedDocumentPath }) => {
    const actualMappedDocumentPath = mapDocumentPath(
      documentPathToMap,
      mappingSchema,
    );

    expect(actualMappedDocumentPath).toEqual(mappedDocumentPath);
  });

  it('should throw error if attribute path is not defined', () => {
    const pathToMap = ['attribute4'];

    expect(() => mapDocumentPath(pathToMap, mappingSchema)).toThrow(
      PathMappingError,
    );
  });
});
