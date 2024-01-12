import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type MappingSchema } from './types.js';

export function mapItem(
  item: Record<string, AttributeValue>,
  mappingSchema: MappingSchema,
): Record<string, AttributeValue> {
  return Object.entries(item).reduce(
    (mappedItem, [attributeName, attributeValue]) => {
      const attributeNameMapping = mappingSchema[attributeName];
      if (!attributeNameMapping) {
        return { ...mappedItem, [attributeName]: attributeValue };
      }

      const {
        mapsTo: mappedName,
        nestedMappingSchema: nestedAttributesMapping = {},
      } = attributeNameMapping;

      const mappedAttributeValue = attributeValue.M
        ? { M: mapItem(attributeValue.M, nestedAttributesMapping) }
        : attributeValue;

      return { ...mappedItem, [mappedName]: mappedAttributeValue };
    },
    {} as Record<string, AttributeValue>,
  );
}
