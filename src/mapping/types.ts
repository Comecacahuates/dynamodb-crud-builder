export type MappingSchema = {
  [key: string]: {
    mapsTo: string;
    nestedMappingSchema?: MappingSchema;
  };
};

export type ItemMappingOptions = {
  readonly strict?: boolean;
};
