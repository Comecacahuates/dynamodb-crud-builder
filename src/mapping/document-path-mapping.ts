import { PathMappingError } from '../errors/index.js';
import { type DocumentPath } from '../types.js';
import { type MappingSchema } from './types.js';

export function mapDocumentPath(
  documentPath: DocumentPath,
  mappingSchema: MappingSchema,
): DocumentPath {
  const { mappedPath } = documentPath.reduce(
    ({ mappingSchema, mappedPath }, pathPart) => {
      const attributeMapping = mappingSchema[pathPart];

      if (!attributeMapping) {
        throw new PathMappingError(documentPath);
      }

      const {
        mapsTo: mappedAttributeName,
        nestedMappingSchema: nestedAttributesMapping,
      } = attributeMapping;

      return {
        mappingSchema: nestedAttributesMapping!,
        mappedPath: [...mappedPath, mappedAttributeName],
      };
    },
    { mappingSchema, mappedPath: [] as DocumentPath },
  );

  return mappedPath;
}
