import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { Operand } from './Operand.js';
import { type ExpressionAttributeValues } from '../types.js';
import { type PRNG } from '@stdlib/types/random';

export class Literal extends Operand {
  public constructor(attributeValue: AttributeValue, prng: PRNG) {
    const symbolicValue = Literal.buildSymbolicValue(prng);
    const expressionAttributeNames = undefined;
    const expressionAttributeValues: ExpressionAttributeValues = {
      [symbolicValue]: attributeValue,
    };

    super(symbolicValue, expressionAttributeNames, expressionAttributeValues);
  }

  private static buildSymbolicValue(prng: PRNG): string {
    const randomNumber = prng(0, 1);
    const randomString = randomNumber.toString(36).slice(2);

    return `:literal${randomString}`;
  }
}
