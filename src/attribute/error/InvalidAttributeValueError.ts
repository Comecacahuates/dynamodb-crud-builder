import { ZodError } from 'zod';

export class InvalidAttributeValueError extends Error {
  public override readonly name = 'InvalidAttributeValueError';

  public constructor(attributeName: string, error: ZodError) {
    super(
      `Invalid attribute value for attribute "${attributeName}": ${error.message}`,
    );
  }
}
