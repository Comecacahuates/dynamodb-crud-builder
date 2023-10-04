export class InvalidAttributeTypeError extends Error {
  public override readonly name = 'InvalidAttributeTypeError';

  public constructor(dynamodbAttributeValue: unknown) {
    super(
      `Attribute value ${dynamodbAttributeValue} cannot be converted to a DynamoDB attribute value`,
    );
  }
}
