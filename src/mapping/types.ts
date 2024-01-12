export type MappingSchema = {
  [key: string]: {
    mappedName: string;
    nestedAttributesMapping?: MappingSchema;
  };
};
