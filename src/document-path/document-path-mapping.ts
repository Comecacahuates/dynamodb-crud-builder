import { PathMappingError } from '../errors/index.js';
import type { DocumentPath, ItemMapping } from '../types.js';

export function mapAttributePath(
  attributePath: DocumentPath,
  itemMapping: ItemMapping,
): DocumentPath {
  const { mappedPath } = attributePath.reduce(
    ({ itemMapping, mappedPath }, pathPart) => {
      const attributeMapping = itemMapping[pathPart];

      if (!attributeMapping) {
        throw new PathMappingError(attributePath);
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
