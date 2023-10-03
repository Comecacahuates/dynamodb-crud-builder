export class InvalidAttributeTypeError extends Error {
  public override readonly name = 'InvalidAttributeTypeError';

  public constructor(
    attributeName: string,
    expectedDescriptor: string,
    expectedType: string,
    actualDescriptor: string,
    actualType: string,
  ) {
    super(
      `Invalid attribute type for ${attributeName}: expected { ${expectedDescriptor}: <${expectedType}> }, got { ${actualDescriptor}: <${actualType}> }`,
    );
  }
}
