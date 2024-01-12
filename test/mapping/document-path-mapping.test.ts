import { describe, it, expect } from '@jest/globals';
import {
  mapDocumentPath,
  type MappingSchema,
} from '../../src/mapping/index.js';
import { PathMappingError } from '../../src/errors/index.js';

describe('Attribute path mapping', () => {
  const itemMapping: MappingSchema = {
    attribute1: {
      mappedName: 'a1',
    },
    attribute2: {
      mappedName: 'a2',
      nestedAttributesMapping: {
        'nested-attribute2': {
          mappedName: 'nested-a2',
        },
      },
    },
    attribute3: {
      mappedName: 'a3',
      nestedAttributesMapping: {
        'nested-attribute3': {
          mappedName: 'nested-a3',
          nestedAttributesMapping: {
            'nested-nested-attribute3': {
              mappedName: 'nested-nested-a3',
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
      itemMapping,
    );

    expect(actualMappedDocumentPath).toEqual(mappedDocumentPath);
  });

  it('should throw error if attribute path is not defined', () => {
    const pathToMap = ['attribute4'];

    expect(() => mapDocumentPath(pathToMap, itemMapping)).toThrow(
      PathMappingError,
    );
  });
});
