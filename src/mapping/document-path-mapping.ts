import { PathMappingError } from '../errors/index.js';
import { type DocumentPath } from '../types.js';
import { type MappingSchema } from './types.js';

export function mapDocumentPath(
  documentPath: DocumentPath,
  itemMapping: MappingSchema,
): DocumentPath {
  const { mappedPath } = documentPath.reduce(
    ({ itemMapping, mappedPath }, pathPart) => {
      const attributeMapping = itemMapping[pathPart];

      if (!attributeMapping) {
        throw new PathMappingError(documentPath);
      }

      const { mappedName: mappedAttributeName, nestedAttributesMapping } =
        attributeMapping;

      return {
        itemMapping: nestedAttributesMapping!,
        mappedPath: [...mappedPath, mappedAttributeName],
      };
    },
    { itemMapping, mappedPath: [] as DocumentPath },
  );

  return mappedPath;
}
