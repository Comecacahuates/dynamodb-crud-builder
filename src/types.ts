import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type AttributePath = Array<string>;
export type Item = Record<string, AttributeValue>;
