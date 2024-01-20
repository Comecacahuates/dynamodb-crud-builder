import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import clone from 'just-clone';

export class Set {
  public constructor(
    public readonly statement: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames,
    public readonly expressionAttributeValues: ExpressionAttributeValues,
  ) {
    this.expressionAttributeNames = clone(expressionAttributeNames);
    this.expressionAttributeValues = clone(expressionAttributeValues);
  }
}
