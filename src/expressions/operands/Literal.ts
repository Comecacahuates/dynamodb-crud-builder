import { Operand } from './Operand.js';
import { type AttributeType } from '../../types.js';
import { AttributeValueBuilder } from '../../attribute-value/AttributeValueBuilder.js';
import { type ExpressionAttributeValues } from '../types.js';
import { generateRandomAlphanumericString } from '../../utils/strings.js';

export class Literal extends Operand {
  private constructor(
    symbolicValue: string,
    expressionAttributeNames: undefined,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(symbolicValue, expressionAttributeNames, expressionAttributeValues);
  }

  public static fromValue(value: AttributeType, name?: string): Literal {
    const attributeValue = AttributeValueBuilder.instance.build(value);
    name ??= generateRandomAlphanumericString(10);

    const symbolicValue = `:literal${name}`;
    const expressionAttributeNames = undefined;
    const expressionAttributeValues: ExpressionAttributeValues = {
      [symbolicValue]: attributeValue,
    };
    return new Literal(
      symbolicValue,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }
}
