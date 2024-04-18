import {
  type AttributeNames,
  type AttributeValues,
} from './attributes/index.js';

export type Expressions = Expression[];

export interface Expression {
  getString(): string;
  getAttributeNames(): AttributeNames;
  getAttributeValues(): AttributeValues;
}
