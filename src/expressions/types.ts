import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type DocumentPath } from '../document-path/types.js';

export type ExpressionAttributeNames = Record<string, string>;

export type ExpressionAttributeValues = Record<string, AttributeValue>;

export type LiteralName = string;

export type Operand = DocumentPath | LiteralName;
