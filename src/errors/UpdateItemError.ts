import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

export class UpdateItemError extends Error {
  public override readonly name = 'UpdateItemError';

  public constructor(readonly originalError: unknown) {
    super();

    const message =
      originalError instanceof Error
        ? originalError.message
        : JSON.stringify(originalError);

    const isAwsError = originalError instanceof DynamoDBServiceException;
    const isDynamoDBRequestError =
      isAwsError && originalError.$fault === 'client';
    const isDynamoDBServerError =
      isAwsError && originalError.$fault === 'server';

    if (isDynamoDBRequestError) {
      this.message = `Request error updating item: ${message}`;
    } else if (isDynamoDBServerError) {
      this.message = `Server error updating item: ${message}`;
    } else {
      this.message = `Unknown error updating item: ${message}`;
    }
  }
}
