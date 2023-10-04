import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Schema } from '../../src/schema/Schema.js';
import { Attribute, StringAttribute } from '../../src/attribute/index.js';

export class MockSchema extends Schema {
  public readonly attribute0: StringAttribute;
  public readonly attribute1: StringAttribute;

  public constructor(attribute0: string, attribute1: string) {
    super();
    this.attribute0 = new StringAttribute('attribute-name-0', attribute0);
    this.attribute1 = new StringAttribute('attribute-name-1', attribute1);
  }

  public override getEntityNameValue(): string {
    return 'MockSchema';
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

  public override toAttributesList(): Attribute[] {
    const { attribute0, attribute1, creationTime, updateTime } = this;
    return [attribute0, attribute1, creationTime, updateTime];
  }

  public static parse(
    dynamodbItem: Record<string, AttributeValue>,
  ): MockSchema | undefined {
    const mockSchema = new MockSchema('', '');

    const { entityName } = mockSchema;
    entityName.parse(dynamodbItem);
    if (entityName.value !== mockSchema.getEntityNameValue()) {
      return undefined;
    }

    const attributes = mockSchema.toAttributesList();
    attributes.forEach((attribute) => {
      attribute.parse(dynamodbItem);
    });

    return mockSchema;
  }
}
