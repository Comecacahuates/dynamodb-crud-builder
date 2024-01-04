export class InvalidAttributeValueError extends Error {
  public override readonly name = 'InvalidAttributeValueError';

  public constructor(attributeName: unknown) {
    super(
      `Invalid attribute value for attribute "${JSON.stringify(
        attributeName,
      )}"`,
    );
  }
}
