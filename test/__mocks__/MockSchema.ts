import { Schema } from '../../src/schema/Schema.js';
import { PutCommandBuilder } from '../../src/write/PutCommandBuilder.js';

export class MockSchema extends Schema {
  public constructor(
    public attribute0: string,
    public attribute1: string,
  ) {
    super();
  }

  public override get entityName(): string {
    return 'MockSchema';
  }

  public override get pk(): string {
    return `PARTITION_KEY#${this.attribute0}`;
  }

  public override get sk(): string {
    return `SORT_KEY#${this.attribute1}`;
  }

  public override get gsi2pk(): string {
    return `GSI2_PARTITION_KEY#${this.attribute1}`;
  }

  public override get gsi2sk(): string {
    return `GIS2_SORT_KEY#${this.attribute0}`;
  }

  public override put(): PutCommandBuilder {
    return super
      .put()
      .put('attr0', this.attribute0)
      .put('attr1', this.attribute1);
  }
}
