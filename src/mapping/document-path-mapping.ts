import { type MappingSchema } from './types.js';
import { type DocumentPathItem } from '../document-path/index.js';
import { DocumentPathItemMappingError } from '../errors/index.js';

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
