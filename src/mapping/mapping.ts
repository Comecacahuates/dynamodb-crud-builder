import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { PathMappingError } from '../errors/index.js';
import type { AttributePath, ItemMapping } from '../types.js';

export function mapItem(
  item: Record<string, AttributeValue>,
  itemMapping: ItemMapping,
): Record<string, AttributeValue> {
  return Object.entries(item).reduce(
    (mappedItem, [attributeName, attributeValue]) => {
      const attributeNameMapping = itemMapping[attributeName];
      if (!attributeNameMapping) {
        return { ...mappedItem, [attributeName]: attributeValue };
      }

      const { mappedName, nestedAttributesMapping = {} } = attributeNameMapping;

      const mappedAttributeValue = attributeValue.M
        ? { M: mapItem(attributeValue.M, nestedAttributesMapping) }
        : attributeValue;

      return { ...mappedItem, [mappedName]: mappedAttributeValue };
    },
    {} as Record<string, AttributeValue>,
  );
}

export function buildReverseItemMapping(itemMapping: ItemMapping): ItemMapping {
  return Object.entries(itemMapping).reduce(
    (reverseItemMapping, [attributeName, attributeMapping]) => {
      const { mappedName, nestedAttributesMapping } = attributeMapping;

      const reverseNestedAttributesMapping =
        nestedAttributesMapping &&
        buildReverseItemMapping(nestedAttributesMapping);

      return {
        ...reverseItemMapping,
        [mappedName]: {
          mappedName: attributeName,
          nestedAttributesMapping: reverseNestedAttributesMapping,
        },
      };
    },
    {} as ItemMapping,
  );
}

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
