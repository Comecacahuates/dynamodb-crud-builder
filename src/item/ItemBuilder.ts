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
}
