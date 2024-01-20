import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { Operand } from './Operand.js';
import { type ExpressionAttributeValues } from '../types.js';
import { generateRandomAlphanumericString } from '../../utils/strings.js';

type RandomStringGeneratorFunction = (length: number) => string;

export class Literal extends Operand {
  public constructor(
    attributeValue: AttributeValue,
    randomStringGenerator: RandomStringGeneratorFunction = generateRandomAlphanumericString,
  ) {
    const randomString = randomStringGenerator(10);
    const symbolicValue = `:literal${randomString}`;
    const expressionAttributeNames = undefined;
    const expressionAttributeValues: ExpressionAttributeValues = {
      [symbolicValue]: attributeValue,
    };

    super(symbolicValue, expressionAttributeNames, expressionAttributeValues);
  }
}
