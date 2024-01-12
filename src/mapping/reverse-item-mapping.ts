import { type MappingSchema } from '../mapping/index.js';

export function buildReverseMappingSchema(
  mappingSchema: MappingSchema,
): MappingSchema {
  return Object.entries(mappingSchema).reduce(
    (reverseMappingSchema, [attributeName, attributeMapping]) => {
      const {
        mapsTo: mappedName,
        nestedMappingSchema: nestedAttributesMapping,
      } = attributeMapping;

      const reverseNestedAttributesMapping =
        nestedAttributesMapping &&
        buildReverseMappingSchema(nestedAttributesMapping);

      return {
        ...reverseMappingSchema,
        [mappedName]: {
          mapsTo: attributeName,
          nestedMappingSchema: reverseNestedAttributesMapping,
        },
      };
    },
    {} as MappingSchema,
  );
}
