import { type AttributeValue } from '@aws-sdk/client-dynamodb';

export type AttributePath = Array<string>;

export type Item = Record<string, AttributeValue>;

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

export type ItemMapping = {
  [key: string]: {
    mappedName: string;
    nestedAttributesMapping?: ItemMapping;
  };
};
