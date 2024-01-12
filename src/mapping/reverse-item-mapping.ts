import type { MappingSchema } from '../types.js';

export function buildReverseItemMapping(
  itemMapping: MappingSchema,
): MappingSchema {
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
    {} as MappingSchema,
  );
}
