import { type Item } from '../types.js';
import * as Attributes from '../attribute-value/index.js';

export class ItemBuilder {
  private item: Item = {};

  public build(): Item {
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
}
