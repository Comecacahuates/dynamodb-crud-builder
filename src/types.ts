import { type NativeAttributeValue } from '@aws-sdk/util-dynamodb';

export type AttributeName = string;
export type NativeObjectAttributeValue = Record<
  AttributeName,
  NativeAttributeValue
>;
export type NativeArrayAttributeValue = Array<NativeAttributeValue>;
export type NativeTupleAttributeValue = Array<NativeAttributeValue>;
export type DatabaseItem = Record<
  AttributeName,
  NativeAttributeValue | NativeObjectAttributeValue | NativeArrayAttributeValue
>;
export type DatabaseItemAttribute = [AttributeName, NativeAttributeValue];
export type DatabaseItemAttributes = Array<DatabaseItemAttribute>;
