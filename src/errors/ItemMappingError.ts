import { type Item } from '../types.js';

export class ItemMappingError extends Error {
  public override readonly name = 'ItemMappingError';

  constructor(item: Item) {
    super(`Failed to map item "${JSON.stringify(item)}"`);
  }
}
