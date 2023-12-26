import { AttributeValue } from '@aws-sdk/client-dynamodb';

export type ItemMapping = {
  [key: string]: {
    mappedName: string;
    nestedMapping?: ItemMapping;
  };
};

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

      const { mappedName, nestedMapping = {} } = attributeNameMapping;

      const attributeTypeIsMap = attributeValue.M;
      if (attributeTypeIsMap) {
        const mappedAttributeValue = mapItem(attributeValue.M, nestedMapping);
        return { ...mappedItem, [mappedName]: { M: mappedAttributeValue } };
      }

      return { ...mappedItem, [mappedName]: attributeValue };
    },
    {} as Record<string, AttributeValue>,
  );
}
