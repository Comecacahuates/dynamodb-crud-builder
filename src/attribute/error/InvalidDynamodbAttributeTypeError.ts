import { AttributeValue } from '@aws-sdk/client-dynamodb';

export class InvalidDynamodbAttributeTypeError extends Error {
  public override readonly name = 'InvalidDynamodbAttributeTypeError';

  public constructor(public readonly attributeValue: AttributeValue) {
    super(
      `Invalid DynamoDB attribute value: ${JSON.stringify(attributeValue)}`,
    );
  }
}
