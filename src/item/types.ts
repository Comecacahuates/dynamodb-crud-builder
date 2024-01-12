import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type Item = Record<string, AttributeValue>;
