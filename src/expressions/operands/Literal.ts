import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';
import { generateRandomAlphanumericString } from '../../utils/strings.js';

export class Literal implements Expression {
  private expressionString: string;
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();

  public constructor(value: NativeAttributeValue) {
    const randomName = generateRandomAlphanumericString(10);
    this.expressionString = `:literal${randomName}`;

    this.attributeValues.add(this.expressionString, value);
  }

  public getString(): string {
    return this.expressionString;
  }

  public getAttributeNames(): AttributeNames {
    return this.attributeNames;
  }

  public getAttributeValues(): AttributeValues {
    return this.attributeValues;
  }
}
