export type AttributeType =
  | string
  | number
  | boolean
  | null
  | Set<string>
  | Set<number>
  | AttributeType[]
  | Buffer
  | Set<Buffer>
  | { [key: string]: AttributeType };
