import { describe, it, expect } from '@jest/globals';
import {
  getNestedMappingSchema,
  mapDocumentPathItem,
} from '../../src/mapping/document-path-mapping.js';
import { type MappingSchema } from '../../src/mapping/index.js';
import { type DocumentPathItem } from '../../src/document-path/index.js';
import { DocumentPathItemMappingError } from '../../src/errors/index.js';

describe('Getting nested mapping schema', () => {
  const mappingSchema: MappingSchema = {
    attr0: {
      mapsTo: 'a0',
      nestedMappingSchema: {
        attr1: { mapsTo: 'b1' },
      },
    },
  };

  type TestCase = {
    testName: string;
    documentPathItem: DocumentPathItem;
    nestedMappingSchema: MappingSchema | undefined;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should get nested mapping schema with no index',
      documentPathItem: { attributeName: 'attr0' },
      nestedMappingSchema: { attr1: { mapsTo: 'b1' } },
    },
    {
      testName: 'should get nested mapping schema with index',
      documentPathItem: { attributeName: 'attr0', index: 0 },
      nestedMappingSchema: { attr1: { mapsTo: 'b1' } },
    },
    {
      testName:
        'should return undefined if nested mapping schema is not defined',
      documentPathItem: { attributeName: 'attr1' },
      nestedMappingSchema: undefined,
    },
  ];

  it.each(testCases)('$testName', (testCase) => {
    const actualNestedMappingSchema = getNestedMappingSchema(
      mappingSchema,
      testCase.documentPathItem,
    );

    expect(actualNestedMappingSchema).toEqual(testCase.nestedMappingSchema);
  });
});

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
