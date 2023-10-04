import { Schema } from '../../src/schema/Schema.js';

export class MockSchema extends Schema {
  public readonly attribute0: string;
  public readonly attribute1: string;

  public constructor(attribute0: string, attribute1: string) {
    super();
    this.attribute0 = attribute0;
    this.attribute1 = attribute1;
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
}
