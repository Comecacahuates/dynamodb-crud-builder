import { type MappingSchema } from './types.js';
import {
  type DocumentPathItem,
  type DocumentPath,
} from '../document-path/index.js';
import { DocumentPathMappingError } from '../errors/index.js';

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
): DocumentPathItem | undefined {
  const { attributeName, index } = documentPathItem;

  const mappedAttributeName = mappingSchema[attributeName]?.mapsTo;

  if (!mappedAttributeName) {
    return undefined;
  }

  return { attributeName: mappedAttributeName, index };
}

export function mapDocumentPath(
  mappingSchema: MappingSchema,
  documentPath: DocumentPath,
): DocumentPath {
  const mappedDocumentPath = [];
  let mappingSchemaForNextDocumentPathItem: MappingSchema | undefined =
    mappingSchema;

  for (const documentPathItem of documentPath) {
    if (!mappingSchemaForNextDocumentPathItem) {
      throw new DocumentPathMappingError(documentPath);
    }

    const mappedDocumentPathItem = mapDocumentPathItem(
      mappingSchemaForNextDocumentPathItem,
      documentPathItem,
    );

    if (!mappedDocumentPathItem) {
      throw new DocumentPathMappingError(documentPath);
    }

    mappedDocumentPath.push(mappedDocumentPathItem);

    mappingSchemaForNextDocumentPathItem = getNestedMappingSchema(
      mappingSchemaForNextDocumentPathItem,
      documentPathItem,
    );
  }

  return mappedDocumentPath;
}
