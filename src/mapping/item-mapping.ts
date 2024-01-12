import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type MappingSchema, type ItemMappingOptions } from './types.js';
import { ItemMappingError } from '../errors/index.js';
import { type Item } from '../item/index.js';
import { match, P } from 'ts-pattern';

export function mapItem(
  item: Item,
  mappingSchema: MappingSchema,
  options: ItemMappingOptions = {},
): Record<string, AttributeValue> {
  const { strict } = options;

  return Object.entries(item).reduce(
    (mappedItem, [attributeName, attributeValue]) => {
      const attributeNameMapping = mappingSchema[attributeName];
      if (!attributeNameMapping) {
        if (strict) {
          throw new ItemMappingError(item);
        }

        return { ...mappedItem, [attributeName]: attributeValue };
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
    {} as Item,
  );
}
