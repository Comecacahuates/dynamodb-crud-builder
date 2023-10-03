import { Schema } from '../../src/schema/Schema.js';
import { StringAttribute } from '../../src/attribute/index.js';

export class MockSchema extends Schema {
  public readonly attribute0: StringAttribute;
  public readonly attribute1: StringAttribute;

  public constructor(attribute0: string, attribute1: string) {
    super('MockSchema');
    this.attribute0 = new StringAttribute('attribute-name-0', attribute0);
    this.attribute1 = new StringAttribute('attribute-name-1', attribute1);
  }

  public override getPkValue(): string {
    return `PARTITION_KEY#${this.attribute0.value}`;
  }

  public override getSkValue(): string {
    return `SORT_KEY#${this.attribute1.value}`;
  }

  public override getGsi2pkValue(): string {
    return `SECONDARY_INDEX_2_PARTITION_KEY#${this.attribute1.value}`;
  }

  public override getGsi2skValue(): string {
    return `SECONDARY_INDEX_2_SORT_KEY#${this.attribute0.value}`;
  }
}
