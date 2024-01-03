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
}
