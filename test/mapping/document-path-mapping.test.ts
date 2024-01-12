import { describe, it, expect } from '@jest/globals';
import {
  getNestedMappingSchema,
  mapDocumentPathItem,
  mapDocumentPath,
} from '../../src/mapping/document-path-mapping.js';
import { type MappingSchema } from '../../src/mapping/index.js';
import {
  type DocumentPathItem,
  type DocumentPath,
} from '../../src/document-path/index.js';
import { DocumentPathMappingError } from '../../src/errors/index.js';

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
    mappedDocumentPathItem: DocumentPathItem | undefined;
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
    {
      testName:
        'should return undefined if attribute name is not defined in mapping schema',
      documentPathItem: { attributeName: 'attr3' },
      mappedDocumentPathItem: undefined,
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
});

describe('Mapping document path', () => {
  const mappingSchema: MappingSchema = {
    attr0: {
      mapsTo: 'a0',
      nestedMappingSchema: {
        attr1: {
          mapsTo: 'b1',
          nestedMappingSchema: {
            attr2: {
              mapsTo: 'c2',
              nestedMappingSchema: {
                attr3: { mapsTo: 'd3' },
              },
            },
          },
        },
      },
    },
  };

  type TestCase = {
    testName: string;
    documentPath: DocumentPath;
    mappedDocumentPath: DocumentPath;
  };

  const testCases: Array<TestCase> = [
    {
      testName: 'should map partial document path with one item with no index',
      documentPath: [{ attributeName: 'attr0' }],
      mappedDocumentPath: [{ attributeName: 'a0' }],
    },
    {
      testName: 'should map partial document path with one item with index',
      documentPath: [{ attributeName: 'attr0', index: 0 }],
      mappedDocumentPath: [{ attributeName: 'a0', index: 0 }],
    },
    {
      testName: 'should map full document path with no index',
      documentPath: [
        { attributeName: 'attr0' },
        { attributeName: 'attr1' },
        { attributeName: 'attr2' },
        { attributeName: 'attr3' },
      ],
      mappedDocumentPath: [
        { attributeName: 'a0' },
        { attributeName: 'b1' },
        { attributeName: 'c2' },
        { attributeName: 'd3' },
      ],
    },
    {
      testName: 'should map full document path with index',
      documentPath: [
        { attributeName: 'attr0', index: 0 },
        { attributeName: 'attr1', index: 1 },
        { attributeName: 'attr2', index: 2 },
        { attributeName: 'attr3', index: 3 },
      ],
      mappedDocumentPath: [
        { attributeName: 'a0', index: 0 },
        { attributeName: 'b1', index: 1 },
        { attributeName: 'c2', index: 2 },
        { attributeName: 'd3', index: 3 },
      ],
    },
    {
      testName: 'should map full document path with mixed indices',
      documentPath: [
        { attributeName: 'attr0', index: 0 },
        { attributeName: 'attr1' },
        { attributeName: 'attr2', index: 2 },
        { attributeName: 'attr3' },
      ],
      mappedDocumentPath: [
        { attributeName: 'a0', index: 0 },
        { attributeName: 'b1' },
        { attributeName: 'c2', index: 2 },
        { attributeName: 'd3' },
      ],
    },
  ];

  it.each(testCases)('$testName', ({ documentPath, mappedDocumentPath }) => {
    const actualMappedDocumentPath = mapDocumentPath(
      mappingSchema,
      documentPath,
    );

    expect(actualMappedDocumentPath).toEqual(mappedDocumentPath);
  });

  it('should throw error if attribute name is not defined in mapping schema', () => {
    const documentPath: DocumentPath = [{ attributeName: 'attr4' }];

    expect(() => {
      mapDocumentPath(mappingSchema, documentPath);
    }).toThrow(DocumentPathMappingError);
  });
});
