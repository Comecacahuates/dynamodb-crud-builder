export class InvalidAttributeNameError extends Error {
  public override readonly name = 'InvalidAttributeNameError';

  public constructor(attributeName: string) {
    super(`Invalid attribute name: ${attributeName}`);
  }
}
