import { AttributeValue } from '@aws-sdk/client-dynamodb';

export class InvalidAttributeTypeError extends Error {
  public override readonly name = 'InvalidAttributeTypeError';

  public constructor(
    attributeName: string,
    expectedDescriptor: string,
    expectedType: string,
    actualAttributeValue: AttributeValue,
  ) {
    super(
      `Invalid attribute type for ${attributeName}: expected { ${expectedDescriptor}: <${expectedType}> }, got { ${JSON.stringify(
        actualAttributeValue,
        null,
        2,
      )} }`,
    );
  }
}
