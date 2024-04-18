import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { Operand } from './Operand.js';
import { AttributeValues } from '../attributes/index.js';
import { generateRandomAlphanumericString } from '../../utils/strings.js';

export type LiteralLike = Literal | NativeAttributeValue;

export class Literal extends Operand {
  private constructor(
    expressionString: string,
    attributeValues: AttributeValues = new AttributeValues(),
  ) {
    super(expressionString, undefined, attributeValues);
  }

  public static fromValue(value: NativeAttributeValue, name?: string): Literal {
    const randomName = generateRandomAlphanumericString(10),
      stringExpression = `:literal${name || randomName}`,
      attributeValues = new AttributeValues().add(stringExpression, value);

    return new Literal(stringExpression, attributeValues);
  }

  public static fromLiteralLike(
    literalLike: LiteralLike,
    name?: string,
  ): Literal {
    if (literalLike instanceof Literal) {
      return literalLike;
    }

    return Literal.fromValue(literalLike, name);
  }
}
