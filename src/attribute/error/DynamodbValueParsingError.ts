export class DynamodbValueParsingError extends Error {
  public override readonly name = 'DynamodbValueParsingError';

  public constructor(
    attributeName: string,
    expectedAttributeDescriptor: string,
    actualAttributeDescriptor: string,
  ) {
    super(
      `Invalid DynamoDB value for attribute "${attributeName}". Expected "${expectedAttributeDescriptor}" but got "${actualAttributeDescriptor}".`,
    );
  }
}
