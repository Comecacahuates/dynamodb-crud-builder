import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

export class WritingToTableError extends Error {
  public override readonly name = 'WritingToTableError';

  public constructor(
    readonly tableName: string,
    readonly originalError: unknown,
  ) {
    super();

    const isAwsError = originalError instanceof DynamoDBServiceException;
    const isRequestError = isAwsError && originalError.$fault === 'client';
    const isServerError = isAwsError && originalError.$fault === 'server';

    if (isRequestError) {
      this.message = `Request error writing to table ${tableName}: ${originalError.message}`;
    } else if (isServerError) {
      this.message = `Server error writing to table ${tableName}: ${originalError.message}`;
    } else {
      this.message = `Unknown error writing to table ${tableName}: ${originalError}`;
    }
  }
}
