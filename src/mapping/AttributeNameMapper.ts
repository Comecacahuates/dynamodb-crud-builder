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

export type MappingSchema = {
  [attributeName: AttributeName]: {
    mappedName: string;
    mappingSchema?: MappingSchema | Array<MappingSchema | null>;
  };
};
type TupleMappingSchema = Array<MappingSchema | null>;
type NestedMappingSchema = MappingSchema | TupleMappingSchema;

type MappingResult = MappingSchema[AttributeName];
type MappingSchemaEntry = [AttributeName, MappingSchema[AttributeName]];
type MappingSchemaEntries = Array<MappingSchemaEntry>;

export class AttributeNameMapper {
  public constructor(private readonly schema: MappingSchema) {}

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
    schema: MappingSchema,
  ): DatabaseItemAttribute {
    const [name, value] = attribute;
    const { mappedName, mappingSchema } = this.mapAttributeName(name, schema);

    const mappedValue = isUndefined(mappingSchema)
      ? value
      : this.mapAttributeValue(value, mappingSchema);

    return [mappedName, mappedValue];
  }

  private mapAttributeName(name: string, schema: MappingSchema): MappingResult {
    return isUndefined(schema[name]) ? { mappedName: name } : schema[name]!;
  }

  private mapAttributeValue(
    value: NativeAttributeValue,
    schema: MappingSchema | TupleMappingSchema,
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
    schema: MappingSchema | TupleMappingSchema,
  ): NativeArrayAttributeValue {
    if (isArray(schema)) {
      return this.mapTuple(array, schema);
    }

    return array.map((eachItem) => this.mapAttributeValue(eachItem, schema));
  }

  private mapTuple(
    tuple: NativeTupleAttributeValue,
    schema: TupleMappingSchema,
  ): NativeTupleAttributeValue {
    return this.zipTupleWithSchema(tuple, schema).map(
      ([eachItem, eachSchema]) =>
        isNull(eachSchema) || isUndefined(eachSchema)
          ? eachItem
          : this.mapAttributeValue(eachItem, eachSchema),
    );
  }

  private mapObject(
    object: NativeObjectAttributeValue,
    schema: MappingSchema,
  ): NativeObjectAttributeValue {
    const attributes = this.getObjectAttributes(object);
    const mappedAttributes = attributes.map((eachAttribute) =>
      this.mapAttribute(eachAttribute, schema),
    );
    return this.buildObjectFromAttributes(mappedAttributes);
  }

  private zipTupleWithSchema(
    tuple: NativeTupleAttributeValue,
    schema: TupleMappingSchema,
  ): Array<[NativeAttributeValue, MappingSchema | null]> {
    const zipOptions =
      tuple.length < schema.length
        ? { trunc: true }
        : { trunc: false, fill: null };

    return zip(tuple, schema, zipOptions) as Array<
      [NativeAttributeValue, MappingSchema | null]
    >;
  }

  private reverseSchema(schema: MappingSchema): MappingSchema {
    const entries = this.getSchemaEntries(schema);
    const reversedEntries = entries.map((eachEntry) =>
      this.reverseSchemaEntry(eachEntry),
    );
    return this.buildSchemaFromEntries(reversedEntries);
  }

  private getSchemaEntries(mappingSchema: MappingSchema): MappingSchemaEntries {
    return objectEntries(mappingSchema);
  }

  private buildSchemaFromEntries(entries: MappingSchemaEntries): MappingSchema {
    return objectFromEntries(entries);
  }

  private reverseSchemaEntry(entry: MappingSchemaEntry): MappingSchemaEntry {
    const [originalName, { mappedName, mappingSchema }] = entry;

    const reversedSchema = isUndefined(mappingSchema)
      ? undefined
      : this.reverseNestedSchema(mappingSchema);

    return [
      mappedName,
      { mappedName: originalName, mappingSchema: reversedSchema },
    ];
  }

  private reverseNestedSchema(
    schema: NestedMappingSchema,
  ): NestedMappingSchema {
    if (isArray(schema)) {
      return this.reverseTupleSchema(schema);
    }

    return this.reverseSchema(schema);
  }

  private reverseTupleSchema(schema: TupleMappingSchema): TupleMappingSchema {
    return schema.map((eachSchema) =>
      isNull(eachSchema) ? null : this.reverseSchema(eachSchema),
    );
  }
}
