import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import isObject from '@stdlib/assert-is-object';
import objectEntries from '@stdlib/utils-entries';
import objectFromEntries from '@stdlib/utils-from-entries';
import zip from '@stdlib/utils-zip';
import {
  type AttributeName,
  type NativeObjectAttributeValue,
  type NativeArrayAttributeValue,
  type NativeTupleAttributeValue,
  type DatabaseItem,
  type DatabaseItemAttribute,
  type DatabaseItemAttributes,
} from '../types.js';
import { isArray, isNull, isUndefined } from '../utils/assert.js';

export type AttributeNameMappingSchema = {
  [attributeName: AttributeName]: {
    mapsTo: string;
    nestedMappingSchema?:
      | AttributeNameMappingSchema
      | Array<AttributeNameMappingSchema | null>; // for tuples
  };
};
type TupleAttributeNameMappingSchema = Array<AttributeNameMappingSchema | null>;
type NestedAttributeNameMappingSchema =
  | AttributeNameMappingSchema
  | TupleAttributeNameMappingSchema;

type AttributeNameMapping = AttributeNameMappingSchema[string];
type AttributeNameMappingSchemaEntry = [AttributeName, AttributeNameMapping];
type AttributeNameMappingSchemaEntries = Array<AttributeNameMappingSchemaEntry>;

type AttributeNameMappingResult = {
  readonly mappedName: string;
  readonly nestedMappingSchema?:
    | AttributeNameMappingSchema
    | TupleAttributeNameMappingSchema;
};

export class AttributeNameMapper {
  public constructor(private readonly schema: AttributeNameMappingSchema) {}

  public map(item: DatabaseItem): DatabaseItem {
    const attributes = this.getItemAttributes(item);
    const mappedAttributes = attributes.map((eachAttribute) =>
      this.mapAttribute(eachAttribute, this.schema),
    );
    return this.buildItemFromAttributes(mappedAttributes);
  }

  public getReverseMapper(): AttributeNameMapper {
    const reversedSchema = this.reverseSchema(this.schema);
    return new AttributeNameMapper(reversedSchema);
  }

  private getItemAttributes(item: DatabaseItem): DatabaseItemAttributes {
    return objectEntries(item);
  }

  private buildItemFromAttributes(
    attributes: DatabaseItemAttributes,
  ): DatabaseItem {
    return objectFromEntries(attributes);
  }

  private getObjectAttributes(
    object: NativeObjectAttributeValue,
  ): DatabaseItemAttributes {
    return objectEntries(object);
  }

  private buildObjectFromAttributes(
    attributes: DatabaseItemAttributes,
  ): NativeObjectAttributeValue {
    return objectFromEntries(attributes);
  }

  private mapAttribute(
    attribute: DatabaseItemAttribute,
    schema: AttributeNameMappingSchema,
  ): DatabaseItemAttribute {
    const [name, value] = attribute;
    const { mappedName, nestedMappingSchema: nestedSchema } =
      this.mapAttributeName(name, schema);

    const mappedValue = isUndefined(nestedSchema)
      ? value
      : this.mapAttributeValue(value, nestedSchema);

    return [mappedName, mappedValue];
  }

  private mapAttributeName(
    name: string,
    schema: AttributeNameMappingSchema,
  ): AttributeNameMappingResult {
    const mappedName = schema[name]?.mapsTo ?? name;
    const nestedMappingSchema = schema[name]?.nestedMappingSchema;

    return { mappedName, nestedMappingSchema };
  }

  private mapAttributeValue(
    value: NativeAttributeValue,
    schema: AttributeNameMappingSchema | TupleAttributeNameMappingSchema,
  ): NativeAttributeValue {
    if (isArray(value)) {
      return this.mapArray(value, schema);
    }

    if (isObject(value) && !isArray(schema)) {
      return this.mapObject(value, schema);
    }

    return value;
  }

  private mapArray(
    array: NativeArrayAttributeValue,
    schema: AttributeNameMappingSchema | TupleAttributeNameMappingSchema,
  ): NativeArrayAttributeValue {
    if (isArray(schema)) {
      return this.mapTuple(array, schema);
    }

    return array.map((eachItem) => this.mapAttributeValue(eachItem, schema));
  }

  private mapTuple(
    tuple: NativeTupleAttributeValue,
    schema: TupleAttributeNameMappingSchema,
  ): NativeTupleAttributeValue {
    return this.zipTupleWithMappingSchema(tuple, schema).map(
      ([eachItem, eachSchema]) =>
        isNull(eachSchema) || isUndefined(eachSchema)
          ? eachItem
          : this.mapAttributeValue(eachItem, eachSchema),
    );
  }

  private mapObject(
    object: NativeObjectAttributeValue,
    schema: AttributeNameMappingSchema,
  ): NativeObjectAttributeValue {
    const attributes = this.getObjectAttributes(object);
    const mappedAttributes = attributes.map((eachAttribute) =>
      this.mapAttribute(eachAttribute, schema),
    );
    return this.buildObjectFromAttributes(mappedAttributes);
  }

  private zipTupleWithMappingSchema(
    tuple: NativeTupleAttributeValue,
    schema: TupleAttributeNameMappingSchema,
  ): Array<[NativeAttributeValue, AttributeNameMappingSchema | null]> {
    const zipOptions =
      tuple.length < schema.length
        ? { trunc: true }
        : { trunc: false, fill: null };

    return zip(tuple, schema, zipOptions) as Array<
      [NativeAttributeValue, AttributeNameMappingSchema | null]
    >;
  }

  private reverseSchema(
    schema: AttributeNameMappingSchema,
  ): AttributeNameMappingSchema {
    const entries = this.getSchemaEntries(schema);
    const reversedEntries = entries.map((eachEntry) =>
      this.reverseSchemaEntry(eachEntry),
    );
    return this.buildSchemaFromEntries(reversedEntries);
  }

  private getSchemaEntries(
    mappingSchema: AttributeNameMappingSchema,
  ): AttributeNameMappingSchemaEntries {
    return objectEntries(mappingSchema);
  }

  private buildSchemaFromEntries(
    entries: AttributeNameMappingSchemaEntries,
  ): AttributeNameMappingSchema {
    return objectFromEntries(entries);
  }

  private reverseSchemaEntry(
    entry: AttributeNameMappingSchemaEntry,
  ): AttributeNameMappingSchemaEntry {
    const [
      originalName,
      { mapsTo: mappedName, nestedMappingSchema: nestedSchema },
    ] = entry;

    const reversedNestedSchema = isUndefined(nestedSchema)
      ? undefined
      : this.reverseNestedSchema(nestedSchema);

    return [
      mappedName,
      {
        mapsTo: originalName,
        nestedMappingSchema: reversedNestedSchema,
      },
    ];
  }

  private reverseNestedSchema(
    schema: NestedAttributeNameMappingSchema,
  ): NestedAttributeNameMappingSchema {
    if (isArray(schema)) {
      return this.reverseTupleSchema(schema);
    }

    return this.reverseSchema(schema);
  }

  private reverseTupleSchema(
    schema: TupleAttributeNameMappingSchema,
  ): TupleAttributeNameMappingSchema {
    return schema.map((eachSchema) =>
      isNull(eachSchema) ? null : this.reverseSchema(eachSchema),
    );
  }
}
