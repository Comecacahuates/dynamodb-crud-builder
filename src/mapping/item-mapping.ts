import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type MappingSchema } from './types.js';
import { ItemMappingError } from '../errors/index.js';
import { match, P } from 'ts-pattern';

export function mapItem(
  item: Record<string, AttributeValue>,
  mappingSchema: MappingSchema,
): Record<string, AttributeValue> {
  return Object.entries(item).reduce(
    (mappedItem, [attributeName, attributeValue]) => {
      const attributeNameMapping = mappingSchema[attributeName];
      if (!attributeNameMapping) {
        throw new ItemMappingError(item);
      }

      const { mapsTo: mappedAttributeName, nestedMappingSchema = {} } =
        attributeNameMapping;

      const mappedAttributeValue = match(attributeValue)
        .with({ M: P.any }, () => {
          return { M: mapItem(attributeValue.M!, nestedMappingSchema) };
        })

        .with({ L: P.any }, () => {
          return {
            L: attributeValue.L!.map((listItem) => {
              return listItem.M
                ? { M: mapItem(listItem.M, nestedMappingSchema) }
                : listItem;
            }),
          };
        })

        .otherwise(() => attributeValue);

      return { ...mappedItem, [mappedAttributeName]: mappedAttributeValue };
    },
    {} as Record<string, AttributeValue>,
  );
}
