import {
  type NativeAttributeValue,
  convertToAttr,
} from '@aws-sdk/util-dynamodb';
import { type ExpressionAttributeValues } from '../ExpressionAttributeValues.js';

export class AttributeValues {
  private expressionAttributeValues: ExpressionAttributeValues = {};

  public constructor() {}

  public getExpressionAttributeValues(): ExpressionAttributeValues {
    return this.expressionAttributeValues;
  }

  public add(
    placeholder: string,
    value: NativeAttributeValue,
  ): AttributeValues {
    this.expressionAttributeValues[placeholder] = convertToAttr(value);
    return this;
  }

  public merge(attributeValues: AttributeValues): AttributeValues {
    this.expressionAttributeValues = {
      ...this.expressionAttributeValues,
      ...attributeValues.getExpressionAttributeValues(),
    };
    return this;
  }
}
