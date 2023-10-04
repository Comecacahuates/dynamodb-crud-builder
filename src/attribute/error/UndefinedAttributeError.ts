export class UndefinedAttributeError extends Error {
  public override readonly name = 'UndefinedAttributeError';

  public constructor(attributeName: string, expectedType: string) {
    super(
      `Attribute "${attributeName}" is undefined bue expected to be "${expectedType}"`,
    );
  }
}
