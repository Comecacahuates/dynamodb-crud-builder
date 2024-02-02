import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;

export class Expression {
  public constructor(
    private readonly expressionString: string,
    private readonly expressionAttributeNames: ExpressionAttributeNames = {},
    private readonly expressionAttributeValues: ExpressionAttributeValues = {},
  ) {}

  public getExpressionString(): string {
    return this.expressionString;
  }

  public getExpressionAttributeNames(): ExpressionAttributeNames {
    return this.expressionAttributeNames;
  }

  public getExpressionAttributeValues(): ExpressionAttributeValues {
    return this.expressionAttributeValues;
  }
}
