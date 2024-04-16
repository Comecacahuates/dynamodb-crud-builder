import { type ExpressionAttributeNames } from './ExpressionAttributeNames.js';

export class AttributeNames {
  private expressionAttributeNames: ExpressionAttributeNames = {};

  public constructor() {}

  public getExpressionAttributeNames(): ExpressionAttributeNames {
    return this.expressionAttributeNames;
  }

  public add(placeholder: string, name: string): AttributeNames {
    this.expressionAttributeNames[placeholder] = name;
    return this;
  }

  public merge(attributeNames: AttributeNames): AttributeNames {
    this.expressionAttributeNames = {
      ...this.expressionAttributeNames,
      ...attributeNames.getExpressionAttributeNames(),
    };
    return this;
  }
}
