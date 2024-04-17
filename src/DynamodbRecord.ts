import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type DynamodbRecord = Record<string, AttributeValue>;
