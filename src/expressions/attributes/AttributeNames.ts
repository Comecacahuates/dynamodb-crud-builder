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
}
