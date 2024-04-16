import { type ExpressionAttributeNames } from './ExpressionAttributeNames.js';
import { type ExpressionAttributeValues } from './ExpressionAttributeValues.js';

export interface Expression {
  getString(): string;
  getAttributeNames(): ExpressionAttributeNames;
  getAttributeValues(): ExpressionAttributeValues;
}
