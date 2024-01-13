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

export type ValueUpdateOptions = {
  preventOverwriting?: boolean;
};
