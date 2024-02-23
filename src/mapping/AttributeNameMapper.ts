import { NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import isObject from '@stdlib/assert-is-object';
import objectEntries from '@stdlib/utils-entries';
import objectFromEntries from '@stdlib/utils-from-entries';
import zip from '@stdlib/utils-zip';
import {
  type NativeObjectAttributeValue,
  type NativeArrayAttributeValue,
  type NativeTupleAttributeValue,
  type DatabaseItem,
  type DatabaseItemAttribute,
  type DatabaseItemAttributes,
} from '../types.js';
import { isArray, isNull, isUndefined } from '../utils/assert.js';

export type AttributeNameMappingSchema = {
  [key: string]: {
    mapsTo: string;
    nestedMapping?:
      | AttributeNameMappingSchema
      | Array<AttributeNameMappingSchema | null>; // for tuples
  };
};
type TupleAttributeNameMappingSchema = Array<AttributeNameMappingSchema | null>;

type AttributeNameMappingResult = {
  readonly mappedAttributeName?: string;
  readonly nestedMappingSchema?:
    | AttributeNameMappingSchema
    | TupleAttributeNameMappingSchema;
};

export class AttributeNameMapper {
  public constructor(
    private readonly mappingSchema: AttributeNameMappingSchema,
  ) {}

  public map(item: DatabaseItem): DatabaseItem {
    const attributes = this.getAttributes(item);
    const mappedAttributes = attributes.map((eachAttribute) =>
      this.mapAttribute(eachAttribute, this.mappingSchema),
    );
    return this.buildItem(mappedAttributes);
  }

  private getAttributes(
    item: DatabaseItem | NativeObjectAttributeValue,
  ): DatabaseItemAttributes {
    return objectEntries(item);
  }

  private buildItem(attributes: DatabaseItemAttributes): DatabaseItem {
    return objectFromEntries(attributes);
  }

  private buildObjectAttributeValue(
    attributes: DatabaseItemAttributes,
  ): NativeObjectAttributeValue {
    return objectFromEntries(attributes);
  }

  private mapAttribute(
    attribute: DatabaseItemAttribute,
    mappingSchema: AttributeNameMappingSchema,
  ): DatabaseItemAttribute {
    const [attributeName, attributeValue] = attribute;
    const { mappedAttributeName = attributeName, nestedMappingSchema } =
      this.mapAttributeName(attributeName, mappingSchema);

    const mappedAttributeValue = isUndefined(nestedMappingSchema)
      ? attributeValue
      : this.mapAttributeValue(attributeValue, nestedMappingSchema);

    return [mappedAttributeName, mappedAttributeValue];
  }

  private mapAttributeName(
    attributeName: string,
    mappingSchema: AttributeNameMappingSchema,
  ): AttributeNameMappingResult {
    return {
      mappedAttributeName: mappingSchema[attributeName]?.mapsTo,
      nestedMappingSchema: mappingSchema[attributeName]?.nestedMapping,
    };
  }

  private mapAttributeValue(
    attributeValue: NativeAttributeValue,
    mappingSchema: AttributeNameMappingSchema | TupleAttributeNameMappingSchema,
  ): NativeAttributeValue {
    if (isArray(attributeValue)) {
      return this.mapArrayAttributeValue(attributeValue, mappingSchema);
    }

    if (isObject(attributeValue) && !isArray(mappingSchema)) {
      return this.mapObjectAttributeValue(attributeValue, mappingSchema);
    }

    return attributeValue;
  }

  private mapArrayAttributeValue(
    attributeValue: NativeArrayAttributeValue,
    mappingSchema: AttributeNameMappingSchema | TupleAttributeNameMappingSchema,
  ): NativeArrayAttributeValue {
    if (isArray(mappingSchema)) {
      return this.mapTupleAttributeValue(attributeValue, mappingSchema);
    }

    return attributeValue.map((eachItem) =>
      this.mapAttributeValue(eachItem, mappingSchema),
    );
  }

  private mapTupleAttributeValue(
    attributeValue: NativeTupleAttributeValue,
    mappingSchema: TupleAttributeNameMappingSchema,
  ): NativeTupleAttributeValue {
    return this.zipTupleAttributeValueWithMappingSchema(
      attributeValue,
      mappingSchema,
    ).map(([eachItem, eachMappingSchema]) =>
      isNull(eachMappingSchema) || isUndefined(eachMappingSchema)
        ? eachItem
        : this.mapAttributeValue(eachItem, eachMappingSchema),
    );
  }

  private mapObjectAttributeValue(
    attributeValue: NativeObjectAttributeValue,
    mappingSchema: AttributeNameMappingSchema,
  ): NativeObjectAttributeValue {
    const nestedAttributes = this.getAttributes(attributeValue);
    const mappedNestedAttributes = nestedAttributes.map((eachAttribute) =>
      this.mapAttribute(eachAttribute, mappingSchema),
    );
    const mappedObjectAttributeValue = this.buildObjectAttributeValue(
      mappedNestedAttributes,
    );

    return mappedObjectAttributeValue;
  }

  private zipTupleAttributeValueWithMappingSchema(
    attributeValue: NativeTupleAttributeValue,
    mappingSchema: TupleAttributeNameMappingSchema,
  ): Array<[NativeAttributeValue, AttributeNameMappingSchema | null]> {
    const zipOptions =
      attributeValue.length < mappingSchema.length
        ? { trunc: true }
        : { trunc: false, fill: null };

    return zip(attributeValue, mappingSchema, zipOptions) as Array<
      [NativeAttributeValue, AttributeNameMappingSchema | null]
    >;
  }
}
