import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type AttributeType =
  | string
  | number
  | null
  | boolean
  | Uint8Array
  | Set<string>
  | Set<number>
  | Set<Uint8Array>
  | AttributeType[]
  | { [key: string]: AttributeType };

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;

export type ValueUpdateOptions = {
  preventOverwriting?: boolean;
};
