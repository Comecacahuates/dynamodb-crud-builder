import type { ItemMapping } from '../types.js';

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
