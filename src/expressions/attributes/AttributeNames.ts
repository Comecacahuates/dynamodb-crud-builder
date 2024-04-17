import { type ExpressionAttributeNames } from '../ExpressionAttributeNames.js';

export class AttributeNames {
  private expressionAttributeNames: ExpressionAttributeNames = {};

  public constructor() {}

  public static merge(attributeNames: AttributeNames[]): AttributeNames {
    return attributeNames.reduce(
      (attributeNames, eachAttributeNames) =>
        attributeNames.merge(eachAttributeNames),
      new AttributeNames(),
    );
  }

  public toExpressionAttributeNames(): ExpressionAttributeNames {
    return this.expressionAttributeNames;
  }

  public add(placeholder: string, name: string): AttributeNames {
    this.expressionAttributeNames[placeholder] = name;
    return this;
  }

  public merge(attributeNames: AttributeNames): AttributeNames {
    this.expressionAttributeNames = {
      ...this.expressionAttributeNames,
      ...attributeNames.toExpressionAttributeNames(),
    };
    return this;
  }
}
