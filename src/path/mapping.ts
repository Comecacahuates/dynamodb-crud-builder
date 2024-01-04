import { PathMappingError } from '../errors/index.js';
import type { AttributePath, ItemMapping } from '../types.js';

export function mapAttributePath(
  attributePath: AttributePath,
  itemMapping: ItemMapping,
): AttributePath {
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
    { itemMapping, mappedPath: [] as AttributePath },
  );

  return mappedPath;
}
