import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import type { ItemMapping } from '../types.js';

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
