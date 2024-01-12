import { describe, it, expect } from '@jest/globals';
import { mapDocumentPathItem } from '../../src/mapping/document-path-mapping.js';
import { type MappingSchema } from '../../src/mapping/index.js';
import { type DocumentPathItem } from '../../src/document-path/index.js';
import { DocumentPathItemMappingError } from '../../src/errors/index.js';

describe('Mapping document path item', () => {
  const mappingSchema: MappingSchema = {
    attr0: { mapsTo: 'a0' },
    attr1: { mapsTo: 'a1' },
    attr2: { mapsTo: 'a2' },
  };

  type TestCase = {
    testName: string;
    documentPathItem: DocumentPathItem;
    mappedDocumentPathItem: DocumentPathItem;
  };

  const testCases: TestCase[] = [
    {
      testName: 'should map document path item with no index',
      documentPathItem: { attributeName: 'attr0' },
      mappedDocumentPathItem: { attributeName: 'a0' },
    },
    {
      testName: 'should map document path item with index',
      documentPathItem: { attributeName: 'attr1', index: 0 },
      mappedDocumentPathItem: { attributeName: 'a1', index: 0 },
    },
  ];

  it.each(testCases)('$testName', (testCase) => {
    const actualMappedDocumentPathItem = mapDocumentPathItem(
      mappingSchema,
      testCase.documentPathItem,
    );

    expect(actualMappedDocumentPathItem).toEqual(
      testCase.mappedDocumentPathItem,
    );
  });

  it('should throw error if attribute name is not defined in mapping schema', () => {
    const documentPathItem: DocumentPathItem = { attributeName: 'attr3' };

    expect(() => {
      mapDocumentPathItem(mappingSchema, documentPathItem);
    }).toThrow(DocumentPathItemMappingError);
  });
});
