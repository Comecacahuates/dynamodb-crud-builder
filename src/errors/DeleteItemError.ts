import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

export class DeleteItemError extends Error {
  public override readonly name = 'DeleteItemError';

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
      this.message = `Request error deleting item: ${message}`;
    } else if (isDynamoDBServerError) {
      this.message = `Server error deleting item: ${message}`;
    } else {
      this.message = `Unknown error deleting item: ${message}`;
    }
  }
}
