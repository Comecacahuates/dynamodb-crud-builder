import {
  convertToAttr,
  type NativeAttributeValue,
} from '@aws-sdk/util-dynamodb';
import { Operand } from './Operand.js';
import { type ExpressionAttributeValues } from '../types.js';
import { generateRandomAlphanumericString } from '../../utils/strings.js';

export class Literal extends Operand {
  private constructor(
    expressionString: string,
    expressionAttributeNames: undefined,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(
      expressionString,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public static fromValue(value: NativeAttributeValue, name?: string): Literal {
    const attributeValue = convertToAttr(value);
    const randomName = generateRandomAlphanumericString(10);

    const expressionString = `:literal${name || randomName}`;
    const expressionAttributeNames = undefined;
    const expressionAttributeValues: ExpressionAttributeValues = {
      [expressionString]: attributeValue,
    };
    return new Literal(
      expressionString,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }
}
