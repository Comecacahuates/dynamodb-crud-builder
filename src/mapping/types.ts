export type MappingSchema = {
  [key: string]: {
    mapsTo: string;
    nestedMappingSchema?: MappingSchema;
  };
};
