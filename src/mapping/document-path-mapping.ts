import { type MappingSchema } from './types.js';
import {
  type DocumentPathItem,
  type DocumentPath,
} from '../document-path/index.js';
import {
  DocumentPathItemMappingError,
  DocumentPathMappingError,
} from '../errors/index.js';

export function getNestedMappingSchema(
  mappingSchema: MappingSchema,
  documentPathItem: DocumentPathItem,
): MappingSchema | undefined {
  const { attributeName } = documentPathItem;

  const nestedMappingSchema = mappingSchema[attributeName]?.nestedMappingSchema;

  if (!nestedMappingSchema) {
    return undefined;
  }

  return nestedMappingSchema;
}

export function mapDocumentPathItem(
  mappingSchema: MappingSchema,
  documentPathItem: DocumentPathItem,
): DocumentPathItem {
  const { attributeName, index } = documentPathItem;

  const mappedAttributeName = mappingSchema[attributeName]?.mapsTo;

  if (!mappedAttributeName) {
    throw new DocumentPathItemMappingError(documentPathItem);
  }

  return {
    attributeName: mappedAttributeName,
    index,
  };
}

export function mapDocumentPath(
  mappingSchema: MappingSchema,
  documentPath: DocumentPath,
): DocumentPath {
  try {
    const mappedDocumentPath = [];
    let currentMappingSchema: MappingSchema | undefined = mappingSchema;

    for (const documentPathItem of documentPath) {
      if (!currentMappingSchema) {
        throw new DocumentPathMappingError(documentPath);
      }

      const mappedDocumentPathItem = mapDocumentPathItem(
        currentMappingSchema,
        documentPathItem,
      );

      const nestedMappingSchema = getNestedMappingSchema(
        currentMappingSchema,
        documentPathItem,
      );

      currentMappingSchema = nestedMappingSchema;

      mappedDocumentPath.push(mappedDocumentPathItem);
    }

    return mappedDocumentPath;
  } catch (error) {
    throw new DocumentPathMappingError(documentPath);
  }
}
