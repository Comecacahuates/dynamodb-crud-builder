import type { DynamoDBItem, AttributeType } from '../types.js';
import * as Attributes from '../attribute-value/index.js';

export class ItemBuilder {
  private item: DynamoDBItem = {};

  public build(): DynamoDBItem {
    return this.item;
  }

  public addNullAttribute(attributeName: string): ItemBuilder {
    this.item[attributeName] = Attributes.NULL;
    return this;
  }

  public addStringAttribute(
    attributeName: string,
    stringValue: string,
  ): ItemBuilder {
    const attributeValue = Attributes.buildString(stringValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addNumberAttribute(
    attributeName: string,
    numberValue: number,
  ): ItemBuilder {
    const attributeValue = Attributes.buildNumber(numberValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addBooleanAttribute(
    attributeName: string,
    booleanValue: boolean,
  ): ItemBuilder {
    const attributeValue = Attributes.buildBoolean(booleanValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addBinaryAttribute(
    attributeName: string,
    binaryValue: Uint8Array,
  ): ItemBuilder {
    const attributeValue = Attributes.buildBinary(binaryValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addStringSetAttribute(
    attributeName: string,
    stringSetValue: Set<string>,
  ): ItemBuilder {
    const attributeValue = Attributes.buildStringSet(stringSetValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addNumberSetAttribute(
    attributeName: string,
    numberSetValue: Set<number>,
  ): ItemBuilder {
    const attributeValue = Attributes.buildNumberSet(numberSetValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addBinarySetAttribute(
    attributeName: string,
    binarySetValue: Set<Uint8Array>,
  ): ItemBuilder {
    const attributeValue = Attributes.buildBinarySet(binarySetValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addListAttribute(
    attributeName: string,
    listValue: AttributeType[],
  ): ItemBuilder {
    const attributeValue = Attributes.build(listValue);
    this.item[attributeName] = attributeValue;
    return this;
  }

  public addObjectAttribute(
    attributeName: string,
    mapValue: Record<string, AttributeType>,
  ): ItemBuilder {
    const attributeValue = Attributes.build(mapValue);
    this.item[attributeName] = attributeValue;
    return this;
  }
}
