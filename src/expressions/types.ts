import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;
